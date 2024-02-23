// import React from 'react';
// import { create } from 'zustand';
// import axios from 'axios';

// const useFetchApi = create((set) => ({
//   data: null,
//   isLoading: false,
//   error: null,
//   fetchData: async (url, apiKey) => { // Add apiKey as a parameter
//     set({ isLoading: true });
//     try {
//       const response = await axios.get(url, {
//         params: {
//           api_key: apiKey, // Use apiKey parameter
//         },
//       });
//       set({ data: response.data, error: null });
//     } catch (error) {
//       set({ error, data: null });
//     } finally {
//       set({ isLoading: false });
//     }
//   },
// }));

// export default useFetchApi;
import  { useState } from 'react';
import axios from 'axios';

const useFetchApi = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, apiKey,sol,pageNumber) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
           api_key: apiKey,
          //api_key: "eShRQk3dnJIhcB2SmdIVkDkFhmfzC54E0mtBkehs",
          
          
        }
        
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData ,setData,setIsLoading};
};

export default useFetchApi;

