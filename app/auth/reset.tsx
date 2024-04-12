import { Link ,router} from "expo-router";
import { TextInput,Button, StyleSheet, Text, View,Pressable } from "react-native";
import {useState} from "react";
import { resetEmail  } from "../../firebase/Auth";
export default function Page() {
const [email, setEmail] = useState("");
const [error, setError] = useState("");
const [goterror, setGoterror]= useState(false); 
const handlePress = async () => {
    try {
        const credentials = await resetEmail(email);
        console.log('credentials', credentials);
	router.replace("/auth/login");
        
    } catch (error) {
        console.log('error', JSON.stringify(error));
        setError(error);
        setGoterror(true);
    }
};
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>login</Text>
       <View>
	   <TextInput
	    placeholder="Email"
	    value={email}
	    onChangeText={setEmail}
	    style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
	  />
	  <Pressable style={styles.login} onPress={handlePress}>
	      <Text>send reset email</Text>
	  </Pressable>
      {goterror ? (
        <View style= {styles.error}>
          <Text>{error.message}</Text>
        </View>
      ) : null}
      </View>
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
