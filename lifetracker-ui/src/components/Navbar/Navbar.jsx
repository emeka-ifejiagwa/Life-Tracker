import { Link, useNavigate } from "react-router-dom";
import NavLink from "./NavLink/NavLink";
import "./Navbar.css";
import { TbHealthRecognition } from "react-icons/tb";
import { MdOutlineAccountCircle } from "react-icons/md"
import { IconContext } from "react-icons";

export default function Navbar({ appState, setAppState }) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    // when the user signs out, delete the local storage token
    localStorage.clear();
    setAppState({
      user: {},
      token: null,
      isAuthenticated: false,
      nutritions: [],
      sleep: [],
      exercise: [],
    });
    navigate("/");
  };

  const handleAccount = (event) => {

  }

  return (
    <nav className="navbar">
      (
      <div className="nav-links">
        <div className="nav-categories">
          <Link to="/" style={{padding: "0", margin: "0"}} className="logo">
            <IconContext.Provider
              value={{ color: "var(--button-color)", size: "3rem" }}
            >
              <TbHealthRecognition
                className="user-icon"
                style={{ padding: "0", margin: "0" }}
              />
            </IconContext.Provider>
          </Link>
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
        {!appState.isAuthenticated ? (
          <div className="auth-area">
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
          <div className="auth-area-logout">
            <NavLink
              to="/"
              linkClassName={"auth-link"}
              text="Sign Out"
              className="border-button"
              handleClick={handleClick}
            />
            <Link to="/follow" className="logo">
            <IconContext.Provider
              value={{ color: "var(--button-color)", size: "3rem" }}
            >
              <MdOutlineAccountCircle
                className="user-icon"
                style={{ padding: "0", margin: "0" }}
              />
            </IconContext.Provider>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
