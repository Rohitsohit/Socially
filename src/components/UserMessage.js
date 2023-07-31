import React, { useEffect, useState } from 'react'
import { TextField,Flex,View,Text} from '@aws-amplify/ui-react';
import { API,graphqlOperation } from 'aws-amplify';
import {createChat,updateChat} from "../graphql/mutations"
import { listChats } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import {onUpdateChat} from "../graphql/subscriptions"
import { updateUserData } from '../graphql/mutations';
import { listUserData } from '../graphql/queries';

export default function UserMessage(userLogin) {
    const friendName = useParams();
    const [message, setMessage] = useState("");
    const [oldChat, setOldChat] = useState();
  
  const [messageData, setMessageData] = useState("");
  const [chatID, setchatID] = useState("");


    
    useEffect(() => {

      async function fetchData (){
        const userFriend = userLogin.user.friends.find((friend) => friend.name === friendName.name);
        
        if (userFriend.MessageID === "" && chatID === "" ) {
            console.log('MessageID is empty.');
            const inputForm = {
              name :friendName.name,
              messages : [
                {
                sender :userLogin.user.user, 
                content :message.trim(),
                timestamp: new Date().toISOString(),
                }
              ]
            }
           const res= await API.graphql({query:createChat,variables:{input:inputForm}});  
      
           setchatID(res.data.createChat.id);
        //adding message id to user friend list
        const updatedUserFriendID = {
          id: userLogin.user.id,
          friends: userLogin.user.friends.map(({ name, MessageID }) => ({
            name,
            MessageID: name === friendName.name ? res.data.createChat.id : MessageID,
          }))
        };
      await API.graphql({ query: updateUserData, variables: { input: updatedUserFriendID } });  



        // adding message Id in friends list of friend of a user.
        const response = await API.graphql({ query: listUserData });
        const foundUser = response.data.listUserData.items.find(obj => obj.user === friendName.name);
     
      const updatedFoundFriendId = {
              id: foundUser.id,
              friends: foundUser.friends.map(({ name, MessageID }) => ({
                name,
                MessageID: name === userLogin.user.user ? res.data.createChat.id : MessageID,
              }))
            };
         await API.graphql({ query: updateUserData, variables: { input: updatedFoundFriendId } });
     
          } else {
            console.log('adam\'s MessageID is not  empty.');
            fetchMessage(); 
          }
      }
      if(userLogin.user !=null){
        fetchData();
      }
      const subscription = API.graphql(graphqlOperation(onUpdateChat)).subscribe({
        next: (eventData) => {
          console.log(eventData.value.data.onUpdateChat.messages)
          setMessageData(eventData.value.data.onUpdateChat.messages);
        },
        error: (error) => {
          console.error('Subscription error:', error);
        },
      });

      return () => {
        // Clean up the subscription when the component unmounts
        subscription.unsubscribe();
        
      };
    
    },[])

    const fetchMessage=async()=>{
      const response = await API.graphql({query:listChats,filter:{id:chatID}});
     
      if(response.data.listChats){
        setMessageData(response.data.listChats.items[0].messages);
        setOldChat(response.data.listChats.items);
      }
          
    }
    const fetchchat = async()=>{
            
      const userFriend = userLogin.user.friends.find((friend) => friend.name === friendName.name);
      if (userFriend.MessageID === '') {
          console.log('adam\'s MessageID is empty.');
          await createUserChat();
        } else {
          console.log('adam\'s MessageID is not  empty.'); 
        }
        
        
    }

    const createUserChat = async ()=>{
        const inputForm = {
            name :friendName.name,
            messages : [
              {
              sender :userLogin.user.user, 
              content :message.trim(),
              timestamp: new Date().toISOString(),
              }
            ]
          }
         const response= await API.graphql({query:createChat,variables:{input:inputForm}});  
       await settingMessageId(response.data.createChat.id);
       await settingMessageIdToFrined(response.data.createChat.id);
    }
    const settingMessageId = async(Id)=>{

        //adding message id to user friend list
        const updatedUserFriendID = {
            id: userLogin.user.id,
            friends: userLogin.user.friends.map(({ name, MessageID }) => ({
              name,
              MessageID: name === friendName.name ? Id : MessageID,
            }))
          };
        await API.graphql({ query: updateUserData, variables: { input: updatedUserFriendID } });  
}

const settingMessageIdToFrined=async(Id)=>{

      // adding message Id in friends list of friend of a user.
      const response = await API.graphql({ query: listUserData });
      const foundUser = response.data.listUserData.items.find(obj => obj.user === friendName.name);
    console.log(foundUser)
    const updatedFoundFriendId = {
            id: foundUser.id,
            friends: foundUser.friends.map(({ name, MessageID }) => ({
              name,
              MessageID: name === userLogin.user.user ? Id : MessageID,
            }))
          };
       await API.graphql({ query: updateUserData, variables: { input: updatedFoundFriendId } });
   


}

const handleSend =async (e)=>{
    
  console.log(oldChat)    
  const chat = {
    sender:userLogin.user.user,
    content: message.trim(),
    timestamp: new Date().toISOString(),
  };
  
  // Assuming oldChat is the response from your initial query to get the chat data
  oldChat[0].messages.push(chat);
  
  const updatedChat = {
    id: oldChat[0].id,
    messages: oldChat[0].messages.map(({ sender, content, timestamp }) => ({
      sender,
      content,
      timestamp,
    })),
  };
  
  try {
     await API.graphql({ query: updateChat, variables: { input: updatedChat } });
  } catch (error) {
    console.error('Error updating chat:', error);
  }
    }
  

  return (
    <View
    as="div"
    ariaLabel="View example"
    borderRadius="6px"
    border="1px solid var(--amplify-colors-black)"
    color="var(--amplify-colors-blue-60)"
    height="30rem"
    margin="auto"
    width="20em"
    marginTop="4em"
    >
    <Flex direction="row"
     margin="revert" 
    >
    <TextField
      size="small"
      placeholder="Enter your message here..."
      width="20em"
      onChange={(e)=>{
        setMessage(e.target.value);
      }}
    /> 
    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleSend} height="1.9em" viewBox="0 0 512 512"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
    </Flex>
    {!messageData.length ? (
        <>No message</>
      ) : (
        messageData.map((chat) => 
        <Text>{chat.content}</Text>)
      )}
    
    </View>
  )
}
