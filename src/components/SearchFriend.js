import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { listUserData } from '../graphql/queries';
import { updateUserData } from '../graphql/mutations';
import { Expander, SearchField, Text, View } from '@aws-amplify/ui-react';
export default function SearchFriend(user) {
  const [userSearched, setUserSearched] = useState(null);
  const [userLogin, setUserLogin] = useState(null);
  const [userFound, setUserFound] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUser();
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUser();
  };

  const fetchUser = async () => {
    try {
      const response = await API.graphql({ query: listUserData });
      const users = response.data.listUserData.items;
      const searchUser = search.toLowerCase(); // Convert to lowercase for case-insensitive search

      // Getting searched user
      const foundUser = users.find((obj) => obj.user.toLowerCase() === searchUser);

      // Getting logged-in user
      const loginUser = users.find((obj) => obj.user === user.username);


      if (foundUser) {
        setUserFound(foundUser);
        setUserSearched(foundUser.user);
        setUserLogin(loginUser);
      } else {

        setUserSearched(null); // Reset userSearched when no user is found
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Implement error handling and display feedback to the user
    }
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    if (userFound && userLogin) {
      userFound.friendRequest.push(userLogin.user);
      const updatedUser = {
        id: userFound.id,
        friendRequest: userFound.friendRequest,
      };

      try {
        const response = await API.graphql({ query: updateUserData, variables: { input: updatedUser } });

      } catch (error) {
        console.error('Error updating user data:', error);
        // Implement error handling and display feedback to the user
      }
    }
  };
  return (
    <>
      <SearchField
        label="Search"
        placeholder="Search your friend  here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={handleSearch}
        hasSearchButton={false}
      />
      {userSearched && (
    <View
      display="flex"
      alignItems="center"
      marginTop="22px"
      marginLeft="29px"
      style={{
        marginBottom: '10px',
        flexWrap: 'wrap',
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
          {userSearched.charAt(0).toUpperCase()}
        </Text>
      </View>

      {/* Username */}
      <Text
        fontSize="large"
        style={{
          color: '#9691ba',
          cursor: 'pointer',
          marginBottom: '5px',
          flexGrow: '1',
        }}
      >
        {userSearched}
      </Text>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleAddFriend}
        height="1.25em"
        viewBox="0 0 640 512"
        style={{ marginRight: '99px', borderColor: 'red', fill: '#9691ab' }}
      >
        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
      </svg>
    </View>
  )}
    </>
  );
}




