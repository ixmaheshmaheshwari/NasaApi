import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios'; // Import Axios
import Navbar from './Navbar';
import Spinner from './Spinner';

const Apod = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/apod");
        setData(response.data);
      }  catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  if (isLoading) {
    return (
        <>
        <Navbar/>
       <Spinner/>
        </>
      
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return null; // or return loading indicator or placeholder
  }

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="flex items-center justify-center my-3 text-3xl font-bold">Astronomy Picture of the Day</h1>
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <p className="text-gray-600 mt-2">Date: {data.date}</p>
        <p className="mt-2">{data.explanation}</p>
        {data.media_type === 'image' ? (
          <img className="mt-4" src={data.hdurl} alt={data.title} />
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
      </div>
    </>
  );
};

export default Apod;

// import { useEffect, useState } from 'react';
// import { FaSpinner } from 'react-icons/fa';
// import useFetchApi from '../apicalling/useFetchApi';
// import Navbar from './Navbar';

// const Apod = () => {
//   const [apiKey] = useState(import.meta.env.VITE_SOME_KEY);
//   const { data, isLoading, error, fetchData } = useFetchApi();
// console.log(apiKey)
//   useEffect(() => {
//     const apiUrl = 'https://api.nasa.gov/planetary/apod';
//     fetchData(apiUrl, apiKey);
//   }, [fetchData, apiKey]);


//   if (isLoading ) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <FaSpinner className="animate-spin text-4xl" />
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   if (!data) {
//     return null; // or return loading indicator or placeholder
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="p-4">
//   <h2 className="text-2xl font-bold">{data.title}</h2>
//   <p className="text-gray-600 mt-2">Date: {data.date}</p>
//   <p className="mt-2">{data.explanation}</p>
//   {data.media_type === 'image' ? (
//     <img className="mt-4" src={data.url} alt={data.title} />
//   ) : (
//     <iframe
//       title={data.title}
//       className="mt-6"
//       width="560"
//       height="315"
//       src={data.url}
//       frameBorder="0"
//       allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       allowFullScreen
//     ></iframe>
//   )}
// </div>

//     </>
//   );
// };

// export default Apod;