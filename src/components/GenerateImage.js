import React, { useState } from 'react'
import { Configuration,OpenAIApi } from 'openai'
import { TextField,Button,Image } from '@aws-amplify/ui-react'
const configuration = new Configuration({
    apiKey:process.env.OPEN_AI_API,
})
const openai = new OpenAIApi(configuration);

export default function GenerateImage() {
    const [userPrompt, setUserPrompt] = useState("");
    const [size, setsize] = useState("256x256");
    const [imageUrl, setimageUrl] = useState("");

    const generateImage = async(e)=>{

            const imageParameters = {
                prompt : userPrompt,
                n:parseInt(1),
                size:size,
            }
            console.log(imageParameters)
            const response = await openai.createImage({
                prompt: "a white siamese cat",
                n: 1,
                size: "1024x1024",
              });
            const urlData = response.data.data[0].url;
            
            setimageUrl(urlData);
          


    }

  return (
    <>
    <TextField label="Descirption" width="18em" onChange={(e)=>setUserPrompt(e.target.value)} ></TextField>
    <TextField label="size" width="18em" onChange={(e)=>setsize(e.target.value)}></TextField>
    <Button onClick={generateImage}>Generate Image</Button>
    {imageUrl && <Image
      width="100%"
      height="100%"
      objectFit="cover"
      objectPosition="50% 50%"
      src={imageUrl}
      alt="AI"
    /> }
    </>
  )
}
