import { Link, useNavigate, useLocation } from "react-router-dom";

import { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";

import {
  faHome,
  faList,
  faCog,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AccountContext } from "../contexts/UserContext";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [theme, setTheme] = useState("light-theme");

  const location = useLocation();

  const { user } = useContext(AccountContext);

  const navigate = useNavigate();

  function changeTheme(){
    theme === "dark-theme" ? setTheme("light-theme") : setTheme("dark-theme")
    localStorage.setItem('theme', JSON.stringify(theme))
  }

  useEffect(() => {
    document.body.className = JSON.parse(localStorage.getItem('theme'));
  }, [theme]);

  const links = [
    {
      name: "Home",
      path: "/",
      icon: faHome,
      show: "always",
    },
    {
      name: "Create",
      path: "/create",
      icon: faList,
      show: "loggedin",
    },
    {
      name: "login",
      path: "/login",
      icon: faCog,
      show: "notloggedin",
    },
    {
      name: "Register",
      path: "/register",
      icon: faCog,
      show: "notloggedin",
    },
  ];

  async function logout() {
    try {
      const response = await fetch("/api/auth/logout", {
        mode: "cors",
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        window.location.reload(false);
        navigate("/");
      }
    } catch (error) {
      console.log("Error while logging out");
      console.log(error.message);
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    let val = window.confirm("Are you sure?");

    if (val) {
      logout();
    }
  }

  function closeSidebar() {
    setShowSidebar(false);
  }
  return (
    <>
      <div className="navbar container">
        <Link to="/" className="logo">
          Recipe Online
        </Link>
        <div className="nav-links">
          <Link className={location.pathname === "/" ? "active" : ""} to="/">
            home
          </Link>
          {user.loggedIn ? (
            <Link
              className={location.pathname === "/create" ? "active" : ""}
              to="/create"
            >
              create
            </Link>
          ) : null}
          {!user.loggedIn ? (
            <Link
              className={location.pathname === "/register" ? "active" : ""}
              to="/register"
            >
              Register
            </Link>
          ) : null}
          {!user.loggedIn ? (
            <Link
              className={location.pathname === "/login" ? "active" : ""}
              to="/login"
            >
              login
            </Link>
          ) : null}
        </div>

        {user.loggedIn ? (
          <div className="dropdown">
            <span>{user.username}</span>
            <div className="dropdownContent">
              <p>
                <Link to="/myrecipes">Recipes</Link>
              </p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          </div>
        ) : null}

        <div className="theme-changer" onClick={changeTheme}>
          <FontAwesomeIcon icon={faMoon}/>
        </div>

        <div
          onClick={() => setShowSidebar(true)}
          className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {showSidebar && <Sidebar close={closeSidebar} links={links} />}
    </>
  );
}
