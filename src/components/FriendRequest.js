import React from 'react'
import { Button ,Text} from '@aws-amplify/ui-react';
import { API} from 'aws-amplify';
import { updateUserData } from '../graphql/mutations';
export default function FriendRequest(user) {

   
    const handleAccept = async(e,name)=>{
        e.preventDefault();
          
            
        //add to friend who is  login.
        
            user.user.friends.push(name);
            const updatedUser = {
            id:user.user.id,
            friends:user.user.friends
            }
          const response = await API.graphql({query:updateUserData,variables:{input:updatedUser}});
          console.log(response)

        // add friend who make a  request.


    }

    const removeFriend = (e,name)=>{

    }

  return (
    <>
    <div>FriendRequest</div>
    {!user.user.friendRequest ?(<>No Friend Requests</>):(
    user.user.friendRequest.map(name =>(
        <>
        <Text>{name}</Text>
        <Button onClick={(e) => handleAccept(e,name)}>Accept</Button>
        <Button onClick={(e) => removeFriend(e,name)}>Decline</Button>
    
        </>    
        ))
        
        ) 
    
    }
    
    </>
  )
}
