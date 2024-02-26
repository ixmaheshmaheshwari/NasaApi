import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Apod from "./components/apod";
import Navbar from "./components/Navbar";
import Epic from "./components/epic";
import Earth from "./components/Earth";
import MarsRoverPhotos from "./components/marsroverphotos";
import HomePage from "./components/HomePage";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apod" element={<Apod />} />
          <Route path="/epic" element={<Epic />} />
          <Route path="/earth" element={<Earth />} />
          <Route path="/mars" element={<MarsRoverPhotos />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
