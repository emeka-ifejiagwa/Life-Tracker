import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

export default function Home({isActive, setIsActive}) {
    // console.log(isActive)
  return isActive ? (
   <Link to="/" className='home'>
     <div className='home'>Welcome to Life Tracker</div>
   </Link>
  )  : <></>
}
