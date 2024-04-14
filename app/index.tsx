/* import { register } from "../firebase/Auth"; */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from "expo-router";
import { useState ,useEffect} from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import { signout} from '../firebase/Auth';
import {get_users  , find_user} from "../firebase/db";

export default function Page() {
const [user,setUser]=useState(null);
const [tasks, setTaks]= useState([]); 
const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    if (!JSON.parse(jsonValue)){
	router.replace("/auth/login");
    }
    setUser(JSON.parse(jsonValue));
  } catch (e) {
    // error reading value
  }
};
const getTasks = async () => {
  try {
      if (user != null){
	console.log("from use effect ",JSON.parse(user).uid);
	const userObj = await find_user(JSON.parse(user).uid); 
	console.log("from Tasks", userObj);
      }
  } catch (e) {
    // error reading value
  }
  finally{}
};
const storeUser = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    // saving error
  }
};
useEffect(() => {
    getUser();
  }, []);
useEffect(() => {
    if (user != null){
   
    getTasks();}
  }, [user]);
  return (
    <View style={styles.container}>
      <Text>user{(user)?JSON.parse(user).uid:null}</Text>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
	<Button title = "about " onPress = {()=>{get_users() ; console.log("users :: ")}}/>
        <Text style={styles.title}>Hello World</Text>
	<Button title = "logut" onPress = {()=>{signout();router.replace("/auth/login");storeUser(null);setUser(null)}}/>
        <Text style={styles.subtitle}> is the first page of your app.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
