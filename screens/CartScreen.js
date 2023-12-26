import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Header } from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { incementQuantity, decementQuantity,removeFromCart, cleanCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log("=======>cart: ", cart);
  const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };
  const navigation =useNavigation();
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.groupTxtTotal}>
        <Text style={styles.txtSubtotal}>Subtotal : </Text>
        <Text style={styles.txtTotal}>{total}</Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

      <Pressable style={styles.btnBuy} onPress={() => navigation.navigate('ConfirmationScreen')}>
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </Pressable>
      <Text style={styles.gach} />
      <View style={{ marginHorizontal: 10 }}>
        {cart?.map((item, index) => (
          <View key={index} style={styles.groupCart}>
            <Pressable style={styles.btnCart}>
              <View>
                <Image source={{ url: item?.image }} style={styles.img} />
              </View>
              <View>
                <Text style={styles.txtTitle} numberOfLines={3}>{item?.title}</Text>
                <Text style={styles.txtPrice}>{item?.price}</Text>
                <Image style={[styles.img, { width: 30, height: 30 }]} source={{ uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png', }} />
                <Text style={{ color: 'green' }}>In Stock</Text>
              </View>
            </Pressable>
            <View style={styles.groupIcons}>
              <View style={styles.groupBtnIcons}>
                {item?.quantity > 1 ? (
                  <Pressable style={styles.btnIcons} onPress={() => decreaseQuantity(item)}>
                    <Entypo name="minus" size={24} color="black" />
                  </Pressable>) : (
                  <Pressable style={styles.btnIcons} onPress={() => deleteItem(item)}>
                    <MaterialIcons name="delete" size={24} color="black" />
                  </Pressable>
                )}
                <Pressable style={styles.btnQuantity}>
                  <Text>{item?.quantity}</Text>
                </Pressable>
                <Pressable style={styles.btnIcons} onPress={() => increaseQuantity(item)}>
                  <Entypo name="plus" size={24} color="black" />
                </Pressable>
              </View>
              <Pressable style={styles.btnDelete} onPress={() => deleteItem(item)}>
                <Text>Delete</Text>
              </Pressable>
            </View>
            <View style={[styles.groupIcons, { paddingTop: 0, paddingBottom: 5 }]}>
              <Pressable style={styles.btnDelete}>
                <Text>Save For Later</Text>
              </Pressable>
              <Pressable style={styles.btnDelete}>
                <Text>See More Like this</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: 'white'
  },
  groupTxtTotal: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtSubtotal: {
    fontSize: 18,
    fontWeight: '400'
  },
  txtTotal: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  btnBuy: {
    backgroundColor: '#FFC72C',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  gach: {
    height: 1,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 16
  },
  img: {
    width: 140,
    height: 140,
    resizeMode: 'contain'
  },
  groupCart: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderBottomColor: '#F0F0F0',
    borderTopWidth: 2,
  },
  btnCart: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  txtTitle: {
    width: 150,
    marginTop: 10
  },
  txtPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6
  },
  groupBtnIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7
  },
  btnIcons: {
    backgroundColor: '#D8D8D8',
    padding: 7,
    borderRadius: 6,
  },
  btnQuantity: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 6
  },
  btnDelete: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 0.6
  },
  groupIcons: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
})