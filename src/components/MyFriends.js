import React, { useEffect, useState } from 'react'
import {createUserData} from '../graphql/mutations'
import { API} from 'aws-amplify';
import { listUserData } from '../graphql/queries';
import { Image,Text} from '@aws-amplify/ui-react';
export default function MyFriends(user) {
    console.log(user)
  return (
    <>
    {!user.username ? (<>Loading..</>):(
    
    user.username.friends.map(user =>(
      <div>
          <Image
            alt="friend image"
            src="/amplify-logo.svg"
            objectFit="initial"
            objectPosition="50% 50%"
            backgroundColor="initial"
            height="40%"
            width="40%"
            opacity="100%"
          />
          <Text>{user}</Text>
    </div>     
      ))

    
    
    )}
    </>
  )
}
