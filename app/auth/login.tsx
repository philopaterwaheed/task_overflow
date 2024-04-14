import { Link ,router} from "expo-router";
import { TextInput,Button, StyleSheet, Text, View,Pressable , ActivityIndicator} from "react-native";
import {useEffect, useState} from "react";
import { login } from "../../firebase/Auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Page() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [goterror, setGoterror]= useState(false); 
const [loading, setLoading]= useState(false); 
const [user, setUser]= useState(); 
const storeUser = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    // saving error
  }
};
const handlePress = async () => {
    try {
	setLoading(true);
        const credentials = await login(email, password);
        console.log('credentials', credentials.user);
	storeUser(JSON.stringify(credentials.user));
	setUser(credentials.user);
	router.replace("/");
    } catch (error) {
        console.log('error', JSON.stringify(error));
        setError(error);
        setGoterror(true);
	setLoading(false);
    }
    finally{
	setLoading(false);
    }
};
const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    if (JSON.parse(jsonValue)){
	router.replace("/");
    }
    setUser(jsonValue);
  } catch (e) {
    // error reading value
  }
};
useEffect(() => {
    getUser();
}, []);
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>login</Text>
    {(!loading)?
       <View>
	   <TextInput
	    placeholder="Email"
	    value={email}
	    onChangeText={setEmail}
	    style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
	  />
	  <TextInput
	    placeholder="Password"
	    value={password}
	    onChangeText={setPassword}
	    secureTextEntry
	    style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
	  />
	  <Pressable style={styles.login} onPress={handlePress}>
	      <Text>login</Text>
	  </Pressable>
	  <Pressable style={styles.login} onPress={()=>router.replace("/auth/reg")}>
	      <Text>register</Text>
	  </Pressable>
	  <Pressable style={styles.forgotpassword} onPress={()=>router.push("/auth/reset")}>
	      <Text>forgot password</Text>
	  </Pressable>
	  {goterror ? (
	    <View style= {styles.error}>
	      <Text>{error.message}</Text>
	    </View>
	  ) : null}
      </View>
	  :
      <ActivityIndicator/>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#263D42",
    gap: 30,
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
    color: "#B9D8DB",
  },
  forgotpassword:{
    backgroundColor: "#63C7B2", 
    width: 150,
    height :  40,
    alignSelf: "center",
    alignItems: "center",
    margin: 2 ,
    justifyContent: 'center',
    /* borderRadius: "5%", */
    },
  login:{
    backgroundColor: "#72CBC5", 
    width: 150,
    height : 40 ,
    alignSelf: "center",
    alignItems: "center",
    margin: 2 ,
    justifyContent: 'center',
    /* borderRadius: "5%", */
    },
  error:{
    backgroundColor:"#8E6C88", 
    alignSelf: "center",
    alignItems: "center",
    margin: 2 ,
    justifyContent: 'center', 
    width: 350,
    height : 50 ,
	},

});
