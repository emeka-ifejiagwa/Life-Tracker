import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ isLoggedIn, setIsLoggedIn}) {
  const handleClick = (event) => {
    setIsLoggedIn(false)
  }

  return (
    <nav className="navbar">
      {!isLoggedIn ? (
        <div className="auth-area">
          <Link to="/register" className="auth-link">
            <button className="register">Register</button>
          </Link>
          <Link to="/login" className="auth-link">
            <button className="login">Login</button>
          </Link>
        </div>
      ) : (
        <div className="auth-area">
          <Link to="/" className="auth-link">
          {/* <button className="register" onClick={handleClick}>Sign Out</button> */}
          </Link>
        </div>
      )}
    </nav>
  );
}
