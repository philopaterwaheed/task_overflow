/* import { register } from "../firebase/Auth"; */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from "expo-router";
import { useState ,useEffect} from 'react';
import {Pressable,FlatList, Button, StyleSheet,TextInput, Text, View } from "react-native";
import {signout} from '../firebase/Auth';
import {get_users  , find_user, update_user} from "../firebase/db";

export default function Page() {
const [user,setUser]=useState(null);
const [tasks, setTasks]= useState([]); 
const [inputText, setInputText] = useState('');
const [donesel, setDoneSel] = useState();
const [del, setDel] = useState();


const Taskbox = ({title ,done, id , onPress , pressed , xpress, Style}) =>{
  return (
    <View style = {Style}>
	<View style= {styles.checkBox}>
	    <Pressable onPress = {pressed}>
	    {
		(!done)?
		<Text>x</Text>:
		<Text>o</Text>
	    }
	    </Pressable>
	</View>
	<Text style= {styles.text} >{title}</Text>
	<Button title= "del" onPress = {onPress}/>
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
	if (userObj.data()){
	    setTasks(userObj.data().Tasks);
	}
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
    if (JSON.parse(user) && tasks){
	storeTasks(tasks);
	update_user(JSON.parse(user).uid ,{Tasks:tasks});
    }
}, [tasks]);
useEffect(() => {

const updatedData = tasks.map(item => {
  if (item.id === donesel) {
    return { ...item, done: !item.done }; // Update the age to 28 for object with id 2
  }
  return item; // For other items, return them as they are
});
if (updatedData){
    setTasks(updatedData);
}
}, [donesel]);
useEffect(() => {

const updatedData = tasks.filter(item => item.id !== del);
if (updatedData){
    setTasks(updatedData);
}
}, [del]);
  return (
    <View style={styles.container}>
	<View style={styles.inputArea}>
	  <Button  title = "Add" onPress = {taskAdd}/>
	  <TextInput style = {styles.input}  placeholder = "A Task" 
	    onChangeText={text => setInputText(text)} 
	    />
	</View>
      <FlatList
      style = {styles.list}
      data = {tasks} 
      renderItem = {({item}) => <Taskbox Style ={styles.taskBox} title = {item.title} done = {item.done}
      pressed = {()=>{setDoneSel(item.id);}}
      onPress = {()=>{setDel(item.id);}}
      />}
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
  list:{
    flex: 1 , 

  },
  taskBox:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin : 5 , 
    backgroundColor: "#63C7B2",
    width: 250,
    flexWrap : 'wrap',
  },
  text:{
      width: '70%',
  },
  checkBox: {
  width: 24,
  height: 24 ,
  backgroundColor : '#8E6C88' ,
  borderRadius:  50,
  alignItems: 'center' ,
  borderColor :'#263D42' ,
  borderWidth : 2 ,
  },
});
