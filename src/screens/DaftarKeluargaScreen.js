import React, { useCallback, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Alert,
  StyleSheet,
  SectionList,
  ScrollView,
  StatusBar,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { Block, Image, ModalSelect, Input } from '../components';
import { useData, useTheme, useTranslation } from '../hooks';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function DaftarKeluargaScreen() {

  const { assets, colors, gradients, sizes } = useTheme();
  const [showData, setShowData] = useState(false);
  const [getData, setGetData] = useState([]);

  const [showSummary, setShowSummary] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [showDetail, setShowDetail] = useState(true);
  const [showBalita, setShowBalita] = useState(false);
  const [showBaduta, setShowBaduta] = useState(false);
  const [showHamil, setShowHamill] = useState(false);
  const [showPUS, setShowPUS] = useState(false);
  const [showKeluarga, setShowKeluarga] = useState(false);
  const [showKRS, setShowKRS] = useState(false);
  const [showVERVAL, setShowVERVAL] = useState(false);
  const [selectedBalita, setSelectedBalita] = useState('');
  const [selectedBaduta, setSelectedBaduta] = useState('');
  const [selectedHamil, setSelectedHamil] = useState('');
  const [selectedPUS, setSelectedPUS] = useState('');
  const [selectedKeluarga, setSelectedKeluarga] = useState('');
  const [selectedKRS, setSelectedKRS] = useState('');
  const [selectedVERVAL, setSelectedVERVAL] = useState('');


  // const [additionalFilter, setadditionalFilter] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleLanjutan, setModalVisibleLanjutan] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [page, setPage] = useState(1);
  const [maxpage, setMaxpage] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedChoose, setSelectedChoose] = useState('');
  const [selectedChooseCore, setSelectedChooseCore] = useState('');
  const [Choose, setChoose] = useState([
    { value: "baduta", label: "Baduta" },
    { value: "balita", label: "Balita" },
    { value: "statusHamil", label: "Status Hamil" },
    { value: "statusPus", label: "Status PUS" },
    { value: "statusKeluarga", label: "Status Keluarga" },
    { value: "statusKrs", label: "Status KRS" },
    { value: "statusVerval", label: "Status Verval" },
  ]);

  const months = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
  ];



  const handleMonthChange = (itemValue) => {
    setSelectedMonth(itemValue);
  };

  const handleBadutaChange = (itemValue) => {
    setSelectedBaduta(itemValue);
  };
  const handleBalitaChange = (itemValue) => {
    setSelectedBalita(itemValue);
  };
  const handleHamilChange = (itemValue) => {
    setSelectedHamil(itemValue);
  };
  const handleKeluargaChange = (itemValue) => {
    setSelectedKeluarga(itemValue);
  };
  const handlePUSChange = (itemValue) => {
    setSelectedPUS(itemValue);
  };
  const handleKRSChange = (itemValue) => {
    setSelectedKRS(itemValue);
  };
  const handleVERVALChange = (itemValue) => {
    setSelectedVERVAL(itemValue);
  };

  const handleChooseChange = (itemValue) => {
    setSelectedChoose(itemValue);

  };
  const handleChooseCoreChange = (itemValue) => {
    setSelectedChooseCore(itemValue);

  };


  const closeModal = () => {
    setModalVisible(false);
  };
  const closeModalLanjutan = () => {
    setModalVisibleLanjutan(false);
  };

  // Buat daftar tahun yang ingin ditampilkan (misalnya dari tahun 1950 hingga tahun ini)
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 2021; year--) {
    years.push(year.toString());
  }

  const Lanjutan = ["Baduta", "Balita", "Status Hamil", "Status PUS", "Status Keluarga", "Status KRS", "Status Verval"]

  // Fungsi untuk menampilkan modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalLanjutan = () => {
    setModalVisibleLanjutan(!isModalVisibleLanjutan);
  };

  const [selectedItems, setSelectedItems] = useState([]);


  useEffect(() => {
    setShowBaduta(selectedItems.find((el) => el === 'Baduta') === undefined ? false : true);
    setShowBalita(selectedItems.find((el) => el === 'Balita') === undefined ? false : true);
    setShowHamill(selectedItems.find((el) => el === 'Status Hamil') === undefined ? false : true);
    setShowPUS(selectedItems.find((el) => el === 'Status PUS') === undefined ? false : true);
    setShowKeluarga(selectedItems.find((el) => el === 'Status Keluarga') === undefined ? false : true);
    setShowKRS(selectedItems.find((el) => el === 'Status KRS') === undefined ? false : true);
    setShowVERVAL(selectedItems.find((el) => el === 'Status Verval') === undefined ? false : true);
  }, [selectedItems, page]);

  const toggleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));

    } else {
      // console.log(selectedItems,'ellllllllllllse')
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Fungsi untuk mengatur tahun terpilih saat pengguna memilih item
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    toggleModal();
  };

  // Fungsi untuk merender item tahun
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.yearItem}
        onPress={() => handleYearSelect(item)}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleDetail = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };




  const data = [
    { imageUrl: require('../assets/images/stunting1.jpg') },
    { imageUrl: require('../assets/images/stunting6.png') },
    { imageUrl: require('../assets/images/stunting7.jpg') },
  ];

  const DATA = [
    {
      title: 'Data Keluarga',
      data: ['Anggota 1', 'Anggota 2', 'Anggota 3'],
    },

  ];
  const navigation = useNavigation();

  const [activeSlide, setActiveSlide] = React.useState(0);

  // const renderItem = ({ item }) => {
  //   return (
  //     <View style={styles.slide}>
  //       <Image source={item.imageUrl} style={styles.image} />
  //     </View>
  //   );
  // };

  const handleSearch = useCallback(async () => {


    console.log(page)
    try {
      setShowData(true);
      setShowSummary(false);

      const http = 'https://newsiga-modul-stunting-api.bkkbn.go.id/siga/stunting/';
      const response = await axios.get(`${http}getDetail?bulan=8&tahun=2023&page=${page}&recordPerPage=10&idProvinsi=36&idKabupaten=331&idKecamatan=2985&idKelurahan=30028`);
      console.log(response.data.totalRecord)
      setMaxpage(response.data.totalRecord)
      setGetData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [page]);

  const handleNext = useCallback(() => {
    setPage((page) => Math.min(page + 1, maxpage))
  }, []);

  useEffect(() => {
    handleSearch();
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  const modallanjutan = () => {
    setModalVisibleLanjutan(!isModalVisibleLanjutan);

  }

  const next = () => {
    setShowData(false);
    setShowSummary(true);
  }

  const back = () => {
    setShowData(true);
    setShowSummary(false);
  }

  const handleEdit = (e, row) => {
    Alert.alert('Edit', 'Anda akan melakukan edit data?', [
      {
        text: 'Tidak',
        style: 'cancel',
      },
      {
        text: 'YA',
        onPress: async () => {
          navigation.navigate('EditDataKeluarga', { data: row });
        }
      }
    ])
  }

  const handleDelete = () => {
    Alert.alert('Hapus', 'Anda yakin akan menghapus data?', [
      {
        text: 'Tidak',
        style: 'cancel',
      },
      {
        text: 'YA',
        onPress: async () => {
          Alert.alert('Data berhasil dihapus')
        }
      }
    ])
  }

  return (
    <Block flex={1} style={{ backgroundColor: '#071952' }}>
      <View style={{ margin: 10 }} >
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{ marginTop: 7, zIndex: 999 }}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginTop: -20, zIndex: 1 }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
            Daftar Keluarga
          </Text>
        </View>
      </View>

      <View style={{ backgroundColor: '#EEEEEE', height: 675, borderRadius: 30, borderBottomEndRadius: 0, borderBottomStartRadius: 0 }}>

        <ScrollView>
          <Block
            scroll
            paddingHorizontal={sizes.sm}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ backgroundColor: '#fff', marginTop: 20, padding: 10, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Pencarian</Text>
              <TouchableOpacity onPress={toggleSearch}>
                {showSearch ? (
                  <MaterialCommunityIcons name="chevron-up" size={24} color="black" />
                ) : (
                  <MaterialCommunityIcons name="chevron-down" size={24} color="black" />
                )}
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

            {showSearch && (
              <View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <View style={{ flexDirection: 'column', paddingRight: 100 }}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                      Periode
                    </Text>
                    {/* <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#B2B2B2' }}>
                    <Picker
                      selectedValue={selectedMonth}
                      onValueChange={handleMonthChange}
                      style={styles.dropdown}
                    >
                      {months.map((month) => (
                        <Picker.Item key={month.value} label={month.label} value={month.value} />
                      ))}
                    </Picker>
                  </View> */}
                    {/* </View>
                <View style={{ marginTop: 20 }}> */}
                    <TouchableOpacity
                      style={styles.input}
                      onPress={toggleModal}

                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Text>{selectedYear || 'Pilih Tahun'}</Text>
                        <Ionicons name="caret-down" size={14} color="black" />
                      </View>

                    </TouchableOpacity>

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
                              Tahun
                            </Text>
                            <TouchableOpacity onPress={() => closeModal()} >
                              <MaterialCommunityIcons name="window-close" size={20} color="black" />
                            </TouchableOpacity>
                          </View>
                          <FlatList
                            data={years}
                            renderItem={renderItem}
                            keyExtractor={(item) => item}
                          />
                        </View>
                      </View>
                    </Modal>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                      Nama
                    </Text>
                    <TextInput style={{ padding: 8, width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="Fulan" />
                  </View>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                      NIK
                    </Text>
                    <TextInput style={{ padding: 8, width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="9999999999999999" />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                      RT
                    </Text>
                    <TextInput style={{ padding: 8, width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="001" />
                  </View>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                      RW
                    </Text>
                    <TextInput style={{ padding: 8, width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="001" />
                  </View>
                </View>


              </View>

            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 20, borderRadius: 30 }}>
              <TouchableOpacity onPress={() => modallanjutan()}
                style={{ backgroundColor: '#071952', padding: 10, width: '50%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderRadius: 10 }}>
                <Ionicons name="add-circle-outline" size={17} color="white" />
                <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'white', fontSize: 14 }}>Pencarian Lanjutan</Text>
              </TouchableOpacity>
            </View>
            {showBaduta === true ?
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    Baduta
                  </Text>
                  <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#B2B2B2' }}>
                    <Picker
                      selectedValue={selectedBaduta}
                      onValueChange={handleBadutaChange}
                      style={styles.dropdown}
                      itemStyle={styles.dropdownText}
                    >
                      <Picker.Item label="Ada" value="option1" />
                      <Picker.Item label="Tidak Ada" value="option2" />
                    </Picker>
                  </View>
                </View>
              </View>
              : <></>
            }
            {showBalita === true ?
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    Balita
                  </Text>
                  <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#B2B2B2' }}>
                    <Picker
                      selectedValue={selectedBalita}
                      onValueChange={handleBalitaChange}
                      style={styles.dropdown}
                      itemStyle={styles.dropdownText}
                    >
                      <Picker.Item label="Ada" value="option1" />
                      <Picker.Item label="Tidak Ada" value="option2" />
                    </Picker>
                  </View>
                </View>
              </View>
              : <></>}

            {showHamil === true ?
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    Status Hamil
                  </Text>
                  <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#B2B2B2' }}>
                    <Picker
                      selectedValue={selectedHamil}
                      onValueChange={handleHamilChange}
                      style={styles.dropdown}
                      itemStyle={styles.dropdownText}
                    >
                      <Picker.Item label="Ada" value="option1" />
                      <Picker.Item label="Tidak Ada" value="option2" />
                    </Picker>
                  </View>
                </View>
              </View>
              : <></>}

            {showPUS === true ?
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    Status PUS
                  </Text>
                  <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#B2B2B2' }}>
                    <Picker
                      selectedValue={selectedPUS}
                      onValueChange={handlePUSChange}
                      style={styles.dropdown}
                      itemStyle={styles.dropdownText}
                    >
                      <Picker.Item label="Ada" value="option1" />
                      <Picker.Item label="Tidak Ada" value="option2" />
                    </Picker>
                  </View>
                </View>
              </View>
              : <></>}

            {showKeluarga === true ?
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    Status Keluarga
                  </Text>
                  <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#B2B2B2' }}>
                    <Picker
                      selectedValue={selectedKeluarga}
                      onValueChange={handleKeluargaChange}
                      style={styles.dropdown}
                      itemStyle={styles.dropdownText}
                    >
                      <Picker.Item label="Keluarga Ada" value="option1" />
                      <Picker.Item label="Keluarga Pindah" value="option2" />
                      <Picker.Item label="Keluarga Seluruh Anggota Keluarga Meninggal Dunia" value="option2" />
                      <Picker.Item label="Keluarga Tidak Ditemukan" value="option2" />
                      <Picker.Item label="Keluarga Bercerai" value="option2" />
                      <Picker.Item label="Keluarga Baru" value="option2" />
                    </Picker>
                  </View>
                </View>
              </View>
              : <></>}

            {showKRS === true ?
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    Status KRS
                  </Text>
                  <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#B2B2B2' }}>
                    <Picker
                      selectedValue={selectedKRS}
                      onValueChange={handleKRSChange}
                      style={styles.dropdown}
                      itemStyle={styles.dropdownText}
                    >
                      <Picker.Item label="Berisiko" value="option1" />
                      <Picker.Item label="Tidak Berisiko" value="option2" />
                    </Picker>
                  </View>
                </View>
              </View>
              : <></>}
            {showVERVAL === true ?
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    Status Verval
                  </Text>
                  <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#B2B2B2' }}>
                    <Picker
                      selectedValue={selectedVERVAL}
                      onValueChange={handleVERVALChange}
                      style={styles.dropdown}
                      itemStyle={styles.dropdownText}
                    >
                      <Picker.Item label="Ada" value="option1" />
                      <Picker.Item label="Tidak Ada" value="option2" />
                    </Picker>
                  </View>
                </View>
              </View>
              : <></>}



            <Modal
              visible={isModalVisibleLanjutan}
              animationType="slide"
              onRequestClose={toggleModalLanjutan}
              transparent
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.modalTitle}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }} >
                      Filter Lanjutan
                    </Text>
                    <TouchableOpacity onPress={() => closeModalLanjutan()} >
                      <MaterialCommunityIcons name="window-close" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={Lanjutan}
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
            {/* {(state.additionalFilter?.length > 0) ?
              (state.additionalFilter.map((item, index) => {
                return (

                  <View key={index} style={{ flexDirection: 'row', marginBottom: 8, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                      <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#B2B2B2' }}>
                        <Picker
                          selectedValue={item.filtValue}
                          nativeID={"filt" + item.xkey}
                          onValueChange={(selectedOption) => handleSelectFilter(selectedOption, "filt" + item.xkey)}
                          style={styles.dropdownChoose}
                        >
                          {state.optUseFilter.map((Choose) => (
                            <Picker.Item style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }} key={Choose.value} label={Choose.label} value={Choose.value} />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                      <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#B2B2B2' }}>
                        <Picker
                          selectedValue={item.valkey}
                          key={item.xkey}
                          onValueChange={(selectedOption) => handleSelectFilterVal(selectedOption, 'val' + item.xkey)}
                          style={styles.dropdownChooseCore}
                        >
                          {item.selectVal?.map((row) => (
                            <Picker.Item style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }} key={row.value} label={row.label} value={row.value} />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                      <TouchableOpacity onPress={(e) => deleteFilter(e, item)}>
                        <Ionicons name="close-circle-outline" size={35} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }))
              :
              (
                <></>
              )
            } */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 20, borderRadius: 30 }}>
              <TouchableOpacity onPress={() => handleSearch()}
                style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderRadius: 10 }}>
                <Ionicons name="search" size={14} color="white" />
                <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'white', fontSize: 14 }}>Cari</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('Print')}
                style={{ backgroundColor: '#54B435', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', marginLeft: 'auto', flexDirection: 'row', borderRadius: 10 }}>
                <MaterialCommunityIcons name="printer" size={14} color="white" />
                <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'white', fontSize: 14 }}>Print</Text>
              </TouchableOpacity>
            </View>
            {showData ? (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Data Keluarga & Individu</Text>
                  <TouchableOpacity onPress={() => next()}>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
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
                {getData.map((el, index) => {
                  return (
                    <View style={styles.item}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => toggleDetail(index)}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons
                              name={openIndex === index ? 'chevron-up' : 'chevron-down'}
                              size={20}
                              color="black"
                            />
                            <Text style={styles.title}>{el.nama}</Text>

                          </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity style={{ marginRight: 5 }} onPress={() => Alert.alert('Pencarian')}>
                            <Ionicons
                              name="search"
                              size={20}
                              color="#212A3E"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={(e) => handleEdit(e, el)}>
                            <MaterialCommunityIcons
                              name="file-edit"
                              size={20}
                              color="#212A3E"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      {openIndex === index && (
                        <View>

                          <View key={index} style={styles.boxmodel}>
                            <View style={{ margin: 5, flexDirection: 'row', marginBottom: 0 }}>
                              <View style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14, marginLeft: 20 }}>
                                  NIK
                                </Text>
                              </View>
                              <View key={index} style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14 }}>
                                  : {el.nik}
                                </Text>

                              </View>
                            </View>
                            <View style={{ margin: 5, flexDirection: 'row', marginBottom: 0 }}>
                              <View style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14, marginLeft: 20 }}>
                                  Kode Keluarga
                                </Text>
                              </View>
                              <View style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14 }}>
                                  : {el.kki.replace(/\s/g, "")}
                                </Text>

                              </View>
                            </View>
                            <View style={{ margin: 5, flexDirection: 'row', marginBottom: 0 }}>
                              <View style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14, marginLeft: 20 }}>
                                  Nama Istri
                                </Text>
                              </View>
                              <View style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14 }}>
                                  : {el.nama_istri}
                                </Text>

                              </View>
                            </View>
                            <View style={{ margin: 5, flexDirection: 'row', marginBottom: 0 }}>
                              <View style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14, marginLeft: 20 }}>
                                  Status Verval
                                </Text>
                              </View>
                              <View style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14 }}>
                                  : {el.status_verval}
                                </Text>

                              </View>
                            </View>
                            <View style={{ margin: 5, flexDirection: 'row', marginBottom: 0 }}>
                              <View style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14, marginLeft: 20 }}>
                                  Status Keluarga
                                </Text>
                              </View>
                              <View style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14 }}>
                                  : {el.status_keluarga}
                                </Text>

                              </View>
                            </View>
                            <View style={{ margin: 5, flexDirection: 'row', marginBottom: 0 }}>
                              <View style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14, marginLeft: 20 }}>
                                  Status KRS
                                </Text>
                              </View>
                              <View style={{ margin: 5, flexDirection: 'column', marginBottom: 0 }}>
                                <Text style={{ fontSize: 14 }}>
                                  : {el.status_krs}
                                </Text>

                              </View>
                            </View>

                          </View>

                        </View>

                      )}

                    </View>
                  )
                })}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 20, borderRadius: 30 }}>
                  <TouchableOpacity onPress={() => handlePrevious()}
                    style={{ backgroundColor: '#30A2FF', padding: 8, width: '30%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderRadius: 10 }}>
                    <MaterialCommunityIcons name="arrow-left" size={20} color="white" />
                    <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'white', fontSize: 16 }}>Previous</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleNext()}
                    style={{ backgroundColor: '#54B435', padding: 8, width: '25%', justifyContent: 'center', alignSelf: 'center', marginLeft: 'auto', flexDirection: 'row', borderRadius: 10 }}>
                    <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'white', fontSize: 16 }}>Next</Text>
                    <MaterialCommunityIcons name="arrow-right" size={20} color="white" style={{ marginLeft: 10 }} />

                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            {showSummary ? (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Ringkasan</Text>
                  <TouchableOpacity onPress={() => back()}>
                    <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
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
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginRight: 50 }}>Jumlah Keluarga/Jiwa</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 257/999</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginRight: 105 }}>Jumlah PUS</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 190</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginRight: 53 }}>Jumlah Wanita Hamil</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 1</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginRight: 53 }}>Jumlah Unmed Need</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 49</Text>
                </View>
                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginBottom: 10 }}>Peserta KB Aktif</Text>
                <View style={{ backgroundColor: '#EEEEEE', padding: 10, marginBottom: 10, borderRadius: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginBottom: 10 }}>Metode IUD</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ padding: 5, borderRadius: 5, alignItems: 'center' }}>
                      <Text style={{ color: 'black', fontSize: 16, marginBottom: 5 }}>Pemerintah</Text>
                      <Text style={{ color: 'black', fontSize: 16 }}>2</Text>
                    </View>
                    <View style={{ padding: 5, borderRadius: 5, alignItems: 'center' }}>
                      <Text style={{ color: 'black', fontSize: 16, marginBottom: 5 }}>Swasta</Text>
                      <Text style={{ color: 'black', fontSize: 16 }}>1</Text>
                    </View>
                    <View style={{ padding: 5, borderRadius: 5, alignItems: 'center' }}>
                      <Text style={{ color: 'black', fontSize: 16, marginBottom: 5 }}>Lainnya</Text>
                      <Text style={{ color: 'black', fontSize: 16 }}>0</Text>
                    </View>
                    <View style={{ padding: 5, borderRadius: 5, alignItems: 'center' }}>
                      <Text style={{ color: 'black', fontSize: 16, marginBottom: 5 }}>Total</Text>
                      <Text style={{ color: 'black', fontSize: 16 }}>3</Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginRight: 45 }}>PUS  Bukan Peserta KB</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 57</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 100, marginLeft: 10 }}>Ingin Anak</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 9</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 53, marginLeft: 10 }}>Ingin Anak Ditunda</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 13</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 40, marginLeft: 10 }}>Tidak Ingin Anak Lagi</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 36</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginRight: 80 }}>Sasaran Poktan</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 261</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 139, marginLeft: 10 }}>BKB</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 44</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 137, marginLeft: 10 }}>BKR</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 138</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 139, marginLeft: 10 }}>BKL</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 79</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginRight: 70 }}>Kesertaan Poktan</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 49</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 139, marginLeft: 10 }}>BKB</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 23</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 137, marginLeft: 10 }}>BKR</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 5</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 139, marginLeft: 10 }}>BKL</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 6</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 139, marginLeft: 10 }}>BKB</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 44</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 137, marginLeft: 10 }}>BKR</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 138</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16, marginRight: 123, marginLeft: 10 }}>UPPKA</Text>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>: 0</Text>
                </View>
              </View>
            ) : null}

          </Block>
        </ScrollView>
      </View>

    </Block >

  );
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