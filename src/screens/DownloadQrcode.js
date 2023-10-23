import React, { useCallback, useEffect, useState } from "react";
import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Block, Image, Text, ModalSelect, Input } from "../components";
import { useData, useTheme, useTranslation } from "../hooks";

export default function DownloadBarcode() {
    const { assets, colors, gradients, sizes } = useTheme();
    const navigation = useNavigation();

    const handleAdd = () => {
        navigation.navigate('PickUp')
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
                    QRCODE
                </TextRn>
            </View>
        </Block>
    );
}

const styles = StyleSheet.create({
    boxKiri: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        borderTopEndRadius: 0,
        borderBottomEndRadius: 0,
        width:'25%',
        alignItems:'center',
        justifyContent:'center'
    },
    boxKanan: {
        flexDirection: 'row',
        width: '58%',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        marginLeft: -30,
        borderTopStartRadius: 0,
        borderBottomStartRadius: 0,
        alignItems:'center',
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});
