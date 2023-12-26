import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import IPCONFIG from '../ipconfig/ipconfig'

const RegisterScreen = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("")
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // Send a post request to the backend API
    axios.post(`${IPCONFIG.CONSTANTS.IP}register`,user).then((response) => {
    // axios.post("http://192.168.1.15:8000/register",user).then((response) => {
      console.log(response);
      Alert.alert(
        "Registration Successfull",
        "You have registered successfully"
      );
      setname("");
      setemail("");
      setpassword("");
    }).catch((error) => {
      Alert.alert("Registration Error",
      "An error occurred during registration");
      console.log("Registration failed", error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.img}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>Register to your Account</Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={styles.groupTextInput}>
          <Ionicons name="person" size={24} color="gray" style={{ marginLeft: 8 }} />
            <TextInput placeholder='enter your Name' style={[styles.textInPut, {fontSize: name ? 16 : 16}]} value={name} onChangeText={(text) => setname(text)}/>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.groupTextInput}>
            <MaterialIcons name="email" size={24} color="gray" style={{ marginLeft: 8 }} />
            <TextInput placeholder='enter your Email' style={[styles.textInPut, {fontSize: email ? 16 : 16}]} value={email} onChangeText={(text) => setemail(text)}/>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.groupTextInput}>
            <AntDesign name="lock1" size={24} color="gray" style={{ marginLeft: 8 }} />
            <TextInput placeholder='enter your Password' style={[styles.textInPut, {fontSize: password ? 16 : 16}]} value={password} onChangeText={(text) => setpassword(text)} secureTextEntry={true}/>
          </View>
        </View>
        <View style={styles.groupForgot}>
          <Text>Keep me logged in</Text>
          <Text style={{color: '#007fff', fontWeight: '500'}}>Forgot Password</Text>
        </View>
        <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
          <Text style={styles.txtRegister}>Register</Text>
        </TouchableOpacity>
        <Pressable style={{marginTop: 15}} onPress={() => navigation.goBack()}>
          <Text style={styles.txtSignIn}>Already Have an account? Sign in</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 50
  },
  img: {
    width: 150,
    height: 100
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#041E42'
  },
  groupTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D0D0D0',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30
  },
  textInPut: {
    color: 'gray',
    marginVertical: 10,
    width: 300,
  },
  groupForgot: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnRegister: {
    marginTop: 80,
    width: 200,
    backgroundColor: '#FEBE10',
    borderRadius: 6,
    marginStart: 'auto',
    marginEnd: 'auto',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtRegister: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtSignIn: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16
  }
})