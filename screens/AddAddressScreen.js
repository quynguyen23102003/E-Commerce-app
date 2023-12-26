import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Header } from '../components/Header'
import { Entypo, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserType } from '../UserContext';
import IPCONFIG from '../ipconfig/ipconfig'

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${IPCONFIG.CONSTANTS.IP}addresses/${userId}`);
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log('error', error)
    }
  };
  // refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 50 }}>
      <Header />
      <View style={{ padding: 10 }}>
        <Text style={styles.txtTitle}>Your Addresses</Text>
        <Pressable onPress={() => navigation.navigate("AddressScreen")} style={styles.btnNewAddress}>
          <Text>Add a new Addres</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>
        <Pressable>
          {/** all the added addresses */}
          {addresses?.map((item, index) => (
            <Pressable style={styles.btnAddress}>
              <View style={styles.groupAddress}>
                <Text style={styles.txtNames}>{item?.name}</Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>
              <Text style={styles.txtHouse}>{item?.houseNo},{item?.landmark}</Text>
              <Text style={styles.txtHouse}>{item?.street}</Text>
              <Text style={styles.txtHouse}>Hồ Chí Minh</Text>
              <Text style={styles.txtHouse}>phone No: {item?.mobileNo}</Text>
              <Text style={styles.txtHouse}>pin code: {item?.postalCode}</Text>
              <View style={styles.groupBtns}>
                <Pressable style={styles.btnEdit}>
                  <Text>Edit</Text>
                </Pressable>
                <Pressable style={styles.btnEdit}>
                  <Text>Remove</Text>
                </Pressable>
                <Pressable style={styles.btnEdit}>
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default AddAddressScreen

const styles = StyleSheet.create({
  btnNewAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 5
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  btnAddress: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    padding: 10,
    flexDirection: 'column',
    gap: 5,
    marginVertical: 10
  },
  groupAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  txtNames: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  txtHouse: {
    fontSize: 15,
    color: '#181818'
  },
  btnEdit: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: '#D0D0D0'
  },
  groupBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 7
  },
})