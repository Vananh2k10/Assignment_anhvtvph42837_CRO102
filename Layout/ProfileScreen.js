import { Alert, Image, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'



const ProfileScreen = ({navigation, route}) => {
  const [user, setuser] = useState([]);


  // lấy user từ AsyncStorage
  const retrieveData = async () => {
    try {
      const UserData = await AsyncStorage.getItem('User');
      if (UserData != null) {
        setuser(JSON.parse(UserData));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    retrieveData()
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>PROFILE</Text>
      </View>

      <View style={styles.infor}>
        <Image source={user.avatar ? { uri: user.avatar } : require('../Image/pesonal.png')} style={{ width: 60, height: 60, borderRadius: 30 }} />
        <Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{user.fullname}</Text>
          {'\n'}{user.email}
        </Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.textGray}>Chung 
        {'\n'}_________________________________________________</Text>
        <Text onPress={() => navigation.navigate('ManageUser')}>Chỉnh sửa thông tin</Text>
        <Text>Cẩm năng trồng cây</Text>
        <Text onPress={() => navigation.navigate('NoticeScreen')}>Lịch sử giao dịch</Text>
        <Text>Q & A</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.textGray}>Bảo mật và điều khoản 
        {'\n'}_________________________________________________</Text>
        <Text>Điền khoản và điều kiện</Text>
        <Text>Chính sách quyền riêng tư</Text>
        <Text style={{color: 'red'}} onPress={()=> {navigation.navigate('LoginScreen'),Alert.alert("Đã đăng xuất")}}>Đăng xuất</Text>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16
  },
  header: {
    width: "100%",
    paddingVertical: 20
  },
  infor:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  option:{
    gap: 18,
    marginTop: 26
  },
  textGray:{
    color: 'gray'
  }
})