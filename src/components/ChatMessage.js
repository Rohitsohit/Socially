import React from 'react'
import {View ,Text} from '@aws-amplify/ui-react';

export default function ChatMessage({ user, text }) {
  console.log(user)
  console.log(text)
  return (
    <View p={2} mb={2} alignSelf={user === 'user1' ? 'flex-start' : 'flex-end'}>
      <Text color="black" bg={user === 'user1' ? 'blue.600' : 'green.500'} borderRadius="md" p={2}>
      {text} 
      </Text>
    </View>
  )
}
