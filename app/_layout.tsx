import { Tabs,Stack} from 'expo-router';
import { Link , router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import login from './auth/login'
export default function Layout() {
   return (<Stack initialRouteName="auth/login">
	<Stack.Screen name="auth/login" options={{ headerShown: false }} />
	<Stack.Screen name="index" options={{  title: "Task Over Flow", headerStyle: {backgroundColor: '#8E6C88'}, headerTitleAlign: 'center'}} />
	<Stack.Screen name="auth/reg" options={{ headerShown: false }} />
	</Stack>
    )
//       {
//
// 	  headerStyle:{
// 	      backgroundColor: 'red'
// 	      
// 	  },
// 	      headerTintColor: 'white'
//       }
//   }>;
// 	      <Stack.Screen
//         name="index"
//         options={{
//           headerTitle: "Home",
//           headerRight: () => <Button onPress={() => {router.push('contact')}} title="Contact" />,
//         }}
//       />
// 	<Stack.Screen 
//         name="about"
//         options={{
//           headerTitle: "Home",
//           headerRight: () => <Button onPress={() => {router.push('contact')}} title="Contact" />,
//         }}
// />
}
