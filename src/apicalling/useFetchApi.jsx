import React from 'react';
import { create } from 'zustand';
import axios from 'axios';

const useFetchApi = create((set) => ({
  data: null,
  isLoading: false,
  error: null,
  fetchData: async (url, apiKey) => { // Add apiKey as a parameter
    set({ isLoading: true });
    try {
      const response = await axios.get(url, {
        params: {
          api_key: apiKey, // Use apiKey parameter
        },
      });
      set({ data: response.data, error: null });
    } catch (error) {
      set({ error, data: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useFetchApi;
