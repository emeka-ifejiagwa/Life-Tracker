import React from "react";
import "./RegistrationPage.css"
import RegistrationForm from "./RegistrationForm/RegistrationForm";

export default function RegistrationPage({setIsActive, registrationInfo, setRegistrationInfo}){
    return (
        <div className="registration-page">
             <RegistrationForm registrationInfo={registrationInfo}
                setRegistrationInfo={setRegistrationInfo} setIsActive={setIsActive}/>
        </div>
    )
}