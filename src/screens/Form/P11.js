import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
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

export default function P11() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [baduta, setBaduta] = React.useState('');
    const [verval, setVerval] = React.useState('');
    const [umurBaduta, setUmurBaduta] = React.useState('');

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
                        <Text style={{fontWeight:'bold', color:'black', fontSize:18}}>Form Sasaran</Text>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:18}}>1.1</Text>
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
                            <Text style={{  marginTop: 10, fontSize:16  }}>Ya</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="second"
                                status={baduta === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => { setBaduta('second'); setUmurBaduta('') }}
                            />
                            <Text style={{  marginTop: 10, fontSize:16  }}>Tidak</Text>
                        </View>
                    </View>
                    {baduta === 'first' && (
                        <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginTop: 20 }}>
                            <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                                Berapa umur BADUTA Ibu ?
                            </Text>
                        </View>
                    )}
                    {baduta === 'first' && (
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <RadioButton
                                    value="first"
                                    status={umurBaduta === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => setUmurBaduta('first')}
                                />
                                <Text style={{  marginTop: 10, fontSize:16  }}>0 - 11 bulan </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <RadioButton
                                    value="second"
                                    status={umurBaduta === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => setUmurBaduta('second')}
                                />
                                <Text style={{  marginTop: 10, fontSize:16  }}>12 - 23 bulan</Text>
                            </View>
                        </View>
                    )}
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
                            <Text style={{  marginTop: 10, fontSize:16  }}>Ya</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="second"
                                status={verval === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setVerval('second')}
                            />
                            <Text style={{  marginTop: 10, fontSize:16  }}>Tidak</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50,borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('DataDiri')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row',borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                            <Text style={{marginLeft:10, fontWeight:'bold', color:'white', fontSize:16}}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('P12')}
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