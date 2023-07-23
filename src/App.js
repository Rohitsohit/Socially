import {withAuthenticator } from '@aws-amplify/ui-react';
import './App.css';
import { API} from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MyHome from './components/MyHome';
import MyForm from './components/MyForm';
import MyComments from './components/MyComments';
import MyFriends from './components/MyFriends';
import {createUserData} from './graphql/mutations'
import {listUserData } from './graphql/queries';
import {SearchField} from '@aws-amplify/ui-react';
import './css/navbar.css'

import { useEffect,useState } from 'react';
import FriendRequest from './components/FriendRequest';
function App({signOut,user}) { 

  const [userLogin, setUserLogin] = useState();
  
  //add to user to database
  useEffect(() => {    
    fetchUser();
}, [])

const createUser = async ()=>{
  const formData ={
    user:user.username,
  friends:[],
  friendRequest:[]
  }
  await API.graphql({query:createUserData,variables:{input:formData}});
  setUserLogin(formData);
}

const fetchUser = async ()=>{

  const searchUser = user.username; // user to be searched.

  const response = await API.graphql({query:listUserData});
  const users = response.data.listUserData.items;
  const foundUser = users.find(obj => obj.user === searchUser);

  setUserLogin(foundUser);
    if (foundUser) {
      //console.log("User already created : ", foundUser.user);
    } else {
      createUser();  // creating user 
    }
}

  return (
    <>
    <div className="navbar">
        <a href='/'>
        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg> 
        </a>

        <SearchField  placeholder="Search here..." size="small"></SearchField>

        <a href='/friendrequest'>
        <svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>  
        </a>
        
        <a href='/postform'>
        <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
        </a>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={signOut} height="1.5em" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>

      </div>
     
     <Router>

      <Routes>
      <Route path="/" exact element={<MyHome username={user.username} />}/>
      </Routes>

      <Routes>
      <Route path="/postform" exact element={<MyForm user={user}/>}/>
      </Routes>

      <Routes>
      <Route path="/friends" exact element={<MyFriends user={user}></MyFriends>}/>
      </Routes>

      <Routes>
      <Route path="/friendrequest" exact element={!userLogin?(<></>):(<FriendRequest user={userLogin}></FriendRequest>) }/>
      </Routes>

      <Routes>
      <Route path="/comment/:postId/:name" exact element={<MyComments/>}/>
      </Routes> 

      </Router>
    </>
  );
}

export default withAuthenticator(App);
