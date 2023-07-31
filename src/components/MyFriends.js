import React, { useEffect, useState } from 'react'
import { createUserData } from '../graphql/mutations'
import { API } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { Avatar, Text, View } from '@aws-amplify/ui-react';
export default function MyFriends(user) {
  const history = useNavigate();
  const handleprofile = (name)=>{
   
    history(`/message/${name}`);
  }
if(user){
 
}
  return (
    <>
      {!user.username ? (<>Loading..</>) : (
        user.username.friends.map(friend => (
          
          <View
      display="flex"
      alignItems="center"
      marginTop="22px"
      marginLeft="29px"
      style={{
        marginBottom: '10px', // Add a gap between each user element
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
          {friend.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      {/* Username */}
      <Text
        fontSize="large"
        style={{
          color: '#9691ba',
          cursor: 'pointer',
          marginBottom: '5px', // Add a gap between the username and SVG icon
          flexGrow: '1', // Allow the username to take up available space
        }}
      >
        {friend.name}
      </Text>
      
      <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>handleprofile(friend.name)} height="1.5em" viewBox="0 0 512 512" style={{ marginRight: '99px',borderColor:"red",fill:"#9691ab" }}>
        <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
      </svg>
      
    </View>
    


          
        ))



      )}
    </>
  )
}
