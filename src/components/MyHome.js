import React, { useEffect, useState } from 'react'
import MyCards from './MyCards';
import MyFriends from './MyFriends';

import { Text, Grid, View } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import { listUserData } from '../graphql/queries';


function MyHome(user) {
  const [userLogin, setUserLogin] = useState();

  useEffect(() => {
    fetchUser();
  },)


  const fetchUser = async () => {
 
    const response = await API.graphql({ query: listUserData });
    const users = response.data.listUserData.items;

    // getting loged in user.
    const loginUser = users.find(obj => obj.user === user.username);
    setUserLogin(loginUser);
  }

  return (

    <>
   {!userLogin ?(<>Loading...</>):(
    <View>
    <Grid
    templateColumns={{ base: '1fr', large: '1fr 2fr 2fr' }}
    templateRows={{ base: 'repeat(4, auto)', large: 'repeat(4, auto)' }}
    gap={4}
    p={4}
  >
    <View gridColumn={{ base: '1', large: '1' }}></View>

    <View marginTop={['3em', '0']} gridColumn={{ base: '1', large: '2 / 4' }}>
      <MyCards username={userLogin.user} />
    </View>

    <View
      maxWidth={['100%', '21rem']}
      variation="Default"
      boxShadow="2px 2px 2px 2px var(--amplify-colors-neutral-40)"
      marginTop={['1em', '0']} // Reduce the top margin for small gap
      marginLeft={['auto', '10px']} // Add a small left margin for small gap
      height={['15em', '20em']}
      gridColumn={{ base: '1', large: '4' }}
    >
      <Text
        style={{
          color: '#6045ba',
          cursor: 'pointer',
          marginTop: '10px',
          fontSize: '1.3em',
        }}
      >
        Friends
      </Text>
      <MyFriends username={userLogin} />
    </View>
  </Grid>
  </View>
   )
   }
      


    </>
  )
}
export default MyHome;