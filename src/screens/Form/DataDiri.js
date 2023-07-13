import React, { useCallback, useEffect, useState } from 'react';
import {
    Platform,
    View,
    Alert,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text as TextRn,
    ActivityIndicator,
    Linking,
    ImageBackground
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Block, Button, Input, Image, Text, Checkbox } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';

export default function DataDiri() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();

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
                    <Text bold>Form Data Diri</Text>
                    <View
                        style={{
                            marginVertical: 10,
                            borderBottomColor: '#BABABA',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            flex: 1
                        }}
                    />
                    <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                        <Text>
                            Nama Anggota Keluarga
                        </Text>
                        <Input style={{ width: 310 }}>
                        </Input>
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                        <Text>
                            NIK
                        </Text>
                        <Input style={{ width: 310 }}>
                        </Input>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                            <Text>
                                Jenis Kelamin 
                            </Text>
                            <Input style={{ width: 150 }}>
                            </Input>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text>
                                Tanggal Lahir
                            </Text >
                            <Input style={{ width: 150 }}>
                            </Input>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                            <Text>
                                Status Hubungan 
                            </Text>
                            <Input style={{ width: 150 }}>
                            </Input>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text>
                               Kepesertaan JKN
                            </Text >
                            <Input style={{ width: 150 }}>
                            </Input>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginBottom: 50 }}>
                        <Text>
                            Mutasi Anggota Keluarga
                        </Text>
                        <Input style={{ width: 310, backgroundColor:'#EEEEEE' }}>
                        </Input>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50,borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('TambahDataKeluarga')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, idth: '45%', justifyContent: 'flex-start', alignSelf: 'flex-start', flexDirection: 'row',borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={18} color="white" />
                            <Text white bold style={{ marginLeft: 5 }}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('P13')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, idth: '45%', justifyContent: 'flex-end', alignSelf: 'flex-end', marginLeft: 'auto', flexDirection: 'row',borderRadius: 10}}>
                            <Text white bold style={{ marginRight: 5 }}>Selanjutnya</Text>
                            <MaterialCommunityIcons name="arrow-right" size={18} color="white" />
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