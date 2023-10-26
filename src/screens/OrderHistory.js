import React, { useState } from "react";
import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Block, Image } from "../components";
import { useTheme } from "../hooks";

export default function OrderHistory() {
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
                <TextRn style={styles.title}>
                    ORDER HISTORY
                </TextRn>
            </View>
            <ScrollView>
                <View style={styles.subTitleBox}>
                    <TextRn style={{ fontSize: 20, fontWeight: 'bold', color: '#1C7360' }}>TODAY</TextRn>
                    <TouchableOpacity onPress={handleAdd} style={styles.add}>
                        <MaterialCommunityIcons name="plus" size={18} color="#9EBCB6" />
                        <TextRn style={{ color: '#9EBCB6' }}>NEW ORDER</TextRn>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.boxKiri, { backgroundColor: '#FFE5E5' }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <Image
                                style={{ marginBottom: 10 }}
                                source={require('../assets/images/organic.png')}
                            />
                            <TextRn style={{ fontWeight: 'bold' }}>Organic</TextRn>
                        </View>
                    </View>
                    <View style={[styles.boxKanan, { backgroundColor: '#FFB2B2', }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <TextRn style={{ marginBottom: 5 }}>02-10-2023</TextRn>
                            <TextRn style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>ID: Order ID#</TextRn>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="trash-can" size={24} color="black" />
                                <TextRn style={{ fontSize: 20, fontWeight: 'bold' }}>B3</TextRn>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: '#ffffff', padding: 5, marginBottom: 10 }}>
                                <TextRn style={{ color: '#A2A2A2' }}>Requested</TextRn>
                            </TouchableOpacity>
                            <TextRn style={{ fontWeight: 'bold' }}>Earnings</TextRn>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.boxKiri, { backgroundColor: '#FFE5E5' }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <Image
                                style={{ marginBottom: 10 }}
                                source={require('../assets/images/organic.png')}
                            />
                            <TextRn style={{ fontWeight: 'bold' }}>Organic</TextRn>
                        </View>
                    </View>
                    <View style={[styles.boxKanan, { backgroundColor: '#FFB2B2', }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <TextRn style={{ marginBottom: 5 }}>02-10-2023</TextRn>
                            <TextRn style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>ID: Order ID#</TextRn>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="trash-can" size={24} color="black" />
                                <TextRn style={{ fontSize: 20, fontWeight: 'bold' }}>B3</TextRn>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: '#ffffff', padding: 5, marginBottom: 10 }}>
                                <TextRn style={{ color: '#E90606' }}>Error</TextRn>
                            </TouchableOpacity>
                            <TextRn style={{ fontWeight: 'bold' }}>Earnings</TextRn>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.boxKiri, { backgroundColor: '#F9F3CC' }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <Image
                                style={{ marginBottom: 10 }}
                                source={require('../assets/images/recycle.png')}
                            />
                            <TextRn style={{ fontWeight: 'bold' }}>Kardus</TextRn>
                        </View>
                    </View>
                    <View style={[styles.boxKanan, { backgroundColor: '#F9E5B1', }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <TextRn style={{ marginBottom: 5 }}>02-10-2023</TextRn>
                            <TextRn style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>ID: Order ID#</TextRn>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="trash-can" size={24} color="black" />
                                <TextRn style={{ fontSize: 20, fontWeight: 'bold' }}>A3</TextRn>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: '#ffffff', padding: 5, marginBottom: 10 }}>
                                <TextRn style={{ color: '#0EB3D8' }}>Picking-up</TextRn>
                            </TouchableOpacity>
                            <TextRn style={{ fontWeight: 'bold' }}>Earnings</TextRn>
                        </View>
                    </View>
                </View>
                <View style={styles.subTitleBox}>
                    <TextRn style={{ fontSize: 20, fontWeight: 'bold', color: '#1C7360' }}>YESTERDAY</TextRn>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.boxKiri, { backgroundColor: '#CDFAD5' }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <Image
                                style={{ marginBottom: 10 }}
                                source={require('../assets/images/recycle.png')}
                            />
                            <TextRn style={{ fontWeight: 'bold' }}>Plastic</TextRn>
                        </View>
                    </View>
                    <View style={[styles.boxKanan, { backgroundColor: '#A1EDCD', }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <TextRn style={{ marginBottom: 5 }}>02-10-2023</TextRn>
                            <TextRn style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>ID: Order ID#</TextRn>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="trash-can" size={24} color="black" />
                                <TextRn style={{ fontSize: 20, fontWeight: 'bold' }}>C3</TextRn>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: '#ffffff', padding: 5, marginBottom: 10 }}>
                                <TextRn style={{ color: '#D07E1E' }}>Pending</TextRn>
                            </TouchableOpacity>
                            <TextRn style={{ fontWeight: 'bold' }}>Earnings</TextRn>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.boxKiri, { backgroundColor: '#CAEDFF' }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <Image
                                style={{ marginBottom: 10 }}
                                source={require('../assets/images/anorganic.png')}
                            />
                            <TextRn style={{ fontWeight: 'bold' }}>Anorganic</TextRn>
                        </View>
                    </View>
                    <View style={[styles.boxKanan, { backgroundColor: '#ABE1FF', }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <TextRn style={{ marginBottom: 5 }}>02-10-2023</TextRn>
                            <TextRn style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>ID: Order ID#</TextRn>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="trash-can" size={24} color="black" />
                                <TextRn style={{ fontSize: 20, fontWeight: 'bold' }}>D3</TextRn>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: '#ffffff', padding: 5, marginBottom: 10 }}>
                                <TextRn style={{ color: '#00BA6C' }}>Completed</TextRn>
                            </TouchableOpacity>
                            <TextRn style={{ fontWeight: 'bold' }}>Earnings</TextRn>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Block>
    );
}

const styles = StyleSheet.create({
    add: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#9EBCB6',
        padding: 5,
        alignItems: 'center'
    },
    subTitleBox: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: '#819994',
        fontWeight: 'bold',
        marginTop: 20
    },
    boxKiri: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        borderTopEndRadius: 0,
        borderBottomEndRadius: 0,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center'
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
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});
