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
  },[])

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
       templateColumns={{ base: "1fr", large: "1fr 2fr 2fr" }}
       templateRows={{ base: "repeat(4, auto)", large: "repeat(4, auto)" }}
       gap={4}
       p={4}
       position="relative" // Enable positioning for the parent container
     >
       {/* Centered Cards Component */}
       <View gridColumn={{ base: "1", large: "1 / 4" }} textAlign="center">
         <MyCards username={userLogin.user} />
       </View>

       {/* Friends Component on the Top Right */}
       <View
         maxWidth={{ base: "100%", large: "40em" }}
         variation="Default"
         width="20em"
         boxShadow="2px 2px 2px 2px var(--amplify-colors-neutral-40)"
         position="absolute" // Position the component absolutely
         top="0" // Align it to the top
         right="0" // Align it to the right
         zIndex="1" // Ensure it appears above other content
         height={["15em", "20em"]}
       >
         <Text
           style={{
             color: "#6045ba",
             cursor: "pointer",
             marginTop: "10px",
             fontSize: "1.3em",
             margin: "1.3em"
           }}
         >
           Friend's
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