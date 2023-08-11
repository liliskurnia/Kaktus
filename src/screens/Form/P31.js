import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import {
    TouchableOpacity,
    Text,
    View,
    Alert,
    StyleSheet,
    Modal,
    StatusBar,
    FlatList,
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Block, Image, ModalSelect, Input } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';

export default function P31() {
    const navigation = useNavigation();
    const { assets, colors, gradients, sizes } = useTheme();
    const [selectedTpk, setSelectedTpk] = useState('');
    const [verval, setVerval] = React.useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const listTPK = [
        {value:"1", label: "1. Ya, fasilitasi rujukan"},
        {value:"2", label: "2. Ya, fasilitasi bansos"},
        {value:"3", label: "3. Ya, fasilitasi KIE"},
        {value:"4", label: "4. Ya, surveilans melalui elsimil"},
        {value:"5", label: "5. Ya, surveilans melalui EPPGBM"},
        {value:"6", label: "6. Ya, Bapak Asuh Anak Stunting (BAAS)"},
        {value:"7", label: "7. Ya, fasilitasi Pemberian Makanan Tambahan (PMT)"},
        {value:"8", label: "8. Tidak ada"}

    ]
    const listTPK2 = ["1. Ya, fasilitasi rujukan","2. Ya, fasilitasi bansos","3. Ya, fasilitasi KIE",
    "4. Ya, surveilans melalui elsimil","5. Ya, surveilans melalui EPPGBM","6. Ya, Bapak Asuh Anak Stunting (BAAS)","7. Ya, fasilitasi Pemberian Makanan Tambahan (PMT)","8. Tidak ada"]


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        // setSelectedItems(selectedItems.find((el) => el === "8. Tidak ada") ? selectedItems : []);
        // console.log(selectedItems.find((el) => el === "8. Tidak ada"))
      }, [selectedItems]);

    const toggleItemSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));

        } else {
            // console.log(selectedItems,'ellllllllllllse')
            setSelectedItems([...selectedItems, item]);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

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
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Form Kesejahteraan</Text>
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
                            Pendampingan oleh TPK ?
                        </Text>
                    </View>
                    <View style={{ borderWidth: 1, borderRadius: 5, margin: 10, borderColor: '#B2B2B2' }}>
                        {/* <Picker
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
                        </Picker> */}

                        <TouchableOpacity
                            style={{
                                padding: 10, width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7', float: 'left'
                            }}
                            onPress={toggleModal}

                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                <Text>{selectedItems.join(', ') || 'Pilih Pendamping TPK'}</Text>
                                <Ionicons name="caret-down" size={14} color="black" />
                            </View>

                        </TouchableOpacity>
                    </View>

                    <Modal
                        visible={isModalVisible}
                        animationType="slide"
                        onRequestClose={toggleModal}
                        transparent
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalTitle}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }} >
                                        Pilih Jenis Pendampingan
                                    </Text>
                                    <TouchableOpacity onPress={() => closeModal()} >
                                        <MaterialCommunityIcons name="window-close" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={listTPK2}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => toggleItemSelection(item)}
                                            style={{
                                                padding: 15,
                                                backgroundColor: selectedItems.includes(item) ? 'lightblue' : 'white',
                                                borderBottomWidth: 1,
                                                borderBottomColor: 'black',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text>{item}</Text>
                                            
                                        </TouchableOpacity>
                                    )}
                                    
                                    keyExtractor={(item) => item}
                                    extraData={selectedItems}
                                />
                            </View>
                        </View>
                    </Modal>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50, borderRadius: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('P23')}
                            style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderRadius: 10 }}>
                            <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                            <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 16 }}>Sebelumnya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Pratinjau')}
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
    dropdown: {
      width: 310,
      height: 47,
    },
    dropdownText: {
  
    },
    dropdownChoose: {
      width: 170,
      height: 45,
      fontSize: 15
    },
  
    dropdownChooseCore: {
      width: 100,
      height: 45,
      fontSize: 15
    },
    modalTitle: {
      margin: 20,
      marginBottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    input: {
      padding: 10, width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7', float: 'left'
    },
    boxmodel: {
      backgroundColor: '#dedede',
      borderRadius: 15,
      paddingBottom: 10
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end', // Atur justifyContent ke 'flex-end' untuk mendorong modal ke bawah
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      borderRadius: 20,
      backgroundColor: 'white',
      height: '70%', // Atur tinggi modal menjadi 50% dari tinggi layar
      width: '100%',
      borderBottomEndRadius: 0,
      borderBottomStartRadius: 0
    },
    yearItem: {
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      marginVertical: 5,
      marginHorizontal: 30,
      borderRadius: 5,
      fontSize: 16
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 30,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
    },
    item: {
      backgroundColor: '#efefef',
      padding: 5,
      marginVertical: 8,
      borderRadius: 10
    },
    header: {
      fontSize: 18,
      backgroundColor: '#fff',
      fontWeight: 'bold'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    slide: {
      width: 300,
      height: 150,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    paginationContainer: {
      position: 'absolute',
      bottom: -20,
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(0, 0, 0, 0.92)',
    },
    paginationInactiveDot: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    circleBody: {
      width: 85,
      alignItems: 'center',
    },
    circleMenu: {
      width: 60,
      height: 60,
      backgroundColor: '#B70404',
      borderWidth: 1,
      borderColor: '#f4f4f4',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleMenu1: {
      width: 60,
      height: 60,
      backgroundColor: '#E02828',
      borderWidth: 1,
      borderColor: '#f4f4f4',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleMenuTouch: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageCarousel: {
      flex: 1,
      paddingVertical: 20,
      borderRadius: 12,
    },
    textSubTitleCarousel: {
      fontSize: 19,
      fontFamily: 'poppins-regular',
    },
    textSubTitleCarouselWhite: {
      fontSize: 19,
      fontFamily: 'poppins-regular',
      color: 'white',
    },
    textTitleCarousel: {
      fontSize: 22,
      fontFamily: 'poppins-bold',
    },
    textCountryCarousel: {
      fontFamily: 'poppins-bold',
      fontSize: 24,
      lineHeight: 40,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      marginTop: -32,
      zIndex: 1,
      borderBottomWidth: 3,
      borderBottomColor: '#FF6961',
    },
    containerpicker: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    picker: {
      width: 200,
      backgroundColor: 'white',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'gray',
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    selectedText: {
      marginTop: 16,
    },
  });