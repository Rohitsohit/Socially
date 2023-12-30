import React, { useEffect, useState } from 'react';
import { View, Text } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import { updateUserData } from '../graphql/mutations';
import { listUserData } from '../graphql/queries';
import {createChat,updateChat} from "../graphql/mutations"
export default function FriendRequest(user) {
  
  const [request, setRequest] = useState([]);

  useEffect(() => {
    setRequest(user.user.friendRequest);
  }, []);

  

  const handleAccept = async (e, friend) => {
    e.preventDefault();

    //add friend to who is login.
    const addFriend ={
      name:friend,
      MessageID : "",
    }
    
     user.user.friends.push(addFriend);

    const updatedUser = {
      id: user.user.id,
      friends: user.user.friends.map(({ name, MessageID}) => ({
        name,
        MessageID
        
      }))
    };
   
       await API.graphql({ query: updateUserData, variables: { input: updatedUser } });
 

    //add friend who make a  request.
    const response = await API.graphql({ query: listUserData });
    const foundUser = response.data.listUserData.items.find(obj => obj.user === friend);
    
    const userfriend = {
      name: user.user.user,
      MessageID:"",
    }

    foundUser.friends.push(userfriend);
    
    const updatedFoundUser = {
      id: foundUser.id,
      friends: foundUser.friends.map(({name,  MessageID}) => ({
        name,
        MessageID
        
      }))
    };

    const res = await API.graphql({ query: updateUserData, variables: { input: updatedFoundUser } });
   
     //remove friend from the list.
   removeFriend(e, friend);

   //creating message id : 
  await creatingMessageID(friend);
  };

  const removeFriend = async (e, name) => {
    e.preventDefault();
    const indexToRemove = user.user.friendRequest.indexOf(name);

    if (indexToRemove !== -1) {
      user.user.friendRequest.splice(indexToRemove, 1);
    }
    const updatedUser = {
      id: user.user.id,
      friendRequest: user.user.friendRequest,
    };
    const response = await API.graphql({ query: updateUserData, variables: { input: updatedUser } });
    setRequest(response.data.updateUserData.friendRequest);
  };
 
 const  creatingMessageID = async(friendName)=>{

            const inputForm = {
          name :friendName,
          messages : [
            {
            sender :user.user.user, 
            content :"",
            timestamp: new Date().toISOString(),
            }
          ]
        }
       const res= await API.graphql({query:createChat,variables:{input:inputForm}});  
  
      
    //adding message id to user friend list
    const updatedUserFriendID = {
      id: user.user.id,
      friends: user.user.friends.map(({ name, MessageID }) => ({
        name,
        MessageID: name === friendName ? res.data.createChat.id : MessageID,
      }))
    };
    const res1= await API.graphql({ query: updateUserData, variables: { input: updatedUserFriendID } });  
    console.log("Response 1 ",res1)


    // adding message Id in friends list of friend of a user.
    const response = await API.graphql({ query: listUserData });
    const foundUser = response.data.listUserData.items.find(obj => obj.user === friendName);
 
    const updatedFoundFriendId = {
            id: foundUser.id,
            friends: foundUser.friends.map(({ name, MessageID }) => ({
              name,
              MessageID: name === user.user.user ? res.data.createChat.id : MessageID,
            }))
          };
     const res2=await API.graphql({ query: updateUserData, variables: { input: updatedFoundFriendId } });
   
  }

  return (
    <View
    as="div"
        ariaLabel="View example"
        borderRadius="6px"
        variation="elevated"
        boxShadow="2px 2px 2px 2px var(--amplify-colors-neutral-60)"
        color="var(--amplify-colors-blue-60)"
        height="32rem"
        padding="1rem"
        width={['90%', '80%', '60%', '50%']} // Responsive width values
        maxWidth="50rem"
        marginLeft="41px"
    >
      {!request.length ? (
        <Text
          fontSize="medium"
          margin="7em"
          style={{
            color: '#9691ba',
            marginRight: '5px', // Add a small gap between the username and SVG icons
          }}
        >
          No Friend Request
        </Text>
      ) : (
        request.map(friend => (
          <View
            display="flex"
            alignItems="center"
            marginTop="22px"
            marginLeft="10px" // Adjust the margin for small screens
            style={{
              flexWrap: 'wrap', // Allow items to wrap to the next line on smaller screens
            }}
          >
            {/* Smaller Circle with Image */}
            <View
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#9975ba',
                marginRight: '9px',
                position: 'relative',
              }}
            >
              {/* Overlay Text */}
              <Text
                fontSize="large"
                fontWeight="bold"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                }}
              >
                {friend.charAt(0).toUpperCase()}
              </Text>
            </View>

            {/* Username */}
            <Text
              fontSize="large"
              style={{
                color: '#9691ba',
                cursor: 'pointer',
                marginRight: '5px', // Add a small gap between the username and SVG icons
              }}
            >
              {friend}
            </Text>

            {/* SVG Icons */}
            {/* Add some margin between the icons */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={e => handleAccept(e,friend)}
              height="1.25em"
              viewBox="0 0 448 512"
              style={{ cursor: 'pointer', marginLeft: '12px', fill: '#9691ab' }}
            >
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={e => removeFriend(e,friend)}
              height="1.25em"
              viewBox="0 0 384 512"
              style={{ cursor: 'pointer', marginLeft: '12px', fill: '#9691ab' }}
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </View>
        ))
      )}
    </View>
  );
}
