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
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Form Sasaran</Text>
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
                    <View style={{ backgroundColor: '#EEEEEE', padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>Apakah Ibu saat ini sedang hamil?</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="first"
                                status={hamil === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setHamil('first')}
                            />
                            <Text style={{ marginTop: 10, fontSize: 16 }}>Ya</Text>
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
                            <Text style={{ marginTop: 10, fontSize: 16 }}>Tidak</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50, borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('DataDiri')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                            <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 16 }}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate(hamil === 'first' ? 'P22' : 'P21')}
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