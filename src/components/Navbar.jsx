import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
    <ul className="flex justify-end space-x-8 ">
     <li className="mr-auto">
      <Link to="/apod" className="text-white hover:text-gray-300">
        Home Page
      </Link>
     </li>
     
      <li>
        <Link to="/apod" className="text-white hover:text-gray-300">
          APOD
        </Link>
      </li>
      
     
      
      <li>
        <Link to="/epic" className="text-white hover:text-gray-300">
          EPIC
        </Link>
      </li>
      <li>
        <Link to="/insight" className="text-white hover:text-gray-300">
          Insights
        </Link>
      </li>
      <li>
        <Link to="/mars" className="text-white hover:text-gray-300">
          Mars Rover Photos
        </Link>
      </li>
      
      <li>
        <Link to="/wnts" className="text-white hover:text-gray-300">
          Vesta/Moon/Mars Trek WMTS
        </Link>
      </li>
    </ul>
  </nav>
   
  )
}

export default Navbar