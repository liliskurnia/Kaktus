import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text as TextRn,
  View,
  StyleSheet,
  ScrollView,
  Switch
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Block, Image } from '../components';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../config';

export default function ProfileScreen() {

  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [data, setData] = useState([])
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  //cek data yang sudah disimpan di async storage
  useEffect(() => {
    const checkAsyncStorageData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const userDataObj = JSON.parse(userData);
          // console.log('Data from AsyncStorage:', userDataObj);
          setUserData(userDataObj)
          // console.log(userDataObj, 'USERDATA')
        } else {
          console.log('No data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    }

    checkAsyncStorageData();
  }, []);

  const id = userData.masterCustomerId
  // console.log('id', id)

  //get info user berdasarkan id yang login
  useEffect(() => {
    if (userData.masterCustomerId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const { data: response } = await axios.get(`${BASE_URL}/api/v1/customers/${userData.masterCustomerId}`);
          setData(response);
        } catch (error) {
          console.error(error.message);
        }
        setLoading(false);
      }

      fetchData();
    }
  }, [userData]);

  const handleLogout = () => {
    navigation.navigate('Login')
  }

  const handleOrderHistory = () => {
    navigation.navigate('OrderHistory')
  }

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
          <TextRn style={{ color: '#819994', lexDirection: 'row', fontSize: 26, fontWeight: 'bold', marginLeft: -40 }}>
            {data.nama}
          </TextRn>
          <View style={{ flexDirection: 'row', marginLeft: -40 }}>
            <TextRn style={{ color: '#819994', flexDirection: 'column', fontWeight: 'bold' }}>{data.email}</TextRn>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: -40 }}>
            <TextRn style={{ color: '#819994', flexDirection: 'column', fontWeight: 'bold' }}>{data.telp}</TextRn>
          </View>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity>
            <Ionicons name="pencil" size={26} color="#819994" />
          </TouchableOpacity>

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
              <TextRn style={{ fontSize: 16, fontWeight: 'bold', color: '#819994' }}>4,483 Points</TextRn>
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
          <TouchableOpacity onPress={handleOrderHistory} style={{ flexDirection: 'row' }}>
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
        <View style={styles.field}>
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
        <View style={styles.field}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Ionicons name="settings" size={35} color="#819994" />
            <TextRn style={styles.text}>Setting</TextRn>
          </TouchableOpacity>
        </View>
        <View style={[styles.field, { marginBottom: 20 }]}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <FontAwesome5 name="hands-helping" size={35} color="#819994" />
            <TextRn style={styles.text}>Help Center</TextRn>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutBtn}>
            <TextRn style={styles.logoutText}>LOGOUT </TextRn>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Block>

  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    width: "80%",
    backgroundColor: "#E26363",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  field: {
    marginHorizontal: 30,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    paddingVertical: 5
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#819994',
    paddingTop: 10,
    marginLeft: 20,
  },
  box: {
    width: '90%',
    height: '12%',
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