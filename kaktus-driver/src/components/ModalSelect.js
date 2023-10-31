import React, {useState, useEffect} from 'react';
import {
  Platform,
  Linking,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text as TextRn,
  View,
  Alert,
  SafeAreaView,
  Button,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';

import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

import Text from './Text';

export default function ModalSelect({
  modalVisible,
  setModalVisible,
  optionList,
  optionActive,
  handleChangeList,
}) {
  return (
    <Modal
      statusBarTranslucent
      animationType="slide"
      transparent={true}
      //animationInTiming = {13900}
      visible={modalVisible}
      // animationOut = "slide"
      swipeDirection="down">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{alignSelf: 'flex-end'}}>
            <MaterialCommunityIcons
              name="close-circle"
              size={24}
              color="#111"
              style={{marginLeft: 'auto', alignSelf: 'flex-end'}}
            />
          </TouchableOpacity>
          <Text style={styles.modalText}>Pilih {optionActive}</Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={optionList}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  style={styles.flatItem}
                  onPress={() => {
                    handleChangeList(item, optionActive);
                  }}>
                  <TextRn style={styles.item}>{item.label}</TextRn>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.value}
          />

          {optionList.length === 0 ? (
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#008dd0',
                  borderWidth: 1,
                  borderColor: '#cdcdcd',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 4,
                }}>
                <TextRn
                  style={{
                    fontFamily: 'poppins-regular',
                    fontSize: 14,
                    color: '#fff',
                  }}>
                  Data tidak ditemukan
                </TextRn>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={18}
                  color="#fff"
                  style={{marginTop: 2, marginLeft: 5}}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
    </Modal>
  );
}

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
    paddingTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  modalView: {
    flexDirection: 'column',
    width: '80%',
    height: '60%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'poppins-regular',
  },
  flatItem: {
    padding: 10,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#cdcdcd',
    backgroundColor: '#fcfcfc',
    borderBottomWidth: 2.5
  },
});
