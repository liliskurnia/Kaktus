import React, { useCallback, useEffect, useState } from "react";
import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Block, Image, Text, ModalSelect, Input } from "../components";
import { useData, useTheme, useTranslation } from "../hooks";
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';

export default function DownloadBarcode() {
    const { assets, colors, gradients, sizes } = useTheme();
    const navigation = useNavigation();
    const [allData, setAllData] = useState([]);
    const [barcodeData, setBarcodeData] = useState([]);;

    const handleAdd = () => {
        navigation.navigate('PickUp')
    }

    useEffect(() => {
        getQrValue()
    }, [])


    const getQrValue = async () => {
        try {
            const response = await axios.get('http://192.168.1.14:8000/api/v1/customers/listSampah/1');
            // console.log('respon', response)

            if (response.status === 200) {
                setAllData(response.data)
                setBarcodeData(response.data.map(item => ({ barcode: item.barcode, jenisSampah: item.jenisSampah })));
                // console.log('barcode', barcode)
            } else {
                Alert.alert('Error', 'Failed to login. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', `${error.response}`);
        }
    }

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
                <TextRn style={{ fontSize: 30, textAlign: 'center', color: '#819994', fontWeight: 'bold', marginTop: 20 }}>
                    QRCODE
                </TextRn>
            </View>
            <ScrollView>
                {barcodeData.map((value, index) => (
                    <View key={index} style={{ flexDirection: 'column' }}>
                        <TextRn style={{ fontSize: 18, textAlign: 'left', fontWeight:'bold', color: '#57B4A1', marginBottom: 10, marginTop: 20, marginHorizontal: 30 }}>{value.jenisSampah}</TextRn>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, alignItems: 'center' }}>
                            <QRCode
                                value={value.barcode}
                                logo={{ uri: base64Logo }}
                                size={150}
                                logoSize={30}
                                logoBackgroundColor="transparent"
                            />
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#57B4A1', padding: 10, borderRadius: 10 }}>
                                <Feather name="download" size={20} color="white" />
                                <TextRn style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 5 }}>Download QR</TextRn>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </Block>
    );
}

const styles = StyleSheet.create({
    boxKiri: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 30,
        padding: 20,
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
        width: '58%',
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
