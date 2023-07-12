import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MyHome from './components/MyHome';
import MyForm from './components/MyForm';
import MyComments from './components/MyComments';
function App({signOut,user}) { 

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
      <Route path="/comment/:postId/:name" exact element={<MyComments/>}/>
      </Routes> 

      </Router>
    </>
  );
}

export default withAuthenticator(App);
