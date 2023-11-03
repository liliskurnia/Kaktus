import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import BASE_URL from '../../../config';

export default function Manual2() {
    const route = useRoute();
    const { registrationData } = route.params;
    const [state, setState] = useState({
        username: '',
        email: '',
        telp: '',
        password: '',
        confirmPassword: '',
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});

    const isVisiblePassword = () => {
        setShowPassword(!showPassword);
    };

    const isVisibleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleBack = () => {
        navigation.navigate('Manual1')
    }

    const handleRegister = async () => {

        // Check if password and confirm password match
        if (state.password !== state.confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }

        //field required
        const validationErrors = {};

        if (!state.username) {
            validationErrors.username = '*Username is required';
        }
        if (!state.email) {
            validationErrors.email = '*Email is required';
        }
        if (!state.telp) {
            validationErrors.telp = '*Phone number is required';
        }
        if (!state.password) {
            validationErrors.password = '*Password is required';
        }
        if (state.password && state.password < 6) {
            validationErrors.password = '*Password min 6 character';
        }
        if (!state.confirmPassword) {
            validationErrors.confirmPassword = '*Confirm password is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const registrationData = {
            username: state.username,
            email: state.email,
            telp: state.telp,
            password: state.password,
            ...route.params.registrationData,
        };

        console.log('registrationData', registrationData)

        try {
            const response = await axios.post(`${BASE_URL}/api/v1/customers/signup`, registrationData);
            console.log('respon', response.data)

            if (response.status === 200) {
                navigation.navigate('Otp', {registrationData });
            } else {
                Alert.alert('Error', 'Failed to register. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to register. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50, color: '#57B4A1' }}>SIGN-UP</Text>
            <Text style={{ marginTop: 20, marginBottom: 20, color: '#B3B3B3', fontSize: 20 }}>Sign-up to continue your journey with us!</Text>
            <ScrollView>
                <Text style={styles.formTitle}>Username :</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="USERNAME"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ ...state, username: text })} />
                <View style={{ width: '80%' }}>
                    {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                </View>
                <Text style={styles.formTitle}>Email :</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="EMAIL"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ ...state, email: text })} />
                <View style={{ width: '80%' }}>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>
                <Text style={styles.formTitle}>Phone Number :</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="PHONE NUMBER"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ ...state, telp: text })} />
                <View style={{ width: '80%' }}>
                    {errors.telp && <Text style={styles.errorText}>{errors.telp}</Text>}
                </View>
                <Text style={styles.formTitle}>Password :</Text>
                <View style={[styles.inputText, {flexDirection:'row'}]}>
                    <TextInput
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
                <Text style={styles.formTitle}>Confirm Password :</Text>
                <View style={[styles.inputText, {flexDirection:'row'}]}>
                    <TextInput
                        secureTextEntry={!showConfirmPassword}
                        placeholder="CONFIRM PASSWORD"
                        placeholderTextColor="#B3B3B3"
                        onChangeText={text => setState({ ...state, confirmPassword: text })} />
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
                <View style={{ width: '80%' }}>
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
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
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    formTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#57B4A1',
        alignSelf: 'flex-start'
    },
    errorText: {
        textAlign: 'left',
        color: 'red',
        alignSelf: "flex-start"
    },
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
        height: 60,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingLeft: 10,
        marginBottom: 10,
        fontSize: 14
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
