import "./RegistrationPage.css"
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage({appState, setAppState}){
    const navigate = useNavigate()
    if(appState.isAuthenticated) {navigate("/activity")}
    else return (
        <div className="registration-page">
             <RegistrationForm appState={appState} setAppState={setAppState}/>
        </div>
    )
}