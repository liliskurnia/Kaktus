import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import TambahDataKeluarga from '../TambahDataKeluarga';
import { RadioButton } from 'react-native-paper';

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

export default function P12() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [balita, setBalita] = React.useState('');
    const [umurBalita, setUmurBalita] = React.useState('');
    const [verval, setVerval] = React.useState('');

    return (
        <Block flex={1} style={{ backgroundColor: '#071952' }}>
            <View style={{ margin: 10 }} >
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
                        <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>Form Sasaran</Text>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>1.2</Text>
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
                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                            Apakah Ibu memiliki BALITA (Bayi dibawah lima tahun) ?
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="first"
                                status={balita === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setBalita('first')}
                            />
                            <Text style={{ marginTop: 8 }}>Ya</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="second"
                                status={balita === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => { setBalita('second'); setUmurBalita('') }}
                            />
                            <Text style={{ marginTop: 8 }}>Tidak</Text>
                        </View>
                    </View>
                    {balita === 'first' && (
                        <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginTop: 20 }}>
                            <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                Berapa umur BALITA Ibu ?
                            </Text>
                        </View>
                    )}
                    {balita === 'first' && (
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <RadioButton
                                    value="first"
                                    status={umurBalita === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => setUmurBalita('first')}
                                />
                                <Text style={{ marginTop: 8 }}>24 - 35 bulan </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <RadioButton
                                    value="second"
                                    status={umurBalita === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => setUmurBalita('second')}
                                />
                                <Text style={{ marginTop: 8 }}>36 - 59 bulan</Text>
                            </View>
                        </View>
                    )}
                    <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginTop: 20 }}>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
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
                            <Text style={{ marginTop: 8 }}>Ya</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="second"
                                status={verval === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setVerval('second')}
                            />
                            <Text style={{ marginTop: 8 }}>Tidak</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50,borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('P11')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row',borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={14} color="white" />
                            <Text style={{marginLeft:10, fontWeight:'bold', color:'white', fontSize:14}}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('P13')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', marginLeft: 'auto', flexDirection: 'row',borderRadius: 10}}>
                            <Text style={{marginRight:10, fontWeight:'bold', color:'white', fontSize:14}}>Selanjutnya</Text>
                            <MaterialCommunityIcons name="arrow-right" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                </Block>
            </View>
        </Block>
    )
}