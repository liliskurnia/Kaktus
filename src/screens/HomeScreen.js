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
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { Block, Image, Text, ModalSelect, Input } from "../components";
import { useData, useTheme, useTranslation } from "../hooks";
export default function HomeScreen() {
  const { assets, colors, gradients, sizes } = useTheme();

  const data = [
    { imageUrl: require("../assets/images/1.jpg") },
    { imageUrl: require("../assets/images/2.jpg") },
    { imageUrl: require("../assets/images/3.jpg") },
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

  const handleLogout = () => {
    Alert.alert("Logout", `Anda yakin akan keluar dari akun Anda ?`, [
      {
        text: "Tidak",
        style: "cancel",
      },
      {
        text: "YA",
        onPress: async () => {
          navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
    <Block flex={1} style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          marginTop: 30,
          marginHorizontal: 20,
          marginBottom:20,
          justifyContent: 'space-between'
        }}
      >
        <Image
          style={{ width: '45%', height: '150%' }}
          source={require('../assets/images/kaktus.png')}
        />
        <View style={{ alignSelf: "flex-end" }}>
          <Block
            row
            flex={0}
            align="center"
            marginRight={sizes.sm}
            marginTop={5}
          >
            <TouchableOpacity
              onPress={() => Alert.alert("Notifikasi ditekan")}
            >
              <MaterialCommunityIcons
                name="bell-outline"
                size={22}
                color="#1C7360"
              />
            </TouchableOpacity>
            <TouchableOpacity >
              <MaterialCommunityIcons name="android-messages" size={22} color="#1C7360" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="menu" size={22} color="#1C7360" />
            </TouchableOpacity>
          </Block>
        </View>
      </View>

      <View style={styles.box}>
        <Image
          style={{ alignSelf: 'flex-start', margin: 5, flexDirection: 'column' }}
          source={require('../assets/images/profil.png')}
        />
        <View style={{ flexDirection: 'column' }}>
          <TextRn style={{ flexDirection: 'row', fontSize: 30, fontWeight: 'bold', margin: 10, color: '#3B4341' }}>
            Michael Cactus
          </TextRn>
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <Image
              style={{ flexDirection: 'column' }}
              source={require('../assets/images/point.png')}
            />
            <TextRn style={{ flexDirection: 'column', color: '#3B4341' }}>4,483 Points</TextRn>
          </View>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Image
            style={{ flexDirection: 'row', alignSelf: 'center' }}
            source={require('../assets/images/trash.png')}
          />
          <TextRn style={{ flexDirection: 'row', textAlign: 'center', color: '#3B4341' }}>Exchange</TextRn>
          <TextRn style={{ flexDirection: 'row', textAlign: 'center', color: '#3B4341' }}>Points</TextRn>
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
        </View>
      </ScrollView>
      <Block flex={0} top={-70}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: 30,
            marginVertical: 10
          }}>
          <View style={styles.circleBody}>
            <TouchableOpacity
              style={styles.circleMenuTouch}
            >
              <View style={[styles.circleMenu, { backgroundColor: '#ECFFFB' }]}>
                <MaterialCommunityIcons
                  name="truck-fast"
                  size={34}
                  color="#57B4A1"
                />
              </View>
              <TextRn
                style={styles.menuText}>
                Pick-up
              </TextRn>
            </TouchableOpacity>
          </View>
          <View style={styles.circleBody}>
            <TouchableOpacity
              style={styles.circleMenuTouch}
            >
              <View style={[styles.circleMenu, { backgroundColor: '#FFE8ED' }]}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={34}
                  color="#E05555"
                />
              </View>
              <TextRn
                style={styles.menuText}>
                Track Order
              </TextRn>
            </TouchableOpacity>
          </View>
          <View style={styles.circleBody}>
            <TouchableOpacity
              style={styles.circleMenuTouch}
            >
              <View style={[styles.circleMenu, { backgroundColor: '#FFF1E0' }]}>
                <MaterialCommunityIcons
                  name="clipboard-text"
                  size={34}
                  color="#F9A441"
                />
              </View>
              <TextRn
                style={styles.menuText}>
                Order History
              </TextRn>
            </TouchableOpacity>
          </View>
          <View style={styles.circleBody}>
            <TouchableOpacity
              style={styles.circleMenuTouch}
            >
              <View style={[styles.circleMenu, { backgroundColor: '#EAF9FF' }]}>
                <Ionicons
                  name="pricetag"
                  size={34}
                  color="#0090E1"
                />
              </View>
              <TextRn
                style={styles.menuText}>
                Vouchers
              </TextRn>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: 30,
            marginVertical: 10
          }}>
          <View style={styles.circleBody}>
            <TouchableOpacity
              style={styles.circleMenuTouch}
            >
              <View style={[styles.circleMenu, { backgroundColor: '#D6FDFF' }]}>
                <MaterialCommunityIcons
                  name="label-percent"
                  size={34}
                  color="#10B8ED"
                />
              </View>
              <TextRn
                style={styles.menuText}>
                Promotions
              </TextRn>
            </TouchableOpacity>
          </View>
          <View style={styles.circleBody}>
            <TouchableOpacity
              style={styles.circleMenuTouch}
            >
              <View style={[styles.circleMenu, { backgroundColor: '#E8FFF8' }]}>
                <Ionicons
                  name="card"
                  size={34}
                  color="#0C937A"
                />
              </View>
              <TextRn
                style={styles.menuText}>
                Membesrship
              </TextRn>
            </TouchableOpacity>
          </View>
          <View style={styles.circleBody}>
            <TouchableOpacity
              style={styles.circleMenuTouch}
            >
              <View style={[styles.circleMenu, { backgroundColor: '#EBEFF2' }]}>
                <MaterialCommunityIcons
                  name="credit-card-multiple"
                  size={34}
                  color="#3D4D60"
                />
              </View>
              <TextRn
                style={styles.menuText}>
                Payment Details
              </TextRn>
            </TouchableOpacity>
          </View>
          <View style={styles.circleBody}>
            <TouchableOpacity
              style={styles.circleMenuTouch}
            >
            </TouchableOpacity>
          </View>
        </View>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  menuText: {
    fontSize: 12,
    fontFamily: 'poppins-regular',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#0D5142'
  },
  circleBody: {
    width: 85,
    alignItems: 'center',
  },
  circleMenu: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleMenuTouch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 300,
    height: 80,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
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
  titleCard: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  circleBody: {
    width: Dimensions.get("window").width / 3,
    alignItems: "center",
  },
  circleMenu: {
    width: 60,
    height: 60,
    backgroundColor: "#D0EFD1",
    borderWidth: 1,
    borderColor: "#cdcdcd",
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
    //
  },
  textSubTitleCarouselWhite: {
    fontSize: 19,
    //
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
