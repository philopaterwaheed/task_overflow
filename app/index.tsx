/* import { register } from "../firebase/Auth"; */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from "expo-router";
import { useState ,useEffect} from 'react';
import {FlatList, Button, StyleSheet,TextInput, Text, View } from "react-native";
import { signout} from '../firebase/Auth';
import {get_users  , find_user, update_user} from "../firebase/db";

export default function Page() {
const [user,setUser]=useState(null);
const [tasks, setTasks]= useState([]); 
const [inputText, setInputText] = useState('');


const Taskbox = ({title ,done, id , onPress , pressed , xpress}) =>{
  return (
    <View>
	<Text>{(done)? "yes" : "no"}</Text>
	<Text>{title}</Text>
    </View>
  );
}

const taskAdd =  () => {
     setTasks([...tasks, {id : tasks.length + 1  ,  title: inputText, done : false}]) ;
};


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
const getTasksCloud = async () => {
  try {
      if (user != null){
	const userObj = await find_user(JSON.parse(user).uid); 
	console.log("from Tasks", userObj.data().Tasks);
	setTasks(userObj.data().Tasks);
      }
  } catch (e) {
    setTasks(getTasksStore());
  }
  finally{}
};
const storeTasks = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('Tasks', jsonValue);
  } catch (e) {
    // saving error
  }
};
const getTasksStore = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('Tasks');
    setTasks(JSON.parse(jsonValue));
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
    getTasksCloud();
  }, []);
useEffect(() => {
    if (user != null){
    getTasksCloud();
    }
}, [user]);
useEffect(() => {
    if (JSON.parse(user)){
	storeTasks(tasks);
	update_user(JSON.parse(user).uid ,{Tasks:tasks});
    }
}, [tasks]);
  return (
    <View style={styles.container}>
	<View style={styles.inputArea}>
	  <Button  title = "Add" onPress = {taskAdd}/>
	  <TextInput style = {styles.input}  placeholder = "A Task" 
	    onChangeText={text => setInputText(text)} 
	    />
	</View>
      <FlatList
      data = {tasks} 
      renderItem = {({item}) => <Taskbox  title = {item.title} done = {item.done}   />}
      keyExtractor = {(item)=>item.id
      }
      />
      <Button title = "logut" onPress = {()=>{signout();router.replace("/auth/login");storeUser(null);setUser(null);}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor : '#263D42',
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
  input: {
    width: "75%",
    height: 50,
    color: "#38434D",
    backgroundColor: "#B9D8DB",
  },
  inputArea: {
    flex :1 , 
    flexDirection: "row",
    maxHeight: 50,
    marginHorizontal: "auto",
    height: 50,
    alignItems: "center",
  },
});
