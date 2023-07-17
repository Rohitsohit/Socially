import React, { useEffect, useState } from 'react'
import { API} from 'aws-amplify';
import { listUserData } from '../graphql/queries';
import { updateUserData } from '../graphql/mutations';
import { SearchField,Text,Button } from '@aws-amplify/ui-react';
export default function SearchFriend(user) {
    console.log(user.username)
    const [userSearched, setUserSearched] = useState();
    const [userLogin, setUserLogin] = useState();
    const [userFound, setUserFound] = useState();

   
    const handleSearch = (e)=>{
      e.preventDefault();
       fetchUser();
    }
    const fetchUser = async ()=>{
        const response=await API.graphql({query:listUserData});
        const users = response.data.listUserData.items;
        const searchUser='sohit';
        //getting searched user.
        const foundUser = users.find(obj => obj.user === searchUser);
        setUserFound(foundUser); 
        // getting loged in user.
        const loginUser = users.find(obj => obj.user === user.username);
        setUserLogin(loginUser);
          if (foundUser) {
            console.log("User found: ", foundUser.user);
            // add as friend
            setUserSearched(foundUser.user);
         
          } else {
            console.log("User not found");
          }
      }


const handleAddFriend = async()=>{
  if(userFound && userLogin){
    console.log(userFound)
    userFound.friendRequest.push(userLogin.user);
    const updatedUser = {
    id:userFound.id,
    friendRequest:userFound.friendRequest
  }
  
  const response = await API.graphql({query:updateUserData,variables:{input:updatedUser}});
  console.log(response)
  }

    
}

  return (
    <>
    <div>SearchFriend</div>
    <SearchField
  label="Search"
  placeholder="Search here..."

    onClick={handleSearch}
    
/>  
    {!userSearched ?(<></>):(<div>
      <Text>{userSearched}</Text>
      <Button onClick={handleAddFriend} >Add friend</Button>

      </div>)
    }
    
    </>
  )
}
