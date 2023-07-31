import React, { useState } from 'react'
import { API } from 'aws-amplify';
import { Button, Flex, TextField, View,Alert} from '@aws-amplify/ui-react';
import { createFromData } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

export default function MyForm(username) {
  const history = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", tags: "", likes: [], comments: [], createby: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.trim() === "") {
      setShowAlert(true);
    } else {
      await API.graphql({ query: createFromData, variables: { input: formData } });
    history("/");
    }
    
  }

  const imageHandle = async (e) => {
    const file = e.target.files[0];
    const data = new FileReader()
    data.addEventListener('load', () => {

      setFormData({
        ...formData,
        imageurl: data.result,
        createby: username.user.username
      })
    })
    data.readAsDataURL(e.target.files[0])
  }


  return (
    
   
      <View
        as="div"
        marginLeft="41px"
        ariaLabel="View example"
        borderRadius="6px"
        variation="elevated"
        boxShadow="2px 2px 2px 2px var(--amplify-colors-neutral-60)"
        color="var(--amplify-colors-blue-60)"
        height="32rem"
        padding="1rem"
        width={['90%', '80%', '60%', '50%']} // Responsive width values
        maxWidth="50rem" // Adjust the maximum width as needed
      >
        <Flex as="form" direction="column" width="100%" marginLeft="7em" marginTop="2em">
          <TextField
            label="Title"
            onChange={(e) => {
              setFormData({
                ...formData,
                title: e.target.value,
              });
            }}
            type="text"
            width="52%" // Set the width to 100% to make it fill the container
          />
          {showAlert && (
          <Alert
            type="error"
            marginBottom="1rem"
            dismissible
            style={{ backgroundColor: '#6045ba',
            color: 'white',width:"19em"}}
            onClose={() => setShowAlert(false)}
          >
            Title cannot be empty!
          </Alert>
        )}


          <TextField
            label="Message"
            onChange={(e) => {
              setFormData({
                ...formData,
                description: e.target.value,
              });
            }}
            type="text"
            width="52%" // Set the width to 100% to make it fill the container
          />
          <TextField
            label="Tags"
            onChange={(e) => {
              setFormData({
                ...formData,
                tags: e.target.value,
              });
            }}
            type="text"
            width="52%" // Set the width to 100% to make it fill the container
          />
          <input type="file" onChange={imageHandle} />
          <Button
            type="submit"
            onClick={handleSubmit}
            width="28%"
            style={{
              backgroundColor: '#6045ba',
              color: 'white',
              fontSize: '1.3em',
            }} // Set the width to 100% to make it fill the container
          >
            Post
          </Button>
        </Flex>
      </View>
 
    
  )
}
