import React, {useState } from 'react';
import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Block, Image} from '../components';
import { useTheme} from '../hooks';
import { Searchbar } from 'react-native-paper';
import Modal from "react-native-modal";

export default function Vouchers() {
    const { assets, colors, gradients, sizes } = useTheme();
    const navigation = useNavigation();
    const [search, setSearch] = React.useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleClaim = () => {
        setModalSuccess(!modalSuccess)
    }

    const onChangeSearch = search => setSearch(search);

    const handleConfirm = () => {
        Alert.alert("Voucher", `Your voucher ready to use !`, [
            {
                text: "OK",
                onPress: async () => {
                    navigation.navigate("HomeScreen");
                },
            },
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
            <View style={styles.box}>
                <Image
                    style={{ alignSelf: 'flex-start', margin: 5, flexDirection: 'column' }}
                    source={require('../assets/images/profil.png')}
                />
                <View style={{ flexDirection: 'column' }}>
                    <TextRn style={{ flexDirection: 'row', fontSize: 30, fontWeight: 'bold', margin: 10, color: '#3B4341' }}>
                        Michael Cactus
                    </TextRn>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Image
                            style={{ flexDirection: 'column' }}
                            source={require('../assets/images/point.png')}
                        />
                        <TextRn style={{ flexDirection: 'column', color: '#3B4341' }}>4,483 Points</TextRn>
                    </View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Image
                        style={{ flexDirection: 'row', alignSelf: 'center' }}
                        source={require('../assets/images/trash.png')}
                    />
                    <TextRn style={{ flexDirection: 'row', textAlign: 'center', color: '#3B4341' }}>Exchange</TextRn>
                    <TextRn style={{ flexDirection: 'row', textAlign: 'center', color: '#3B4341' }}>Points</TextRn>
                </View>
            </View>
            <ScrollView>
                <Searchbar
                    style={{ backgroundColor: '#EEEEEE', marginHorizontal: 30, borderRadius: 15 }}
                    placeholder="Enter promo code"
                    onChangeText={onChangeSearch}
                    value={search}
                />
                <View style={styles.title}>
                    <TextRn style={{ fontSize: 20, fontWeight: 'bold', color: '#1C7360' }}>RECOMENDED</TextRn>
                    <TouchableOpacity style={styles.button}>
                        <TextRn style={{ color: '#9EBCB6' }}>ALL PROMOS</TextRn>
                    </TouchableOpacity>
                </View>
                <View style={styles.vouchers}>

                </View>
                <View style={styles.vouchersBottom}>
                    <TouchableOpacity onPress={toggleModal} style={styles.buttonReward}>
                        <TextRn style={styles.textbtn}>CLAIM REWARD</TextRn>
                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <TextRn style={{ fontSize: 20, fontWeight: 'bold', color: '#1C7360' }}>FROM BAZNAZ</TextRn>
                    <TouchableOpacity style={styles.button}>
                        <TextRn style={{ color: '#9EBCB6' }}>ALL PROMOS</TextRn>
                    </TouchableOpacity>
                </View>
                <View style={styles.vouchers}>

                </View>
                <View style={styles.vouchersBottom}>
                    <TouchableOpacity onPress={toggleModal} style={styles.buttonReward}>
                        <TextRn style={styles.textbtn}>CLAIM REWARD</TextRn>
                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <TextRn style={{ fontSize: 20, fontWeight: 'bold', color: '#1C7360' }}>PROMO VOUCHERS</TextRn>
                    <TouchableOpacity style={styles.button}>
                        <TextRn style={{ color: '#9EBCB6' }}>ALL PROMOS</TextRn>
                    </TouchableOpacity>
                </View>
                <View style={styles.vouchers}>

                </View>
                <View style={styles.vouchersBottom}>
                    <TouchableOpacity onPress={toggleModal} style={styles.buttonReward}>
                        <TextRn style={styles.textbtn}>CLAIM REWARD</TextRn>
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 30, marginTop: 30 }}>
                    <TextRn style={{ fontSize: 20, fontWeight: 'bold', color: '#819994' }}>MY ACCOUNT</TextRn>
                </View>
                <View style={styles.field}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="cactus" size={35} color="#819994" />
                            <TextRn style={styles.text}>Cactus Rewards</TextRn>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../assets/images/point.png')}
                                style={{ marginRight: 10 }}
                            />
                            <TextRn style={{ fontSize: 18, fontWeight: 'bold', color: '#819994' }}>4,483 Points</TextRn>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal isVisible={isModalVisible}>
                <View style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 10, flexDirection: 'column' }}>
                    <TextRn style={{ color: '#819994', textAlign: 'center', fontSize: 18 }}>Are you sure you want to claim the reward below for ### Points?</TextRn>
                    <View style={{ height: 100, backgroundColor: '#F2F2F2', marginVertical: 10, borderRadius: 10 }}>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={toggleModal} style={[styles.buttonModal, { backgroundColor: '#9EBCB6' }]}>
                            <TextRn style={[styles.textbtn, { fontSize: 20 }]}>CANCEL</TextRn>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleClaim} style={[styles.buttonModal, { backgroundColor: '#57B4A1' }]}>
                            <TextRn style={[styles.textbtn, { fontSize: 20 }]}>CLAIM</TextRn>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal isVisible={modalSuccess}>
                <View style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 10, flexDirection: 'column' }}>
                    <TextRn style={{ color: '#57B4A1', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Claim Successful!</TextRn>
                    <View style={{ height: 100, backgroundColor: '#F2F2F2', marginVertical: 10, borderRadius: 10 }}>

                    </View>
                    <TouchableOpacity onPress={handleConfirm} style={[styles.buttonModal, { backgroundColor: '#57B4A1', alignSelf: 'center' }]}>
                        <TextRn style={[styles.textbtn, { fontSize: 20 }]}>CONFIRM</TextRn>
                    </TouchableOpacity>
                </View>
            </Modal>
        </Block>

    );
}

const styles = StyleSheet.create({
    textbtn: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonModal: {
        padding: 10,
        borderRadius: 15,
        width: '40%',
        marginVertical: 10,
        paddingVertical: 15
    },
    buttonReward: {
        backgroundColor: '#57B4A1',
        borderRadius: 15,
        padding: 5,
        width: '35%',
        marginRight: 10,
        paddingVertical: 10
    },
    vouchers: {
        backgroundColor: '#D9D9D9',
        width: '83%',
        height: '15%',
        marginVertical: 10,
        marginHorizontal: 30,
        borderRadius: 10,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0
    },
    vouchersBottom: {
        backgroundColor: '#F2F2F2',
        width: '83%',
        height: '8%',
        marginTop: -10,
        marginHorizontal: 30,
        borderRadius: 10,
        borderTopEndRadius: 0,
        borderTopStartRadius: 0,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    title: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#9EBCB6',
        padding: 5,
        alignItems: 'center'
    },
    box: {
        width: 300,
        height: 80,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffffff',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 30,
        marginTop: 30,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    }
});