import React, { useEffect, useState } from 'react';
import { API, Storage, graphqlOperation } from 'aws-amplify';
import { listFromData } from '../graphql/queries';
import { Loader } from '@aws-amplify/ui-react';
import MyCard from './MyCard';

import { onUpdateFromData } from '../graphql/subscriptions';

export default function MyCards(email) {

  const [cardData, setCardData] = useState([]);
  
  useEffect(() => {
    fetchData();
    
    // Subscribe to onUpdateFromData event for real-time updates
    const subscription = API.graphql(graphqlOperation(onUpdateFromData)).subscribe({
      next: (eventData) => {
        const updatedCard = eventData.value.data.onUpdateFromData;
        setCardData((prevData) => {
          // Find and update the specific card in the state
          const updatedData = prevData.map((card) =>
            card.id === updatedCard.id ? updatedCard : card
          );
          return updatedData;
        });
      },
      error: (error) => {
        console.error('Subscription error:', error);
      },
    });

    return () => {
      // Clean up the subscription when the component unmounts
      subscription.unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    let response = await API.graphql({ query: listFromData });
    setCardData(response.data.listFromData.items);
  };

  return (
    <div>
      {!cardData.length ? (
        <Loader size="large" />
      ) : (
        cardData.map((card) => <MyCard card={card} email={email} />)
      )}
    </div>
  );
}
