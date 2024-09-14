import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Header, Button, Grid, Segment } from "semantic-ui-react";
import "../assets/styles.css";
// Mock data for environments using IDs as keys
const environments = {
  1: {
    name: "Forest",
    pens: [
      {
        name: "Turtles",
        cost: 50,
        earnings: 1,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: true,
        unlockCost: 0,
      },
      {
        name: "Snakes",
        cost: 350,
        earnings: 5,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 250,
      },
      {
        name: "Alligator",
        cost: 1500,
        earnings: 10,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 1000,
      },
    ],
  },
  2: {
    name: "Avian",
    pens: [
      {
        name: "Parrots",
        cost: 100,
        earnings: 2,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 0,
      },
      {
        name: "Flamingos",
        cost: 500,
        earnings: 7,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 400,
      },
      {
        name: "Ostriches",
        cost: 2000,
        earnings: 12,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 1500,
      },
    ],
  },
  3: {
    name: 'Arctic',
    pens: [
      { name: 'Penguins', cost: 100, earnings: 2, maxAnimals: 4, currentAnimals: 0, unlocked: false, unlockCost: 0 },
      { name: 'Sea Lions', cost: 500, earnings: 7, maxAnimals: 4, currentAnimals: 0, unlocked: false, unlockCost: 400 },
      { name: 'Polar Bears', cost: 2000, earnings: 12, maxAnimals: 4, currentAnimals: 0, unlocked: false, unlockCost: 1500 },
    ],
  },
  4: {
    name: 'Savanna',
    pens: [
      { name: 'Zebras', cost: 100, earnings: 2, maxAnimals: 4, currentAnimals: 0, unlocked: false, unlockCost: 0 },
      { name: 'Elephants', cost: 500, earnings: 7, maxAnimals: 4, currentAnimals: 0, unlocked: false, unlockCost: 400 },
      { name: 'Lions', cost: 2000, earnings: 12, maxAnimals: 4, currentAnimals: 0, unlocked: false, unlockCost: 1500 },
    ],
  },
  5: {
    name: 'Marine',
    pens: [
      { name: 'Dolphins', cost: 100, earnings: 2, maxAnimals: 4, currentAnimals: 0, unlocked: false, unlockCost: 0 },
      { name: 'Sharks', cost: 500, earnings: 7, maxAnimals: 4, currentAnimals: 0, unlocked: false, unlockCost: 400 },
      { name: 'Blue Whales', cost: 2000, earnings: 12, maxAnimals: 4, currentAnimals: 0, unlocked: false, unlockCost: 1500 },
    ],
  },
  // Other environments...
};

const EnvironmentPage = () => {
  const { id } = useParams(); // Get the environment ID from the URL
  const navigate = useNavigate(); // For redirecting to another page

  const environmentData = environments[id]; // Check if the ID exists in environments

  // Debugging - log the ID from URL
  console.log("Environment ID from URL:", id);

  // If environmentData is undefined, handle the invalid ID case
  if (!environmentData) {
    return (
      <Container textAlign="center" style={{ marginTop: "2em" }}>
        <Header as="h1">Environment Not Found</Header>
        <Button onClick={() => navigate("/")}>Go Back to Home</Button>
      </Container>
    );
  }

  const [money, setMoney] = useState(50); // Starting with $50
  const [pens, setPens] = useState(environmentData.pens); // Pens for the current environment

  // Handle buying an animal for a specific pen
  const buyAnimal = (penIndex) => {
    const pen = pens[penIndex];

    // Check if there is room for more animals in this pen and enough money
    if (money >= pen.cost && pen.currentAnimals < pen.maxAnimals) {
      setMoney(money - pen.cost); // Deduct cost for the animal
      const updatedPens = [...pens];
      updatedPens[penIndex] = {
        ...pen,
        currentAnimals: pen.currentAnimals + 1, // Increment the number of animals in the pen
      };
      setPens(updatedPens);
    } else if (pen.currentAnimals >= pen.maxAnimals) {
      alert(
        "This pen is full! You can't add more than " +
          pen.maxAnimals +
          " animals."
      );
    } else {
      alert("Not enough money to buy this animal!");
    }
  };

  // Handle unlocking a pen
  const unlockPen = (penIndex) => {
    const pen = pens[penIndex];

    if (money >= pen.unlockCost) {
      setMoney(money - pen.unlockCost); // Deduct cost to unlock the pen
      const updatedPens = [...pens];
      updatedPens[penIndex] = {
        ...pen,
        unlocked: true, // Unlock the pen
      };
      setPens(updatedPens);
    } else {
      alert("Not enough money to unlock this pen!");
    }
  };

  return (
    <Container textAlign="center" style={{ marginTop: "2em" }}>
      {/* Header for the environment */}
      <Header as="h1">{environmentData.name} Environment</Header>
      <Header as="h3">Money: ${money}</Header>

      {/* Display the pens */}
      <Grid columns={3} stackable>
        {pens.map((pen, index) => (
          <Grid.Column key={index}>
            <Segment className="pen-segment">
              <Header as="h4">{pen.name} Pen</Header>
              <p>
                {pen.currentAnimals}/{pen.maxAnimals} animals
              </p>
              {/* If the pen is unlocked, show buy animals option, otherwise show unlock option */}
              {pen.unlocked ? (
                <>
                <div className="background-container">
                  {/* <img className="background" src='/images/set/ocean.png'/> */}
                  <div className="pen-container">
                    <img className="pen" src="/images/set/pen.png" />
                    <div id="pen-sprites">
                      {Array.from({ length: pen.currentAnimals }).map(
                        (_, idx) => (
                          <img
                            key={idx}
                            src={`/images/animals/${pen.name.toLowerCase()}.gif`}
                            alt={pen.name}
                            className={pen.name.toLowerCase()}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                  <p>
                    {pen.name} generates ${pen.earnings} per second
                  </p>
                  {/* Show button to buy more animals if the pen is unlocked */}
                  {pen.currentAnimals < pen.maxAnimals && (
                    <Button color="green" onClick={() => buyAnimal(index)}>
                      Buy {pen.name} for ${pen.cost}
                    </Button>
                  )}
                </>
              ) : (
                // Show unlock button if the pen is locked
                <Button color="orange" onClick={() => unlockPen(index)}>
                  Unlock {pen.name} Pen for ${pen.unlockCost}
                </Button>
              )}
            </Segment>
          </Grid.Column>
        ))}
      </Grid>

      {/* Generate earnings per click for Environments */}
      {id === "1" && (
        <Button color="blue" onClick={() => setMoney(money + 100)}>
          Click to earn $1 from the Forest
        </Button>
      )}
      {id === "2" && (
        <Button color="blue" onClick={() => setMoney(money + 500)}>
          Click to earn $5 from the Avian Environment
        </Button>
      )}
      {id === '3' && (
        <Button color="blue" onClick={() => setMoney(money + 1000)}>
          Click to earn $10 from the Arctic Environment
        </Button>
      )}
      {id === '4' && (
        <Button color="blue" onClick={() => setMoney(money + 500)}>
          Click to earn $50 from the Savanna Environment
        </Button>
      )}
      {id === '5' && (
        <Button color="blue" onClick={() => setMoney(money + 100)}>
          Click to earn $100 from the Marine Environment
        </Button>
      )}

      {/* Back to Environments button */}
      <Button
        color="grey"
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/")}
      >
        Back to Environments
      </Button>
    </Container>
  );
};

export default EnvironmentPage;
