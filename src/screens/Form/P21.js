import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

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
    const [selectedKb, setSelectedKb] = useState('');
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
                            Jenis KB apa yang Ibu gunakan ?
                        </Text>
                    </View>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={selectedKb}
                            onValueChange={(itemValue) => setSelectedKb(itemValue)}
                        >
                            <Picker.Item label="Pilih jenis KB" value="" />
                            <Picker.Item label="0. Bukan peserta KB" value="bukanKb" />
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50, borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('P13')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                            <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 16 }}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('P22')}
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

const styles = StyleSheet.create({
    picker: {
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        borderColor: '#B2B2B2'
    },
});