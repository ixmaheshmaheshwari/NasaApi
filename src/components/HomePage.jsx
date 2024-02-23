import React from 'react'
import Background from '../assets/back.jpeg'
import Navbar from './Navbar'
import globe from '../assets/globe.gif'
import Blackhole from '../assets/black.gif'
const HomePage = () => {
  return (
    <>
<Navbar/>
<div className='w-screen h-screen' style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', }}>
<h2 className="text-center pt-32 text-3xl font-bold text-neutral-400 ">
  Explore The Universe with NASA Api's
</h2>
<div className='flex justify-between'>

<img src={globe}></img>

<img src={Blackhole} className="float-end  my-auto"></img>
</div>
<div className='text-wrap ml-auto mr-auto text-white w-128 text-1xl font-bold antialiased backdrop-opacity-40 backdrop-blur-lg '>
  <p className="text-center ">
    "Who are we? We find that we live on an insignificant planet of a humdrum star lost in a galaxy tucked away in some forgotten corner of a universe in which there are far more galaxies than people."
  </p>
  <h4 className="text-center mt-4 text-2xl">
    -Carl Sagan
  </h4>
</div>
  </div>
    </>
   
  )
}

export default HomePage