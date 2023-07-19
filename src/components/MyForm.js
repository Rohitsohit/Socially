import React, { useState } from 'react'
import { API } from 'aws-amplify';
import { Button,Flex, TextField} from '@aws-amplify/ui-react';
import { createFromData } from '../graphql/mutations';

export default function MyForm(username) {
    const [formData, setFormData] = useState({title:"",description:"",tags:"",likes:[],comments:[],createby:""});
    const handleSubmit=async(e)=>{
      e.preventDefault();
       await API.graphql({query:createFromData,variables:{input:formData}});
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
  )
}
