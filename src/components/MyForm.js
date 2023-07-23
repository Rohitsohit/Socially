import React, { useState } from 'react'
import { API } from 'aws-amplify';
import { Button,Flex, TextField,View} from '@aws-amplify/ui-react';
import { createFromData } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

export default function MyForm(username) {
  const history = useNavigate();
    const [formData, setFormData] = useState({title:"",description:"",tags:"",likes:[],comments:[],createby:""});
    const handleSubmit=async(e)=>{
      e.preventDefault();
       await API.graphql({query:createFromData,variables:{input:formData}});
       history("/");
      }

      const imageHandle = async (e)=>{
            const file = e.target.files[0];
            const data = new FileReader()
            data.addEventListener('load',()=>{
              
              setFormData({
                 ...formData,
                  imageurl: data.result,
                  createby:username.user.username
                   }) 
            })
            data.readAsDataURL(e.target.files[0])
      }
    

  return (
    <View
  as="div"
  ariaLabel="View example"
  borderRadius="6px"
  border="1px solid var(--amplify-colors-black)"
  color="var(--amplify-colors-blue-60)"
  height="27rem"
  padding="0.5rem"
  maxWidth="35rem"
  width="26rem"
  paddingLeft="medium"
  marginTop="5em"
  marginLeft="28em"
  >
    <Flex as="form" direction="column" width="20rem">
      <TextField label="Title" onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value
                    })}} type="text"  />
      <TextField label="Message" onChange={(e) => {
                    setFormData({
                      ...formData,
                      description: e.target.value
                    })}} type="email" />
      <TextField label="tags"onChange={(e) => {
                    setFormData({
                      ...formData,
                      tags: e.target.value
                    })}} type="email"  />
       <input type="file" onChange={imageHandle} />
      <Button type="submit" onClick={handleSubmit}>Submit</Button>
    </Flex>
    </View>
  )
}
