import React, { useCallback, useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text as TextRn,
  View,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { Block, Image, Text, ModalSelect, Input } from "../components";
import { useData, useTheme, useTranslation } from "../hooks";

export default function HomeScreen() {
  const { assets, colors, gradients, sizes } = useTheme();

  const data = [
    { imageUrl: require("../assets/images/stunting4.jpg") },
    { imageUrl: require("../assets/images/stunting3.jpg") },
    { imageUrl: require("../assets/images/stunting2.jpg") },
    { imageUrl: require("../assets/images/stunting2.jpg") },
  ];

  const navigation = useNavigation();

  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image borderRadius={0} source={item.imageUrl} style={styles.image} />
      </View>
    );
  };

  const handleRestore = () => {
    Alert.alert('Restore', 'Anda akan melakukan restore data?', [
      {
        text: 'Tidak',
        style: 'cancel',
      },
      {
        text: 'YA',
        onPress: async () => {
          Alert.alert('Data berhasil direstore')
        }
      }
    ])
  }

  const handleBackup = () => {
    Alert.alert('Backup', 'Anda akan melakukan backup data?', [
      {
        text: 'Tidak',
        style: 'cancel',
      },
      {
        text: 'YA',
        onPress: async () => {
          Alert.alert('Data berhasil dibackup')
        }
      }
    ])
  }

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      `Anda yakin akan keluar dari akun Anda ?`,
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'YA',
          onPress: async () => {
            navigation.navigate('Login')
          },
        },
      ],
    );
  };

  return (
    <Block flex={1} style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          backgroundColor: "#424874",
        }}
      >
        {/* <TouchableOpacity onPress={() => Alert.alert('Menu ditekan')}>
                    <MaterialCommunityIcons name="menu" size={24} color="white" />
                </TouchableOpacity> */}
        <View flex={1}>
          <TextRn
            style={{
              paddingLeft: 17,
              fontSize: 16,
              fontWeight: 700,
              position: "absolute",
              color: "#fff",
              marginTop: 5,
            }}
          >
            SIGA - Sistem Informasi Keluarga
          </TextRn>
        </View>
        <View style={{ alignSelf: "flex-end" }}>
          <Block
            row
            flex={0}
            align="center"
            marginRight={sizes.sm}
            marginTop={5}
          >
            <TouchableOpacity
              style={{ marginRight: 12 }}
              onPress={() => Alert.alert("Notifikasi ditekan")}
            >
              <MaterialCommunityIcons
                name="bell-outline"
                size={22}
                color="#f4ecde"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout()}>
              <MaterialCommunityIcons name="logout" size={22} color="#f4ecde" />
            </TouchableOpacity>
          </Block>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            height: "100%",
            borderRadius: 0,
            borderBottomEndRadius: 0,
            borderBottomStartRadius: 0,
          }}
        >
          <Block
            scroll
            paddingHorizontal={0}
            borderRadius={0}
            borderBottomWidth={1}
            borderBottomColor={"#cdcdcd"}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: "#fff",
              marginBottom: 0,
              padding: 0,
              borderRadius: 0,
            }}
          >
            <View style={styles.container}>
              <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={Dimensions.get("window").width}
                itemWidth={Dimensions.get("window").width}
                slideStyle={{ width: Dimensions.get("window").width }}
                layout={"default"}
                onSnapToItem={(index) => setActiveSlide(index)}
                containerCustomStyle={{ borderRadius: 0 }}
                inactiveSlideScale={1}
                loopClonesPerSide={data.length - 1}
                autoplay={true}
                autoplayInterval={5000}
                loop={true}
              />
              <Pagination
                dotsLength={data.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotStyle={styles.paginationInactiveDot}
                inactiveDotOpacity={0.5}
                inactiveDotScale={0.6}
              />
            </View>
          </Block>

          <Block
            scroll
            marginTop={-30}
            paddingHorizontal={sizes.sm}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: "#fff",
              marginBottom: 0,
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#cdcdcd",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Block flex={3} padding={5}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Ionicons
                  name="person-circle"
                  size={26}
                  color="green"
                  style={{ marginRight: 5, marginTop: -1 }}
                />
                <View
                  style={{ flex: 1, flexDirection: "column", marginTop: -6 }}
                >
                  <Text black bold>
                    Dani Siregar
                  </Text>
                  <TextRn style={{ fontSize: 10, fontWeight: 700 }}>
                    22902001
                  </TextRn>
                </View>
              </View>
            </Block>
            <Block
              flex={4}
              padding={5}
              style={{ borderLeftWidth: 1, borderLeftColor: "#cdcdcd" }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="cellphone-marker"
                  size={24}
                  color="#000"
                  style={{ marginRight: 5, }}
                />
                <Text black bold style={{ marginTop: 2, }}>
                  TPK Clara Setyo Hanani
                </Text>
              </View>
            </Block>
          </Block>

          <Block
            scroll
            paddingHorizontal={sizes.sm}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'column', borderRadius: 5, backgroundColor: '#EEEEEE', padding: 10, marginRight: 15 }}>
                <TextRn style={{ fontSize: 14, fontWeight: 'bold' }}>Wilayah Kerja</TextRn>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', borderWidth: 1, borderRadius: 5, borderColor: '#B7B7B7', backgroundColor: '#fff', padding: 5, marginTop: 4 }}>
                  <TouchableOpacity>
                    <MaterialCommunityIcons name="map-search" size={22} color="black" />
                  </TouchableOpacity>
                  <TextRn style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5 }}>Cilangkap</TextRn>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'column', borderRadius: 5, backgroundColor: '#EEEEEE', padding: 10 }}>
                <TextRn style={{ fontSize: 14, fontWeight: 'bold', position: 'relative' }}>Periode</TextRn>
                <TextRn style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 10, marginLeft: -5 }}>2023</TextRn>
              </View>

            </View>
          </Block>

          <Block
            scroll
            paddingHorizontal={sizes.sm}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <Block flex={0} marginTop={10} marginBottom={10}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                }}
              >
                <View style={{ flex: 6, marginBottom: 8 }}>
                  <TextRn style={{ fontSize: 18, fontWeight: 700 }}>
                    Layanan
                  </TextRn>
                </View>
              </View>
              <Block flex={0}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View style={styles.circleBody}>
                    <TouchableOpacity
                      style={styles.circleMenuTouch}
                      onPress={() =>
                        navigation.navigate('DaftarKeluargaScreen')
                      }
                    >
                      <View style={styles.circleMenu}>
                        <Image
                          source={require('../assets/images/family-room.png')} // Replace with the actual path
                          style={{ width: 45, height: 45 }}
                        />
                      </View>
                      <TextRn
                        style={{
                          fontSize: 13,
                          fontFamily: "poppins-regular",
                          margin: 10,
                          marginTop: 5,
                        }}
                      >
                        Daftar Keluarga
                      </TextRn>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.circleBody}>
                    <TouchableOpacity
                      style={styles.circleMenuTouch}
                      onPress={() => navigation.navigate("TambahDataKeluarga")}
                    >
                      <View style={styles.circleMenu}>
                      <Image
                          source={require('../assets/images/family-plus.png')} // Replace with the actual path
                          style={{ width: 45, height: 45 }}
                        />
                      </View>
                      <TextRn
                        style={{
                          fontSize: 13,
                          fontFamily: "poppins-regular",
                          margin: 10,
                          marginTop: 5,
                        }}
                      >
                        Tambah Keluarga
                      </TextRn>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 8,
                  }}
                >
                  <View style={styles.circleBody}>
                    <TouchableOpacity
                      style={styles.circleMenuTouch}
                      onPress={() => handleRestore()}
                    >
                      <View style={styles.circleMenu}>
                      <Image
                          source={require('../assets/images/curve-arrow.png')} // Replace with the actual path
                          style={{ width: 45, height: 45 }}
                        />
                      </View>
                      <TextRn
                        style={{
                          fontSize: 13,
                          fontFamily: "poppins-regular",
                          margin: 10,
                          marginTop: 5,
                        }}
                      >
                        Restore
                      </TextRn>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.circleBody}>
                    <TouchableOpacity
                      style={styles.circleMenuTouch}
                      onPress={() => handleBackup()}
                    >
                      <View style={styles.circleMenu}>
                      <Image
                          source={require('../assets/images/backup.png')} // Replace with the actual path
                          style={{ width: 45, height: 45 }}
                        />
                      </View>
                      <TextRn
                        style={{
                          fontSize: 13,
                          fontFamily: "poppins-regular",
                          margin: 10,
                          marginTop: 5,
                        }}
                      >
                        Backup
                      </TextRn>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.circleBody}>
                    <TouchableOpacity
                      style={styles.circleMenuTouch}
                      onPress={() => navigation.navigate('ProfileScreen')}
                    >
                      <View style={styles.circleMenu}>
                      <Image
                          source={require('../assets/images/user.png')} // Replace with the actual path
                          style={{ width: 45, height: 45 }}
                        />
                      </View>
                      <TextRn
                        style={{
                          fontSize: 13,
                          fontFamily: "poppins-regular",
                          margin: 10,
                          marginTop: 5,
                        }}
                      >
                        Profile
                      </TextRn>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: 10,
                  }}
                ></View>
              </Block>
            </Block>
          </Block>
        </View>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    width: Dimensions.get("window").width,
    height: 210,
    borderRadius: 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    borderRadius: 0,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
  },
  paginationDot: {
    width: 15,
    height: 7,
    borderRadius: 4,
    backgroundColor: "red",
    borderWidth: 0.5,
    borderColor: "#424874",
  },
  paginationInactiveDot: {
    width: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  circleBody: {
    width: Dimensions.get("window").width / 3,
    alignItems: "center",
  },
  circleMenu: {
    width: 60,
    height: 60,
    backgroundColor: "#808080",
    borderWidth: 1,
    borderColor: "#f4f4f4",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  circleMenu1: {
    width: 60,
    height: 60,
    backgroundColor: "#E02828",
    borderWidth: 1,
    borderColor: "#f4f4f4",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  circleMenuTouch: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageCarousel: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 0,
  },
  textSubTitleCarousel: {
    fontSize: 19,
    // fontFamily: "poppins-regular",
  },
  textSubTitleCarouselWhite: {
    fontSize: 19,
    // fontFamily: "poppins-regular",
    color: "white",
  },
  textTitleCarousel: {
    fontSize: 22,
    // fontFamily: "poppins-bold",
  },
  textCountryCarousel: {
    // fontFamily: "poppins-bold",
    fontSize: 24,
    lineHeight: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginTop: -32,
    zIndex: 1,
    borderBottomWidth: 3,
    borderBottomColor: "#FF6961",
  },
});
