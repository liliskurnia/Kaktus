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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { Block, Image, ModalSelect, Input } from '../components';
import { useData, useTheme, useTranslation } from '../hooks';
import { Picker } from '@react-native-picker/picker';

export default function DaftarKeluargaScreen() {

  const { assets, colors, gradients, sizes } = useTheme();
  const [showData, setShowData] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [showDetail, setShowDetail] = useState(true);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');

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


  const closeModal = () => {
    setModalVisible(false);
  };

  // Buat daftar tahun yang ingin ditampilkan (misalnya dari tahun 1950 hingga tahun ini)
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1950; year--) {
    years.push(year.toString());
  }

  // Fungsi untuk menampilkan modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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

  const toggleDetail = () => {
    setShowDetail(!showDetail);
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

  const handleSearch = () => {
    setShowData(true);
    setShowSummary(false);
  };

  const next = () => {
    setShowData(false);
    setShowSummary(true);
  }

  const back = () => {
    setShowData(true);
    setShowSummary(false);
  }

  const handleEdit = () => {
    Alert.alert('Edit', 'Anda akan melakukan edit data?', [
      {
        text: 'Tidak',
        style: 'cancel',
      },
      {
        text: 'YA',
        onPress: async () => {
          Alert.alert('Halaman edit data')
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
      <ScrollView>
      <View style={{ backgroundColor: '#EEEEEE', height: 670, borderRadius: 30, borderBottomEndRadius:0, borderBottomStartRadius:0 }}>
        <Block
          scroll
          paddingHorizontal={sizes.sm}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: '#fff', marginTop: 20, padding: 10, borderRadius: 10}}>
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
                <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    Periode
                  </Text>
                  <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#B2B2B2' }}>
                    <Picker
                      selectedValue={selectedMonth}
                      onValueChange={handleMonthChange}
                      style={styles.dropdown}
                    >
                      {months.map((month) => (
                        <Picker.Item key={month.value} label={month.label} value={month.value} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={{ marginTop: 15 }}>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={toggleModal}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                          <TouchableOpacity onPress={() => closeModal()}>
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
                    Provinsi
                  </Text>
                  <TextInput style={{ padding: 8, width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="Kalimantan Timur" />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    Kab/Kota
                  </Text>
                  <TextInput style={{ padding: 8, width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="Balikpapan" />
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flexDirection: 'column', paddingRight: 10 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    Kecamatan
                  </Text>
                  <TextInput style={{ padding: 8, width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="Balikpapan Kota" />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    Desa/Kel
                  </Text>
                  <TextInput style={{ padding: 8, width: 150, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="Klandasan Ilir" />
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
            <TouchableOpacity onPress={() => handleSearch()}
              style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderRadius: 10 }}>
              <Ionicons name="search" size={14} color="white" />
              <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 14 }}>Cari</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Print')}
              style={{ backgroundColor: '#54B435', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', marginLeft: 'auto', flexDirection: 'row', borderRadius: 10 }}>
              <MaterialCommunityIcons name="printer" size={14} color="white" />
              <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 14 }}>Print</Text>
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
              <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginRight: 5 }} onPress={toggleDetail}>
                          {showDetail ? (
                            <MaterialCommunityIcons name="chevron-up" size={20} color="black" />
                          ) : (
                            <MaterialCommunityIcons name="chevron-down" size={20} color="black" />
                          )}
                        </TouchableOpacity>
                        <Text style={styles.title}>{item}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginRight: 5 }} onPress={() => Alert.alert('Pencarian')}>
                          <Ionicons
                            name="search"
                            size={20}
                            color="#212A3E"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleEdit()}>
                          <MaterialCommunityIcons
                            name="file-edit"
                            size={20}
                            color="#212A3E"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
  
                    {showDetail && (
                      <View>
                        <View style={{ margin: 10, flexDirection: 'row', marginBottom: 0 }}>
                          <Text style={{ fontSize: 16, marginLeft: 20, marginRight: 50 }}>
                            Nama
                          </Text>
                          <Text style={{ fontSize: 16 }}>
                            : Fulan
                          </Text>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row', marginBottom: 0 }}>
                          <Text style={{ fontSize: 16, marginLeft: 20, marginRight: 70 }}>
                            NIK
                          </Text>
                          <Text style={{ fontSize: 16 }}>
                            : 9999999999999999
                          </Text>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row', marginBottom: 0 }}>
                          <Text style={{ fontSize: 16, marginLeft: 20, marginRight: 10 }}>
                            Tanggal Lahir
                          </Text>
                          <Text style={{ fontSize: 16 }}>
                            : 24 April 1998
                          </Text>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row', marginBottom: 0 }}>
                          <Text style={{ fontSize: 16, marginLeft: 20, marginRight: 65 }}>
                            Usia
                          </Text>
                          <Text style={{ fontSize: 16 }}>
                            : 25 tahun
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.header}>{title}</Text>
                )}
              />
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
      </View>
      </ScrollView>
    </Block>

  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: 150,
    height: 50,
  },
  modalTitle: {
    margin: 20,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    padding: 15,
    paddingBottom:17,
    paddingTop:17,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#B7B7B7',
    borderRadius: 5,
    width: 150
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
    backgroundColor: '#DDE6ED',
    padding: 10,
    marginVertical: 8,
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
});