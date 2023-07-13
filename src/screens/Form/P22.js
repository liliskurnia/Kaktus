import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

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

export default function P22() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [airMinum, setAirMinum] = React.useState('');
    const [selectedAirMinum, setSelectedAirMinum] = useState('');
    const [verval, setVerval] = React.useState('');

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
                        <Text bold>Form Penapisan</Text>
                        <Text bold>2.2</Text>
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
                            Apakah keluarga mempunyai  sumber air minum yang utama yang layak ?
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="first"
                                status={airMinum === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setAirMinum('first')}
                            />
                            <Text style={{ marginTop: 8 }}>Ya</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton
                                value="second"
                                status={airMinum === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setAirMinum('second')}
                            />
                            <Text style={{ marginTop: 8 }}>Tidak</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginTop: 20 }}>
                        <Text>
                            Darimana sumber air minum utama keluarga Anda ?
                        </Text>
                    </View>
                    <View style={{ borderWidth: 1, borderRadius: 5, margin: 10, borderColor: '#B2B2B2' }}>
                        <Picker
                            selectedValue={selectedAirMinum}
                            onValueChange={(itemValue) => setSelectedAirMinum(itemValue)}
                        >
                            <Picker.Item label="Pilih" value="" />
                            <Picker.Item label="1. Air Kemasan/Isi Ulang" value="kemasan" />
                            <Picker.Item label="2. Ledeng/PAM" value="ledeng" />
                            <Picker.Item label="3. Sumur Bor/Pompa" value="sumurBor" />
                            <Picker.Item label="4. Sumur Terlindung" value="sumurTerlindung" />
                            <Picker.Item label="5. Sumur Tak Terlindung" value="sumurTakTerlindung" />
                            <Picker.Item label="6. Mata Air Terlindung" value="mataAirTerlindung" />
                            <Picker.Item label="7. Mata Air Tak Terlindung" value="mataAirTakTerlindung" />
                            <Picker.Item label="8. Air Permukaan (sungai/danau/waduk/kolam/irigasi)" value="airPermukaan" />
                            <Picker.Item label="9. Air Hujan" value="airHujan" />
                            <Picker.Item label="10. Lainnya" value="lainnya" />
                        </Picker>
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
                        <TouchableOpacity onPress={() => navigation.navigate('P21')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center',flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="arrow-left" size={18} color="white" />
                            <Text white bold style={{ marginLeft: 5 }}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('P23')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center',flexDirection: 'row' }}>
                            <Text white bold style={{ marginRight: 5 }}>Selanjutnya</Text>
                            <MaterialCommunityIcons name="arrow-right" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                </Block>
            </View>
        </Block>
    )
}