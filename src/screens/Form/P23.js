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

export default function P23() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [jamban, setJamban] = React.useState('');
    const [selectedJamban, setSelectedJamban] = useState('');
    const [verval, setVerval] = React.useState('');
    const [layak, setLayak] = React.useState('');

    useEffect(() => {
        function determineLayakStatus() {
            switch (selectedJamban) {
                case 'pribadi':
                    setLayak('first');
                    break;
                case 'mck':
                case 'lainnya':
                case 'tidak':
                    setLayak('second');
                    break;
                default:
                    setLayak('');
            }
        }

        determineLayakStatus();
    }, [selectedJamban]);

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
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Form Penapisan</Text>
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
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                            Memiliki fasilitas tempat Buang Air Besar (BAB)?
                        </Text>
                    </View>
                    <View style={{ borderWidth: 1, borderRadius: 5, margin: 10, borderColor: '#B2B2B2' }}>
                        <Picker
                            selectedValue={selectedJamban}
                            onValueChange={(itemValue) => setSelectedJamban(itemValue)}
                            numberOfLines={2}
                        >
                            <Picker.Item label="Pilih jenis jamban" value="" />
                            <Picker.Item label="1. Ya, milik sendiri dengan leher angsa dan tangki septik/IPAL" value="pribadi" />
                            <Picker.Item label="2. Ya, MCK komunal dengan leher angsa dan tangki septik/IPAL" value="mck" />
                            <Picker.Item label="3. Ya, Lainnya" value="lainnya" />
                            <Picker.Item label="4. Tidak Ada" value="tidak" />
                        </Picker>
                    </View>
                    <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                            Layak/Tidak Layak
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="first"
                                status={layak === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setLayak('first')}
                                disabled={true}
                            />
                            <Text style={{ marginTop: 10, fontSize: 16 }}>Layak</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="second"
                                status={layak === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setLayak('second')}
                                disabled={true}
                            />
                            <Text style={{ marginTop: 10, fontSize: 16 }}>Tidak Layak</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50, borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('P22')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                            <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 16 }}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('P31')}
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