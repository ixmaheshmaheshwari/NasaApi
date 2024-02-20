import React from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import Spinner from './Spinner';
import { useState } from 'react';
const Epic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageData, setImageData] = useState(null);
  const[enhancedData,setEnchancedData]= useState(null);

  async function fetchDataNaturalImage() {
    setIsLoading(true);
   await axios.get('http://localhost:3000/naturalImageAPI')
      .then(response => {
        
        setImageData(response.data);
        
      
        console.log(response.data);
      })
      .catch(error => {
        setError(error)
        console.error('Error fetching natural image data:', error);
      }).finally(()=>{
        setIsLoading(false)

      })
      
  }
  
  function fetchDataEnhancedImage() {
    axios.get('http://localhost:3000/enhancedImageAPI')
      .then(response => {
        setEnchancedData(response.data); 
        setIsLoading(false);
        console.log(response.data);
      })
      .catch(error => {
        setError(error)
        console.error('Error fetching enhanced image data:', error);
      });
  }
  function formatDateFromIdentifier(identifier) {
    // Extract the date part "20240218" from the identifier
    const datePart = identifier.match(/\d{8}/)[0];
    // Convert the date part into "2024/02/18" format
    const formattedDate = `${datePart.substring(0, 4)}/${datePart.substring(4, 6)}/${datePart.substring(6, 8)}`;
    return formattedDate;
}

  const naturalImages=()=>{
    imageData.map(image =>{
       const identifier = image.image;
      const formattedDate = formatDateFromIdentifier(identifier);
      console.log(formattedDate); // Output: 2024/02/18}
      
    });
    if (isLoading) {
      return <Spinner />;
    }
  // Example usage
    return (<div className='flex flex-col items-center mt-50'>
    <h1 className='text-3xl font-bold mb-4'>Natural Images</h1>
    
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {imageData.map(image => (
         
         <div className="image-card">
        <img src={`https://api.nasa.gov/EPIC/archive/natural/${formatDateFromIdentifier(image.identifier)}/png/${image.image}.png?api_key=${import.meta.env.VITE_SOME_KEY}`} onLoad={() => setIsLoading(false)}></img>
         {/* <img src={image.image+'.jpg'} alt={image.caption} /> */}
         <div className="image-info">
           <h2>{image.caption}</h2>
           <p>Date: {image.date}</p>
           <p>Location: {image.centroid_coordinates.lat}, {image.centroid_coordinates.lon}</p>
         </div>
       </div>
       
        ))}
      </div>
    
  </div>
    )
    
  }
  

  return (
    <>
    <Navbar/>
    
    <div className='lex justify-center items-center  '>
    <button className='bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 m-2 h-12 rounded mr-2' onClick={fetchDataNaturalImage}>
    Natural Image
  </button>
  <button className='bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 m-2 h-12  px-4 rounded mr-2' onClick={fetchDataEnhancedImage}>
    Enhanced Image
  </button>
  {isLoading ? <Spinner /> : null}
      {imageData && naturalImages()}
 
    </div>
    
    </>
   
  )
}

export default Epic