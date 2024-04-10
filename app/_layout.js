import { Tabs,Stack} from 'expo-router';
import { Link , router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
export default function Layout() {
   return <Tabs/> //screenOptions={
//       {
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
