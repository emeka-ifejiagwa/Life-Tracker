import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

export default function Home({isLoggedIn, setIsLoggedIn}) {
    console.log(isLoggedIn)
  return isLoggedIn ? (
   <Link to="/" className='home'>
     <div className='home'>Welcome to Life Tracker</div>
   </Link>
  )  : <></>
}
