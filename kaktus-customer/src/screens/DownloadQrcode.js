import React, { useCallback, useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
    ScrollView,
    Dimensions,
    PermissionsAndroid
} from 'react-native';
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Block, Image, Text, ModalSelect, Input } from '../components';
import { useData, useTheme, useTranslation } from '../hooks';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import * as FileSystem from 'expo-file-system'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFetchBlob from 'rn-fetch-blob';
// import Share from 'react-native-share';

export default function DownloadBarcode() {
    const { assets, colors, gradients, sizes } = useTheme();
    const navigation = useNavigation();
    const [allData, setAllData] = useState([]);
    const [barcodeData, setBarcodeData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [historyData, setHistoryData] = useState([])
    const [loading, setLoading] = useState(true);

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
    // console.log(id, 'masterCustomerId')

    const handleAdd = () => {
        navigation.navigate('PickUp');
    };

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

    // const handleDownload = async () => {
    //     if (Platform.OS === 'android') {
    //     var isReadGranted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //       );
    //     }
    //     if (isReadGranted === PermissionsAndroid.RESULTS.GRANTED) {
    //       const dirs = RNFetchBlob.fs.dirs
    //       var qrcode_data = QRImage.split('data:image/png;base64,');
    //       const filePath = dirs.DownloadDir+"/"+'QRCode'+new Date().getSeconds()+'.png'
    //       RNFetchBlob.fs.writeFile(filePath, qrcode_data[1], 'base64')
    //       .then(() =>  console.log("Saved successfully"))
    //       .catch((errorMessage) =>console.log(errorMessage))      
    //       }
    //       if (Platform.OS ==='ios') {
    //       const options={
    //         title: 'Share is your QRcode',
    //         url: QRImage,
    //       }
    //     try {
    //       await Share.open(options);
    //     } catch (err) {
    //       console.log(err)
    //     }
    //     }
    //   }

    const handleDownload = async (barcode) => {
        const downloadUrl = `http://192.168.182.111:8000/download/pdfQR/${barcode}`;
        const directory = FileSystem.documentDirectory + 'Barcode/'; 

        // Membuat direktori jika belum ada
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

        const fileUri = `${directory}${barcode}.pdf`;
        // const fileUri = `${FileSystem.documentDirectory}${barcode}.png`;
        console.log(fileUri);

        try {
            const downloadObject = FileSystem.createDownloadResumable(downloadUrl, fileUri);
            const { uri } = await downloadObject.downloadAsync();

            if (uri) {
                Alert.alert('Success', 'QR Code downloaded successfully!');
            } else {
                console.error('Failed to download QR Code:', uri);
                Alert.alert('Error', 'Failed to download QR Code.');
            }
        } catch (error) {
            console.error('Error downloading QR Code:', error);
            Alert.alert('Error', 'Failed to download QR Code. Please try again.');
        }
    };

    let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
    return (
        <Block
            flex={1}
            style={{ backgroundColor: '#fff' }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    marginTop: 30,
                    marginHorizontal: 20,
                    justifyContent: 'space-between',
                }}
            >
                <Image
                    style={{ width: '45%', height: '150%' }}
                    source={require('../assets/images/kaktus.png')}
                />
                <View style={{ alignSelf: 'flex-end' }}>
                    <Block
                        row
                        flex={0}
                        align='center'
                        marginRight={sizes.sm}
                        marginTop={5}
                    >
                        <TouchableOpacity onPress={() => Alert.alert('Notifikasi ditekan')}>
                            <MaterialCommunityIcons
                                name='bell-outline'
                                size={22}
                                color='#1C7360'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                name='android-messages'
                                size={22}
                                color='#1C7360'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons
                                name='menu'
                                size={22}
                                color='#1C7360'
                            />
                        </TouchableOpacity>
                    </Block>
                </View>
            </View>
            <View>
                <TextRn style={styles.title}>QRCODE</TextRn>
            </View>
            <ScrollView>
                {historyData.map((value, index) => (
                    <View
                        key={index}
                        style={styles.box}
                    >
                        <TextRn style={styles.subTitle}>{value.trashType}</TextRn>
                        <View style={styles.boxQr}>
                            <QRCode
                                value={value.trashCode}
                                logo={{ uri: base64Logo }}
                                size={150}
                                logoSize={30}
                                logoBackgroundColor='transparent'
                            />
                            <TouchableOpacity
                                onPress={() => handleDownload(value.trashCode)}
                                style={styles.button}
                            >
                                <Feather
                                    name='download'
                                    size={20}
                                    color='white'
                                />
                                <TextRn style={styles.textButton}>Download QR</TextRn>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </Block>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: '#819994',
        fontWeight: 'bold',
        marginTop: 20,
    },
    box: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#D0D4CA',
        margin: 10,
        borderRadius: 10,
    },
    subTitle: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#57B4A1',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    boxQr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#57B4A1',
        padding: 10,
        borderRadius: 10,
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
});
