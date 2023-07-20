import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import {
    TouchableOpacity,
    Text,
    View,
    Alert,
    StyleSheet
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Block, Image, ModalSelect, Input } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';

export default function P21() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [kb, setKb] = React.useState('');
    const [selectedKb, setSelectedKb] = useState('');
    const [verval, setVerval] = React.useState('');

    return (
        <Block flex={1} style={{ backgroundColor: '#071952' }}>
            <View style={{ margin: 10}} >
                <View style={{ alignItems: 'center', zIndex: 1 }}>
                    <Text style={{fontWeight:'bold', color:'white', fontSize:18}}>
                        Tambah Data Keluarga
                    </Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#EEEEEE', height: '100%', borderRadius: 30}}>
                <Block
                    scroll
                    paddingHorizontal={sizes.sm}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ backgroundColor: '#fff', marginTop: 20, padding: 10, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:18}}>Form Penapisan</Text>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:18}}>2.1</Text>
                    </View>
                    <View
                        style={{
                            marginVertical: 10,
                            borderBottomColor: '#BABABA',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            flex: 1
                        }}
                    />
                    <View style={{ backgroundColor: '#EEEEEE', padding: 10 }}>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                            Apakah Ibu menggunakan KB modern ?
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="first"
                                status={kb === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setKb('first')}
                            />
                            <Text style={{  marginTop: 10, fontSize:16 }}>Ya, saya menggunakan KB modern</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="second"
                                status={kb === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => {setKb('second'); setSelectedKb('')}}
                            />
                            <Text style={{  marginTop: 10, fontSize:16 }}>Tidak/bukan peserta KB</Text>
                        </View>
                    </View>
                    {(kb === 'first') ?
                        <>
                            <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginTop: 20 }}>
                                <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                                    Jika YA, jenis KB apa yang Ibu gunakan ?
                                </Text>
                            </View>
                            <View style={{ borderWidth: 1, borderRadius: 5, margin: 10, borderColor: '#B2B2B2' }}>
                                <Picker
                                    selectedValue={selectedKb}
                                    onValueChange={(itemValue) => setSelectedKb(itemValue)}
                                >
                                    <Picker.Item label="Pilih" value="" />
                                    <Picker.Item label="1. MOW/Steril Wanita" value="mow" />
                                    <Picker.Item label="2. MOP/Steril Pria" value="mop" />
                                    <Picker.Item label="3. IUD/Spiral/AKDR" value="spiral" />
                                    <Picker.Item label="4. Implant/Susuk" value="susuk" />
                                    <Picker.Item label="5. Suntik" value="suntik" />
                                    <Picker.Item label="6. Pil" value="pil" />
                                    <Picker.Item label="7. Kondom" value="kondom" />
                                    <Picker.Item label="8. MAL" value="mal" />
                                    <Picker.Item label="9. Tradisional" value="tradisional" />
                                </Picker>
                            </View>
                        </>
                        :
                        <></>
                    }
                    <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginTop: 20 }}>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                            Verval
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="first"
                                status={verval === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setVerval('first')}
                            />
                            <Text style={{  marginTop: 10, fontSize:16 }}>Ya</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="second"
                                status={verval === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setVerval('second')}
                            />
                            <Text style={{  marginTop: 10, fontSize:16 }}>Tidak</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50,borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('P13')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row',borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                            <Text style={{marginLeft:10, fontWeight:'bold', color:'white', fontSize:16}}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('P22')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', marginLeft: 'auto', flexDirection: 'row',borderRadius: 10}}>
                            <Text style={{marginRight:10, fontWeight:'bold', color:'white', fontSize:16}}>Selanjutnya</Text>
                            <MaterialCommunityIcons name="arrow-right" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </Block>
            </View>
        </Block>
    )
}