import { useNavigate } from "react-router-dom";
import NavLink from "./NavLink/NavLink";
import "./Navbar.css";

export default function Navbar({ appState, setAppState }) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    // when the user signs out, delete the local storage token
    localStorage.clear();
    setAppState({
      user: {},
      token: null,
      isAuthenticated: false,
      nutrition: [],
      sleep: [],
      exercise: [],
    });
    navigate("/");
  };

  return (
    <nav className="navbar">
      (
        <div className="nav-links">
          <div className="nav-categories">
            <NavLink
              to="/activity"
              linkClassName="category-link"
              text="Activity"
              className="transparent-button"
            />
            <NavLink
              to="/exercise"
              linkClassName="category-link"
              text="Exercise"
              className="transparent-button"
            />
            <NavLink
              to="/nutrition"
              linkClassName="category-link"
              text="Nutrition"
              className="transparent-button"
            />
            <NavLink
              to="/sleep"
              linkClassName="category-link"
              text="Sleep"
              className="transparent-button"
            />
          </div>
          {!appState.isAuthenticated ?
          (<div className="auth-area">
            <NavLink
              to="/register"
              linkClassName="auth-link"
              text="Register"
              className="fill-button"
            />
            <NavLink
              to="/login"
              linkClassName={"auth-link"}
              text="Log In"
              className="border-button"
            />
          </div>
      ) : (
        <div className="auth-area">
          <NavLink
            to="/"
            linkClassName={"auth-link"}
            text="Sign Out"
            className="border-button"
            handleClick={handleClick}
          />
        </div>
      )}
      </div>
    </nav>
  );
}
