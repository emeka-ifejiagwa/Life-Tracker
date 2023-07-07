
import "./LandingPageTile.css"

export default function LandingPageTile({text, img}) {
  return (
        <div className='lp-tile'>
            <p className='lp-tile-text'> {text} </p>
            <img src={img} className='lp-tile-img'/>
    </div>
  )
}
