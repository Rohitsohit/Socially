import React, { useEffect, useState } from 'react'
import { API} from 'aws-amplify';
import { listUserData } from '../graphql/queries';
import { updateUserData } from '../graphql/mutations';
import { SearchField,Text,Flex } from '@aws-amplify/ui-react';
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


const handleAddFriend = async(e)=>{
  e.preventDefault();
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
    {!userSearched ?(<></>):(<Flex direction="row">
      <Text>{userSearched}</Text>
      <svg xmlns="http://www.w3.org/2000/svg" onClick={handleAddFriend} height="1.25em" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
      </Flex>)
    }
    
    </>
  )
}
