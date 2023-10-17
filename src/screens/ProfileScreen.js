import React, { useCallback, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Text as TextRn,
  View,
  Alert,
  StyleSheet,
  SectionList,
  ScrollView,
  StatusBar,
  TextInput,
  Switch
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { Block, Image, ModalSelect, Input } from '../components';
import { useData, useTheme, useTranslation } from '../hooks';

export default function ProfileScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <Block flex={1} style={{ backgroundColor: "#fff" }}>
      <View style={{ margin: 30, marginTop: 50 }}>
        <TextRn style={{ fontSize: 40, textAlign: 'center', color: '#819994', fontWeight: 'bold' }}>PROFILE</TextRn>
      </View>
      <View style={styles.box}>
        <Image
          style={{ alignSelf: 'flex-start', margin: 5, flexDirection: 'column' }}
          source={require('../assets/images/profil.png')}
        />
        <View style={{ flexDirection: 'column' }}>
          <TextRn style={{ flexDirection: 'row', fontSize: 30, fontWeight: 'bold', marginLeft: -40 }}>
            Michael Cactus
          </TextRn>
          <View style={{ flexDirection: 'row', marginLeft: -40 }}>
            <TextRn style={{ flexDirection: 'column' }}>testUser@kaktus.com</TextRn>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: -40 }}>
            <TextRn style={{ flexDirection: 'column' }}>+62-816-7291-0982</TextRn>
          </View>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Ionicons name="pencil" size={24} color="#819994" />
        </View>
      </View>
      <ScrollView>
        <View style={{ marginHorizontal: 30, marginTop: 30 }}>
          <TextRn style={{ fontSize: 20, fontWeight: 'bold', color: '#819994' }}>MY ACCOUNT</TextRn>
        </View>
        <View style={styles.field}>
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name="cactus" size={35} color="#819994" />
              <TextRn style={styles.text}>Cactus Rewards</TextRn>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/images/point.png')}
                style={{ marginRight: 10 }}
              />
              <TextRn style={{ fontSize: 18, fontWeight: 'bold', color: '#819994' }}>4,483 Points</TextRn>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name="account" size={35} color="#819994" />
            <TextRn style={styles.text}>Manage Account</TextRn>
          </TouchableOpacity>
        </View>
        <View style={styles.field}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name="clipboard-text" size={35} color="#819994" />
            <TextRn style={styles.text}>Order History</TextRn>
          </TouchableOpacity>
        </View>
        <View style={styles.field}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name="map-marker" size={35} color="#819994" />
            <TextRn style={styles.text}>Saved Locations</TextRn>
          </TouchableOpacity>
        </View>
        <View style={styles.field}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Ionicons name="card" size={35} color="#819994" />
            <TextRn style={styles.text}>Payment Methode</TextRn>
          </TouchableOpacity>
        </View>
        <View style={styles.field}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <MaterialIcons name="language" size={35} color="#819994" />
            <TextRn style={styles.text}>Language</TextRn>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TextRn style={styles.text}>English(US)</TextRn>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 30, marginTop: 30 }}>
          <TextRn style={{ fontSize: 20, fontWeight: 'bold', color: '#819994' }}>SECURITY</TextRn>
        </View>
        <View style={styles.field}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name="lock" size={35} color="#819994" />
            <TextRn style={styles.text}>Change Security Code</TextRn>
          </TouchableOpacity>
        </View>
        <View style={[styles.field, { marginBottom: 20 }]}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <MaterialIcons name="language" size={35} color="#819994" />
            <TextRn style={styles.text}>Face ID</TextRn>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Switch
                trackColor={{ false: '#819994', true: '#57B4A1' }}
                thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </Block>

  );
}

const styles = StyleSheet.create({
  field: {
    marginHorizontal: 30,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    paddingVertical: 5
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#819994',
    paddingTop: 10,
    marginLeft: 20,
  },
  box: {
    width: 315,
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
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  }
});