import React from "react";
import "./LoginPage.css";
import LoginForm from "../LoginForm/LoginForm";

export default function LoginPage({setIsLoggedIn}) {
    return (
        <div className="login-page">
            <LoginForm setIsLoggedIn={setIsLoggedIn}/>
        </div>
    );
}
