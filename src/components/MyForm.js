import React, { useState } from 'react'
import { API } from 'aws-amplify';
import { Button, Flex, TextField,FileUploader } from '@aws-amplify/ui-react';
import { createFromData } from '../graphql/mutations';

export default function MyForm() {
    const [formData, setFormData] = useState({title:"",description:"",tags:"",likes:[],comments:[]});
    const handleSubmit=async(e)=>{
      e.preventDefault();
       await API.graphql({query:createFromData,variables:{input:formData}});
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
      {/* <TextField label="Email" type="email" isRequired={true} /> */}
      <FileUploader
      acceptedFileTypes={['image/*']}
      accessLevel="public" />
      <Button type="submit" onClick={handleSubmit}>Submit</Button>
    </Flex>
  )
}
