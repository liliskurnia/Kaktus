import React, { useState, useEffect } from "react";
import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Block, Image } from "../components";
import { useTheme } from "../hooks";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import 'moment-timezone';
import Modal from "react-native-modal";

export default function OrderHistory() {
    const { assets, colors, gradients, sizes } = useTheme();
    const navigation = useNavigation();
    const [userData, setUserData] = useState([]);
    const [historyData, setHistoryData] = useState([])
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const handleAdd = () => {
        navigation.navigate('PickUp')
    }

    const toggleModal = (index) => {
        setSelectedItemIndex(index);
        setModalVisible(!isModalVisible);
    };

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

    const convertToLocalTime = (timestamp) => {
        const localTime = moment(timestamp);
        return localTime.format('YYYY-MM-DD HH:mm:ss');
    };

    //get order history
    useEffect(() => {
        if (userData.masterCustomerId) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const { data: response } = await axios.get(`http://192.168.182.111:8000/api/v1/requests/orderHistory/${userData.masterCustomerId}`);
                    // Convert timestamps in the response to local time
                    const localizedData = response.map(item => ({
                        ...item,
                        createdAt: convertToLocalTime(item.createdAt),
                        updatedAt: convertToLocalTime(item.updatedAt),
                    }));
                    setHistoryData(localizedData);
                    console.log('DATA', historyData);
                } catch (error) {
                    console.error(error.message);
                }
                setLoading(false);
            };

            fetchData();
        }
    }, [userData]);

    let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';

    historyData.sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));

    const groupedData = {};

    historyData.forEach(item => {
        const itemDate = moment(item.createdAt).format("YYYY-MM-DD");
        if (!groupedData[itemDate]) {
            groupedData[itemDate] = [item];
        } else {
            groupedData[itemDate].push(item);
        }
    });


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
                {Object.keys(groupedData).map(date => (
                    <View key={date}>
                        <TextRn style={{ fontSize: 20, fontWeight: 'bold', color: '#1C7360', marginHorizontal: 30, marginTop: 20 }}>
                            {moment(date).format('D MMMM YYYY')}
                        </TextRn>
                        {groupedData[date].map((value, index) => (
                            <View key={value.id} style={{ marginBottom: 10 }}>
                                <View style={styles.box}>
                                    <TextRn style={{ color: '#00000066' }}>{value.createdAt}</TextRn>
                                    <TextRn style={{ fontWeight: 'bold' }}>R.ID: {value.requestCode}</TextRn>
                                    <TextRn>Kode Sampah: {value.trashCode}</TextRn>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name="trash-can" size={24} color="black" />
                                        <TextRn style={{ fontSize: 16, fontWeight: 'bold' }}>{value.trashType}</TextRn>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                        <TouchableOpacity onPress={() => toggleModal(index)} style={[styles.buttonReward, { width: '40%' }]}>
                                            <MaterialCommunityIcons name="line-scan" size={20} color="white" />
                                            <TextRn style={styles.textbtn}>View QR</TextRn>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.buttonReward, { width: '40%' }]}>
                                            <AntDesign name="clouddownloado" size={20} color="white" />
                                            <TextRn style={styles.textbtn}>Download QR</TextRn>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.buttonReward, { width: '10%' }]}>
                                            <MaterialCommunityIcons name="dots-horizontal" size={20} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.boxBottom}>
                                    <TextRn style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 12 }}>{value.status}</TextRn>
                                    <TextRn style={{ color: '#ffffff', fontSize: 12 }}>{value.updatedAt}</TextRn>
                                    <TextRn style={{ color: '#ffffff', fontSize: 12 }}>2000 point</TextRn>
                                </View>
                                {selectedItemIndex !== null && (
                                    <Modal isVisible={isModalVisible}>
                                        <View style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 10, flexDirection: 'column', alignItems: 'center' }}>
                                            <TextRn style={{ color: '#819994', textAlign: 'center', fontSize: 18, marginBottom: 20 }}>QR CODE</TextRn>
                                            <QRCode
                                                value={historyData[selectedItemIndex].trashCode}
                                                logo={{ uri: base64Logo }}
                                                size={250}
                                                logoSize={30}
                                                logoBackgroundColor='transparent'
                                            />
                                            <TouchableOpacity onPress={() => toggleModal(null)} style={[styles.buttonModal, { backgroundColor: '#9EBCB6' }]}>
                                                <TextRn style={styles.textbtn}>OK</TextRn>
                                            </TouchableOpacity>
                                        </View>
                                    </Modal>
                                )}
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </Block>
    );
}

const styles = StyleSheet.create({
    textbtn: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        marginLeft:5
    },
    buttonModal: {
        padding: 10,
        borderRadius: 5,
        width: '15%',
        marginVertical: 20,
    },
    buttonReward: {
        backgroundColor: '#3CB9E0',
        borderRadius: 10,
        padding: 5,
        marginRight: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    box: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffffff',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 30,
        marginTop: 10,
        padding: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    boxBottom: {
        flexDirection: 'row',
        marginHorizontal: 30,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#A8A8A8',
        justifyContent: 'space-between',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    add: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#9EBCB6',
        padding: 5,
        alignItems: 'center'
    },
    subTitleBox: {
        marginHorizontal: 30,
        marginTop: 30,
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
