import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
    <ul className="flex justify-end space-x-8 ">
     <li className="mr-auto">
      <Link to="/" className="text-white hover:text-gray-300">
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
        <Link to="/earth" className="text-white hover:text-gray-300">
          Earth View
        </Link>
      </li>
      <li>
        <Link to="/mars" className="text-white hover:text-gray-300">
          Mars Rover Photos
        </Link>
      </li>
      
     
    </ul>
  </nav>
   
  )
}

export default Navbar