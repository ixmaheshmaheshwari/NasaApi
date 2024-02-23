
import './apod.css'
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import useFetchApi from '../apicalling/useFetchApi';
import Navbar from './Navbar';
import ProgressiveImage from 'react-progressive-image'; 
import loader from '../assets/loader.gif'
import backgroundImage from '../assets/space.jpg'
const Apod = () => {
  const [apiKey] = useState(import.meta.env.VITE_SOME_KEY);
  const { data, isLoading, error, fetchData } = useFetchApi();
  console.log(apiKey)
  useEffect(() => {
    const apiUrl = 'https://api.nasa.gov/planetary/apod';
    fetchData(apiUrl, apiKey);
  }, []);


  if (isLoading) {
    return (
    <>
     <Navbar />
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#141414' }}>
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    </>
    );
  }

  
  if (!data) {
    return null; // or return loading indicator or placeholder
  }

  return (
    <>
      <Navbar />
      <div className="p-4 text-white "  style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight:"130vh"}}>
        <div>
        <h1 className="flex items-center justify-center my-3 text-3xl font-bold">Astronomy Picture of the Day</h1>
        <h2 className="flex items-center justify-center text-2xl font-bold">Title: {data.title}</h2>

        {data.media_type === 'image' ? (
          <ProgressiveImage  src={data.hdurl} placeholder={loader}>
{(src, loading) => (
            <div className="flex items-center justify-center w-full h-full">
             {/* <img className="mt-4 h-128 w-128  mr-auto ml-auto" src={data.hdurl} alt={data.title} /> */}
              <img
                src={loading ? loader : src}
                alt={data.id}
                className={`mt-4 h-128 w-128  mr-auto ml-auto ${loading ? 'w-16 h-16' : ''}`} // Decrease size when placeholder is shown
              />
            </div>
          )}
          </ProgressiveImage>
          
        ) : (
          <iframe
            title={data.title}
            className="mt-6"
            width="560"
            height="315"
            src={data.url}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        
        <div className='explain mt-3'>
        <p className="text-black mt-2 p-2">Date: {data.date}</p>
        <p className="mt-2 text-justify text-black  p-2"><strong>Explanation:</strong> {data.explanation}</p>

        </div>
        </div>
       
      </div>

    </>
  );
};

export default Apod;