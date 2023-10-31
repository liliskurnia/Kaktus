import React, { useState, useEffect } from "react";
import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Block, Image } from "../components";
import { useTheme } from "../hooks";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

export default function OrderHistory() {
    const { assets, colors, gradients, sizes } = useTheme();
    const navigation = useNavigation();
    const [userData, setUserData] = useState([]);
    const [historyData, setHistoryData] = useState([])
    const [loading, setLoading] = useState(true);

    const handleAdd = () => {
        navigation.navigate('PickUp')
    }

    //cek data yang sudah disimpan di async storage
    useEffect(() => {
        const checkAsyncStorageData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    const userDataObj = JSON.parse(userData);
                    // console.log('Data from AsyncStorage:', userDataObj);
                    setUserData(userDataObj)
                    // console.log(userData, 'USERDATA')
                } else {
                    console.log('No data found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        }

        checkAsyncStorageData();
    }, []);

    //get order history
    useEffect(() => {
        if (userData.masterCustomerId) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const { data: response } = await axios.get(`http://192.168.182.111:8000/api/v1/requests/orderHistory/${userData.masterCustomerId}`);
                    setHistoryData(response);
                    // console.log('DATA', historyData)
                } catch (error) {
                    console.error(error.message);
                }
                setLoading(false);
            }

            fetchData();
        }
    }, [userData]);

    let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';

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
                    ORDER HISTORY
                </TextRn>
            </View>
            <ScrollView>
                <View style={styles.subTitleBox}>
                    {/* <TextRn style={{ fontSize: 20, fontWeight: 'bold', color: '#1C7360' }}>TODAY</TextRn> */}
                    <TouchableOpacity onPress={handleAdd} style={styles.add}>
                        <MaterialCommunityIcons name="plus" size={18} color="#9EBCB6" />
                        <TextRn style={{ color: '#9EBCB6' }}>NEW ORDER</TextRn>
                    </TouchableOpacity>
                </View>
                {historyData.map((value, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        <View style={[styles.boxKiri, { backgroundColor: '#DDF7E3' }]}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <QRCode
                                    value={value.trashCode}
                                    logo={{ uri: base64Logo }}
                                    size={70}
                                    logoSize={30}
                                    logoBackgroundColor='transparent'
                                />
                                <TouchableOpacity style={{ borderRadius: 10,borderColor: '#1C7360', backgroundColor: '#ffffff', padding: 5, marginTop: 10 }}>
                                    <TextRn style={{ color: '#A2A2A2' }}>{value.status}</TextRn>
                                </TouchableOpacity>
                                {/* <TextRn style={{ fontWeight: 'bold' }}>Earnings</TextRn> */}
                            </View>
                            {/* <View style={{ flexDirection: 'column' }}>
                                <Image
                                    style={{ marginBottom: 10 }}
                                    source={require('../assets/images/organic.png')}
                                />
                                <TextRn style={{ fontWeight: 'bold' }}>Organic</TextRn>
                            </View> */}
                        </View>
                        <View style={[styles.boxKanan, { backgroundColor: '#A1EDCD', }]}>
                            <View style={{ flexDirection: 'column' }}>
                                <TextRn style={{ marginBottom: 5, fontSize: 12 }}>{value.createdAt}</TextRn>
                                <TextRn style={{ marginBottom: 10, fontSize: 12, fontWeight: 'bold' }}>ID: {value.requestCode}</TextRn>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="trash-can" size={24} color="black" />
                                    <TextRn style={{ fontSize: 16, fontWeight: 'bold' }}>{value.trashType}</TextRn>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </Block>
    );
}

const styles = StyleSheet.create({
    add: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#9EBCB6',
        padding: 5,
        alignItems: 'center'
    },
    subTitleBox: {
        // flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 30,
        // justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: '#819994',
        fontWeight: 'bold',
        marginTop: 20
    },
    boxKiri: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 30,
        borderRadius: 10,
        marginVertical: 10,
        borderTopEndRadius: 0,
        borderBottomEndRadius: 0,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxKanan: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        marginLeft: -30,
        borderTopStartRadius: 0,
        borderBottomStartRadius: 0,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});
