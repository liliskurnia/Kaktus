import React, { useCallback, useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text as TextRn,
  View,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput
} from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Block, Image, Text, ModalSelect, Input } from "../../components";
import { useData, useTheme, useTranslation } from "../../hooks";

export default function TrackById() {
  const { assets, colors, gradients, sizes } = useTheme();
  const navigation = useNavigation();
  const [orderId, setOrderId] = useState('');

  const handleBack = () => {
    navigation.navigate('TrackOrder')
  }

  const handleTrack = () => {
    // navigation.navigate('TrackerPage')
  }

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

      <View style={styles.inputTextView}>
        <TextInput
          style={styles.inputText}
          placeholder="ORDER ID"
          placeholderTextColor="#B3B3B3"
          onChangeText={text => setOrderId({ orderId: text })} />
      </View>
      <TouchableOpacity onPress={handleTrack} style={styles.button}>
        <TextRn style={styles.textButton}>TRACK ORDER</TextRn>
      </TouchableOpacity>
    </Block>
  );
}

const styles = StyleSheet.create({
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
