import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify';
import { updateChat } from "../graphql/mutations"
import { listChats } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import { onUpdateChat } from "../graphql/subscriptions"
import "../css/chatbox.css"
export default function UserMessage(userLogin) {
  const friendName = useParams();
  const [message, setMessage] = useState("");
  const [oldChat, setOldChat] = useState(null);
  const [messageData, setMessageData] = useState([]);
  const [subData, setsubData] = useState([]);

  useEffect(() => {
    fetchMessage(friendName.id);
    
    const subscription = API.graphql(graphqlOperation(onUpdateChat)).subscribe({
      next: (eventData) => {
        setsubData(eventData.value.data.onUpdateChat.messages)
        setMessageData((messageData) => [...messageData, eventData.value.data.onUpdateChat.messages]);

      },
      error: (error) => {
        console.error('Subscription error:', error);
      },
    });

    return () => {
      // Clean up the subscription when the component unmounts
      subscription.unsubscribe();
    };

  }, [subData])


  

  const fetchMessage = async (Id) => {

    const response = await API.graphql({ query: listChats });
    const foundObject = response.data.listChats.items.find((item) => item.id === Id);

    if (foundObject) {
      setMessageData(foundObject.messages);
      setOldChat(foundObject);
    }

  }
  const handleSend = async (e) => {
    e.preventDefault();
    const chat = {
      sender: userLogin.user.user,
      content: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // Assuming oldChat is the response from your initial query to get the chat data
    oldChat.messages.push(chat);

    const updatedChat = {
      id: oldChat.id,
      messages: oldChat.messages.map(({ sender, content, timestamp }) => ({
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
    clearMessage();
  }

  const clearMessage = () => {
    setMessage("");
  }

  
  return (
    <>
          <div class="rounded-lg shadow mx-5">
            <div class="px-4 py-5 chat-box bg-white">
            {!messageData.length || !userLogin.user ? (
          <>start chatting now...</>
        ) : (
          messageData.map((chat) => (
            <>
            {chat.sender===userLogin.user.user ?(
              <div class="media w-50 ml-auto mb-3">
              <div class="media-body">
                <div class="bg-primary rounded py-2 px-3 mb-2">
                  <p class="text-small mb-0 text-white">{chat.content}</p>
                </div>
                <p class="small text-muted">you</p>
              </div>
            </div>
            ):(
              <div class="media w-50 mb-3"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle" />
              <div class="media-body ml-3">
                <div class="bg-light rounded py-2 px-3 mb-2">
                  <p class="text-small mb-0 text-muted">{chat.content}</p>
                </div>
                <p class="small text-muted">{chat.sender}</p>
              </div>
            </div>
            )}           
         </>
          ))
         )}             
            </div>
            <form action="#" class="bg-light">
              <div class="input-group">
                <input type="text" placeholder="Type a message" aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light"  onChange={(e) => {
            setMessage(e.target.value);
           }} />
                <div class="input-group-append">
                  <button id="button-addon2" type="submit" onClick={handleSend} class="btn btn-link">send<i class="fa fa-paper-plane"></i></button>
                </div>
              </div>
            </form>
          </div>
    </>
  )
}
