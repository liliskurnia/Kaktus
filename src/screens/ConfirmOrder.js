import React, { useState } from "react";
import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Block, Image } from "../components";
import { useTheme } from "../hooks";

export default function ConfirmOrder() {
    const { assets, colors, gradients, sizes } = useTheme();
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate('HomeScreen')
    }

    const handleEdit = () => {
        navigation.navigate('PickUp')
    }

    const handleOrder = () => {
        navigation.navigate('OrderHistory')
    }

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
            <View style={{ marginVertical: 50, alignItems: 'center' }}>
                <TextRn style={{ width: '70%', fontSize: 40, textAlign: 'center', color: '#57B4A1', fontWeight: 'bold' }}>
                    REGISTRATION SUCCESSFUL
                </TextRn>
            </View>
            <View style={{alignItems:'center', marginBottom:100}}>
                <TextRn style={styles.text}>ORDER ID: 8920137</TextRn>
                <TextRn style={styles.text}>COLLECTION DATE: 1-10-2023 14:00</TextRn>
                <TextRn style={styles.text}>GARBAGE TYPE: B3 - ORGANIC</TextRn>
                <TextRn style={styles.text}>ADDRESS: JL. SAMPLE ADDRESS NO.32</TextRn>
            </View>
            <TouchableOpacity onPress={handleOrder} style={[styles.buttonEdit, { borderWidth: 2, borderColor: '#57B4A1' }]}>
                <TextRn style={[styles.textButton, { color: '#57B4A1' }]}>VIEW ORDER</TextRn>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEdit} style={[styles.buttonEdit, { borderWidth: 2, borderColor: '#E8D79A' }]}>
                <TextRn style={[styles.textButton, { color: '#E8D79A' }]}>EDIT ORDER</TextRn>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBack} style={styles.button}>
                <TextRn style={[styles.textButton, { color: '#ffffff' }]}>RETURN TO HOME</TextRn>
            </TouchableOpacity>
        </Block>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#819994',
        fontSize: 18,
        fontWeight:'bold',
        textAlign:'left'
    },
    button: {
        width: '80%',
        margin: 10,
        alignSelf: 'center',
        backgroundColor: '#57B4A1',
        borderRadius: 10,
        padding: 10
    },
    buttonEdit: {
        width: '80%',
        margin: 10,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10
    },
    textButton: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center'
    }
});
