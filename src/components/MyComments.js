import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {API } from 'aws-amplify';
import {getFromData} from '../graphql/queries'

import {Card,Image,View,Flex, Badge,Text,TextField,Divider,Button} from '@aws-amplify/ui-react';

import Comment from './Comment';
import {updateFromData} from '../graphql/mutations'
import '../css/comment.css'
export default function MyComments() {
  
  const { postId, name } = useParams();
  const [post, setpost] = useState();
  var commentObj = {
    message:"",
    username:""
  }
  var totalLikes =0;
  if(post){
     totalLikes =post.likes.length;
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
<View marginLeft="28em"
  marginTop="large"
>
  {!post ? (
    <p>loading..</p>
  ) : (
    <>
      <Card
   variation="default"
   maxWidth="21rem"
  
   boxShadow="2px 2px 2px 2px var(--amplify-colors-neutral-60)"

 >
   <Image
     src={post.imageurl}
     alt="Card Image"
    
   />


   <View >
   <Badge
       variation="success"
       padding="1rem">
       {post.tags}
     </Badge>
     <Flex direction="column" padding="1rem">
   
     <Text
         variation="primary"
         as="p"
         lineHeight=""
         fontWeight={400}
         fontSize="1.5em"
         fontStyle="normal"
         width="25vw"
       >
        {post.title}
     </Text>

<Text >{post.description}</Text>
</Flex>
<Flex direction="row" justifyContent="space-around">
 <Text>{totalLikes} Like</Text>
</Flex>
   </View>
 </Card>

        <Flex gap="1rem" direction="column">
             <TextField
             maxWidth="21rem"
            
            
               placeholder="Add a comment..."
               onChange={(e) => {
                 commentObj.message = e.target.value;
                 commentObj.username = name;
               }}
               outerEndComponent={<Button onClick={handleSend}>Post</Button>}
             
             />
           </Flex>
           <Divider size="large"
          orientation="horizontal"
          maxWidth="21rem"/>
           {!post.comments ? (
             <p>Add a comment...</p>
           ) : (
             post.comments.map((comment, index) => (
               <Comment key={index} props={comment} />
             ))
         )}
         </>
       )}

   
  
</View>




  )
}
