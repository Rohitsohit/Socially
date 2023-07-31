import {withAuthenticator,Alert,View,Flex } from '@aws-amplify/ui-react';
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
import SearchFriend from './components/SearchFriend';
import './css/navbar.css'
import { useEffect,useState } from 'react';
import FriendRequest from './components/FriendRequest';
import GenerateImage from './components/GenerateImage';
import NavbarLayout from './components/NavbarLayout';
import UserMessage from './components/UserMessage';
function App({signOut,user}) { 
  

  const [userLogin, setUserLogin] = useState(null);
  const [userCreated, setUserCreated] = useState(false); // Track if user has been created in the database


  useEffect(() => {
    if (!userLogin && !userCreated) {
      fetchUser();
    }
  }, []);


const createUser = async ()=>{
  console.log(userCreated)
  if(!userLogin && !userCreated){
    
  const formData ={
    user:user.username,
  friends:[],
  friendRequest:[],
  }
  await API.graphql({query:createUserData,variables:{input:formData}});
  setUserLogin(formData);
  
}
setUserCreated(true); 
}

const fetchUser = async ()=>{

  const searchUser = user.username; // user to be searched.

  const response = await API.graphql({query:listUserData});
  const users = response.data.listUserData.items;
  const foundUser = users.find(obj => obj.user === searchUser);

    if (foundUser) {
      setUserLogin(foundUser);
      setUserCreated(true); 
    } else {
      
      await createUser();  // creating user 

    }

    
}

  return (
    <>


   <Flex flexDirection="column" alignItems="center" justifyContent="center">
      {/* FOMO (Left Corner) */}
      <View
        style={{
          backgroundColor: '#6045ba',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1.3em',
          marginTop: '10px',
        }}
        padding="0.5em 7em"
      >
          FOMO
      </View>

      {/* Search Field (Centered) */}
      <View width={['80%', '60%', '40%', '30%']}  marginTop="10px">
      <SearchFriend  username={user.username} />
              </View>

      {/* Button (Right Corner) */}
      <View
        style={{
          backgroundColor: '#6045ba',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1.3em',
          marginTop: '10px',
          marginLeft: 'auto',
        }}
        padding="0.5em 1em"
      >
        Hi, {user.username}
      </View>
      <View
        style={{
          backgroundColor: '#6045ba',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1.3em',
          marginTop: '10px',
          marginLeft: 'auto',
        }}
        onClick={signOut}
        padding="0.5em 1em"
      >
        signOut
      </View>
    </Flex>


     <Router>
      <switch>
      <Routes>
      <Route path="/" exact element={<NavbarLayout><MyHome username={user.username} signOut={signOut} /></NavbarLayout>}/>
      </Routes>

      <Routes>
      <Route path="/postform" exact element={<NavbarLayout><MyForm user={user}/></NavbarLayout>}/>
      </Routes>

      <Routes>
      <Route path="/friends" exact element={<MyFriends user={user}></MyFriends>}/>
      </Routes>

      <Routes>
      <Route path="/friendrequest" exact element={!userLogin?(<>...</>):(<NavbarLayout><FriendRequest user={userLogin}/></NavbarLayout>) }/>
      </Routes>

      <Routes>
      <Route path="/generate" exact element={!userLogin?(<>...</>):(<GenerateImage></GenerateImage>) }/>
      </Routes>

      <Routes>
      <Route path="/message/:name" exact element={<UserMessage user={userLogin} ></UserMessage> }/>
      </Routes>

      <Routes>
      <Route path="/comment/:postId/:name" exact element={<MyComments/>}/>
      </Routes> 
      </switch>
      </Router>
    </>
  );
}

export default withAuthenticator(App);
