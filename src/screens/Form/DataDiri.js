import React, { useCallback, useEffect, useState } from 'react';
import {
    Platform,
    View,
    Alert,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text ,
    ActivityIndicator,
    Linking,
    ImageBackground
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Block, Button, Input, Image, Checkbox } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';

export default function DataDiri() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();

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
                    <Text style={{fontWeight:'bold', color:'black', fontSize:18}}>Form Data Diri</Text>
                    <View
                        style={{
                            marginVertical: 10,
                            borderBottomColor: '#BABABA',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            flex: 1
                        }}
                    />
                    <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                            Nama Anggota Keluarga
                        </Text>
                        <TextInput style={{ padding: 8, width: 310, borderWidth:1, borderRadius:5, borderColor:'#B7B7B7' }} placeholder="Fulan" />
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                            NIK
                        </Text>
                        <TextInput style={{ padding: 8, width: 310, borderWidth:1, borderRadius:5, borderColor:'#B7B7B7' }} placeholder="1234567890987654" />
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                            <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                                Jenis Kelamin 
                            </Text>
                            <TextInput style={{ padding: 8, width: 150, borderWidth:1, borderRadius:5, borderColor:'#B7B7B7' }} placeholder="Laki-laki" />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                                Tanggal Lahir
                            </Text >
                            <TextInput style={{ padding: 8, width: 150, borderWidth:1, borderRadius:5, borderColor:'#B7B7B7' }} placeholder="DD/MM/YYYY" />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                            <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                                Status Hubungan 
                            </Text>
                            <TextInput style={{ padding: 8, width: 150, borderWidth:1, borderRadius:5, borderColor:'#B7B7B7' }} placeholder="Kepala Keluarga" />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                               Kepesertaan JKN
                            </Text >
                            <TextInput style={{ padding: 8, width: 150, borderWidth:1, borderRadius:5, borderColor:'#B7B7B7' }} placeholder="BPJS" />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 50 }}>
                        <Text style={{fontWeight:'bold', color:'black', fontSize:16}}>
                            Mutasi Anggota Keluarga
                        </Text>
                        <TextInput style={{ padding: 8, width: 310, backgroundColor: '#EEEEEE', borderWidth:1, borderRadius:5, borderColor:'#B7B7B7' }} editable={false} placeholder="Keluarga Baru" />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50,borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('TambahDataKeluarga')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row',borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                            <Text style={{marginLeft:10, fontWeight:'bold', color:'white', fontSize:16}}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('P11')}
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

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        marginBottom: 20,
        flexDirection: 'column',
        width: '100%',
    },
    headerLayout: {
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#ec3337',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        height: 82,
    },
    content: {
        backgroundColor: '#2369AF',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        margin: 20,
        marginBottom: 0,
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#2369AF',
        marginBottom: 20,
        marginTop: 10,
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#BABABA',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    picker: {
        height: 40,
    },
});