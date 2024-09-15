import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Grid, Segment, Button, } from 'semantic-ui-react';

// Environments data, including the cost to unlock each environment
const environmentsData = [
  { id: 1, name: 'Swamp', unlocked: true, unlockCost: 0 },
  { id: 2, name: 'Avian', unlocked: false, unlockCost: 200 },  // need to adjust unlock price
  { id: 3, name: 'Arctic', unlocked: false, unlockCost: 400 },   // need to adjust unlock price
  { id: 4, name: 'Savanna', unlocked: false, unlockCost: 600 },   // need to adjust unlock price
  { id: 5, name: 'Marine', unlocked: false, unlockCost: 800 },   // need to adjust unlock price
];

const HomePage = () => {
  const [money, setMoney] = useState(1000); // Starting money (need to adjust back to $50)
  const [environments, setEnvironments] = useState(environmentsData); // Track environment unlocks

  // Handle unlocking an environment
  const unlockEnvironment = (envIndex) => {
    const environment = environments[envIndex];
    
    // Check if the player has enough money to unlock the environment
    if (money >= environment.unlockCost) {
      setMoney(money - environment.unlockCost); // Deduct cost
      const updatedEnvironments = [...environments];
      updatedEnvironments[envIndex] = { ...environment, unlocked: true }; // Unlock environment
      setEnvironments(updatedEnvironments);
    } else {
      alert("Not enough money to unlock this environment!");
    }
  };

  return (
    <Container textAlign="center" style={{ marginTop: '2em' }}>
      <Header as="h1" content="Welcome to Zoo Tycoon" />
      <Header as="h2" content="Select an Environment to Manage" />
      <Header as="h3">Money: ${money}</Header>

      <Grid columns={3} stackable>
        {environments.map((env, index) => (
          <Grid.Column key={index}>
            <Segment>
              {env.unlocked ? (
                <Button
                  as={Link}
                  to={`/environment/${env.id}`}
                  color="green"
                  fluid
                >
                  {env.name}
                </Button>
              ) : (
                <Button
                  color="orange"
                  fluid
                  onClick={() => unlockEnvironment(index)}
                >
                  Unlock {env.name} for ${env.unlockCost}
                </Button>
              )}
            </Segment>
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;