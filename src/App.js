import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
function App({signOut,user}) {
  return (
    <>
    
     <Button onClick={signOut}>Sign out</Button>
    </>
  );
}

export default withAuthenticator(App);
