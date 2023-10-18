import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Register from './src/screens/FormRegister/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './src/screens/ProfileScreen';
import Scanner from './src/screens/Scanner';
import Manual1 from './src/screens/FormRegister/Manual1';
import PickUp from './src/screens/PickUp';
import Manual2 from './src/screens/FormRegister/Manual2';
import Otp from './src/screens/FormRegister/Otp';
import Success from './src/screens/FormRegister/Success';
import OrderHistory from './src/screens/OrderHistory';
import TrackOrder from './src/screens/TrackOrderMenu/TrackOrder';
import TrackById from './src/screens/TrackOrderMenu/TrackById';
import TrackerPage from './src/screens/TrackOrderMenu/TrackerPage';
import ScanBarcode from './src/screens/ScanBarcode';
import ConfirmOrder from './src/screens/ConfirmOrder';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Manual1" component={Manual1} options={{ headerShown: false }} />
        <Stack.Screen name="Manual2" component={Manual2} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
        <Stack.Screen name="Success" component={Success} options={{ headerShown: false }} />
        <Stack.Screen name="PickUp" component={PickUp} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false }} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }} />
        <Stack.Screen name="TrackOrder" component={TrackOrder} options={{ headerShown: false }} />
        <Stack.Screen name="TrackById" component={TrackById} options={{ headerShown: false }} />
        <Stack.Screen name="TrackerPage" component={TrackerPage} options={{ headerShown: false }} />
        <Stack.Screen name="ScanBarcode" component={ScanBarcode} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} options={{ headerShown: false }} />
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
