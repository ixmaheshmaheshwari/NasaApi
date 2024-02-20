import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Apod from "./components/apod";
import Navbar from "./components/Navbar";
import Epic from './components/epic'
import Insight from "./components/Insight";
import MarsRoverPhotos from './components/marsroverphotos'
import Wmts from './components/wmts'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Apod />} />
        {/* Define routes for each item in the Navbar */}
        <Route path="/apod" element={<Apod />} />
        
       
        <Route path="/epic" element={<Epic />} />
       
        <Route path="/insight" element={<Insight />} />
        <Route path="/mars" element={<MarsRoverPhotos />} />
       
        <Route path="/wnts" element={<Wmts />} />
      </Routes>
    </Router>
  );
};

export default App;
