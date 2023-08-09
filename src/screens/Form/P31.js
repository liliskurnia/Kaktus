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
import { Block, Image,ModalSelect, Input } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';

export default function P31() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [selectedTpk, setSelectedTpk] = useState('');
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
                        <Text style={{fontWeight:'bold', color:'black', fontSize:18}}>Form Kesejahteraan</Text>
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
                        <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                            Pendampingan oleh TPK ?
                        </Text>
                    </View>
                    <View style={{ borderWidth: 1, borderRadius: 5, margin: 10, borderColor: '#B2B2B2' }}>
                        <Picker
                            selectedValue={selectedTpk}
                            onValueChange={(itemValue) => setSelectedTpk(itemValue)}
                            numberOfLines={2}
                        >
                            <Picker.Item label="Pilih jenis pendampingan" value="" />
                            <Picker.Item label="1. Ya, fasilitas rujukan" value="rujukan" />
                            <Picker.Item label="2. Ya, fasilitas bansos" value="bansos" />
                            <Picker.Item label="3. Ya, fasilitas KIE" value="kie" />
                            <Picker.Item label="4. Ya, surveilans melalui elsimil" value="elsimil" />
                            <Picker.Item label="5. Ya, surveilans melalui EPPGBM" value="eppgbm" />
                            <Picker.Item label="6. Ya, Bapak Asuh Anak Stunting (BAAS)" value="baas" />
                            <Picker.Item label="7. Ya, fasilitasi Pemberian Makanan Tambahan (PMT)" value="pmt" />
                            <Picker.Item label="6. Tidak ada" value="tidakAada" />
                        </Picker>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50,borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('P23')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row',borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                            <Text style={{marginLeft:10, fontWeight:'bold', color:'white', fontSize:16}}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Pratinjau')}
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