import React, { useCallback, useEffect, useState } from 'react';
import {
    Platform,
    View,
    Alert,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text as TextRn,
    ActivityIndicator,
    Linking,
    ImageBackground,
    StatusBar
} from 'react-native';
StatusBar.setHidden(true);
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Block, Button, Input, Image, Checkbox } from '../components';
import { useData, useTheme, useTranslation } from '../hooks';

const ImgBkkbn = require('../assets/images/bkkbn.png');
const isAndroid = Platform.OS === 'android';

const Login = () => {

    const { assets, colors, gradients, sizes } = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('Home');
    }

    const isVisiblePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/images/login1.png')}
                style={{ flex: 1 }}
            >
                <Block safe style={{ width: '100%', height: '100%', marginTop: 20 }}>
                    <Block >
                        <View
                            style={{
                                // display: 'flex',
                                alignItems: 'center',
                                paddingBottom: 50,
                                zIndex: 2,
                            }}>
                            <View style={{ marginTop: 100 }}>
                                <Image
                                    width={132}
                                    height={53}
                                    radius={0}
                                    // marginBottom={sizes.sm}
                                    source={ImgBkkbn}
                                />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 30, paddingTop: 0 }}>
                            <View style={{ paddingHorizontal: 30, paddingTop: 0, fontFamily: 'poppins-regular', alignItems: 'center' }}>
                                <TextRn marginBottom={sizes.sm} style={{
                                    fontSize: 17,
                                    fontWeight: 700,
                                    position: "absolute",
                                    // color: "#fff",
                                }}>
                                    SIGA - Sistem Informasi Keluarga
                                </TextRn>
                                <TextRn marginBottom={sizes.sm} size={10}>
                                </TextRn>
                                <TextRn marginBottom={sizes.sm} size={10}>
                                    VERVAL KELUARGA RESIKO STUNTING
                                </TextRn>

                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <TextInput
                                    value={username}
                                    style={styles.input}
                                    onChangeText={(value) => setUsername(value)}
                                    placeholder="Masukkan Nama Pengguna"
                                    placeholderTextColor="#666B6E"
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={[styles.input, { marginBottom: 10, flexDirection: 'row' }]}>
                                <TextInput
                                    value={password}
                                    style={{ flex: 1, fontSize: 16 }}
                                    onChangeText={(value) => setPassword(value)}
                                    placeholder="Masukkan Kata Sandi"
                                    placeholderTextColor="#666B6E"
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    style={{ position: 'absolute', right: 15, top: 15 }}
                                    onPress={isVisiblePassword}
                                >
                                    {showPassword ? (
                                        <MaterialCommunityIcons
                                            name="eye-off"
                                            size={20}
                                            color="#B2B2B2"
                                        />
                                    ) : (
                                        <MaterialCommunityIcons
                                            name="eye"
                                            size={20}
                                            color="#B2B2B2"
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>

                            <Button
                                color={'#2369AF'}
                                height={50}
                                shadow={!isAndroid}
                                onPress={(e) => handleLogin(e)}>
                                <TextRn style={{ color: '#fff', fontSize: 18  }}>
                                    Masuk
                                </TextRn>
                            </Button>
                            {/* <TouchableOpacity style={{ alignSelf: 'flex-end', marginVertical: 8 }}>
                                <TextRn style={{color: '#555'}}>Lupa kata sandi?</TextRn>
                            </TouchableOpacity> */}

                            <Block
                                row
                                flex={0}
                                align="center"
                                justify="center"
                                marginTop={100}
                                marginBottom={10}
                                paddingHorizontal={sizes.sm}>
                                <Block
                                    flex={0}
                                    height={1}
                                    width="40%"
                                    end={[1, 0]}
                                    start={[0, 1]}
                                    gradient={gradients.divider}
                                />
                                <TextRn>
                                    <MaterialCommunityIcons
                                        name="menu-down"
                                        size={24}
                                        color="#cdcdcd"
                                    />
                                </TextRn>
                                <Block
                                    flex={0}
                                    height={1}
                                    width="40%"
                                    end={[0, 1]}
                                    start={[1, 0]}
                                    gradient={gradients.divider}
                                />
                            </Block>
                            <View style={{ alignItems: 'center' }}>
                                <TextRn
                                    style={{
                                        color: '#555',
                                        fontSize: 12,
                                    }}>
                                    Copyright © BKKBN 2023 | v1.0.0
                                </TextRn>
                            </View>
                        </View>

                        {/* register form */}
                        {/* <Block
              keyboard
              behavior={!isAndroid ? 'padding' : 'height'}
              marginTop={-(sizes.height * 0.2 - sizes.l)}></Block> */}
                    </Block>
                </Block>
            </ImageBackground>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        height: 55,
        paddingLeft: 10,
        color: '#555',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#B2B2B2'
    },
});
