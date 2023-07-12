import React from 'react'
import MyForm from './MyForm';
import MyCards from './MyCards';

 function MyHome(user) {

  return (
    
    <>
   <MyForm></MyForm>
   <MyCards username={user.username}></MyCards>
    </>
  
  )
}
export default MyHome;