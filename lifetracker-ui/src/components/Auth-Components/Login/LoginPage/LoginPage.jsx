import React from "react";
import "./LoginPage.css";
import LoginForm from "../LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage({appState, setAppState}) {
    const navigate = useNavigate()
    if(appState.isAuthenticated) {navigate("/activity")}
    else{
        return (
            <div className="login-page">
                <LoginForm appState={appState} setAppState={setAppState}/>
            </div>
        );
    }
}
