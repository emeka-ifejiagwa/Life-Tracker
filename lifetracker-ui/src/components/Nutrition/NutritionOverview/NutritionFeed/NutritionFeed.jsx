
import "./NutritionFeed.css"
import NutritionCard from '../../NutritionCard/NutritionCard'

export default function NutritionFeed({nutritions}) {
  console.log(nutritions)
  return (
    <div className='nutrition-feed'>
      {!nutritions || nutritions.length === 0 ? 
      <h3 className='empty-message'>Nothing here yet</h3>
    : nutritions.map(nutrition => <NutritionCard nutrition={nutrition}/>)}
    </div>
  )
}
