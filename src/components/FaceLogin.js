import React from 'react'
import { Button} from '@aws-amplify/ui-react';
import { Predictions,Storage } from 'aws-amplify';
export default function FaceLogin() {

  const uploadHandle=async(e)=>{
    const file = e.target.files[0];
    try {
     await Storage.put(file.name,file)
    } catch (error) {
     console.log(error)
    }
  }

  const imageHandle = async (e)=>{
    const file = e.target.files[0];
    

    faceRecog(file)

  }

  const faceRecog=(file)=>{
    try {

      Predictions.identify({
        entities: {
          source: {
            file,
          },
          type: 'FACE_DETAILS'
        }
      })
      .then((response) => console.log({ response }))
      .catch(err => console.log({ err }));
      
    } catch (error) {
     console.log(error) 
    }
    
  }

  return (
    <>
    <div>FaceLogin</div>
    <div>Image upload</div>
    <input type="file" onChange={uploadHandle} />
    <div>Recognition Image </div>
    <input type="file" onChange={imageHandle} />
    <Button>LogIn</Button>
    </>
  )
}
