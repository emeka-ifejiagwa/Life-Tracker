
import NutritionForm from '../NutritionForm/NutritionForm'
import "./NutritionNew.css"

export default function NutritionNew({appState, setAppState}) {
  return (
    <div className='nutrition-new'>
      <NutritionForm appState={appState} setAppState={setAppState}/>
    </div>
  )
}
