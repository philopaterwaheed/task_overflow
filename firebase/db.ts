
import {  router } from "expo-router";
import { db } from "./Config";
import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    onSnapshot,
    deleteDoc, doc,
    query ,where,
    getDoc,
    updateDoc,
}from 'firebase/firestore'



const colRef = collection(db, 'uid');

const Admin = query(colRef, where("Admin" , "==" , true))



async function get_docs() {
  const snapshot = await getDocs(colRef);
  return snapshot.docs;
};



async function get_users () { 
    let Users = await get_docs() ; 
    let usersArray = []
    Users.forEach((user) =>
		  {
	Users.push({... user.data(), id: user.id})
    })
    return usersArray;
}


async function add_user(uid , email){
    const docRef = doc(db, "uid", uid);
   let res =  await setDoc(docRef, {
	uid : uid , 
	user_email: email,
	Tasks : [],
	Admin : false ,
    }, uid);
    return res ; 
};



onSnapshot (colRef , (snapshot) => {

    let users =[];
    snapshot.docs.forEach((user) => {
	users.push({... user.data() , id: user.id})
    });
    console.log("database changed :: ", users);
})



onSnapshot (Admin , (snapshot) => { // on a super user changed  //works 
    let users =[];
    snapshot.docs.forEach(user => {
	users.push({... user.data() , id: user.id})
    });
    console.log("Admin changed");
    console.log(users);
})
async function del_user(uid){
    const docRef = doc(db , 'uid',uid )
    const res =  await deleteDoc(docRef) ; 
    return res  ; 
};

async function find_user(uid){
    const docRef = doc(db ,'uid',uid )
    const user  =await getDoc (docRef);
    console.log("user fetched " , user.data());
    return user;
};
async function update_user(uid , user){
    const docRef = doc(db , 'uid',uid )
    await updateDoc(docRef , user)
    console.log("user fetched " , user);
};

export {get_docs , get_users , add_user ,update_user, del_user, find_user};
