import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Manual1() {
    const [state, setState] = useState({
        nik: '',
        nama: '',
        alamat: '',
        kota: '',
        gender: '',
    })
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});

    const handleNext = () => {

        //field required
        const validationErrors = {};

        if (!state.nik) {
            validationErrors.nik = '*Nik is required';
        }
        if (state.nik && (state.nik.length < 12 || state.nik.length > 16)) {
            validationErrors.nik = '*Nik must be 12 - 16 numbers';
        }
        if (!state.nama) {
            validationErrors.nama = '*Name is required';
        }
        if (!state.alamat) {
            validationErrors.alamat = '*Address is required';
        }
        if (!state.kota) {
            validationErrors.kota = '*City is required';
        }
        if (!state.gender) {
            validationErrors.gender = '*Gender is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const registrationData = {
            nik: state.nik,
            nama: state.nama,
            alamat: state.alamat,
            kota: state.kota,
            gender: state.gender,
        };

        console.log('registrationData', registrationData);

        navigation.navigate('Manual2', { registrationData });
    };

    const handleCancle = () => {
        navigation.navigate('Register')
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50, color: '#57B4A1' }}>SIGN-UP</Text>
            <Text style={{ marginTop: 20, marginBottom: 20, color: '#B3B3B3', fontSize: 20 }}>Sign-up to continue your journey with us!</Text>
            <ScrollView>
                <Text style={styles.formTitle}>NIK :</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="NIK"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ ...state, nik: text })} />
                <View style={{ width: '80%' }}>
                    {errors.nik && <Text style={styles.errorText}>{errors.nik}</Text>}
                </View>
                <Text style={styles.formTitle}>Full Name :</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="FULL NAME"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ ...state, nama: text })} />
                <View style={{ width: '80%' }}>
                    {errors.nama && <Text style={styles.errorText}>{errors.nama}</Text>}
                </View>
                <Text style={styles.formTitle}>Address :</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="ADDRESS"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ ...state, alamat: text })} />
                <View style={{ width: '80%' }}>
                    {errors.alamat && <Text style={styles.errorText}>{errors.alamat}</Text>}
                </View>
                <Text style={styles.formTitle}>City :</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="CITY"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ ...state, kota: text })} />
                <View style={{ width: '80%' }}>
                    {errors.kota && <Text style={styles.errorText}>{errors.kota}</Text>}
                </View>
                <Text style={styles.formTitle}>Gender :</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="GENDER"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ ...state, gender: text })} />
                <View style={{ width: '80%' }}>
                    {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                    <View style={styles.cancel}>
                        <TouchableOpacity onPress={handleCancle}>
                            <Text style={styles.textbtn}>
                                CANCEL
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.next}>
                        <TouchableOpacity onPress={handleNext}>
                            <Text style={styles.textbtn}>
                                NEXT
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
        backgroundColor: '#D9D9D9',
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
