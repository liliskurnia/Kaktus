import React, { useCallback, useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Text as TextRn,
    View,
    Alert,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { Block, Image, Text, ModalSelect, Input } from '../components';
import { useData, useTheme, useTranslation } from '../hooks';

export default function Home() {

    const { assets, colors, gradients, sizes } = useTheme();

    const data = [
        { imageUrl: require('../assets/images/stunting1.jpg') },
        { imageUrl: require('../assets/images/stunting6.png') },
        { imageUrl: require('../assets/images/stunting7.jpg') },
    ];

    const navigation = useNavigation();

    const [activeSlide, setActiveSlide] = React.useState(0);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Image source={item.imageUrl} style={styles.image} />
            </View>
        );
    };

    return (
        <Block flex={1} style={{ backgroundColor: '#068FFF' }}>
            <View style={{ flexDirection: 'row', margin: 10, marginTop:30 }}>
                <TouchableOpacity onPress={() => Alert.alert('Menu ditekan')}>
                    <MaterialCommunityIcons name="menu" size={24} color="white" />
                </TouchableOpacity>
                <View flex={1}>
                    <TextRn
                        style={{
                            paddingLeft: 17,
                            fontFamily: 'poppins-bold',
                            fontSize: 16,
                            position: 'absolute',
                            color: '#fff',
                            marginTop:5
                        }}>
                        SIGA - Sistem Informasi Keluarga
                    </TextRn>
                </View>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Block row flex={0} align="center" marginRight={sizes.sm}>
                        <TouchableOpacity
                            style={{ marginRight: 12 }}
                            onPress={() => Alert.alert('Notifikasi ditekan')}
                            >
                            <MaterialCommunityIcons
                                name="bell-outline"
                                size={22}
                                color="#f4ecde"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <MaterialCommunityIcons
                                name="logout"
                                size={22}
                                color="#f4ecde"
                            />
                        </TouchableOpacity>
                    </Block>
                </View>
            </View>
            <View>
                <Input style={{ backgroundColor: '#fff', margin: 20, borderRadius: 10 }} >
                    <Ionicons name="search" size={24} color="#27374D" style={{ marginRight: 10 }} />
                </Input>
            </View>
            <ScrollView>
                <View style={{ backgroundColor: '#EEEEEE', height: '100%', borderRadius: 30, borderBottomEndRadius:0, borderBottomStartRadius:0 }}>
                    <Block
                        scroll
                        paddingHorizontal={sizes.sm}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ backgroundColor: '#fff', marginBottom: 10, marginTop: 20, padding: 10, borderRadius: 10 }}>
                        <View style={styles.container}>
                            <Carousel
                                data={data}
                                renderItem={renderItem}
                                sliderWidth={300}
                                itemWidth={300}
                                layout={'default'}
                                onSnapToItem={(index) => setActiveSlide(index)}
                            />
                            <Pagination
                                dotsLength={data.length}
                                activeDotIndex={activeSlide}
                                containerStyle={styles.paginationContainer}
                                dotStyle={styles.paginationDot}
                                inactiveDotStyle={styles.paginationInactiveDot}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                            />
                        </View>
                    </Block>

                    <Block
                        scroll
                        paddingHorizontal={sizes.sm}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            backgroundColor: '#2192FF',
                            marginBottom: 10,
                            padding: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Block flex={0} marginTop={10} marginBottom={10} padding={5}>
                            <Ionicons name="people" size={70} color="white" />
                        </Block>
                        <Block flex={0} marginTop={10} marginBottom={10} padding={5} >
                            <Text white bold>TPK Clara Setyo Hanani</Text>
                            <Text white style={{ fontStyle: 'italic' }}>3501012001F1</Text>
                            <Block flexDirection="row" alignItems="center">
                                <MaterialCommunityIcons name="google-maps" size={24} color="white" />
                                <Text white style={{ alignItems: 'center' }}>Pusat</Text>
                            </Block>
                        </Block>
                    </Block>

                    <Block
                        scroll
                        paddingHorizontal={sizes.sm}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom:20 }}>
                        <Block flex={0} marginTop={10} marginBottom={10}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: 5,
                                }}>
                                <View style={{ flex: 6, marginLeft: 7,  }}>
                                    <Text bold>Layanan</Text>
                                </View>
                            </View>
                            <Block flex={0}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly',
                                    }}>
                                    <View style={styles.circleBody}>
                                        <TouchableOpacity
                                            style={styles.circleMenuTouch}
                                            onPress={() => navigation.navigate('TambahDataKeluarga')}>
                                            <View style={styles.circleMenu}>
                                                <MaterialCommunityIcons
                                                    name="account-plus"
                                                    size={34}
                                                    color="#fff"
                                                />
                                            </View>
                                            <TextRn
                                                style={{ fontSize: 12, fontFamily: 'poppins-regular', margin:10, marginTop:5}}>
                                                Tambah Data Keluarga
                                            </TextRn>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.circleBody}>
                                        <TouchableOpacity
                                            style={styles.circleMenuTouch}
                                            onPress={() => Alert.alert('Menu stunting ditekan')}>
                                            <View style={styles.circleMenu}>
                                                <MaterialCommunityIcons
                                                    name="human-male-height"
                                                    size={38}
                                                    color="#fff"
                                                />
                                            </View>
                                            <TextRn
                                                style={{ fontSize: 12, fontFamily: 'poppins-regular', margin:10, marginTop:5}}>
                                                Profile
                                            </TextRn>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.circleBody}>
                                        <TouchableOpacity
                                            style={styles.circleMenuTouch}
                                            onPress={() => Alert.alert('Menu detail data keluarga ditekan')}>
                                            <View style={styles.circleMenu}>
                                                <MaterialCommunityIcons
                                                    name="account-details"
                                                    size={34}
                                                    color="#fff"
                                                />
                                            </View>
                                            <TextRn
                                                style={{ fontSize: 12, fontFamily: 'poppins-regular', margin:10, marginTop:5}}>
                                                Detail Data Keluarga
                                            </TextRn>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.circleBody}>
                                        <TouchableOpacity
                                            style={styles.circleMenuTouch}
                                        onPress={() => Alert.alert('Menu 1 ditekan')}
                                        >
                                            <View style={styles.circleMenu}>
                                                <MaterialCommunityIcons
                                                    name="numeric-1-box-multiple"
                                                    size={34}
                                                    color="#fff"
                                                />
                                            </View>
                                            <TextRn
                                                style={{ fontSize: 12, fontFamily: 'poppins-regular', margin:10, marginTop:5}}>
                                                Profile
                                            </TextRn>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly',
                                        marginTop: 10,
                                    }}>
                                    <View style={styles.circleBody}>
                                        <TouchableOpacity
                                            style={styles.circleMenuTouch}
                                        onPress={() => Alert.alert('Menu 2 ditekan')}
                                        >
                                            <View style={styles.circleMenu}>
                                                <MaterialCommunityIcons
                                                    name="numeric-2-box-multiple"
                                                    size={34}
                                                    color="#fff"
                                                />
                                            </View>
                                            <TextRn
                                                style={{ fontSize: 12, fontFamily: 'poppins-regular', margin:10, marginTop:5}}>
                                                Draft
                                            </TextRn>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.circleBody}>
                                        <TouchableOpacity
                                            style={styles.circleMenuTouch}
                                        onPress={() =>Alert.alert('Menu 3 ditekan')}
                                        >
                                            <View style={styles.circleMenu}>
                                                <MaterialCommunityIcons
                                                    name="numeric-3-box-multiple"
                                                    size={34}
                                                    color="#fff"
                                                />
                                            </View>
                                            <TextRn
                                                style={{ fontSize: 12, fontFamily: 'poppins-regular', margin:10, marginTop:5}}>
                                                Backup
                                            </TextRn>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.circleBody}>
                                        <TouchableOpacity
                                            style={styles.circleMenuTouch}
                                        onPress={() => Alert.alert('Menu 4 ditekan')}
                                        >
                                            <View style={styles.circleMenu}>
                                                <MaterialCommunityIcons
                                                    name="numeric-4-box-multiple"
                                                    size={38}
                                                    color="#fff"
                                                />
                                            </View>
                                            <TextRn
                                                style={{ fontSize: 12, fontFamily: 'poppins-regular', margin:10, marginTop:5}}>
                                                Restrore
                                            </TextRn>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        marginTop: 10,
                                    }}>
                                </View>
                            </Block>
                        </Block>
                    </Block>
                </View>
            </ScrollView>
        </Block>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:30
    },
    slide: {
        width: 300,
        height: 150,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: -20,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
    },
    paginationInactiveDot: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    circleBody: {
        width: 85,
        alignItems: 'center',
    },
    circleMenu: {
        width: 60,
        height: 60,
        backgroundColor: '#B70404',
        borderWidth: 1,
        borderColor: '#f4f4f4',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleMenu1: {
        width: 60,
        height: 60,
        backgroundColor: '#E02828',
        borderWidth: 1,
        borderColor: '#f4f4f4',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleMenuTouch: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCarousel: {
        flex: 1,
        paddingVertical: 20,
        borderRadius: 12,
    },
    textSubTitleCarousel: {
        fontSize: 19,
        fontFamily: 'poppins-regular',
    },
    textSubTitleCarouselWhite: {
        fontSize: 19,
        fontFamily: 'poppins-regular',
        color: 'white',
    },
    textTitleCarousel: {
        fontSize: 22,
        fontFamily: 'poppins-bold',
    },
    textCountryCarousel: {
        fontFamily: 'poppins-bold',
        fontSize: 24,
        lineHeight: 40,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: -32,
        zIndex: 1,
        borderBottomWidth: 3,
        borderBottomColor: '#FF6961',
    },
});