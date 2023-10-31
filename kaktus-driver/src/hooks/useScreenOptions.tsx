import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  StackHeaderTitleProps,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/native';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useData } from './useData';
import { useTranslation } from './useTranslation';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Image from '../components/Image';
import Text from '../components/Text';
import useTheme from './useTheme';
import Button from '../components/Button';
import Block from '../components/Block';

export default () => {
  const { t } = useTranslation();
  const { user } = useData();
  const navigation = useNavigation();
  const { icons, colors, gradients, sizes } = useTheme();

  const handleLogout = async () => {
    // console.log('hei')
    await AsyncStorage.removeItem('@users');
    navigation.navigate('Login');
  };

  const menu = {
    headerStyle: { elevation: 0 },
    headerTitleAlign: 'left',
    headerTitleContainerStyle: { marginLeft: -48 },
    headerLeftContainerStyle: { paddingLeft: 0 },
    headerRightContainerStyle: { paddingRight: sizes.s },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({ children }: StackHeaderTitleProps) => (
      <Text
        p
        bold
      >
        I.K. Digital
      </Text>
    ),
    headerLeft: () => (
      // <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      //   {/* <Image source={icons.menu} radius={0} color={colors.icon} /> */}
      // </Button>
      <></>
    ),
    headerRight: () => (
      <Block
        row
        flex={0}
        align='center'
        marginRight={sizes.sm}
      >
        <TouchableOpacity
          style={{ marginRight: sizes.sm }}
          onPress={() => navigation.navigate('Pin')}
        >
          {/* <Image source={icons.bell} radius={0} color={colors.icon} /> */}
          <MaterialCommunityIcons
            name='bell-outline'
            size={24}
            color='#333'
          />
          <Block
            flex={0}
            right={0}
            width={sizes.s}
            height={sizes.s}
            radius={sizes.xs}
            position='absolute'
            gradient={gradients?.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: sizes.sm }}>
          <MaterialCommunityIcons
            name='cog'
            size={24}
            color='#333'
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogout()}>
          <MaterialCommunityIcons
            name='logout'
            size={24}
            color='#333'
          />
        </TouchableOpacity>
      </Block>
    ),
  } as StackHeaderOptions;

  const options = {
    stack: menu,
    components: {
      ...menu,
      headerTitle: () => (
        <Text
          p
          white
        >
          {t('navigation.components')}
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image
            source={icons.menu}
            radius={0}
            color={colors.white}
          />
        </Button>
      ),
    },
    back: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()}>
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.icon}
            source={icons.arrow}
            transform={[{ rotate: '180deg' }]}
          />
        </Button>
      ),
    },
    profile: {
      ...menu,
      headerRight: () => (
        <Block
          row
          flex={0}
          align='center'
          marginRight={sizes.padding}
        >
          <TouchableOpacity
            style={{ marginRight: sizes.sm }}
            onPress={() =>
              navigation.navigate('Screens', {
                screen: 'Notifications',
              })
            }
          >
            <Image
              source={icons.bell}
              radius={0}
              color={colors.icon}
            />
            <Block
              flex={0}
              right={0}
              width={sizes.s}
              height={sizes.s}
              radius={sizes.xs}
              position='absolute'
              gradient={gradients?.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                DrawerActions.jumpTo('Screens', { screen: 'Profile' })
              )
            }
          >
            <Image
              radius={6}
              width={24}
              height={24}
              source={{ uri: user.avatar }}
            />
          </TouchableOpacity>
        </Block>
      ),
    },
  };

  return options;
};
