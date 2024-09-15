import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Icon, Sidebar, SidebarPusher, Segment, Header, Image, MenuItem } from 'semantic-ui-react';
import Auth from '../../utils/auth';

function NavBar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
    setVisible(false); // Hide sidebar when a menu item is clicked
  };

  return (
    <SidebarPusher>
      {/* Sidebar for mobile */}
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='thin'
      >
        <MenuItem as='a' onClick={() => handleMenuClick("/")}>
          <Icon name='home' />
          Home
        </MenuItem>
        <MenuItem as='a' onClick={() => alert('Leaderboard')}>
          <Icon name='trophy' />
          Leaderboard
        </MenuItem>
        {Auth.loggedIn() ? (
          <MenuItem as='a' onClick={() => Auth.logout()}>
            <Icon name='sign-out' />
            Logout
          </MenuItem>
        ) : (
          <>
            <MenuItem as='a' onClick={() => handleMenuClick("/signup")}>
              <Icon name='signup' />
              Signup
            </MenuItem>
            <MenuItem as='a' onClick={() => handleMenuClick("/login")}>
              <Icon name='login' />
              Login
            </MenuItem>
          </>
        )}
      </Sidebar>

      <SidebarPusher>
        <Segment basic>
          <Menu inverted fixed='top'>
            <Menu.Item onClick={() => setVisible(!visible)}>
              <Icon name='sidebar' />
            </Menu.Item>
            <Menu.Item header>Zoo Tycoon</Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item as='a' onClick={() => handleMenuClick("/")}>
                Home
              </Menu.Item>
              <Menu.Item as='a' onClick={() => alert('Leaderboard')}>
                Leaderboard
              </Menu.Item>
              {Auth.loggedIn() ? (
                <Menu.Item as='a' onClick={() => Auth.logout()}>
                  Logout
                </Menu.Item>
              ) : (
                <>
                  <Menu.Item as='a' onClick={() => handleMenuClick("/signup")}>
                    Signup
                  </Menu.Item>
                  <Menu.Item as='a' onClick={() => handleMenuClick("/login")}>
                    Login
                  </Menu.Item>
                </>
              )}
            </Menu.Menu>
          </Menu>
        </Segment>
      </SidebarPusher>
    </SidebarPusher>
  );
}

export default NavBar;
