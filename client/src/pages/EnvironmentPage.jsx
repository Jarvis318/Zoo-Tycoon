import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { Container, Header, Button, Grid, Segment } from 'semantic-ui-react';

// Mock data for environments and pens with costs and earnings
const environments = {
  Forest: {
    pens: [
      { name: 'Turtles', cost: 50, earnings: 1, maxAnimals: 4, unlocked: true },
      { name: 'Snakes', cost: 350, earnings: 5, maxAnimals: 4, unlocked: false },
      { name: 'Alligator', cost: 1500, earnings: 10, maxAnimals: 4, unlocked: false },
    ],
  },
  // Add other environments similarly
};

const EnvironmentPage = () => {
  const { environment } = useParams(); // Get the environment name from the URL
  console.log(environment)
  const [money, setMoney] = useState(50); // Starting with $50
  const [pens, setPens] = useState(environments[environment].pens); // Pens for the current environment

  // Handle buying an animal for a specific pen
  const buyAnimal = (penIndex) => {
    const pen = pens[penIndex];

    if (money >= pen.cost) {
      setMoney(money - pen.cost); // Deduct cost
      const updatedPens = [...pens];
      updatedPens[penIndex] = {
        ...pen,
        unlocked: true, // Unlock the pen once it's purchased
      };
      setPens(updatedPens);
    } else {
      alert("Not enough money to buy this animal!");
    }
  };

  return (
    <Container textAlign="center" style={{ marginTop: '2em' }}>
      {/* Header for the environment */}
      <Header as="h1">{environment} Environment</Header>
      <Header as="h3">Money: ${money}</Header>

      {/* Display the pens */}
      <Grid columns={3} stackable>
        {pens.map((pen, index) => (
          <Grid.Column key={index}>
            <Segment>
              <Header as="h4">{pen.name} Pen</Header>
              {pen.unlocked ? (
                <p>{pen.name} generates ${pen.earnings} per second</p>
              ) : (
                <Button
                  color="green"
                  onClick={() => buyAnimal(index)}
                >
                  Buy {pen.name} for ${pen.cost}
                </Button>
              )}
            </Segment>
          </Grid.Column>
        ))}
      </Grid>

      {/* Generate earnings per click for Forest Environment */}
      {environment === 'Forest' && (
        <Button color="blue" onClick={() => setMoney(money + 1)}>
          Click to earn $1 from the Forest
        </Button>
      )}
    </Container>
  );
};

export default EnvironmentPage;