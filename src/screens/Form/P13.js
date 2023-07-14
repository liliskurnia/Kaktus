import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import TambahDataKeluarga from '../TambahDataKeluarga';
import { RadioButton } from 'react-native-paper';

import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
    TextInput
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Block, Image, Text, ModalSelect, Input } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';

export default function P13() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [hamil, setHamil] = React.useState('');
    const [verval, setVerval] = React.useState('');
    const [usiaKehamilan, setUsiaKehamilan] = useState('');

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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text bold>Form Sasaran</Text>
                        <Text bold>1.3</Text>
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
                        <Text>Apakah Ibu saat ini sedang hamil?</Text>
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
                                <Text>
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
                        <TouchableOpacity onPress={() => navigation.navigate('P12')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center',flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="arrow-left" size={18} color="white" />
                            <Text white bold style={{ marginLeft: 5 }}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate(hamil === 'first' ? 'P22' : 'P21')}
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