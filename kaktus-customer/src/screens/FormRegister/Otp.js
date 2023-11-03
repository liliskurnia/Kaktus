import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../../../config';

export default function Otp() {
    const navigation = useNavigation();
    const route = useRoute();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [resendCountdown, setResendCountdown] = useState(60);

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < newOtp.length - 1) {
            inputs[index + 1].focus();
        }
    };


    const inputs = [];

    // const handleVerify = () => {
    //     navigation.navigate('Success');
    // };

    // Countdown timer
    useEffect(() => {
        let countdownInterval;
        if (resendCountdown > 0) {
            countdownInterval = setInterval(() => {
                setResendCountdown(resendCountdown - 1);
            }, 1000);
        } else {
            clearInterval(countdownInterval);
        }
        return () => {
            clearInterval(countdownInterval);
        };
    }, [resendCountdown]);

    const handleResendCode = () => {
        //resend
        setResendCountdown(60);
    };

    const handleVerify = async () => {

        const email = route.params.registrationData && route.params.registrationData.email;

        const otpString = otp.join('');

        const verifyData = {
            otp: otpString,
            email: email,
        };

        console.log('verifyData', verifyData)

        try {
            const response = await axios.post(`${BASE_URL}/api/v1/customers/verify/email`, verifyData);
            console.log('respon', response.data)

            if (response.status === 200) {
                navigation.navigate('Success');
            } else {
                Alert.alert('Error', 'Failed to verify. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to verify. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50, color: '#57B4A1' }}>SIGN-UP SUCCESSFUL</Text>
            <Image
                style={{ marginTop: 20 }}
                source={require('../../assets/images/kaktus.png')}
            />
            <Text style={{ color: '#B48F57', fontSize: 20, margin: 10 }}>Please Activate Your Account</Text>
            <Text style={{ color: '#B3B3B3', fontSize: 20, margin: 10, textAlign: 'center' }}>Please check for OTP-Code sent to your registered phone number</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20
            }}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.box}
                        maxLength={1}
                        keyboardType="numeric"
                        onChangeText={(value) => handleOtpChange(value, index)}
                        value={digit}
                        ref={(input) => {
                            inputs[index] = input; 
                        }}
                    />
                ))}

            </View>
            <TouchableOpacity
                onPress={handleVerify}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>VERIFY </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, margin: 10, textAlign: 'center' }}>Didn’t receive your OTP code?</Text>
            <Text style={{ color: '#B3B3B3', fontSize: 20 }}>Resend Code {`00:${String(resendCountdown).padStart(2, '0')}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        width: 40,
        height: 60,
        margin: 10,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 5
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#57B4A1",
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
