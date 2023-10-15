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
          backgroundColor: "#1A5D1A",
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
            Waste Tracker
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
