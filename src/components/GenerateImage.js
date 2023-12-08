import React, { useContext, useState } from 'react'
import { Configuration,OpenAIApi } from 'openai'
import { TextField,Button,Image } from '@aws-amplify/ui-react'
const configuration = new Configuration({
    apiKey:process.env.OPEN_AI_API,
})
const openai = new OpenAIApi(configuration);

export default function GenerateImage() {
    const [inputValue, setInputValue] = useState('');
  const [url, seturl] = useState("");
  const generateImage = () => {
    const OPENAI_API_KEY ="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";
    console.log(inputValue);
    fetch('https://api.openai.com/v1/images/generations', {
      method: "POST",
      body: JSON.stringify({
        "prompt": inputValue,
        "n": 1,
        "size": "1024x1024"
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY} ` // Use your API key
      }
    })
    .then(response => response.json())
    .then(data => {
      seturl(data.data[0].url);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <>
    <TextField label="Descirption" width="18em" onChange={(e)=>setInputValue(e.target.value)} ></TextField>
    <Button onClick={generateImage}>Generate Image</Button>
    {url &&  <Image
      width="50%"
      height="50%"
      objectFit="cover"
      objectPosition="50% 50%"
      src={url}
      alt="Glittering stream with old log, snowy mountain peaks
    tower over a green field."
    />}
    </>
  )
}
