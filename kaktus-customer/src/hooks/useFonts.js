import * as Font from 'expo-font';

export const useFonts = async () =>
  await Font.loadAsync({
    'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });
