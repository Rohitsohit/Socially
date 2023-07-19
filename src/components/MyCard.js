import React from 'react'
import {Card,Image,View,Heading, Flex, Badge, Text, Button, useTheme,} from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { Amplify,API } from 'aws-amplify';
import { updateFromData } from '../graphql/mutations';
import config from '../aws-exports'
Amplify.configure(config)
export default function MyCard(card) {

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
        

      


<div className="custom-card">
  <div className="card__img" style={{ backgroundImage: `url(${card.card.imageurl})` }}></div>
  <div className="card__info-hover">
    <svg className="card__like" viewBox="0 0 24 24">
      {/* ...SVG path here... */}
    </svg>
    <span className="card__time" onClick={handleLike} >{card.card.likes.length} Likes</span>
    <div className="card__clock-info">
      <svg className="card__clock" viewBox="0 0 24 24">
        {/* ...SVG path here... */}
      </svg>
      <span className="card__time">15 min</span>
    </div>
  </div>
  <a className="card_link" >
    <div className="card__img--hover" style={{ backgroundImage: `url(${card.card.imageurl})` }}></div>
  </a>
  <div className="card__info">
    <Badge size="small" variation="info">
      {card.card.tags}
    </Badge>
    <Heading as="h3" marginBottom="space30">
      {card.card.title}
    </Heading>
    <Text as="p" marginBottom="space20">
      {card.card.description}
    </Text>
    
  </div>
</div>

    )
}
