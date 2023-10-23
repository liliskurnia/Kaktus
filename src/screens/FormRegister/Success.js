import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
            <Text style={styles.text}>ACCOUNT ACTIVATION SUCCESSFUL</Text>
            <TouchableOpacity
                onPress={handleSignIn}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>SIGN IN</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    text: {
        fontSize: 30, 
        fontWeight: 'bold', 
        marginTop: 50, 
        color: '#57B4A1', 
        width:'80%', 
        textAlign:'center'
    }
});
