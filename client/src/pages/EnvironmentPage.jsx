import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Header, Button, Grid, Segment, Sidebar, Radio, SidebarPusher,
  SidebarPushable,
  MenuItem,
  GridColumn,
  Checkbox,
  Icon,
  Image,
  Menu,
 } from "semantic-ui-react";
import '../assets/EnvironmentPage.css';  
import "../assets/styles.css";
// Mock data for environments using IDs as keys
const environments = {
  1: {
    name: "Swamp",
    pens: [
      {
        name: "Turtles",
        cost: [50, 75, 113, 169],
        earnings: 1,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: true,
        unlockCost: 0,  // need to adjust final price
      },
      {
        name: "Snakes",
        cost: [240, 360, 540, 810],
        earnings: 3,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 200,   // need to adjust final price
      },
      {
        name: "Alligator",
        cost: [1152, 1728, 2592, 3888],
        earnings: 10,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 1000,   // need to adjust final price
      },
    ],
  },
  2: {
    name: "Avian",
    pens: [
      {
        name: "Parrots",
        cost: [5530, 8294, 12442, 18662],
        earnings: 33,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 5000,   // need to adjust final price
      },
      {
        name: "Flamingos",
        cost: [26542, 39813, 59720, 89580],
        earnings: 105,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 25000,   // need to adjust final price
      },
      {
        name: "Ostriches",
        cost: [127402, 191103, 286654, 429982],
        earnings: 336,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 100000,   // need to adjust final price
      },
    ],
  },
  3: {
    name: "Arctic",
    pens: [
      {
        name: "Penguins",
        cost: [611530, 917294, 1375941, 2063912],
        earnings: 1074,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 550000,   // need to adjust final price
      },
      {
        name: "Sea Lions",
        cost: [2935342, 4403013, 6604519, 9906778],
        earnings: 3436,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 2000000,   // need to adjust final price
      },
      {
        name: "Polar Bears",
        cost: [14089640, 21134460, 31701690, 47552536],
        earnings: 10995,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 10000000,   // need to adjust final price
      },
    ],
  },
  4: {
    name: "Savanna",
    pens: [
      {
        name: "Zebras",
        cost: [67630273, 101445410, 152168114, 228252171],
        earnings: 35184,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 55000000,   // need to adjust final price
      },
      {
        name: "Elephants",
        cost: [324625331, 486937966, 730406949, 1095610423],
        earnings: 112590,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 250000000,   // need to adjust final price
      },
      {
        name: "Lions",
        cost: [1558201491, 2337302236, 3505953354, 5258930031],
        earnings: 360288,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 1000000000,   // need to adjust final price
      },
    ],
  },
  5: {
    name: "Marine",
    pens: [
      {
        name: "Dolphins",
        cost: [7479367155, 11219050732, 16828576099, 25242864148],
        earnings: 1152922,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 7000000000,   // need to adjust final price
      },
      {
        name: "Sharks",
        cost: [35900962344, 53851443515, 80777165273, 121165747909],
        earnings: 3689349,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 30000000000,   // need to adjust final price
      },
      {
        name: "Blue Whales",
        cost: [172324619249, 258486928873, 387730393310, 581595589965],
        earnings: 11805916,
        maxAnimals: 4,
        currentAnimals: 0,
        unlocked: false,
        unlockCost: 150000000000,   // need to adjust final price
      },
    ],
  },
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

  const backgroundImageUrl = `/images/background/${environmentData.name.toLowerCase()}.png`;

    // Handle passive earnings every second
    useEffect(() => {
      const interval = setInterval(() => {
        let totalEarnings = 0;
        pens.forEach((pen) => {
          totalEarnings += pen.currentAnimals * pen.earnings; // Add the earnings of all animals in all pens
        });
        setMoney((prevMoney) => prevMoney + totalEarnings); // Add the earnings to the total money
      }, 1000); // Every second
  
      return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [pens]);

    
  // Handle buying an animal for a specific pen
  const buyAnimal = (penIndex) => {
    const pen = pens[penIndex];

    // Get the cost of the next animal based on how many are already in the pen
    const nextAnimalCost = pen.cost[pen.currentAnimals];

    // Check if there is room for more animals in this pen and enough money
    if (pen.currentAnimals < pen.maxAnimals && money >= nextAnimalCost) {
      setMoney(money - nextAnimalCost); // Deduct cost for the animal
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

  // const SidebarExampleSidebar = () => {
  //   const [visible, setVisible] = React.useState(false)
    
  return (
    <>

    <div style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', height: '100vh', backgroundPosition: 'center' }}>
    <Container textAlign="center" style={{ marginTop: "2em" }}>
      {/* Header for the environment */}
      <Header as="h1">{environmentData.name} Environment</Header>
      <Header as="h3">Money: ${money.toLocaleString()}</Header>

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
                    {pen.name} generates ${pen.earnings.toLocaleString()} per second
                  </p>
                  {/* Show button to buy more animals if the pen is unlocked */}
                  {pen.currentAnimals < pen.maxAnimals && (
                    <Button color="green" onClick={() => buyAnimal(index)}>
                      Buy {pen.name} for ${pen.cost[pen.currentAnimals].toLocaleString()}
                    </Button>
                  )}
                </>
              ) : (
                // Show unlock button if the pen is locked
                <Button color="orange" onClick={() => unlockPen(index)}>
                  Unlock {pen.name} Pen for ${pen.unlockCost.toLocaleString()}
                </Button>
              )}
            </Segment>
          </Grid.Column>
        ))}
      </Grid>

      {/* Generate earnings per click for Environments */}
      {id === "1" && (
        <Button color="blue" onClick={() => setMoney(money + 100)}> {/*need to adjust these prices*/}
          Click to earn $100 from the Swamp Environment
        </Button>
      )}
      {id === "2" && (
        <Button color="blue" onClick={() => setMoney(money + 500)}> {/*need to adjust these prices*/}
          Click to earn $500 from the Avian Environment
        </Button>
      )}
      {id === '3' && (
        <Button color="blue" onClick={() => setMoney(money + 1000)}> {/*need to adjust these prices*/}
          Click to earn $1000 from the Arctic Environment
        </Button>
      )}
      {id === '4' && (
        <Button color="blue" onClick={() => setMoney(money + 25000)}> {/*need to adjust these prices*/}
          Click to earn $25000 from the Savanna Environment
        </Button>
      )}
      {id === '5' && (
        <Button color="blue" onClick={() => setMoney(money + 1000000000)}> {/*need to adjust these prices*/}
          Click to earn $1000000000 from the Marine Environment
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
    </div>
    </>
  );
};

export default EnvironmentPage;
