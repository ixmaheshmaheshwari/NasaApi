import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import useFetchApi from "../apicalling/useFetchApi";
import Spinner from "./Spinner";
import ProgressiveImage from "react-progressive-image";
import loader from "../assets/loader.gif";
import earth from "../assets/earth.jpg";
import axios from "axios";
import "./Earth.css";

const Earth = () => {
  // State variables to store user inputs
  const [apiKey] = useState(import.meta.env.VITE_SOME_KEY);
  const { data, isLoading, error, setData, fetchData } = useFetchApi();
  const [defaultData, setDefaultData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [dimension, setDimension] = useState("");
  const [earthUrl]=useState(import.meta.env.VITE_EARTH_URL)
  const [imageBaseUrl]=useState(import.meta.env.VITE_IMAGE_URL)

  useEffect(() => {
    const apiUrl =
      `${earthUrl}?lon=100.75&lat=1.5&date=2022-01-01&dim=0.15`;
    fetchedData(apiUrl, apiKey);
    setImageUrl(
      `${imageBaseUrl}?lon=100.75&lat=1.5&date=2022-01-01&dim=0.15&api_key=${apiKey}`
    );

    console.log(data);
  }, []);
  const fetchedData = async (apiUrl, apiKey) => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
        },
      });
      setDefaultData(response.data); // Set data received from the API
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setDefaultData(null);
    setImageUrl("");
    const apiUrl = `${earthUrl}?lon=${longitude}&lat=${latitude}&date=2022-01-01&dim=${dimension}`;
    await fetchData(apiUrl, apiKey);
    setImageUrl(
      `${imageBaseUrl}?lon=${longitude}&lat=${latitude}&date=2022-01-01&dim=${dimension}&api_key=${apiKey}`
    );
  };

  useEffect(() => {
    setLatitude("1.5");
    setLongitude("100.75");
    setDimension("0.15");
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="p-4"
        style={{ backgroundColor: "#e9ecef", minHeight: "100vh" }}
      >
        <div className="pt-8 border ml-auto mr-auto  place-content-center border-gray-300 w-96 formInput">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center pt-2">
            Get Earth Imagery
          </h2>
          <form onSubmit={handleSubmit} className="mx-auto  p-4 ">
            <div className="mb-4 flex items-center">
              <label htmlFor="latitude" className="block font-semibold mr-4">
                Latitude:
              </label>
              <input
                id="latitude"
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Enter latitude"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label htmlFor="longitude" className="block font-semibold mr-4">
                Longitude:
              </label>
              <input
                id="longitude"
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Enter longitude"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label htmlFor="dimension" className="block font-semibold mr-4">
                Dimension:
              </label>
              <input
                id="dimension"
                type="text"
                value={dimension}
                onChange={(e) => setDimension(e.target.value)}
                placeholder="Enter dimension"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="block mx-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
        {isLoading && <Spinner />}
        {defaultData && defaultData.resource && (
          <div className="border border-gray-300 rounded p-4 shadow-md mb-4 m-5 earthView">
            <div className="mb-2">
              <span className="font-semibold">DataSet of Image:</span>{" "}
              {defaultData.resource.dataset}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Planet:</span>{" "}
              {defaultData.resource.planet}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Service Version:</span>{" "}
              {defaultData.service_version}
            </div>
            {imageUrl ? (
              <ProgressiveImage
                src={imageUrl}
                placeholder={loader}
              >
                {(src, loading) => (
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src={loading ? loader : src}
                      alt={defaultData.id}
                      className={`w-auto rounded-lg ${
                        loading ? "w-16 h-16" : "w-120 h-120"
                      }`} // Decrease size when placeholder is shown
                    />
                  </div>
                )}
              </ProgressiveImage>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <img src={loader} alt="Loading" className="w-16 h-16" />
              </div>
            )}
          </div>
        )}
        {/* {isLoading && <Spinner />} */}
        {data && data.resource && (
          <div className="border border-gray-300 rounded p-4 shadow-md mb-4 m-5 earthView">
            <div className="mb-2">
              <span className="font-semibold">DataSet of Image:</span>{" "}
              {data.resource.dataset}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Planet:</span>{" "}
              {data.resource.planet}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Service Version:</span>{" "}
              {data.service_version}
            </div>
            {imageUrl ? (
              <ProgressiveImage
                delay={3000}
                src={imageUrl}
                placeholder={loader}
              >
                {(src, loading) => (
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src={loading ? loader : src}
                      alt={data.id}
                      className={`w-auto rounded-lg ${
                        loading ? "w-16 h-16" : "w-120 h-120"
                      }`} // Decrease size when placeholder is shown
                    />
                  </div>
                )}
              </ProgressiveImage>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <img src={loader} alt="Loading" className="w-16 h-16" />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Earth;
