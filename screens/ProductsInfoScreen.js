import { StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Header } from '../components/Header'
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer'

const ProductsInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("screen");
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground key={index} source={{ url: item }} style={{ width, height, marginTop: 25, resizeMode: 'contain' }}>
            <View style={styles.groupNotifi}>
              <View style={styles.iconNotifi}>
                <Text style={styles.txtNotifi}>20% off</Text>
              </View>
              <View style={[styles.iconNotifi, { backgroundColor: '#E0E0E0' }]}>
                <MaterialCommunityIcons name="share-variant" size={24} color="black" />
              </View>
            </View>
            <View style={[styles.iconNotifi, { backgroundColor: '#E0E0E0', marginTop: 'auto', marginStart: 20, marginBottom: 20 }]}>
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={styles.content}>
        <Text style={styles.txtTitle}>{route?.params?.title}</Text>
        <Text style={styles.txtPrice}>${route?.params?.price}</Text>
        <Text style={styles.gach} />
      </View>
      <View style={styles.groupColor}>
        <Text>Color: </Text>
        <Text style={styles.txtColor}>{route?.params?.color}</Text>
      </View>
      <View style={styles.groupColor}>
        <Text>Size: </Text>
        <Text style={styles.txtColor}>{route?.params?.size}</Text>
      </View>
      <Text style={styles.gach} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 5 }}>Total: ${route?.params?.price}</Text>
        <Text style={{ color: '#00CED1' }}>FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins</Text>
        <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center', gap: 5 }}>
          <Ionicons name="location" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: '500' }}>46.1b ấp 3, xã Nhị Bình, huyện Hóc Môn, tp.HCM</Text>
        </View>
      </View>
      <Text style={{ color: 'green', paddingHorizontal: 10, fontWeight: '500' }}>IN Stock</Text>
      <TouchableOpacity style={styles.btnAdd} onPress={() => addItemToCart(route?.params?.item)}>
        {addedToCart ? (<Text>Added to Cart</Text>) : <Text>Add to Cart</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btnAdd, { backgroundColor: '#FFAC1C' }]}>
        <Text>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ProductsInfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 55,
    backgroundColor: 'white'
  },
  groupNotifi: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconNotifi: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C60C30',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  txtNotifi: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12
  },
  content: {
    padding: 10
  },
  txtTitle: {
    fontSize: 15,
    fontWeight: '500'
  },
  txtPrice: {
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 6
  },
  gach: {
    height: 1,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    marginTop: 15
  },
  groupColor: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  txtColor: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  btnAdd: {
    backgroundColor: '#FFC72C',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10
  },
})