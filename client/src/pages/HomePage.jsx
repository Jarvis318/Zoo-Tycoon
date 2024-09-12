import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Grid, Segment, Button } from 'semantic-ui-react';

// Updated order of environments
const environments = [
  { name: 'Forest', unlocked: true },   // Only Forest is unlocked initially
  { name: 'Avian', unlocked: false },
  { name: 'Arctic', unlocked: false },
  { name: 'Savanna', unlocked: false },
  { name: 'Marine', unlocked: false },
];

const HomePage = () => {
  return (
    <Container textAlign="center" style={{ marginTop: '2em' }}>
      <Header as="h1" content="Welcome to Zoo Tycoon" />
      <Header as="h2" content="Select an Environment to Manage" />

      <Grid columns={3} stackable>
        {environments.map((env, index) => (
          <Grid.Column key={index}>
            <Segment>
              {env.unlocked ? (
                <Button
                  as={Link}
                  to={`/environment/${env.name.toLowerCase()}`}
                  color="green"
                  fluid
                >
                  {env.name}
                </Button>
              ) : (
                <Button disabled fluid>
                  {env.name} (Locked)
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