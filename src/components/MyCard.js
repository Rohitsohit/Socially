import React from 'react'
import {Card,Image,View,Heading, Flex, Badge, Text, Button, useTheme,} from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from '../aws-exports'
Amplify.configure(config)
export default function MyCard(card) {
  console.log(card.email.username)
  const history = useNavigate();
  const { tokens } = useTheme();

  const handleComment=()=>{
        
    // if(signInUser){
    //   history(`/comment/${card.card.id}/${props.user.name}`);
    // }
    history(`/comment/${card.card.id}/${card.email.username}`);
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
            <Button variation="primary">Like</Button>
            <Button variation="primary" onClick={handleComment}>Comments</Button>
          </Flex>
        </Flex>
      </Card>
    </View>
    )
}
