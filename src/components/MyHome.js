import React, { useEffect, useState } from 'react'
import MyForm from './MyForm';
import MyCards from './MyCards';
import MyFriends from './MyFriends';
import SearchFriend from './SearchFriend';
import '../css/home.css'
import { API} from 'aws-amplify';
import { listUserData } from '../graphql/queries';
import FriendRequest from './FriendRequest';
import FaceLogin from './FaceLogin';

 function MyHome(user) {

  const [userLogin, setUserLogin] = useState();

  useEffect(() => {
    fetchUser();
  }, [])
  

  const fetchUser = async ()=>{
    const response=await API.graphql({query:listUserData});
    const users = response.data.listUserData.items;

    // getting loged in user.
    const loginUser = users.find(obj => obj.user === user.username);
    setUserLogin(loginUser);
  }

 
  
  return (
    
    <>
    

   <SearchFriend username={user.username} ></SearchFriend>
    {/*
   {!userLogin?(<></>):(<FriendRequest user={userLogin}></FriendRequest>)
   } */}
    
   {!userLogin ?(<>...</>):(
   <div className="container">
   <div className="left-sidebar">
     <h3>Friend List</h3>
     <ul>
    <MyFriends username={userLogin}></MyFriends>
     </ul>
   </div>
   <div className="center-content" >
     <h3>Posts</h3>
     <MyCards username={userLogin.user}></MyCards>
     
   </div>
   <div className="right-sidebar">
     <h3>Message</h3>
     <ul>
        Message
     </ul>
   </div>
 </div>
   
   )}

   



    </>
  
  )
}
export default MyHome;