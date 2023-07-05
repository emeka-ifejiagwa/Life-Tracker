import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="sign-up-in">
        <Link to="/register" className="auth-link">
          <button className="register">Register</button>
        </Link>
        <Link to="/login" className="auth-link">
          <button className="login">Login</button>
        </Link>
      </div>
    </nav>
  );
}
