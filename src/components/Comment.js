import React from 'react'
import { Flex, Text, Divider,Heading, View } from '@aws-amplify/ui-react';

export default function Comment(comment) {
    var commentObj ={}
     commentObj = JSON.parse(comment.props);

  return (
    <View>
    <Flex direction="column">
    <Heading
  width='30vw'
  level={6} 
>
   {commentObj.message}
</Heading>
  <Text variation="info"> {commentObj.username}</Text>
  <Divider
    size="large"
    orientation="horizontal" />
</Flex>
    </View>
  )
}
