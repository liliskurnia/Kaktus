import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Scanner() {
    const navigation = useNavigation();
    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    const handlePressManual = () => {
        navigation.navigate('Manual1')
    }

    const handlePressScan = () => {
        navigation.navigate('Scanner')
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50, color: '#57B4A1' }}>SIGN-UP</Text>
            <Text style={{ marginTop: 30, marginBottom: 40, fontSize: 20, color: '#B3B3B3' }}>Please select your registration methode</Text>
            <TouchableOpacity
                onPress={handlePressManual}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Manual </Text>
            </TouchableOpacity>
            <Text style={{ color: '#B3B3B3' }}>OR</Text>
            <TouchableOpacity
                onPress={handlePressScan}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Scan e-KTP </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Already a member?</Text>
                <TouchableOpacity onPress={handleLoginPress}>
                    <Text style={{ color: '#57B4A1', fontSize: 15, fontWeight: 'bold' }}> Login </Text>
                </TouchableOpacity>
                <Text>here</Text>
            </View>

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
        width: 300,
        height: 400,
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
        backgroundColor: "#57B4A1",
        borderRadius: 10,
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
