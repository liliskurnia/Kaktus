import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Login = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const isVisiblePassword = () => {
        setShowPassword(!showPassword);
    };

    const onPressLogin = () => {
        navigation.navigate('Home');
    };

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
                placeholder="EMAIL"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ email: text })} />
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry={!showPassword}
                    placeholder="PASSWORD"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ password: text })} />
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
            <TouchableOpacity style={{ marginTop: 10, marginRight: -200 }}>
                <Text style={{ color: '#57B4A1', fontSize: 14 }}>Forget Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPressLogin}
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
    inputView: {
        width: "80%",
        backgroundColor: "#3AB4BA",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 70,
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingLeft: 10,
    },
    forgotAndSignUpText: {
        color: "white",
        fontSize: 11
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