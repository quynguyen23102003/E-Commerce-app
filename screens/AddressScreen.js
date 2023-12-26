import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { UserType } from '../UserContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import IPCONFIG from '../ipconfig/ipconfig'

const AddressScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const {userId,setUserId} = useContext(UserType);
    console.log("UserID", userId);
  useEffect(() => {
    const fetchUser = async() => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId)
    }

    fetchUser();
  },[]);
  console.log(userId)
  const handleAddAddress = () => {
      const address = {
          name,
          mobileNo,
          houseNo,
          street,
          landmark,
          postalCode
      }

      axios.post(`${IPCONFIG.CONSTANTS.IP}addresses`,{userId,address}).then((response) => {
          Alert.alert("Success","Addresses added successfully");
          setName("");
          setMobileNo("");
          setHouseNo("");
          setStreet("");
          setLandmark("");
          setPostalCode("");

          setTimeout(() => {
            navigation.goBack();
          },500)
      }).catch((error) => {
          Alert.alert("Error","Failed to add address")
          console.log("error",error)
      })
  }
    return (
        <ScrollView style={{ paddingTop: 50 }}>
            <View style={{ height: 50, backgroundColor: '#00CED1' }} />
            <View style={{ padding: 10 }}>
                <Text style={styles.txtAddress}>Add a new Address</Text>
                <TextInput placeholderTextColor={'black'} placeholder='Hồ Chí Minh' style={styles.txtInput} />
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.txtName}>Full name (First and last name)</Text>
                    <TextInput placeholderTextColor={'black'} placeholder='enter your name' style={styles.txtInput} value={name} onChangeText={(text) => setName(text)} />
                </View>
                <View>
                    <Text style={styles.txtName}>Mobile number</Text>
                    <TextInput placeholderTextColor={'black'} placeholder='Mobile No' style={styles.txtInput} value={mobileNo} onChangeText={(text) => setMobileNo(text)} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.txtName}>Flat, House No, Building, Company</Text>
                    <TextInput placeholderTextColor={'black'} placeholder='' style={styles.txtInput} value={houseNo} onChangeText={(text) => setHouseNo(text)} />
                </View>
                <View>
                    <Text style={styles.txtName}>Area, Street, sector, village</Text>
                    <TextInput placeholderTextColor={'black'} placeholder='' style={styles.txtInput} value={street} onChangeText={(text) => setStreet(text)} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.txtName}>Landmark</Text>
                    <TextInput placeholderTextColor={'black'} placeholder='Eg near appollo hospital' style={styles.txtInput} value={landmark} onChangeText={(text) => setLandmark(text)} />
                </View>
                <View>
                    <Text style={styles.txtName}>Pincode</Text>
                    <TextInput placeholderTextColor={'black'} placeholder='Enter Pincode' style={styles.txtInput} value={postalCode} onChangeText={(text) => setPostalCode(text)} />
                </View>
                <TouchableOpacity style={styles.btnAddAddress} onPress={handleAddAddress}>
                    <Text style={{ fontWeight: 'bold' }}>Add Address</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default AddressScreen

const styles = StyleSheet.create({
    txtAddress: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    txtInput: {
        padding: 10,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5
    },
    txtName: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    btnAddAddress: {
        backgroundColor: '#FFC72C',
        padding: 19,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
})