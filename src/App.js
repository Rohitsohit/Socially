import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import './App.css';
import { API} from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MyHome from './components/MyHome';
import MyForm from './components/MyForm';
import MyComments from './components/MyComments';
import MyFriends from './components/MyFriends';
import {createUserData} from './graphql/mutations'
import { listUserData } from './graphql/queries';
import { useEffect } from 'react';
function App({signOut,user}) { 
  
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
}

const fetchUser = async ()=>{

  const searchUser = user.username; // user to be searched.

  const response = await API.graphql({query:listUserData});
  const users = response.data.listUserData.items;
  const foundUser = users.find(obj => obj.user === searchUser);
    if (foundUser) {
      //console.log("User already created : ", foundUser.user);
    } else {
      createUser();  // creating user 
    }
}
  return (
    <>
     <Button onClick={signOut}>Sign out</Button>
     <Router>

      <Routes>
      <Route path="/" exact element={<MyHome username={user.username} />}/>
      </Routes>

      <Routes>
      <Route path="/postform" exact element={<MyForm/>}/>
      </Routes>

      <Routes>
      <Route path="/friends" exact element={<MyFriends user={user}></MyFriends>}/>
      </Routes>

      <Routes>
      <Route path="/comment/:postId/:name" exact element={<MyComments/>}/>
      </Routes> 

      </Router>
    </>
  );
}

export default withAuthenticator(App);
