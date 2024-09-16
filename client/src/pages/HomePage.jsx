import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Grid, Segment, Button } from 'semantic-ui-react';

// Environments data, including the cost to unlock each environment
const environmentsData = [
  { id: 1, name: 'Swamp', unlocked: true, unlockCost: 0 },
  { id: 2, name: 'Avian', unlocked: false, unlockCost: 5000 },
  { id: 3, name: 'Arctic', unlocked: false, unlockCost: 500000 },
  { id: 4, name: 'Savanna', unlocked: false, unlockCost: 50000000 },
  { id: 5, name: 'Marine', unlocked: false, unlockCost: 6000000000 },
];

const HomePage = () => {
  const [money, setMoney] = useState(1000000000000000); // Starting money
  const [environments, setEnvironments] = useState(environmentsData);

  // Handle unlocking an environment
  const unlockEnvironment = (envIndex) => {
    const environment = environments[envIndex];
    if (money >= environment.unlockCost) {
      setMoney(money - environment.unlockCost);
      const updatedEnvironments = [...environments];
      updatedEnvironments[envIndex] = { ...environment, unlocked: true };
      setEnvironments(updatedEnvironments);
    } else {
      alert("Not enough money to unlock this environment!");
    }
  };

  return (
    <Container textAlign="center" style={{ marginTop: '2em' }}>
      <Header as="h1" content="Zoo Tycoon" />
      <Header as="h2" content="Select an Environment to Manage" />
      <Header as="h3">Money: ${money.toLocaleString()}</Header>

      {/* Creating 3 columns using Semantic UI's Grid */}
      <Grid columns={3} stackable centered>
        <Grid.Row>
          {environments.map((env, index) => (
            <Grid.Column key={index} width={4}>
              <Segment>
                {/* Conditional rendering based on whether the environment is unlocked */}
                {env.unlocked ? (
                  <Button
                    as={Link}
                    to={`/environment/${env.id}`}
                    color="green"
                    fluid
                    size="large"
                  >
                    {env.name}
                  </Button>
                ) : (
                  <Button
                    color="orange"
                    fluid
                    size="large"
                    onClick={() => unlockEnvironment(index)}
                  >
                    Unlock {env.name} for ${env.unlockCost.toLocaleString()}
                  </Button>
                )}
              </Segment>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default HomePage;
