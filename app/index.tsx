/* import { register } from "../firebase/Auth"; */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from "expo-router";
import { useState ,useEffect} from 'react';
import { Button, StyleSheet, Text, View } from "react-native";

export default function Page() {
[user,setUser]=useState();
const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    if (!JSON.parse(jsonValue)){
	router.replace("/auth/login");
    }
    console.log("jsonValue:" , JSON.parse(jsonValue));
    console.log("equals null: " , jsonValue == null);
    setUser(jsonValue);
  } catch (e) {
    // error reading value
  }
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
  return (
    <View style={styles.container}>
      <Text>user{user}</Text>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
	<Link href = {'/about'} asChild>
	<Button title = "about "/>
	</Link>
        <Text style={styles.title}>Hello World</Text>
	<Button title = "logut" onPress = {()=>{router.replace("/auth/login");storeUser(null);setUser(null)}}/>
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
