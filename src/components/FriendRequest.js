import React, { useEffect, useState } from 'react'
import { View,Text,Flex,Divider} from '@aws-amplify/ui-react';
import { API} from 'aws-amplify';
import { updateUserData } from '../graphql/mutations';
import { listUserData } from '../graphql/queries';
export default function FriendRequest(user) {
  const [request, setRequest] = useState();

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
    <Text
    paddingLeft="medium"
    marginTop="2em"
    marginLeft="30em"
    variation="info"
    fontSize="1em">Friend Request
    <View
      as="div"
      ariaLabel="View example"
      borderRadius="6px"
      border="1px solid var(--amplify-colors-black)"
      color="var(--amplify-colors-blue-60)"
      height="20em"
      padding="0.5rem"
      maxWidth="22rem"
      >
    {!request ?(<>No Friend Requests</>):(
    request.map(name =>(
      <View
      as="div"
      ariaLabel="View example"
      borderRadius="6px"
      border="1px solid var(--amplify-colors-black)"
      color="var(--amplify-colors-blue-60)"
      height="2rem"
      margin="auto"
      width="15em"
      >
        <Flex direction="row">
        <Text>{name}</Text>
  <Divider
    orientation="vertical" /><svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => handleAccept(e,name)} height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
<svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => removeFriend(e,name)} height="1.25em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
</Flex>      
      </View>    
        ))
        
        ) 
    
    }
    
    </View>
    </Text>
  )
}
