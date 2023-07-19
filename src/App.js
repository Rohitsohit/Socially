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
import { GrDuplicate } from "react-icons/gr";
import { AiOutlineHome,AiOutlineLogout } from "react-icons/ai";
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
        <AiOutlineHome className="custom-icon"></AiOutlineHome>
        </a>

        <SearchField></SearchField>

        <a href='/postform'>
        <GrDuplicate className="custom-icon"></GrDuplicate>
        </a>
        <AiOutlineLogout className="custom-icon" onClick={signOut}></AiOutlineLogout>
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
