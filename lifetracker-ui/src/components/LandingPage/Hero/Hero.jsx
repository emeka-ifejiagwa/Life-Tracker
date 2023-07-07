import React from 'react'
import "./Hero.css"
import tracherImage from "../../../assets/tracker.jpg"

export default function Hero() {
  return (
    <div className='hero-div'>
        <img src={tracherImage} className='hero-image' />
        <div className='cta'>
            <h1 className='hero-title'>LifeTracker</h1>
            <h3 className='hero-description'>
            Helping you take back control of your world.
            </h3>
        </div>
    </div>
  )
}
