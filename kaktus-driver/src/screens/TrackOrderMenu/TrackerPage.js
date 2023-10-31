import React, { useCallback, useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text as TextRn,
  View,
  Alert,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  Dimensions,
  SafeAreaView
} from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Block, Image, Text, ModalSelect, Input } from "../../components";
import { useData, useTheme, useTranslation } from "../../hooks";
import MapView, { Marker, AnimatedRegion} from "react-native-maps";
import PubNubReact from "pubnub-react";
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function TrackerPage() {
  const { assets, colors, gradients, sizes } = useTheme();
  const navigation = useNavigation();
  const [orderId, setOrderId] = useState('');

  const handleBack = () => {
    navigation.navigate('TrackOrder')
  }

  const [state, setState] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    coordinate: new Animated.ValueXY({
      x: LATITUDE,
      y: LONGITUDE,
    }),
  });

  const pubnub = useRef(
    new PubNubReact({
      publishKey: 'X', // Replace with your keys
      subscribeKey: 'X',
    })
  );

  const watchID = useRef(null);
  const marker = useRef(null);

  const watchLocation = () => {
    watchID.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoordinate = {
          latitude,
          longitude,
        };

        if (Platform.OS === 'android') {
          if (marker.current) {
            marker.current._component.animateMarkerToCoordinate(
              newCoordinate,
              500 // 500 is the duration to animate the marker
            );
          }
        } else {
          state.coordinate.timing(newCoordinate).start();
        }

        setState({
          ...state,
          latitude,
          longitude,
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );
  };

  useEffect(() => {
    watchLocation();
  }, []);

  useEffect(() => {
    if (state.latitude !== LATITUDE) {
      pubnub.current.publish({
        message: {
          latitude: state.latitude,
          longitude: state.longitude,
        },
        channel: 'location',
      });
    }
  }, [state.latitude, state.longitude]);

  useEffect(() => {
    return () => {
      if (watchID.current) {
        navigator.geolocation.clearWatch(watchID.current);
      }
    };
  }, []);

  const getMapRegion = () => ({
    latitude: state.latitude,
    longitude: state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  return (
    <Block flex={1} style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          marginTop: 30,
          marginHorizontal: 20,
          justifyContent: 'space-between'
        }}
      >
        <Image
          style={{ width: '45%', height: '150%' }}
          source={require('../../assets/images/kaktus.png')}
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
      <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={handleBack} style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 0, top: 20 }}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#9EBCB6" />
          <TextRn style={{ color: '#9EBCB6', fontSize: 20 }}>BACK</TextRn>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <TextRn style={{ fontSize: 30, textAlign: 'center', color: '#819994', fontWeight: 'bold', marginTop: 20 }}>
            TRACK ORDER
          </TextRn>
        </View>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={getMapRegion()}
          >
            <Marker.Animated
              ref={(marker) => {
                marker.current = marker;
              }}
              coordinate={state.coordinate}
            />
          </MapView>
        </View>
      </SafeAreaView>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputTextView: {
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginVertical: 20
  },
  inputText: {
    height: 70,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 20,
  },
  boxKiri: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxKanan: {
    flexDirection: 'row',
    width: '58%',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: -30,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    alignItems: 'center',
  },
  button: {
    width: '80%',
    margin: 10,
    alignSelf: 'center',
    backgroundColor: '#57B4A1',
    borderRadius: 10,
    padding: 10
  },
  textButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    margin: 10,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
