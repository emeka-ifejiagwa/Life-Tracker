import React from 'react'
import "./LandingPage.css"
import Hero from './Hero/Hero'
import LandingPageTile from './LandingPageTile/LandingPageTile'
import athlete from "../../assets/athlete.jpg"
import food from "../../assets/food.jpg"
import alarm from "../../assets/alarm.jpg"
import calendar from "../../assets/calendar.jpg"

export default function LandingPage() {
  return (
    <div className='landing-page'>
        <Hero />
        <section className='services'>
        <LandingPageTile text={"Fitness"} img={athlete} />
        <LandingPageTile text={"Food"} img={food} />
        <LandingPageTile text={"Rest"} img={alarm} />
        <LandingPageTile text={"Planner"} img={calendar} />
        </section>
    </div>
  )
}
