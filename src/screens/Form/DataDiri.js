import React, { useCallback, useEffect, useState } from 'react';
import {
    Platform,
    View,
    Alert,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Linking,
    ImageBackground
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Block, Button, Input, Image, Checkbox } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';
import { Picker } from '@react-native-picker/picker';

export default function DataDiri({ route }) {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [selectedHubunganKK, setSelectedHubunganKK] = useState('');
    const [selectedKodeIbuKandung, setSelectedKodeIbuKandung] = useState('');
    const [jenisKelamin, setJenisKelamin] = useState('');

    const { currentIndex, jumlahKeluarga } = route.params;

    const handleNext = () => {
        if (currentIndex < jumlahKeluarga - 1) {
            navigation.push('DataDiri', { currentIndex: currentIndex + 1, jumlahKeluarga });
        } else {
            navigation.navigate('P13');
        }
    };

    const [birthdate, setBirthdate] = useState('');
    const [age, setAge] = useState('');

    const handleBirthdateChange = (text) => {
        setBirthdate(text);
        calculateAge(text);
    };

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthdateArray = birthdate.split('-');
        const birthYear = parseInt(birthdateArray[0], 10);
        const birthMonth = parseInt(birthdateArray[1], 10);
        const birthDay = parseInt(birthdateArray[2], 10);

        const ageYear = today.getFullYear() - birthYear;
        const ageMonth = today.getMonth() + 1 - birthMonth;
        const ageDay = today.getDate() - birthDay;

        let calculatedAge = ageYear;

        if (
            birthMonth > today.getMonth() + 1 ||
            (birthMonth === today.getMonth() + 1 && birthDay > today.getDate())
        ) {
            calculatedAge--;
        }

        //usia 0 jika negatif 
        if (calculatedAge < 0) {
            calculatedAge = 0;
        }

        setAge(calculatedAge.toString());
    };

    return (
        <Block flex={1} style={{ backgroundColor: '#071952' }}>

            <View style={{ margin: 10 }} >
                <View style={{ alignItems: 'center', zIndex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
                        Tambah Data Keluarga
                    </Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#EEEEEE', height: '100%', borderRadius: 30 }}>
                <Block
                    scroll
                    paddingHorizontal={sizes.sm}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ backgroundColor: '#fff', marginTop: 20, padding: 10, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Form Data Diri</Text>
                        <TouchableOpacity onPress={() => Alert.alert('Draft disimpan !')}>
                            <MaterialCommunityIcons name="content-save-alert" size={18} color="#557A46" />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginVertical: 10,
                            borderBottomColor: '#BABABA',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            flex: 1
                        }}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: '#379237', width: 85, marginBottom: 10, padding: 5, borderRadius: 5 }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 16 }}>
                                Individu {currentIndex + 1}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                            Nama
                        </Text>
                        <TextInput style={{ padding: 8, width: 310, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="Fulan" />
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                            Nomor Induk Kependudukan
                        </Text>
                        <TextInput style={{ padding: 8, width: 310, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="1234567890987654" />
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                            Jenis Kelamin
                        </Text>
                        <View style={{ width: 310, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }}>
                            <Picker
                                selectedValue={jenisKelamin}
                                onValueChange={(itemValue, itemIndex) => setJenisKelamin(itemValue)}
                            >
                                <Picker.Item label="Pilih jenis kelamin" value="" />
                                <Picker.Item label="Laki-laki" value="laki-laki" />
                                <Picker.Item label="Perempuan" value="perempuan" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                Hubungan dengan KK
                            </Text>
                            <View style={{ width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }}>
                                <Picker
                                    selectedValue={selectedHubunganKK}
                                    onValueChange={(itemValue, itemIndex) => setSelectedKodeIbuKandung(itemValue)}
                                >
                                    <Picker.Item label="Pilih" value="" />
                                    <Picker.Item label="KK" value="kk" />
                                    <Picker.Item label="Istri" value="istri" />
                                    <Picker.Item label="Anak" value="anak" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                Kode Ibu Kandung
                            </Text >
                            <View style={{ width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }}>
                                <Picker
                                    selectedValue={selectedKodeIbuKandung}
                                    onValueChange={(itemValue, itemIndex) => selectedKodeIbuKandung(itemValue)}
                                >
                                    <Picker.Item label="Pilih" value="" />
                                    <Picker.Item label="Istri" value="istri" />
                                    <Picker.Item label="Lainnya" value="lainnya" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                Tanggal Lahir
                            </Text>
                            <TextInput
                                style={{
                                    padding: 8,
                                    width: 150,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: '#B7B7B7',
                                }}
                                placeholder="YYYY-MM-DD"
                                value={birthdate}
                                onChangeText={handleBirthdateChange}
                            />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                Usia
                            </Text>
                            <TextInput
                                style={{
                                    padding: 8,
                                    width: 150,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: '#B7B7B7',
                                    color: 'black'
                                }}
                                placeholder='35'
                                value={age}
                                editable={false}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 50 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                            Mutasi Anggota Keluarga
                        </Text>
                        <TextInput style={{ padding: 8, width: 310, backgroundColor: '#EEEEEE', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="Keluarga Baru" />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50, borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('TambahDataKeluarga')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                            <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 16 }}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleNext()}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', marginLeft: 'auto', flexDirection: 'row', borderRadius: 10 }}>
                            <Text style={{ marginRight: 10, fontWeight: 'bold', color: 'white', fontSize: 16 }}>Selanjutnya</Text>
                            <MaterialCommunityIcons name="arrow-right" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </Block>
            </View>
        </Block>
    )
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        marginBottom: 20,
        flexDirection: 'column',
        width: '100%',
    },
    headerLayout: {
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#ec3337',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        height: 82,
    },
    content: {
        backgroundColor: '#2369AF',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        margin: 20,
        marginBottom: 0,
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#2369AF',
        marginBottom: 20,
        marginTop: 10,
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#BABABA',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    picker: {
        height: 40,
    },
});