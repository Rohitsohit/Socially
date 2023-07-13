import React, { useEffect, useState } from 'react'
import { API,Storage } from 'aws-amplify';
import {listFromData } from "../graphql/queries";
import {Loader } from '@aws-amplify/ui-react';
import MyCard from "./MyCard";
export default function MyCards(email) {

    const [cardData, setCardData] = useState([]);
    useEffect(() => {
      fetchData();
    },[])
    
    const fetchData=async()=>{
    let response= await API.graphql({query:listFromData});
    setCardData(response.data.listFromData.items);
    }

    
  return (
    <div>
    {
      !cardData.length ?(<Loader size="large"/>):(
        cardData.map(card =>(
     <MyCard card={card} email={email}></MyCard>     
     ))) 
     
    }
    </div>
  )
}
