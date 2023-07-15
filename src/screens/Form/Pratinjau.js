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
import { Block, Image,ModalSelect, Input } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';

export default function Pratinjau() {
    const navigation = useNavigation();
    const [statusPUS, setStatusPUS] = useState('ya');
    const [statusHamil, setStatusHamil] = useState('ya');
    const [terlaluMuda, setTerlaluMuda] = useState('tidak');
    const [terlaluTua, setTerlaluTua] = useState('tidak');
    const [terlaluDekat, setTerlaluDekat] = useState('ya');
    const [terlaluBanyak, setTerlaluBanyak] = useState('tidak');
    const [statusVerval, setStatusVerval] = useState('ya');
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
            <View style={{ margin: 10}} >
                <View style={{ alignItems: 'center', zIndex: 1 }}>
                    <Text style={{fontWeight:'bold', color:'white', fontSize:18}}>
                        Tambah Data Keluarga
                    </Text>
                </View>
            </View>
            <ScrollView>
                <View style={{ backgroundColor: '#EEEEEE', height: '100%', borderRadius: 30}}>
                    <Block
                        scroll
                        paddingHorizontal={sizes.sm}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ backgroundColor: '#fff', marginTop: 20, padding: 10, borderRadius: 10 }}>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>Form Pratinjau</Text>
                        <View
                            style={{
                                marginVertical: 10,
                                borderBottomColor: '#BABABA',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                flex: 1
                            }}
                        />
                        <TouchableOpacity onPress={() => handleCollapse(true)}
                            style={{ backgroundColor: '#205295', padding: 10 }}>
                            <View>
                                <Text style={{fontWeight:'bold', color:'white', fontSize:14}}>
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
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            Nama
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="Fulanah" />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10, marginTop: 0 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            NIK
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="1234567890987654" />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10, marginTop: 0 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            Hubungan dengan KK
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="Istri" />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10, marginTop: 0 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            Tanggal Lahir
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="24 Februari 1995" />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10, marginTop: 0 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
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
                                <Text style={{fontWeight:'bold', color:'white', fontSize:14}}>
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
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 10 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            Ya
                                        </Text>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14, marginLeft:25}}>
                                            Tidak
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, marginTop: 0, marginBottom: 0 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            Status PUS
                                        </Text>
                                        <View style={{ marginLeft: 153 }}>
                                            <RadioButton
                                                color='#000000'
                                                value="ya"
                                                status={statusPUS === 'ya' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusPUS('ya')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <RadioButton
                                                color='#000000'
                                                value="tidak"
                                                status={statusPUS === 'tidak' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusPUS('tidak')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, marginTop: 0, marginBottom: 0 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            Status Hamil
                                        </Text>
                                        <View style={{ marginLeft: 145 }}>
                                            <RadioButton
                                                color='#000000'
                                                value="ya"
                                                status={statusHamil === 'ya' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusHamil('ya')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <RadioButton
                                                color='#000000'
                                                value="tidak"
                                                status={statusHamil === 'tidak' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusHamil('tidak')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', margin: 10, marginTop: 0, marginBottom: 0 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                                Terlalu Muda
                                            </Text>
                                            <View style={{ marginLeft: 143 }}>
                                                <RadioButton
                                                    color='#000000'
                                                    value="ya"
                                                    status={terlaluMuda === 'ya' ? 'checked' : 'unchecked'}
                                                    onPress={() => setTerlaluMuda('ya')}
                                                    disabled={true}
                                                />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <RadioButton
                                                    color='#000000'
                                                    value="tidak"
                                                    status={terlaluMuda === 'tidak' ? 'checked' : 'unchecked'}
                                                    onPress={() => setTerlaluMuda('tidak')}
                                                    disabled={true}
                                                />
                                            </View>
                                        </View>
                                        <Text style={{ fontStyle: 'italic', marginTop: -10 }}>
                                            Umur istri &lt; 20 tahun
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', margin: 10, marginTop: 0, marginBottom: 0 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                                Terlalu Tua
                                            </Text>
                                            <View style={{ marginLeft: 153 }}>
                                                <RadioButton
                                                    color='#000000'
                                                    value="ya"
                                                    status={terlaluTua === 'ya' ? 'checked' : 'unchecked'}
                                                    onPress={() => setTerlaluTua('ya')}
                                                    disabled={true}
                                                />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <RadioButton
                                                    color='#000000'
                                                    value="tidak"
                                                    status={terlaluTua === 'tidak' ? 'checked' : 'unchecked'}
                                                    onPress={() => setTerlaluTua('tidak')}
                                                    disabled={true}
                                                />
                                            </View>
                                        </View>
                                        <Text style={{ fontStyle: 'italic', marginTop: -10 }}>
                                            Umur istri 35 - 40 tahun
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', margin: 10, marginTop: 0, marginBottom: 0 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                                Terlalu Dekat
                                            </Text>
                                            <View style={{ marginLeft: 142 }}>
                                                <RadioButton
                                                    color='#000000'
                                                    value="ya"
                                                    status={terlaluDekat === 'ya' ? 'checked' : 'unchecked'}
                                                    onPress={() => setTerlaluDekat('ya')}
                                                    disabled={true}
                                                />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <RadioButton
                                                    color='#000000'
                                                    value="tidak"
                                                    status={terlaluDekat === 'tidak' ? 'checked' : 'unchecked'}
                                                    onPress={() => setTerlaluDekat('tidak')}
                                                    disabled={true}
                                                />
                                            </View>
                                        </View>
                                        <Text style={{ fontStyle: 'italic', marginTop: -10 }}>
                                            &lt; 2 tahun
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', margin: 10, marginTop: 0, marginBottom: 0 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                                Terlalu Banyak
                                            </Text>
                                            <View style={{ marginLeft: 135 }}>
                                                <RadioButton
                                                    color='#000000'
                                                    value="ya"
                                                    status={terlaluBanyak === 'ya' ? 'checked' : 'unchecked'}
                                                    onPress={() => setTerlaluBanyak('ya')}
                                                    disabled={true}
                                                />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <RadioButton
                                                    color='#000000'
                                                    value="tidak"
                                                    status={terlaluBanyak === 'tidak' ? 'checked' : 'unchecked'}
                                                    onPress={() => setTerlaluBanyak('tidak')}
                                                    disabled={true}
                                                />
                                            </View>
                                        </View>
                                        <Text style={{ fontStyle: 'italic', marginTop: -10 }}>
                                            &gt; 3 tahun
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            Status Keluarga
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="Keluarga Baru" />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10, marginTop: 0 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            Kesertaan KB Modern
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="MAL" />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10, marginTop: 0 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            Sumber Air Minum Utama
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="Sumur Terlindungi" />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 10, marginTop: 0, marginBottom:0 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            Memiliki Fasilitas Tempat BAB
                                        </Text>
                                        <TextInput style={{ backgroundColor: '#EEEEEE', padding: 8, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} editable={false} placeholder="Jamban milik sendiri dengan leher angsa dan tangki septik/IPAL" />
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, margin:10, marginTop:0 }}>
                                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                            Status Verval
                                        </Text>
                                        <View style={{ marginLeft: 140 }}>
                                            <RadioButton
                                                color='#000000'
                                                value="ya"
                                                status={statusVerval === 'ya' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('ya')}
                                                disabled={true}
                                            />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <RadioButton
                                                color='#000000'
                                                value="tidak"
                                                status={statusVerval === 'tidak' ? 'checked' : 'unchecked'}
                                                onPress={() => setStatusVerval('tidak')}
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50,borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('P31')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row',borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={14} color="white" />
                            <Text style={{marginLeft:10, fontWeight:'bold', color:'white', fontSize:14}}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSave()}
                            style={{ backgroundColor: '#54B435', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', marginLeft: 'auto', flexDirection: 'row',borderRadius: 10}}>
                            <Text style={{marginRight:10, fontWeight:'bold', color:'white', fontSize:14}}>Simpan</Text>
                            <MaterialCommunityIcons name="content-save" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                    </Block>
                </View>
            </ScrollView>
        </Block>
    )
}