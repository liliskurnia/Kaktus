import React, { useCallback, useEffect, useState } from "react";
import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
    TextInput,
    ScrollView
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Block, Image } from "../components";
import { useTheme } from "../hooks";
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PickUp() {
    const { assets, colors, gradients, sizes } = useTheme();
    const navigation = useNavigation();
    const [data, setData] = useState([])
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({
        masterCustomerId: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        trashTypeId: '',
        // garbageId: ''
    })

    //cek data yang sudah disimpan di async storage
    useEffect(() => {
        const checkAsyncStorageData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    const userDataObj = JSON.parse(userData);
                    // console.log('Data from AsyncStorage:', userDataObj);
                    setUserData(userDataObj)
                    // console.log(userDataObj, 'USERDATA')
                } else {
                    console.log('No data found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        }
        checkAsyncStorageData();
    }, []);

    const id = userData.masterCustomerId
    // console.log('id', id)

    //get info user berdasarkan id yang login
    useEffect(() => {
        if (userData.masterCustomerId) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const { data: response } = await axios.get(`http://192.168.182.111:8000/api/v1/customers/${userData.masterCustomerId}`);
                    setData(response);
                    // console.log('DATA', data)
                    setState({
                        masterCustomerId: id,
                        phone: response.telp,
                        address: response.alamat
                    });
                } catch (error) {
                    console.error(error.message);
                }
                setLoading(false);
            }

            fetchData();
        }
    }, [userData]);

    const handleScan = () => {
        navigation.navigate('ScanBarcode')
    }

    const handleConfirmOrder = async () => {
        const pickUpData = {
            masterCustomerId: state.masterCustomerId,
            phone: state.phone,
            address: state.address,
            date: state.date,
            time: state.time,
            trashTypeId: state.trashTypeId,
            // garbageId: state.garbageId
        };

        try {
            const response = await axios.post('http://192.168.182.111:8000/api/v1/requests', pickUpData);
            console.log('respon', response.data)

            if (response.status === 200) {
                await AsyncStorage.setItem('userData', JSON.stringify(response.data));
                navigation.navigate('ConfirmOrder');
            } else {
                Alert.alert('Error', 'Failed to login. Please try again.');
            }

        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', `${error.response.data}`);
        }

        console.log('PICKUPDATA', pickUpData)
    }

    return (
        <Block flex={1} style={{ backgroundColor: "#fff" }}>
            <View
                style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    marginTop: 30,
                    marginHorizontal: 20,
                    justifyContent: 'space-between'
                }}
            >
                <Image
                    style={{ width: '45%', height: '150%' }}
                    source={require('../assets/images/kaktus.png')}
                />
                <View style={{ alignSelf: "flex-end" }}>
                    <Block
                        row
                        flex={0}
                        align="center"
                        marginRight={sizes.sm}
                        marginTop={5}
                    >
                        <TouchableOpacity
                            onPress={() => Alert.alert("Notifikasi ditekan")}
                        >
                            <MaterialCommunityIcons
                                name="bell-outline"
                                size={22}
                                color="#1C7360"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <MaterialCommunityIcons name="android-messages" size={22} color="#1C7360" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons name="menu" size={22} color="#1C7360" />
                        </TouchableOpacity>
                    </Block>
                </View>
            </View>
            <View>
                <TextRn style={{ fontSize: 30, textAlign: 'center', color: '#819994', fontWeight: 'bold', marginVertical: 30 }}>
                    ORDER PICK-UP
                </TextRn>
            </View>
            <ScrollView>
                <View style={[styles.inputTextView, { backgroundColor: '#F0F0F0' }]}>
                    <TextInput
                        value={data.nama}
                        editable={false}
                        style={styles.inputText}
                        placeholder="FULL NAME"
                        placeholderTextColor="#B3B3B3"
                        onChangeText={text => setState({ ...state, masterCustomerId: text })} />
                </View>
                <View style={[styles.inputTextView, { backgroundColor: '#F0F0F0' }]}>
                    <TextInput
                        value={data.telp}
                        editable={false}
                        style={styles.inputText}
                        placeholder="PHONE NUMBER"
                        placeholderTextColor="#B3B3B3"
                        onChangeText={text => setState({ ...state, phone: text })} />
                </View>
                <View style={[styles.inputTextView, { backgroundColor: '#F0F0F0' }]}>
                    <TextInput
                        value={data.alamat}
                        editable={false}
                        style={styles.inputText}
                        placeholder="ADDRESS"
                        placeholderTextColor="#B3B3B3"
                        onChangeText={text => setState({ ...state, address: text })} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.inputTextView}>
                        <TextInput
                            style={[styles.inputText, { width: '40%' }]}
                            placeholder="DATE"
                            placeholderTextColor="#B3B3B3"
                            onChangeText={text => setState({ ...state, date: text })} />
                    </View>
                    <View style={styles.inputTextView}>
                        <TextInput
                            style={[styles.inputText, { width: '40%' }]}
                            placeholder="TIME"
                            placeholderTextColor="#B3B3B3"
                            onChangeText={text => setState({ ...state, time: text })} />
                    </View>

                </View>
                <View style={[styles.inputTextView, { flex: 1 }]}>
                    <Picker
                        selectedValue={state.trashTypeId}
                        onValueChange={value => setState({ ...state, trashTypeId: value })}
                        style={[styles.inputText, { width: '100%' }]}
                    >
                        <Picker.Item label="GARBAGE TYPE" value="" />
                        <Picker.Item label="U-Undefined" value="1" />
                        <Picker.Item label="OGN-Organik" value="2" />
                        <Picker.Item label="PLA-Plastik" value="3" />
                        <Picker.Item label="PET-PET-Bottle" value="4" />
                        <Picker.Item label="ALM-Alumunium" value="5" />
                        <Picker.Item label="BSI-Besi-Baja" value="6" />
                        <Picker.Item label="NBK-Non-Bakar" value="7" />
                        <Picker.Item label="LGM-Logam" value="8" />
                        <Picker.Item label="RSD-Residu" value="9" />
                        <Picker.Item label="ELK-Elektronik" value="10" />
                        <Picker.Item label="B3-Berbahaya" value="11" />
                        <Picker.Item label="K0-Khusus" value="12" />
                    </Picker>
                </View>
                {/* <View style={styles.inputTextView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="GARBAGE ID"
                        placeholderTextColor="#B3B3B3"
                        onChangeText={text => setState({ ...state, garbageId: text })} />
                    <TouchableOpacity onPress={handleScan}>
                        <MaterialCommunityIcons name="line-scan" size={24} color="#B3B3B3" />
                    </TouchableOpacity>
                </View> */}
                <TouchableOpacity onPress={handleConfirmOrder} style={styles.button}>
                    <TextRn style={{ fontSize: 20, fontWeight: 'bold', color: '#ffffff', margin: 10 }}>CONFIRM ORDER</TextRn>
                </TouchableOpacity>
            </ScrollView>
        </Block>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 50,
        margin: 10,
        alignSelf: 'center',
        backgroundColor: '#57B4A1',
        borderRadius: 10,
        padding: 10
    },
    inputTextView: {
        marginHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        marginBottom: 10
    },
    inputText: {
        height: 60,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
