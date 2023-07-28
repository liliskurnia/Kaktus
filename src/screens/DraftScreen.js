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
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { Block, Image, ModalSelect, Input } from '../components';
import { useData, useTheme, useTranslation } from '../hooks';

export default function DraftScreen() {

  const { assets, colors, gradients, sizes } = useTheme();
  const [showDetail, setShowDetail] = useState(true);

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

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.imageUrl} style={styles.image} />
      </View>
    );
  };

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
            Draft
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#EEEEEE', height: '100%', borderRadius: 30 }}>
        <Block
          scroll
          paddingHorizontal={sizes.sm}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: '#fff', marginTop: 20, padding: 10, borderRadius: 10 }}>
          {/* <View style={{flexDirection:'row'}}>
            <TextInput style={{ padding: 8, width: 310, borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7' }} placeholder="Cari" />
            <Ionicons name="search" size={14} color="black" />
          </View> */}
          {/* <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Form Profile</Text>
          <View
            style={{
              marginVertical: 10,
              borderBottomColor: '#BABABA',
              borderBottomWidth: StyleSheet.hairlineWidth,
              flex: 1
            }}
          /> */}
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
                    <TouchableOpacity style={{ marginRight: 5 }} onPress={() => handleEdit()}>
                      <MaterialCommunityIcons
                        name="file-edit"
                        size={20}
                        color="#212A3E"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete()}>
                      <MaterialCommunityIcons
                        name="delete"
                        size={20}
                        color="#B31312"
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
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50, borderRadius: 30 }}>
            <TouchableOpacity onPress={() => navigation.navigate('TambahDataKeluarga')}
              style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderRadius: 10 }}>
              <MaterialCommunityIcons name="arrow-left" size={14} color="white" />
              <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 14 }}>Sebelumnya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('P13')}
              style={{ backgroundColor: '#30A2FF', padding: 10, width: '45%', justifyContent: 'center', alignSelf: 'center', marginLeft: 'auto', flexDirection: 'row', borderRadius: 10 }}>
              <Text style={{ marginRight: 10, fontWeight: 'bold', color: 'white', fontSize: 14 }}>Selanjutnya</Text>
              <MaterialCommunityIcons name="arrow-right" size={14} color="white" />
            </TouchableOpacity>
          </View> */}
        </Block>
      </View>
    </Block>

  );
}

const styles = StyleSheet.create({
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