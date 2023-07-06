import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ appState, setAppState }) {
  const handleClick = (event) => {
    // when the user signs out, delete the local storage token
    localStorage.setItem("lifetracker_token", null)
    setAppState({
      user: {},
      token: undefined,
      isAuthenticated: false,
      nutrition: [],
      sleep: [],
      exercise: [],
    })
  };

  return (
    <nav className="navbar">
      {!appState.isAuthenticated ? (
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
            <button className="register" onClick={handleClick}>
              Sign Out
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
