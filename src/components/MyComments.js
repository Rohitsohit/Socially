import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {API, graphqlOperation } from 'aws-amplify';
import {getFromData} from '../graphql/queries'
import { Button, Flex, TextField } from '@aws-amplify/ui-react';
import { Text ,Divider} from '@aws-amplify/ui-react';
import {Card,Image,View,Heading,Badge,useTheme} from '@aws-amplify/ui-react';
import Comment from './Comment';
import {updateFromData} from '../graphql/mutations'
export default function MyComments() {
  const { postId, name } = useParams();
  const [post, setpost] = useState([]);
  const { tokens } = useTheme();
  var commentObj = {
    message:"",
    username:""
  }
  useEffect(() => {
    fetchPost();
  }, [])
  
const fetchPost = async()=>{
  let response=await API.graphql({query:getFromData,variables:{id:postId}});
  setpost(response.data.getFromData);
}

const handleSend = async (e) => {
  e.preventDefault();
  
   post.comments.push(JSON.stringify(commentObj));
   
   let updateDocument = {
    id:postId,
    comments:post.comments
  }
  await API.graphql({query:updateFromData,variables:{input:updateDocument}});
  setpost((post) => ({
    ...post, // Copy the previous post object
    comments: post.comments, // Update the comments array with newComments
  }));
}

  return (
    <>
     {!post ? (<p>loading..</p>) :(<>
      <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
    >
      <Card>
        <Flex direction="row" alignItems="flex-start">
          <Image
            alt="Road to milford sound"
            src="/road-to-milford-new-zealand-800w.jpg"
            width="33%"
          />
          <Flex
            direction="column"
            alignItems="flex-start"
            gap={tokens.space.xs}
          >
            <Flex>
              <Badge size="small" variation="info">
                {post.tags}
              </Badge>
              <Badge size="small" variation="success">
                Verified
              </Badge>
            </Flex>

            <Heading level={5}>
              {post.title}
            </Heading>

            <Text as="span">
            {post.description}
            </Text>
            <Text variation="primary">Likes</Text>
          </Flex>
        </Flex>
      </Card>
    </View>
     
    <Flex gap="1rem" direction="column">
    <TextField  placeholder="Add a comment..." onChange={(e) => {
              commentObj.message = e.target.value;
              commentObj.username = name;}} outerEndComponent={<Button onClick={handleSend}>Post</Button>} />
  </Flex>
  <Divider
    size="large"
    orientation="horizontal" />
 {!post.comments ? (<p>Add a comment...</p>) : (
        post.comments.map(comment => (
          <Comment props={comment}></Comment>
        ))
      )}
     </>)}
     

    </>
  )
}
