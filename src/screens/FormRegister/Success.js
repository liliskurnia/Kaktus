import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Success() {
    const navigation = useNavigation();

    const handleSignIn = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <Image
                style={{marginTop:20}}
                source={require('../../assets/images/kaktus.png')}
            />
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50, color: '#57B4A1' }}>ACCOUNT ACTIVATION SUCCESSFUL</Text>
            <TouchableOpacity
                onPress={handleSignIn}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>SIGN IN</Text>
            </TouchableOpacity>
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
