import React, { useEffect, useState } from 'react'
import { Button ,Text} from '@aws-amplify/ui-react';
import { API} from 'aws-amplify';
import { updateUserData } from '../graphql/mutations';
import { listUserData } from '../graphql/queries';
export default function FriendRequest(user) {
  const [request, setRequest] = useState();
  console.log(user)
    useEffect(() => {  
      setRequest(user.user.friendRequest);  
    }, [])    
    const handleAccept = async(e,name)=>{
        e.preventDefault();
        //add to friend who is  login.
            user.user.friends.push(name);
            const updatedUser = {
            id:user.user.id,
            friends:user.user.friends
            }
           await API.graphql({query:updateUserData,variables:{input:updatedUser}});

        // add friend who make a  request.
        const response=await API.graphql({query:listUserData});
        const foundUser = response.data.listUserData.items.find(obj => obj.user === name);
              console.log(user.user)
               foundUser.friends.push(user.user.user);
              const updatedFoundUser = {
               id:foundUser.id,
               friends:foundUser.friends
               }
              const result = await API.graphql({query:updateUserData,variables:{input:updatedFoundUser}});
        //remove friend from the list.
        removeFriend(e,name);
    }

    const removeFriend = async(e,name)=>{

        e.preventDefault();
        console.log(name);
      const indexToRemove = user.user.friendRequest.indexOf(name);

      if (indexToRemove !== -1) {
        user.user.friendRequest.splice(indexToRemove, 1);
      }
      

            const updatedUser = {
            id:user.user.id,
            friendRequest:user.user.friendRequest
            }
          const response = await API.graphql({query:updateUserData,variables:{input:updatedUser}});
          console.log(response.data.updateUserData.friendRequest)
          setRequest(response.data.updateUserData.friendRequest);

    }

  return (
    <>
    <div>FriendRequest</div>
    {!request ?(<>No Friend Requests</>):(
    request.map(name =>(
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
