import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import ProgressiveImage from "react-progressive-image";
import loader from "../assets/loader.gif";
const Marsroverphotos = () => {
  const [apiKey] = useState(import.meta.env.VITE_SOME_KEY);
  const [pageNumber, setPageNumber] = useState(1);
  const [sol, setSol] = useState(null);
  const [solData, setSolData] = useState(null);
  const [latestPhoto, setLatestPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [baseUrl] = useState(import.meta.env.VITE_MARS_URL);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiUrl] = useState(import.meta.env.VITE_MARS_LATEST_URL);

  const fetchMarsPhotos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}?sol=${sol}&api_key=${apiKey}`);
      const slicedData = response.data;
      setSolData(slicedData.photos.slice(0, 25));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
    
  };

 
  const latestData = () => {
    setIsLoading(true);
    try {
      axios.get(`${apiUrl}?api_key=${apiKey}`).then((response) => {
        const slicedData = response.data;

        setLatestPhoto(slicedData.latest_photos.slice(0, 25));
        console.log(latestPhoto);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    latestData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLatestPhoto(null);
    await fetchMarsPhotos();
    console.log(solData);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSol(value);
    const isValid = /^([0-9]|[1-9][0-9]{0,2}|[1-3][0-9]{3}|410[0-1])$/.test(
      value
    );
    if (!isValid) {
      setErrorMessage("Value must be less than 4102 and Value cannot be Empty");
    } else {
      setErrorMessage("");  
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="pt-8 border ml-auto mr-auto m-5  place-content-center border-gray-300 w-110 formInput">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center pt-2">
            Mars Rover Photos
          </h2>
          <form className="mx-auto  p-4 " onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center">
              <label htmlFor="sol" className="block font-semibold mr-4">
                Enter the Sol day (day in mars is sol):
              </label>
              <input
                id="sol"
                type="text"
                onChange={handleInputChange}
                placeholder="Enter sol"
                pattern="^([0-9]|[1-9][0-9]{1,2}|[1-3][0-9]{3}|410[0-1])$" 
                title="Value must be less than 4103 and not empty"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {errorMessage && <div className="text-red-500 p-2 m-2">{errorMessage}</div>}{" "}

            <div className="flex justify-center items-center">
              <button className="text-xl pt-2 font-semibold mb-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </form>
          {latestPhoto ? (
            <div className="text-xl font-semibold mb-4 flex items-center justify-center pt-2">
              Latest Photos of Mars is
            </div>
          ) : (
            <div className="text-xl font-semibold mb-4 flex items-center justify-center pt-2">
              {" "}
              Photos of Mars in Sol {sol} is
            </div>
          )}
        </div>
      </div>
      {isLoading ? <Spinner /> : null}

      {latestPhoto && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestPhoto.map((photo) => (
            <div
              key={photo.id}
              className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-lg"
            >
              <ProgressiveImage src={photo.img_src} placeholder={loader}>
                {(src, loading) => (
                  <img
                    src={loading ? loader : src}
                    alt={photo.id}
                    className={`h-110 w-111 mb-4 ${loading ? "w-16 h-16" : ""}`} // Decrease size when placeholder is shown
                  />
                )}
              </ProgressiveImage>

              {/* <img className="h-110 w-111 mb-4" src={photo.img_src} alt={photo.id} /> */}
              <p className="text-sm">Photo Date: {photo.earth_date}</p>
              <p className="text-sm">
                Camera: {photo.camera.full_name} ({photo.camera.name})
              </p>
              <div className="mt-2">
                <p className="text-sm font-semibold">Rover Detail:</p>
                <p className="text-sm">
                  Rover Launching Date: {photo.rover.launching_date}
                </p>
                <p className="text-sm">
                  Rover Landing Date: {photo.rover.landing_date}
                </p>
                <p className="text-sm">Rover Name: {photo.rover.name}</p>
                <p className="text-sm">Rover Status: {photo.rover.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {solData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {solData.map((photo) => (
            <div
              key={photo.id}
              className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-lg"
            >
              <ProgressiveImage src={photo.img_src} placeholder={loader}>
                {(src, loading) => (
                  <img
                    src={loading ? loader : src}
                    alt={photo.id}
                    className={`h-110 w-111 mb-4 ${loading ? "w-16 h-16" : ""}`} // Decrease size when placeholder is shown
                  />
                )}
              </ProgressiveImage>
              <p className="text-sm">Photo Date: {photo.earth_date}</p>
              <p className="text-sm">
                Camera: {photo.camera.full_name} ({photo.camera.name})
              </p>
              <div className="mt-2">
                <p className="text-sm font-semibold">Rover Detail:</p>
                <p className="text-sm">
                  Rover Launching Date: {photo.rover.launching_date}
                </p>
                <p className="text-sm">
                  Rover Landing Date: {photo.rover.landing_date}
                </p>
                <p className="text-sm">Rover Name: {photo.rover.name}</p>
                <p className="text-sm">Rover Status: {photo.rover.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Marsroverphotos;
