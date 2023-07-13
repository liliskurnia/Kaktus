import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Block, Image, Text, ModalSelect, Input } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';

export default function P11() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [baduta, setBaduta] = React.useState('first');
    const [verval, setVerval] = React.useState('first');
    const [umurBaduta, setUmurBaduta] = React.useState('second');

    return (
        <Block flex={1} style={{ backgroundColor: '#068FFF' }}>
            <View style={{ margin: 10, marginTop: 30 }} >
                <View style={{ alignItems: 'center', zIndex: 1 }}>
                    <Text h5 white bold>
                        Tambah Data Keluarga
                    </Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#EEEEEE', height: '100%', borderRadius: 30, marginTop: 20 }}>
                <Block
                    scroll
                    paddingHorizontal={sizes.sm}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ backgroundColor: '#fff', marginTop: 20, padding: 10, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                        <Text bold>Form Sasaran</Text>
                        <Text bold>1.1</Text>
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
                        <Text>
                            Apakah Ibu memiliki BADUTA (Bayi dibawah dua tahun) ?
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="first"
                                status={baduta === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setBaduta('first')}
                            />
                            <Text style={{ marginTop: 8 }}>Ya</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="second"
                                status={baduta === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setBaduta('second')}
                            />
                            <Text style={{ marginTop: 8 }}>Tidak</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginTop:20 }}>
                        <Text>
                            Jika YA, berapa umur BADUTA Ibu ?
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="first"
                                status={umurBaduta === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setUmurBaduta('first')}
                            />
                            <Text style={{ marginTop: 8 }}>0 - 11 bulan </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="second"
                                status={umurBaduta === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setUmurBaduta('second')}
                            />
                            <Text style={{ marginTop: 8 }}>12 - 23 bulan</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginTop:20 }}>
                        <Text>
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('TambahDataKeluarga')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, idth: '45%', justifyContent: 'flex-start', alignSelf: 'flex-start', flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="arrow-left" size={18} color="white" />
                            <Text white bold style={{ marginLeft: 5 }}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('P12')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, idth: '45%', justifyContent: 'flex-end', alignSelf: 'flex-end', marginLeft: 'auto', flexDirection: 'row' }}>
                            <Text white bold style={{ marginRight: 5 }}>Selanjutnya</Text>
                            <MaterialCommunityIcons name="arrow-right" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                </Block>
            </View>
        </Block>
    )
}