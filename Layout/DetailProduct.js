import { Alert, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Provider, useDispatch } from 'react-redux';
import { addItem } from '../Redux/action';
import store from '../Redux/store';

const DetailProduct = ({ navigation, route }) => {
  const { item } = route.params;
  const [count, setcount] = useState(0)
  const [TongTien, setTongTien] = useState(0)
  console.log(item);

  const dispatch = useDispatch();

  const handleTang = () => {
    setcount(count + 1);
  }

  const handleGiam = () => {
    count > 0 ? setcount(count - 1) : setcount(count);
  }

  const getTongTien = () => {
    const Tong = Number(Number(item.price) * count);
    setTongTien(Tong * 1000);
  }


  useEffect(() => {
    getTongTien()
  }, [count])


  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={{ width: 20, height: 20 }}
              source={require('../Image/back.png')} />
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
          <TouchableOpacity style={{ width: 50 }} onPress={() => navigation.navigate('CartScreen')}>
            <Image style={{ width: 26, height: 26 }}
              source={require('../Image/cart.png')} />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: item.img }} style={{ width: '100%', height: 300 }} />

        <View style={{ gap: 16, paddingHorizontal: 50 }}>
          <View style={{ width: 120, padding: 10, borderRadius: 10, backgroundColor: 'green', alignItems: 'center' }}>
            {item.type ? <Text style={{ color: 'white' }}>Ưa bóng</Text> : <Text style={{ color: 'white' }}>Ưa râm</Text>}
          </View>

          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'green' }}>{item.price} đ</Text>

          <ScrollView style={{ height: 200 }}>
            <Text>Chi tiết sản phẩm
              {'\n'}________________________________________
            </Text>
            {item.size && <Text>Kích cỡ                                                        {item.size}
              {'\n'}________________________________________
            </Text>}
            {item.origin && <Text>Xuất xứ                                                 {item.origin}
              {'\n'}________________________________________
            </Text>}
            <Text>Tình trạng                                          <Text style={{ color: 'green' }}>còn {item.quantity} sản phẩm</Text>
              {'\n'}________________________________________{'\n'}
            </Text>
            <Text>Mô tả : {item.description}
            </Text>
          </ScrollView>
        </View>
       
        <TouchableOpacity onPress={() => {
          dispatch(addItem(item))
          Alert.alert('Đã thêm vào giỏ hàng');
        }}
          style={{ borderRadius: 9, padding: 12, marginHorizontal: 20, alignItems: 'center', backgroundColor: 'green',
          position: 'absolute', bottom: 40, width: '90%' }}>
          <Text style={{ color: 'white' }}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>

  )
}

export default DetailProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 20
  },
  icon: {
    width: 10,
    height: 10
  },
  btn: {
    padding: 7,
    borderRadius: 4,
    borderWidth: 1,
  }
})