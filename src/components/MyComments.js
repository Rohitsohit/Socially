import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {API } from 'aws-amplify';
import {getFromData} from '../graphql/queries'
import { Text ,Divider} from '@aws-amplify/ui-react';
import {Heading,Badge,useTheme} from '@aws-amplify/ui-react';
import Comment from './Comment';
import {updateFromData} from '../graphql/mutations'
import '../css/comment.css'
export default function MyComments() {
  
  const { postId, name } = useParams();
  const [post, setpost] = useState();
  const { tokens } = useTheme();
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
    // <>
    //   {!post ? (
    //     <p>loading..</p>
    //   ) : (
    //     <>
    //       <View backgroundColor="gray90" padding="space60">
    //         <Card className="circular-card">
    //           <Image alt="Road to Milford Sound" src={post.imageurl} width="100%" />
    //           <div className="card-content">
    //             <Badge size="small" variation="info">
    //               {post.tags}
    //             </Badge>
    //             <Badge size="small" variation="success">
    //               Verified
    //             </Badge>
    //             <Heading as="h3" marginBottom="space30">
    //               {post.title}
    //             </Heading>
    //             <Text as="p" marginBottom="space20">
    //               {post.description}
    //             </Text>
    //             <Text as="p" variation="primary" marginBottom="space20">
    //               {totalLikes} Likes
    //             </Text>
    //           </div>
    //         </Card>
    //       </View>

    //       <Flex gap="1rem" direction="column">
    //         <TextField
    //           placeholder="Add a comment..."
    //           onChange={(e) => {
    //             commentObj.message = e.target.value;
    //             commentObj.username = name;
    //           }}
    //           outerEndComponent={<Button onClick={handleSend}>Post</Button>}
    //         />
    //       </Flex>
    //       <Divider size="large" orientation="horizontal" />
    //       {!post.comments ? (
    //         <p>Add a comment...</p>
    //       ) : (
    //         post.comments.map((comment, index) => (
    //           <Comment key={index} props={comment} />
    //         ))
    //       )}
    //     </>
    //   )}
    // </>

<>
  {!post ? (
    <p>loading..</p>
  ) : (
    <>
      <div className="custom-card">
        <div className="card__img" style={{ backgroundImage: `url(${post.imageurl})` }}></div>
        <div className="card__info-hover">
          <svg className="card__like" viewBox="0 0 24 24">
            {/* ...SVG path here... */}
          </svg>
          <span className="card__time">{totalLikes} Likes</span>
          <div className="card__clock-info">
            <svg className="card__clock" viewBox="0 0 24 24">
              {/* ...SVG path here... */}
            </svg>
            <span className="card__time">15 min</span>
          </div>
        </div>
        <a className="card_link" >
          <div className="card__img--hover" style={{ backgroundImage: `url(${post.imageurl})` }}></div>
        </a>
        <div className="card__info">
          <Badge size="small" variation="info">
            {post.tags}
          </Badge>
          <Badge size="small" variation="success">
            Verified
          </Badge>
          <Heading as="h3" marginBottom="space30">
            {post.title}
          </Heading>
          <Text as="p" marginBottom="space20">
            {post.description}
          </Text>
          <Text as="p" variation="primary" marginBottom="space20">
            {totalLikes} Likes
          </Text>
        </div>
      </div>
    </>
  )}
</>




  )
}
