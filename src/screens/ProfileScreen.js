import React, { useCallback, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Text as TextRn,
  View,
  Alert,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { Block, Image, Text, ModalSelect, Input } from '../components';
import { useData, useTheme, useTranslation } from '../hooks';

export default function ProfileScreen() {

  const { assets, colors, gradients, sizes } = useTheme();

  const data = [
    { imageUrl: require('../assets/images/stunting1.jpg') },
    { imageUrl: require('../assets/images/stunting6.png') },
    { imageUrl: require('../assets/images/stunting7.jpg') },
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

  return (
    <Block flex={1} style={{ backgroundColor: '#068FFF' }}>
      <View style={{ flexDirection: 'row', margin: 10, marginTop: 30 }}>
        <TextRn>Empty Page</TextRn>
      </View>
    </Block>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30
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