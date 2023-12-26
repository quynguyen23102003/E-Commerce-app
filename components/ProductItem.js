import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/CartReducer';

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  }
  return (
    <Pressable style={styles.btnProducts}>
      <Image source={{ url: item?.image }} style={styles.imgProducts} />
      <Text style={styles.txtTitleProducts} numberOfLines={1}>{item?.title}</Text>
      <View style={styles.groupPrice}>
        <Text style={styles.txtPrices}>${item?.price}</Text>
        <Text style={styles.txtRatings}>{item?.rating?.rate} ratings</Text>
      </View>
      <TouchableOpacity style={styles.btnAdd} onPress={() => addItemToCart(item)}>
        {addedToCart ? (<Text>Added to Cart</Text>) : (<Text>Add to Cart</Text>)}
      </TouchableOpacity>
    </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  btnProducts: {
    paddingHorizontal: 20,
    paddingVertical: 25
  },
  imgProducts: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  txtTitleProducts: {
    width: 150,
    paddingTop: 10
  },
  groupPrice: {
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  txtPrices: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  txtRatings: {
    color: '#FFC72C',
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