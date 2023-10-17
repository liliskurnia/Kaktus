import React, { useCallback, useEffect, useState } from "react";
import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
    ScrollView,
    Dimensions,
    TextInput
} from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Block, Image, Text, ModalSelect, Input } from "../components";
import { useData, useTheme, useTranslation } from "../hooks";

export default function PickUp() {
    const { assets, colors, gradients, sizes } = useTheme();
    const [state, setState] = useState({
        name: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        garbageType: '',
        garbageId: ''
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
        <Block flex={1} style={{ backgroundColor: "#fff" }}>
            <View
                style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    marginTop: 30,
                    marginHorizontal: 20,
                    justifyContent: 'space-between'
                }}
            >
                <Image
                    style={{ width: '45%', height: '150%' }}
                    source={require('../assets/images/kaktus.png')}
                />
                <View style={{ alignSelf: "flex-end" }}>
                    <Block
                        row
                        flex={0}
                        align="center"
                        marginRight={sizes.sm}
                        marginTop={5}
                    >
                        <TouchableOpacity
                            onPress={() => Alert.alert("Notifikasi ditekan")}
                        >
                            <MaterialCommunityIcons
                                name="bell-outline"
                                size={22}
                                color="#1C7360"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <MaterialCommunityIcons name="android-messages" size={22} color="#1C7360" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons name="menu" size={22} color="#1C7360" />
                        </TouchableOpacity>
                    </Block>
                </View>
            </View>
            <View>
                <TextRn style={{ fontSize: 30, textAlign: 'center', color: '#819994', fontWeight: 'bold', marginTop: 20 }}>
                    ORDER PICK-UP
                </TextRn>
            </View>
            <TextInput
                style={styles.inputText}
                placeholder="FULL NAME"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ name: text })} />
            <TextInput
                style={styles.inputText}
                placeholder="PHONE NUMBER"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ phone: text })} />
            <TextInput
                style={styles.inputText}
                placeholder="ADDRESS"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ address: text })} />
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={[styles.inputText, { width: '33%' }]}
                    placeholder="DATE"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ date: text })} />
                <TextInput
                    style={[styles.inputText, { width: '33%' }]}
                    placeholder="TIME"
                    placeholderTextColor="#B3B3B3"
                    onChangeText={text => setState({ time: text })} />
            </View>
            <TextInput
                style={styles.inputText}
                placeholder="GARBAGE TYPE"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ garbageType: text })} />
            <TextInput
                style={styles.inputText}
                placeholder="GARBAGE ID"
                placeholderTextColor="#B3B3B3"
                onChangeText={text => setState({ garbageId: text })} />
            <TouchableOpacity style={{margin: 10, alignSelf:'center', backgroundColor:'#57B4A1', borderRadius:10, padding:10}}>
                <TextRn style={{fontSize:20, fontWeight:'bold', color:'#ffffff', margin:10}}>CONFIRM ORDER</TextRn>
            </TouchableOpacity>
        </Block>
    );
}

const styles = StyleSheet.create({
    inputText: {
        height: 70,
        // width: '80%',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingLeft: 10,
        marginBottom: 10,
        fontSize: 20,
        marginHorizontal: 30
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
