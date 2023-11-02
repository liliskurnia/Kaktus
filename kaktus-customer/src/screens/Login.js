import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../config';

const Login = () => {
    const [state, setState] = useState({
        username: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});

    const isVisiblePassword = () => {
        setShowPassword(!showPassword);
    };

    // const handleLogin = () => {
    //     navigation.navigate('Home')
    // }

    const handleLogin = async () => {

        //field required
        const validationErrors = {};

        if (!state.username) {
            validationErrors.username = '*Username is required';
        }
        if (!state.password) {
            validationErrors.password = '*Password is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const loginData = {
            username: state.username,
            password: state.password,
        };

        console.log('loginData', loginData)

        try {
            const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, loginData);
            console.log('respon', response.data)

            if (response.status === 200) {
                await AsyncStorage.setItem('userData', JSON.stringify(response.data));
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'Failed to login. Please try again.');
            }

        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', `${error.response.data}`);
        }
    };

    //cek data yang sudah disimpan di async storage
    useEffect(() => {
        const checkAsyncStorageData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    const userDataObj = JSON.parse(userData);
                    console.log('Data from AsyncStorage:', userDataObj);
                } else {
                    console.log('No data found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        }

        checkAsyncStorageData();
    }, []); 

    const onPressForgotPassword = () => {
        // Do something about forgot password operation
    };

    const handleSignUpPress = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logoKaktus.jpeg')}
            />
            <View style={{ width: '90%' }}>
                <Text style={styles.title}> Hello,</Text>
                <Text style={styles.title1}> Welcome Back!</Text>
                <Text style={styles.signIn}> SIGN IN</Text>
            </View>
            <TextInput
                style={styles.inputText}
                placeholder="USERNAME/EMAIL"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ ...state, username: text })} />
            <View style={{ width: '80%' }}>
                {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry={!showPassword}
                    placeholder="PASSWORD"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ ...state, password: text })} />
                <TouchableOpacity
                    style={{ position: 'absolute', right: 15, top: 25 }}
                    onPress={isVisiblePassword}
                >
                    {showPassword ? (
                        <MaterialCommunityIcons
                            name="eye-off"
                            size={20}
                            color="#B2B2B2"
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name="eye"
                            size={20}
                            color="#B2B2B2"
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View style={{ width: '80%' }}>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
            <TouchableOpacity style={{ marginTop: 10, marginRight: -200 }}>
                <Text style={{ color: '#57B4A1', fontSize: 14 }}>Forget Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Not a member yet?{' '}</Text>
                <TouchableOpacity onPress={handleSignUpPress}>
                    <Text style={{ color: '#57B4A1', fontSize: 15, fontWeight: 'bold' }}>Sign-Up</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}> here</Text>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    errorText: {
        textAlign: 'left',
        color: 'red',
        alignSelf: "flex-start"
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#000000",
        marginTop: 40,
    },
    title1: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#57B4A1",
    },
    signIn: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#000000",
        marginTop: 20
    },
    inputText: {
        height: 70,
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingLeft: 10,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#57B4A1",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
export default Login;