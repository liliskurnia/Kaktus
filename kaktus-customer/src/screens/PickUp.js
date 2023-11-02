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
import DatePicker from 'react-native-modern-datepicker';
import BASE_URL from "../../config";

export default function PickUp() {
    const { assets, colors, gradients, sizes } = useTheme();
    const navigation = useNavigation();
    const [data, setData] = useState([])
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [errors, setErrors] = useState({});
    const [state, setState] = useState({
        masterCustomerId: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        trashTypeId: '',
        // garbageId: ''
    })

    //get data yang sudah disimpan di async storage
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
                    const { data: response } = await axios.get(`${BASE_URL}/api/v1/customers/${userData.masterCustomerId}`);
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

        //field required
        const validationErrors = {};

        if (!selectedDate) {
            validationErrors.selectedDate = '*Date & Time is required';
        }
        if (!state.trashTypeId) {
            validationErrors.trashTypeId = '*Garbage Type is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const pickUpData = {
            masterCustomerId: state.masterCustomerId,
            phone: state.phone,
            address: state.address,
            scheduledDate: selectedDate,
            trashTypeId: state.trashTypeId,
            jenisSampahId: state.trashTypeId
            // garbageId: state.garbageId
        };

        try {
            const response = await axios.post(`${BASE_URL}/api/v1/requests`, pickUpData);
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
                <TextRn style={styles.title}>
                    ORDER PICK-UP
                </TextRn>
            </View>
            <ScrollView>
                <TextRn style={styles.formTitle}>Full Name :</TextRn>
                <View style={[styles.inputTextView, { backgroundColor: '#F0F0F0' }]}>
                    <TextInput
                        value={data.nama}
                        editable={false}
                        style={styles.inputText}
                        placeholder="FULL NAME"
                        placeholderTextColor="#B3B3B3" />
                </View>
                <TextRn style={styles.formTitle}>Phone Number :</TextRn>
                <View style={[styles.inputTextView, { backgroundColor: '#F0F0F0' }]}>
                    <TextInput
                        value={data.telp}
                        editable={false}
                        style={styles.inputText}
                        placeholder="PHONE NUMBER"
                        placeholderTextColor="#B3B3B3" />
                </View>
                <TextRn style={styles.formTitle}>Address :</TextRn>
                <View style={[styles.inputTextView, { backgroundColor: '#F0F0F0' }]}>
                    <TextInput
                        value={data.alamat}
                        editable={false}
                        style={styles.inputText}
                        placeholder="ADDRESS"
                        placeholderTextColor="#B3B3B3" />
                </View>
                <TextRn style={styles.formTitle}>Date & Time :</TextRn>
                <View style={styles.inputTextView}>
                    <DatePicker
                        mode= "calendar"
                        onSelectedChange={date => setSelectedDate(date)}
                    />
                </View>
                <View style={{ width: '80%' }}>
                    {errors.selectedDate && <TextRn style={styles.errorText}>{errors.selectedDate}</TextRn>}
                </View>
                <TextRn style={styles.formTitle}>Garbage Type :</TextRn>
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
                <View style={{ width: '80%' }}>
                    {errors.trashTypeId && <TextRn style={styles.errorText}>{errors.trashTypeId}</TextRn>}
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
                    <TextRn style={styles.btnText}>CONFIRM ORDER</TextRn>
                </TouchableOpacity>
            </ScrollView>
        </Block>
    );
}

const styles = StyleSheet.create({
    errorText: {
        textAlign: 'left',
        color: 'red',
        alignSelf: "flex-start",
        marginLeft:30,
        marginBottom:20
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        margin: 10
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: '#819994',
        fontWeight: 'bold',
        marginVertical: 30
    },
    formTitle: {
        marginHorizontal: 30,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#57B4A1'
    },
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
