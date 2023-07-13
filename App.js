import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TambahDataKeluarga from './src/screens/TambahDataKeluarga';
import P11 from './src/screens/Form/P11';
import P12 from './src/screens/Form/P12';
import P13 from './src/screens/Form/P13';
import P21 from './src/screens/Form/P21';
import P22 from './src/screens/Form/P22';
import P23 from './src/screens/Form/P23';
import Pratinjau from './src/screens/Form/Pratinjau';
import P31 from './src/screens/Form/P31';
import DataDiri from './src/screens/Form/DataDiri';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="TambahDataKeluarga" component={TambahDataKeluarga} options={{ headerShown: false }} />
        <Stack.Screen name="DataDiri" component={DataDiri} options={{ headerShown: false }} />
        <Stack.Screen name="P11" component={P11} options={{ headerShown: false }} />
        <Stack.Screen name="P12" component={P12} options={{ headerShown: false }} />
        <Stack.Screen name="P13" component={P13} options={{ headerShown: false }} />
        <Stack.Screen name="P21" component={P21} options={{ headerShown: false }} />
        <Stack.Screen name="P22" component={P22} options={{ headerShown: false }} />
        <Stack.Screen name="P23" component={P23} options={{ headerShown: false }} />
        <Stack.Screen name="P31" component={P31} options={{ headerShown: false }} />
        <Stack.Screen name="Pratinjau" component={Pratinjau} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
