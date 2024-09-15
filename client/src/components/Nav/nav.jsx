import React from "react";
import Auth from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "semantic-ui-react";

function NavBar() {
  const navigate = useNavigate(); 

  function showNavigation() {
    return (
      <Menu inverted fixed="top">
        <Menu.Item name="home" onClick={() => navigate("/")}>
          Home
        </Menu.Item>
        <Menu.Item name="about" onClick={() => alert("Click to earn money. Upgrade your zoo and become the richest zoo owner.")}>
          About
        </Menu.Item>
        <Menu.Item name="leaderboard" onClick={() => alert('Leaderboard')}>
          Leaderboard
        </Menu.Item>
        <Menu.Menu position="right">
          {Auth.loggedIn() ? (
            <>
              <Menu.Item
                name="logout"
                onClick={() => {
                  Auth.logout();
                  navigate("/");  // Redirect to home after logout
                }}
              >
                Logout
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item name="signup" onClick={() => navigate("/signup")}>
                Signup
              </Menu.Item>
              <Menu.Item name="login" onClick={() => navigate("/login")}>
                Login
              </Menu.Item>
            </>
          )}
        </Menu.Menu>
      </Menu>
    );
  }

  return (
    <header>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default NavBar;
