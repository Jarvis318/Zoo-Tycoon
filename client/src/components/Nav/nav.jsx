import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Icon, Sidebar, SidebarPusher, Segment, MenuItem } from 'semantic-ui-react';
import Auth from '/src/utils/auth';
import BackgroundMusic from '../BackgroundMusic';

function NavBar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [upgradesVisible, setUpgradesVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
    setSidebarVisible(false);
  };

  const handleSoundToggle = () => {
    setSoundOn(!soundOn);
    console.log(`Sound is ${soundOn ? 'Off' : 'On'}`);
  };

  return (
    <>
      <BackgroundMusic soundOn={soundOn} /> 
      <SidebarPusher>
        {/* Sidebar*/}
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={() => setSidebarVisible(false)}
          vertical
          visible={sidebarVisible}
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
            <>
              <MenuItem as='a' onClick={() => Auth.logout()}>
                <Icon name='sign-out' />
                Logout
              </MenuItem>
              <MenuItem as='a' onClick={() => setUpgradesVisible(true)}>
                <Icon name='settings' />
                Upgrades
              </MenuItem>
            </>
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
          <MenuItem as='a' onClick={handleSoundToggle}>
            <Icon name={soundOn ? 'volume up' : 'volume off'} />
            {soundOn ? 'Sound On' : 'Sound Off'}
          </MenuItem>
        </Sidebar>

        {/* Upgrades Sidebar */}
        {Auth.loggedIn() && (
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setUpgradesVisible(false)}
            vertical
            visible={upgradesVisible}
            direction='right'
            width='thin'
          >
            <MenuItem as='a' onClick={() => alert('Upgrade 1')}>
              <Icon name='cogs' />
              Upgrade 1
            </MenuItem>
            <MenuItem as='a' onClick={() => alert('Upgrade 2')}>
              <Icon name='cogs' />
              Upgrade 2
            </MenuItem>
            <MenuItem as='a' onClick={() => alert('Upgrade 3')}>
              <Icon name='cogs' />
              Upgrade 3
            </MenuItem>
          </Sidebar>
        )}

        <SidebarPusher>
          <Segment basic>
            <Menu inverted fixed='top'>
              <Menu.Item onClick={() => setSidebarVisible(!sidebarVisible)}>
                <Icon name='sidebar' />
              </Menu.Item>
              <Menu.Item header style={{ flex: 1, textAlign: 'center' }}>
                Zoo Tycoon
              </Menu.Item>
              <Menu.Menu position='right'>
                {!Auth.loggedIn() && (
                  <Menu.Item onClick={() => handleMenuClick("/login")}>
                    <Icon name='login' />
                    Login
                  </Menu.Item>
                )}
                {Auth.loggedIn() && (
                  <Menu.Item onClick={() => setUpgradesVisible(!upgradesVisible)}>
                    <Icon name='settings' />
                    Upgrades
                  </Menu.Item>
                )}
              </Menu.Menu>
            </Menu>
          </Segment>
        </SidebarPusher>
      </SidebarPusher>
    </>
  );
}

export default NavBar;
