import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Manual2() {
    const [state, setState] = useState({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation();

    const isVisiblePassword = () => {
        setShowPassword(!showPassword);
    };

    const isVisibleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleBack = () => {
        navigation.navigate('Manual1')
    }

    const handleRegister = () => {
        navigation.navigate('Otp')
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.box}> */}
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50, color: '#57B4A1' }}>SIGN-UP</Text>
            <Text style={{ marginTop: 20, marginBottom: 20, color: '#B3B3B3', fontSize: 20 }}>Sign-up to continue your journey with us!</Text>
            <TextInput
                style={styles.inputText}
                placeholder="EMAIL"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ email: text })} />
            <TextInput
                style={styles.inputText}
                placeholder="PHONE NUMBER"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ phone: text })} />
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
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry={!showConfirmPassword}
                    placeholder="CONFIRM PASSWORD"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ confirmPassword: text })} />
                <TouchableOpacity
                    style={{ position: 'absolute', right: 15, top: 25 }}
                    onPress={isVisibleConfirmPassword}
                >
                    {showConfirmPassword ? (
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
            <View style={{ flexDirection: 'row', marginTop: 100 }}>
                <View style={styles.cancel}>
                    <TouchableOpacity onPress={handleBack}>
                        <Text style={styles.textbtn}>
                            BACK
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.next}>
                    <TouchableOpacity onPress={handleRegister}>
                        <Text style={styles.textbtn}>
                            REGISTER
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textbtn: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    cancel: {
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#DBCC96',
        borderRadius: 10, width: '40%',
        height: '40%',
        marginRight: 10
    },
    next: {
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#57B4A1',
        borderRadius: 10,
        width: '40%',
        height: '40%'
    },
    inputText: {
        height: 70,
        width: '80%',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingLeft: 10,
        marginBottom: 10,
        fontSize: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 300,
        height: 680,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#367E18",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    loginText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
