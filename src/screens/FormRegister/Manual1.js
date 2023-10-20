import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Manual1() {
    const [state, setState] = useState({
        nik: '',
        name: '',
        address: '',
        city: '',
        gender: '',
    })
    const navigation = useNavigation();

    const handleNext = () => {
        const registrationData = {
            nik: state.nik,
            name: state.name,
            address: state.address,
            city: state.city,
            gender: state.gender,
        };

        console.log('registrationData', registrationData)
        
        navigation.navigate('Manual2', { registrationData });
        
    }

    const handleCancle = () => {
        navigation.navigate('Register')
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.box}> */}
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50, color: '#57B4A1' }}>SIGN-UP</Text>
            <Text style={{ marginTop: 20, marginBottom: 20, color: '#B3B3B3', fontSize: 20 }}>Sign-up to continue your journey with us!</Text>
            <TextInput
                style={styles.inputText}
                placeholder="NIK"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ ...state, nik: text })} />
            <TextInput
                style={styles.inputText}
                placeholder="FULL NAME"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ ...state, name: text })} />
            <TextInput
                style={styles.inputText}
                placeholder="ADDRESS"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ ...state, address: text })} />
            <TextInput
                style={styles.inputText}
                placeholder="CITY"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ ...state, city: text })} />
            <TextInput
                style={styles.inputText}
                placeholder="GENDER"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ ...state, gender: text })} />
            <View style={{ flexDirection: 'row', marginTop:100 }}>
                <View style={styles.cancel}>
                    <TouchableOpacity onPress={handleCancle}>
                        <Text style={styles.textbtn}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.next}>
                    <TouchableOpacity  onPress={handleNext}>
                        <Text style={styles.textbtn}>
                            NEXT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textbtn: {
        color:'#ffffff', 
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign:'center' 
    },
    cancel: {
        justifyContent:'center', 
        flexDirection: 'column', 
        padding:10, 
        backgroundColor:'#D9D9D9', 
        borderRadius:10, width:'40%', 
        height:'40%', 
        marginRight:10 
    },
    next: {
        justifyContent:'center', 
        flexDirection: 'column', 
        padding:10, 
        backgroundColor:'#57B4A1', 
        borderRadius:10, 
        width:'40%',  
        height:'40%'
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
