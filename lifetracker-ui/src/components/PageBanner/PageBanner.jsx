import React from 'react'
import "./PageBanner.css"

export default function PageBanner({text, bgColor}) {
  return (
    <div className='page-banner' style={{backgroundColor: bgColor}}>
      <h1>{text}</h1>
    </div>
  )
}
