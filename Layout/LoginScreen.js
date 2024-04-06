import { Image, StyleSheet, Text, TextInput, View, CheckBox, TouchableOpacity, ToastAndroid, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './HomeScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'


const LoginScreen = (props) => {
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [showPass, setshowPass] = useState(true);
    const [checkRemember, setcheckRemember] = useState(false);



    const CheckLogin = async () => {
        if (email == '') {
            Alert.alert('Email không được bỏ trống')
            return;
        }
        if (pass == '') {
            Alert.alert('Pass không được bỏ trống')
            return;
        }

        let url = `${URL}/users?email=` + email

        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(async data => {
                console.log(data);
                if (data.length != 1) {
                    Alert.alert('Email không chính xác');
                    return false;
                }
                const user = data[0];
                console.log(user);
                if (user.pass != pass) {
                    Alert.alert('Pass không chính xác')
                    return false;
                } else {
                    await AsyncStorage.setItem('User', JSON.stringify(user));
                    rememberAccount();
                    Alert.alert('Login thành công')
                    props.navigation.navigate('Main');
                }

            })
    }

    
    // hàm checkremember
    const rememberAccount = async () => {
        try {
            if (checkRemember) {
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('pass', pass);
            } else {
                await AsyncStorage.setItem('email', '');
                await AsyncStorage.setItem('pass', '');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // hàm lấy thông tin từ asyncStorage
    const retrieveData = async () => {
        try {
            const storedemail = await AsyncStorage.getItem('email');
            const storedPassword = await AsyncStorage.getItem('pass');
            if (storedemail !== null && storedPassword !== null) {
                setemail(storedemail);
                setpass(storedPassword);
                setcheckRemember(true);
            } else {
                setpass('');
                setcheckRemember(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        retrieveData()
    }, [])


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
                <Image style={{ width: 200, height: 200 }}
                    source={require('../Image/logo12.png')} />
                <View style={{ gap: 30 }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', justifyContent: 'center', fontSize: 30 }}>Chào mừng bạn</Text>
                    <Text style={{ textAlign: 'center', justifyContent: 'center', fontSize: 20 }}>Đăng nhập tài khoản</Text>
                    <TextInput style={[styles.input, { width: '90' }]}
                        placeholder='Nhập email hoặc số điện thoại' onChangeText={(txt) => {
                            setemail(txt)
                        }} 
                        value={email || ''}/>
                    <View style={styles.input}>
                        <TextInput style={{width: '90%'}} secureTextEntry={showPass ? true : false}
                            placeholder='Nhập mật khẩu' onChangeText={(txt) => {
                                setpass(txt)
                            }}
                            value={pass || ''} />
                        <TouchableOpacity onPress={()=>setshowPass(!showPass)}>
                            <Image style={{ width: 20, height: 20 }}
                                source={ showPass ? require('../Image/visible.png') : require('../Image/invisible.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={()=>setcheckRemember(!checkRemember)}>
                                <Image style={{ width: 20, height: 20 }}
                                    source={checkRemember ? require('../Image/check.png') : require('../Image/circle.png')} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10 }}>Nhớ tài khoản</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={{ color: 'green', fontWeight: 'bold' }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => CheckLogin()}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: 'green' }}>________________Hoặc________________</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <Image style={styles.image}
                                source={require('../Image/google.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image style={[styles.image, { marginLeft: 40 }]}
                                source={require('../Image/facebook.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.text}>
                        <Text>Bạn không có tài khoản?</Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Register') }}>
                            <Text style={{ color: 'green', marginLeft: 10 }}>Tạo tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 15,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        borderRadius: 20,
        backgroundColor: 'green',
        padding: 15,
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})