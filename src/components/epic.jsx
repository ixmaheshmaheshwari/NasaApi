import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Spinner from "./Spinner";
import { useState, useEffect } from "react";
import ProgressiveImage from "react-progressive-image";
import loader from "../assets/loader.gif";
import rocket from "../assets/rocket.png";

const Epic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [enhancedData, setEnchancedData] = useState(null);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_SOME_KEY1);
  const [naturalUrl] = useState(import.meta.env.VITE_NATURAL_URL);
  const [enhancedUrl] = useState(import.meta.env.VITE_ENCHANED_URL);
  const [naturalImage] = useState(import.meta.env.VITE_NATURAL_IMAGE);
  const [enahcedImage] = useState(import.meta.env.VITE_ENHACED_IMAGE);

  async function fetchDataNaturalImage() {
    setIsLoading(true);
    setEnchancedData(null);
    await axios
      .get(`${naturalUrl}?api_key=${apiKey}`)
      .then((response) => {
        setImageData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching natural image data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchDataEnhancedImage() {
    setIsLoading(true);
    setImageData(null);

    axios
      .get(`${enhancedUrl}?api_key=${apiKey}`)
      .then((response) => {
        setEnchancedData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching enhanced image data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function formatDateFromIdentifier(identifier) {
  
    const datePart = identifier.match(/\d{8}/)[0];
    
    const formattedDate = `${datePart.substring(0, 4)}/${datePart.substring(
      4,
      6
    )}/${datePart.substring(6, 8)}`;
    return formattedDate;
  }

  const naturalImages = () => {
   
    return (
      <div className="flex flex-col items-center mt-50">
        <h1 className="text-3xl font-bold mb-4">Natural Images</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {imageData.map((image) => (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden m-2">
              <ProgressiveImage
                delay={1000}
                src={`${naturalImage}${formatDateFromIdentifier(
                  image.identifier
                )}/png/${image.image}.png?api_key=${apiKey}`}
                placeholder={loader}
              >
                {(src, loading) => (
                  <div className="relative w-full h-auto">
                    <img
                      src={loading ? loader : src}
                      alt={image.caption}
                      className={`w-full h-auto ${loading ? "w-16 h-16" : ""}`}
                    />
                  </div>
                )}
              </ProgressiveImage>

              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{image.caption}</h2>
                <p className="text-sm text-gray-600 mb-2">Date: {image.date}</p>
                <p className="text-sm text-gray-600">
                  Location: {image.centroid_coordinates.lat},{" "}
                  {image.centroid_coordinates.lon}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const enhancedImages = () => {
    
    return (
      <div className="flex flex-col items-center mt-50">
        <h1 className="text-3xl font-bold mb-4">Enhanced Images</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enhancedData.map((image) => (
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden m-2"
              key={image.identifier}
            >
              <ProgressiveImage
                delay={1000}
                src={`${enahcedImage}${formatDateFromIdentifier(
                  image.identifier
                )}/png/${image.image}.png?api_key=${apiKey}`}
                placeholder={loader}
              >
                {(src, loading) => (
                  <div className="relative w-full h-auto">
                    <img
                      src={loading ? loader : src}
                      alt={image.caption}
                      className={`w-full h-auto ${loading ? "w-16 h-16" : ""}`}
                    />
                  </div>
                )}
              </ProgressiveImage>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{image.caption}</h2>
                <p className="text-sm text-gray-600 mb-2">Date: {image.date}</p>
                <p className="text-sm text-gray-600">
                  Location: {image.centroid_coordinates.lat},{" "}
                  {image.centroid_coordinates.lon}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div
        className="lex justify-center items-center  "
        style={{ backgroundColor: "#dad7cd", minHeight: "100vh" }}
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 m-2 h-12 rounded mr-2"
          onClick={fetchDataNaturalImage}
        >
          Natural Image
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 m-2 h-12  px-4 rounded mr-2"
          onClick={fetchDataEnhancedImage}
        >
          Enhanced Image
        </button>
        {!imageData && !enhancedData && (
          <>
            <div className="flex justify-center items-center pt-12">
              <div className="max-w-md w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg p-6">
                <p className="text-lg text-gray-800">
                  "Time travel used to be thought of as just science fiction,
                  but Einstein's general theory of relativity allows for the
                  possibility that we could warp space-time so much that you
                  could go off in a rocket and return before you set out."
                </p>
                <p className="text-gray-600 text-right mt-4">
                  - Stephen Hawking
                </p>
              </div>

              <img src={rocket} alt="Rocket" class="h-120 w-110 mx-4" />

              <div className="max-w-md w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg p-6">
                <p className="text-lg text-gray-800">
                  "Space is big. You just won't believe how vastly, hugely,
                  mind-bogglingly big it is. I mean, you may think it's a long
                  way down the road to the drug store, but that's just peanuts
                  to space."
                </p>
                <p className="text-gray-600 text-right mt-4">- Douglas Adams</p>
              </div>
            </div>
          </>
        )}
        {isLoading ? <Spinner /> : null}
        {imageData && naturalImages()}
        {isLoading ? <Spinner /> : null}
        {enhancedData && enhancedImages()}
      </div>
    </>
  );
};

export default Epic;
