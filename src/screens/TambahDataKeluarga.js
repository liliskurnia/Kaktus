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
import { Block, Button, Input, Image, Checkbox } from '../components';
import { useData, useTheme, useTranslation } from '../hooks';
import DataDiri from './Form/DataDiri';
import { Picker } from '@react-native-picker/picker';

export default function TambahDataKeluarga() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [selectedStatusKeluarga, setSelectedStatusKeluarga] = useState('baru');
    const [jumlahKeluarga, setJumlahKeluarga] = useState(0);

    const handleJumlahKeluargaChange = (value) => {
        setJumlahKeluarga(value);
        // onJumlahKeluargaChange(parseInt(value));
    }

    return (
        <Block flex={1} style={{ backgroundColor: '#071952' }}>
            <View style={{ margin: 10 }} >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={{ marginTop: 7, zIndex: 999 }}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <View style={{ alignItems: 'center', marginTop: -20, zIndex: 1 }}>
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
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Form Wilayah</Text>
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
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'column', paddingRight: 65 }}>
                            <Text style={{ fontSize: 16 }}>
                                Provinsi
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                KALIMANTAN TIMUR
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 16 }}>
                                Kabupaten
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                KOTA BALIKPAPAN
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ flexDirection: 'column', paddingRight: 75 }}>
                            <Text style={{ fontSize: 16 }}>
                                Kecamatan
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                BALIKPAPAN KOTA
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 16 }}>
                                Kelurahan
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                KLANDASAN ILIR
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                RW
                            </Text>
                            <TextInput style={{ padding: 8, width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="001" />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                RT
                            </Text >
                            <TextInput style={{ padding: 8, width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="001" />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                No. Telepon
                            </Text>
                            <TextInput style={{ padding: 8, width: 310, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="084554997744" />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                            Alamat
                        </Text>
                        <TextInput style={{ padding: 8, width: 310, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="Jl.Pemuda No.10" />
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                            Jumlah Anggota Keluarga
                        </Text>
                        <TextInput
                            style={{ padding: 8, width: 310, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }}
                            value={jumlahKeluarga.toString()}
                            onChangeText={handleJumlahKeluargaChange}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 50 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                            Status Keluarga
                        </Text>
                        <View style={{backgroundColor: '#EEEEEE', width: 310, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }}>
                        <Picker
                            selectedValue={selectedStatusKeluarga}
                            onValueChange={(itemValue, itemIndex) => setSelectedStatusKeluarga(itemValue)}
                            enabled={false}
                        >
                            <Picker.Item label="6. Keluarga Baru" value="baru" />
                            <Picker.Item label="1. Keluarga Ada" value="ada" />
                            <Picker.Item label="2. Keluarga Pindah" value="pindah" />
                            <Picker.Item label="3. Keluarga Seluruh Anggota Keluarga Meninggal Dunia" value="meninggal" />
                            <Picker.Item label="4. Keluarga Tidak Ditemukan" value="tidakDitemukan" />
                            <Picker.Item label="5. Keluarga Bercerai" value="cerai" />
                        </Picker>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end', marginBottom: 20, borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('DataDiri', { jumlahKeluarga })}
                            style={{ borderRadius: 10, backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', marginLeft: 'auto', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16, marginRight: 10 }}>Selanjutnya</Text>
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