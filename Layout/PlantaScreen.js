import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const PlantaSceen = ({ navigation, route }) => {
    const data = route.params?.data;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity  onPress={()=>navigation.goBack()}>
                <Image style={{ width: 20, height: 20 }}
                    source={require('../Image/back.png')}/>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Chậu cây và vật dụng</Text>
                <TouchableOpacity style={{ width: 50 }} onPress={()=>navigation.navigate('CartScreen')}>
                <Image style={{ width: 26, height: 26 }}
                    source={require('../Image/cart.png')}/>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', gap :30, marginHorizontal: 20}}>
                <Text style={{color: 'red'}}>Tất cả</Text>
                <Text>Chậu cây</Text>
                <Text>Vật dụng</Text>
            </View>
            <FlatList
                numColumns={2}
                scrollEnabled={false}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => navigation.navigate("DetailProduct", { item: item })}
                        style={styles.itemPlant}>
                        <Image source={{ uri: item.img }}
                            style={styles.itemImage} />
                        <Text style={styles.itemName}>{item.name}</Text>
                        {item.type ? <Text>Ưa bóng</Text> : <Text>Ưa râm</Text>}
                        <Text style={styles.price}>{item.price} đ</Text>
                    </TouchableOpacity >} >
            </FlatList>
        </View>
    )
}

export default PlantaSceen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20
    },
    itemPlant: {
        backgroundColor: 'white',
        width: '45%',
        borderRadius: 12,
        padding: 12,
        margin: 10,
        gap: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowRadius: 5,
        shadowOpacity: 0.35,
        elevation: 10
    },
    itemImage: {
        width: '100%',
        height: 130,
        borderRadius: 12,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 17,
        fontWeight: '600',
        color: 'green'
    },
})