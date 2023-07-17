import React, { useEffect, useState } from 'react'
import MyForm from './MyForm';
import MyCards from './MyCards';
import MyFriends from './MyFriends';
import SearchFriend from './SearchFriend';
import { API} from 'aws-amplify';
import { listUserData } from '../graphql/queries';
import FriendRequest from './FriendRequest';
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
   {/* <MyForm username={user.username}></MyForm> */}
   {/* <MyFriends username={user.username}></MyFriends> */}

   {/* <SearchFriend username={user.username} ></SearchFriend>
   {!userLogin?(<></>):(<FriendRequest user={userLogin}></FriendRequest>)
   } */}
    
   {/* <MyCards username={user.username}></MyCards> */}
    </>
  
  )
}
export default MyHome;