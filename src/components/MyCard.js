import React from 'react'
import {Card,Image,View,Flex, Badge,Text} from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { Amplify,API } from 'aws-amplify';
import { updateFromData } from '../graphql/mutations';
import config from '../aws-exports'
Amplify.configure(config)
export default function MyCard(card) {

  const history = useNavigate();

  const handleComment=()=>{
        
     if(card.email.username){
      history(`/comment/${card.card.id}/${card.email.username}`);
     }
    
  }

  const handleLike =async(e)=>{
    e.preventDefault();
    
    if(card.email.username){
        const postId=card.card.id;
          // like condition.
          if(card.card.likes.includes(card.email.username)){
          
            //to remove the like 
            let elementToRemove = card.email.username;
            let index = card.card.likes.indexOf(elementToRemove);
              if (index !== -1) {
                card.card.likes.splice(index, 1);
              }
            
              const updateDocument = {
                id:postId,
                likes:card.card.likes
              }
              await API.graphql({query:updateFromData,variables:{input:updateDocument}});
          }
          else{
           
            // to add like in database.
            card.card.likes.push(card.email.username);
            console.log(card.card);
            const updateDocument = {
              id:postId,
              likes:card.card.likes
            }
            await API.graphql({query:updateFromData,variables:{input:updateDocument}});
          }
         

    }else{
      console.log("please login");
    } 
  }


  
    
  return (
        
<Card
   
      maxWidth="21rem"
      variation="elevated"
      boxShadow="2px 2px 2px 2px var(--amplify-colors-neutral-60)"
      marginTop="relative.large"
      marginLeft="xxxl"
    >
      <Image
        src={card.card.imageurl}
        alt="Card Image"
       
      />


      <View >
      <Badge
          variation="success"
          padding="1rem">
          {card.card.tags}
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
           {card.card.title}
        </Text>

  <Text >{card.card.description}</Text>
</Flex>
   <Flex direction="row" justifyContent="space-around">
    <Text onClick={handleLike}>{} Like</Text>
    
    <Text onClick={handleComment} >Comment</Text>
  </Flex>
      </View>
    </Card>

    )
}
