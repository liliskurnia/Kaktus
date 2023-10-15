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

export default function ProfileScreen() {
  return (
    <Block flex={1}>
      <Text>PROFILE</Text>
    </Block>

  );
}

const styles = StyleSheet.create({
 
});