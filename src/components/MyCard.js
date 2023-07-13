import React from 'react'
import {Card,Image,View,Heading, Flex, Badge, Text, Button, useTheme,} from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { Amplify,API } from 'aws-amplify';
import { updateFromData } from '../graphql/mutations';
import config from '../aws-exports'
Amplify.configure(config)
export default function MyCard(card) {
  console.log(card.card.imageurl)
  const history = useNavigate();
  const { tokens } = useTheme();

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
        <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
    >
      <Card>
        <Flex direction="row" alignItems="flex-start">
          <Image
            alt="Road to milford sound"
            src={card.card.imageurl}
            width="33%"
          />
          <Flex
            direction="column"
            alignItems="flex-start"
            gap={tokens.space.xs}
          >
            <Flex>
              <Badge size="small" variation="info">
                {card.card.tags}
              </Badge>
              <Badge size="small" variation="success">
                Verified
              </Badge>
            </Flex>

            <Heading level={5}>
              {card.card.title}
            </Heading>

            <Text as="span">
            {card.card.description}
            </Text>
            <Button variation="primary" onClick={handleLike}>{card.card.likes.length} Like</Button>
            <Button variation="primary" onClick={handleComment}>Comments</Button>
          </Flex>
        </Flex>
      </Card>
    </View>
    )
}
