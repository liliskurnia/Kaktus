import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PickUp() {
    const [state, setState] = useState({
        name: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        layanan: '',
    })

    const navigation = useNavigation();
    const handlePressSignUp = () => {
        Alert.alert('Register', 'Akun berhasil didaftarkan! Silahkan Login.', [
            {
                text: 'OK',
                onPress: () => navigation.navigate('Login'),
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 35, color: "#005B41", marginLeft: -140 }}>Good Afternoon,</Text>
            <Text style={{ fontWeight: "bold", fontSize: 35, color: "#005B41", marginLeft: -120, marginBottom: 20 }}>Kaktus Indonesia!</Text>
            <View style={styles.box}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 30, marginBottom: 20 }}>Pick Up</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="Full Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setState({ name: text })} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Phone"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setState({ phone: text })} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Address"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setState({ address: text })} />
                <View style={{ flexDirection: 'row'}}>
                    <View style={{ flexDirection: 'column', width:'45%', marginLeft:30 }}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Date"
                            placeholderTextColor="#003f5c"
                            onChangeText={text => setState({ date: text })} />
                    </View>
                    <View style={{ flexDirection: 'column', width:'45%' }}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Time"
                            placeholderTextColor="#003f5c"
                            onChangeText={text => setState({ time: text })} />
                    </View>
                </View>
                <TextInput
                    style={styles.inputText}
                    placeholder="Layanan"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setState({ layanan: text })} />
                <TouchableOpacity
                    // onPress={handlePressSignUp}
                    style={styles.loginBtn}>
                    <Text style={styles.loginText}>Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputText: {
        height: 50,
        width: '80%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        marginBottom: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 300,
        height: 500,
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
