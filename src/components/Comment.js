import React from 'react'
import { Flex, Text, Divider, Heading, View } from '@aws-amplify/ui-react';

export default function Comment(comment) {
  var commentObj = {}
  commentObj = JSON.parse(comment.props);

  return (
    
<View
  as="div"
  ariaLabel="View example"
  borderRadius="6px"
  border="1px solid var(--amplify-colors-black)"
  color="var(--amplify-colors-blue-60)"
  height="4rem"
  padding="0.5rem"
  maxWidth="21rem"
  paddingLeft="medium"
  marginTop="relative.small"
  >
        <Text
          variation="primary"
          as="p"
          lineHeight="1.5em"
          fontWeight={400}
          fontSize="1em"
          fontStyle="normal"
          textDecoration="none"
          width="15vw"
        >
          {commentObj.message}
        </Text>
        <Text  variation="primary"
        as="strong"
        lineHeight="1.5em"
        fontWeight={500}
        fontSize="1em"
        fontStyle="normal"
        textDecoration="none"
        width="30vw"> {commentObj.username}</Text>
    </View>
  )
}
