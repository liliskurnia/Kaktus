import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import TambahDataKeluarga from '../TambahDataKeluarga';
import { RadioButton } from 'react-native-paper';

import {
    TouchableOpacity,
    Text,
    View,
    Alert,
    StyleSheet,
    TextInput
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Block, Image, ModalSelect, Input } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';

export default function P13() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [hamil, setHamil] = React.useState('');
    const [verval, setVerval] = React.useState('');
    const [usiaKehamilan, setUsiaKehamilan] = useState('');

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
                        <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>Form Sasaran</Text>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>1.3</Text>
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
                        <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>Apakah Ibu saat ini sedang hamil?</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="first"
                                status={hamil === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setHamil('first')}
                            />
                            <Text style={{ marginTop: 8 }}>Ya</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="second"
                                status={hamil === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setHamil('second');
                                    setUsiaKehamilan('');
                                }}
                            />
                            <Text style={{ marginTop: 8 }}>Tidak</Text>
                        </View>
                    </View>
                    {(hamil === 'first') ?
                        <>
                            <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginTop: 20 }}>
                                <Text style={{fontWeight:'bold', color:'black', fontSize:14}}>
                                    Jika YA, berapa usia kehamilan Ibu ?
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Text style={{ marginTop: 10 }}>Usia kehamilan</Text>
                                <Input style={{ paddingLeft: 10, paddingRight: 10, width: '40%' }}>
                                </Input>
                                <Text style={{ marginTop: 10 }}>
                                    Minggu
                                </Text>
                            </View>
                        </>
                        :
                        <></>
                    }
                    <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginTop:20 }}>
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
                        <TouchableOpacity onPress={() => navigation.navigate('P12')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row',borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={14} color="white" />
                            <Text style={{marginLeft:10, fontWeight:'bold', color:'white', fontSize:14}}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('P21')}
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