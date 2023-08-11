import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import {
    TouchableOpacity,
    Text,
    View,
    Alert,
    StyleSheet,
    TextInput, ScrollView
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Block, Image, ModalSelect, Input } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';

export default function Pratinjau() {
    const navigation = useNavigation();
    const [statusPUS, setStatusPUS] = useState('ya');
    const [statusHamil, setStatusHamil] = useState('ya');
    const [terlaluMuda, setTerlaluMuda] = useState('tidak');
    const [terlaluTua, setTerlaluTua] = useState('tidak');
    const [terlaluDekat, setTerlaluDekat] = useState('ya');
    const [terlaluBanyak, setTerlaluBanyak] = useState('tidak');
    const [statusVerval, setStatusVerval] = useState('verval');
    const { assets, colors, gradients, sizes } = useTheme();
    const handleSave = () => {
        Alert.alert(
            'Simpan',
            `Anda yakin data yang diisikan sudah benar ?`,
            [
                {
                    text: 'Tidak',
                    style: 'cancel',
                },
                {
                    text: 'YA',
                    onPress: async () => {
                        navigation.navigate('Home')
                    },
                },
            ],
        );
    };

    const [collapse, setCollapse] = useState(true);
    const handleCollapse = (value) => {
        setCollapse(value);
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
            <ScrollView>
                <View style={{ backgroundColor: '#EEEEEE', height: '100%', borderRadius: 30, borderBottomEndRadius: 0, borderBottomStartRadius: 0 }}>
                    <Block
                        scroll
                        paddingHorizontal={sizes.sm}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ backgroundColor: '#fff', marginTop: 20, marginBottom: 20, padding: 10, borderRadius: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Form Pratinjau</Text>
                        <View
                            style={{
                                marginVertical: 10,
                                borderBottomColor: '#BABABA',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                flex: 1
                            }}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="map-marker-radius" size={20} color="black" />
                            <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 3 }}>Lokasi Pendataan</Text>
                            <View style={{ borderWidth: 1, borderRadius: 5, backgroundColor: '#EEEEEE', borderColor: '#B7B7B7', marginLeft: 5 }}>
                                <MaterialCommunityIcons name="refresh" size={20} color="black" />
                            </View>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>Latitude : -</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5, marginBottom: 20 }}>Longitude : -</Text>
                        <TouchableOpacity onPress={() => handleCollapse(true)}
                            style={{ backgroundColor: '#205295', padding: 10 }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>
                                    Data Keluarga
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{
                                borderColor: '#f4f4f4',
                                borderWidth: 3,
                                borderTopWidth: 0,
                                marginBottom: 10,
                            }}>
                            {collapse && (
                                <View>
                                    <View style={{ flexDirection: 'column', margin: 10 }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                            Nama
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="Fulanah" />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10, marginTop: 0 }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                            NIK
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="1234567890987654" />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10, marginTop: 0 }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                            Hubungan dengan KK
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="Istri" />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10, marginTop: 0 }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                            Tanggal Lahir
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="24 Februari 1995" />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10, marginTop: 0 }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                            Usia
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="28 Tahun" />
                                    </View>
                                </View>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => handleCollapse(false)}
                            style={{ backgroundColor: '#205295', padding: 10 }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>
                                    Data Stunting
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{
                                borderColor: '#f4f4f4',
                                borderWidth: 3,
                                borderTopWidth: 0,
                                marginBottom: 10,
                            }}>
                            {!collapse && (
                                <View style={styles.container}>
                                    <View style={styles.row}>
                                        <View style={styles.celltext}>
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>

                                            </Text>
                                        </View>
                                        <View style={styles.cellcategory}>
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, textAlign: 'center' }}>
                                                Ya
                                            </Text>
                                        </View>
                                        <View style={styles.cellcategory}>
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, textAlign: 'center' }}>
                                                Tidak
                                            </Text>
                                        </View>
                                        <View style={styles.cellcategory}>
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, textAlign: 'center' }}>
                                                Verval
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.celltext}>
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginLeft: 10 }}>
                                                Status PUS
                                            </Text>
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton

                                                color='#000000'
                                                value="ya"
                                                status={statusPUS === 'ya' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusPUS('ya')}
                                                disabled={true}
                                                style={{ textAlign: 'center' }}
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="tidak"
                                                status={statusPUS === 'tidak' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusPUS('tidak')}
                                                disabled={true}
                                                s
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="verval"
                                                status={statusVerval === 'verval' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('verval')}
                                                disabled={true}
                                                style={styles.cellradio}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.celltext}>
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginLeft: 10 }}>
                                                Status Hamil
                                            </Text>
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="ya"
                                                status={statusHamil === 'ya' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusHamil('ya')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="tidak"
                                                status={statusHamil === 'tidak' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusHamil('tidak')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="verval"
                                                status={statusVerval === 'verval' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('verval')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.celltext}>
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginLeft: 10 }}>
                                                Terlalu Muda
                                            </Text>
                                            <Text style={{ fontStyle: 'italic', marginTop: 0, marginLeft: 10 }}>
                                                Umur istri &lt; 20 tahun
                                            </Text>

                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="ya"
                                                status={terlaluMuda === 'ya' ? 'checked' : 'unchecked'}
                                                onPress={() => setTerlaluMuda('ya')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="tidak"
                                                status={terlaluMuda === 'tidak' ? 'checked' : 'unchecked'}
                                                onPress={() => setTerlaluMuda('tidak')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="verval"
                                                status={statusVerval === 'verval' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('verval')}
                                                disabled={true}
                                            />
                                        </View>

                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.celltext}>
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginLeft: 10 }}>
                                                Terlalu Tua
                                            </Text>
                                            <Text style={{ fontStyle: 'italic', marginTop: 0, marginLeft: 10 }}>
                                                Umur istri &lt; 35-40 tahun
                                            </Text>

                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="ya"
                                                status={terlaluTua === 'ya' ? 'checked' : 'unchecked'}
                                                onPress={() => setTerlaluTua('ya')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="tidak"
                                                status={terlaluTua === 'tidak' ? 'checked' : 'unchecked'}
                                                onPress={() => setTerlaluTua('tidak')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="verval"
                                                status={statusVerval === 'verval' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('verval')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.celltext}>
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginLeft: 10 }}>
                                                Terlalu Dekat
                                            </Text>
                                            <Text style={{ fontStyle: 'italic', marginTop: 0, marginLeft: 10 }}>
                                                &lt; 2 tahun
                                            </Text>

                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="ya"
                                                status={terlaluDekat === 'ya' ? 'checked' : 'unchecked'}
                                                onPress={() => setTerlaluDekat('ya')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="tidak"
                                                status={terlaluDekat === 'tidak' ? 'checked' : 'unchecked'}
                                                onPress={() => setTerlaluDekat('tidak')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="verval"
                                                status={statusVerval === 'verval' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('verval')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.celltext}>
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginLeft: 10 }}>
                                                Terlalu Jauh
                                            </Text>
                                            <Text style={{ fontStyle: 'italic', marginTop: 0, marginLeft: 10 }}>
                                                &lt; 3 tahun
                                            </Text>
                                        </View>

                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="ya"
                                                status={terlaluBanyak === 'ya' ? 'checked' : 'unchecked'}
                                                onPress={() => setTerlaluBanyak('ya')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="tidak"
                                                status={terlaluBanyak === 'tidak' ? 'checked' : 'unchecked'}
                                                onPress={() => setTerlaluBanyak('tidak')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={styles.cell}>
                                            <RadioButton
                                                color='#000000'
                                                value="verval"
                                                status={statusVerval === 'verval' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('verval')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.cellinput} >
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                                Status Keluarga
                                            </Text>
                                            <TextInput style={{ backgroundColor: '#EEEEEE', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="Keluarga Baru" />
                                        </View>

                                        <View style={styles.cellinputradio}>
                                            <RadioButton
                                                color='#000000'
                                                value="verval"
                                                status={statusVerval === 'verval' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('verval')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.cellinput} >
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                                Kesertaan KB Modern
                                            </Text>
                                            <TextInput style={{ backgroundColor: '#EEEEEE', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="MAL" />
                                        </View>
                                        <View style={styles.cellinputradio}>
                                            <RadioButton
                                                color='#000000'
                                                value="verval"
                                                status={statusVerval === 'verval' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('verval')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.cellinput} >
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                                Sumber Air Minum Utama
                                            </Text>
                                            <TextInput style={{ backgroundColor: '#EEEEEE', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="Sumur Terlindungi" />
                                            <Text style={{ fontWeight: 'bold', color: 'green', fontSize: 16 }}>
                                                Layak
                                            </Text>
                                        </View>
                                        <View style={styles.cellinputradio}>
                                            <RadioButton
                                                color='#000000'
                                                value="verval"
                                                status={statusVerval === 'verval' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('verval')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.cellinput} >
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                                Memiliki Fasilitas Tempat BAB
                                            </Text>
                                            <TextInput style={{ backgroundColor: '#EEEEEE', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="MAL" />
                                            <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 16 }}>
                                                Tidak Layak
                                            </Text>
                                        </View>

                                        <View style={styles.cellinputradio}>
                                            <RadioButton
                                                color='#000000'
                                                value="verval"
                                                status={statusVerval === 'verval' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('verval')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.cellinput} >
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                                                Pendampingan oleh TPK
                                            </Text>
                                            <TextInput style={{ backgroundColor: '#EEEEEE', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="MAL" />
                                        </View>
                                        <View style={styles.cellinputradio}>
                                            <RadioButton
                                                color='#000000'
                                                value="verval"
                                                status={statusVerval === 'verval' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('verval')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50, borderRadius: 30 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('P31')}
                                style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderRadius: 10 }}>
                                <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                                <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 16 }}>Sebelumnya</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleSave()}
                                style={{ backgroundColor: '#54B435', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', marginLeft: 'auto', flexDirection: 'row', borderRadius: 10 }}>
                                <Text style={{ marginRight: 10, fontWeight: 'bold', color: 'white', fontSize: 16 }}>Simpan</Text>
                                <MaterialCommunityIcons name="content-save" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    </Block>
                </View>
            </ScrollView>
        </Block>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 60,
        // borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        paddingLeft: 12

    },

    cellcategory: {
        width: 60,
        // borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center'

    },
    celltext: {
        width: 160,
        // borderWidth: 1,
        borderColor: 'black',
    },
    cellradio: {
        textAlign: 'center',
        marginLeft: 10
    },
    cellinput: {
        width: 260,
        margin: 10,
        // borderWidth: 1,
        borderColor: 'black',
    },
    cellinputradio: {
        width: 60,
        // borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        paddingLeft: 12,
        paddingTop: 25

    },
});