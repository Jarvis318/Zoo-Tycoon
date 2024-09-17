const db = require('./connection'); // Database connection
const { User, Environment, Pen, Animal } = require('../models'); // Models for zoo game
const cleanDB = require('./cleanDB'); // Utility to clean database collections

db.once('open', async () => {
  // Clean the collections before seeding new data
  await cleanDB('Environment', 'environments');
  await cleanDB('Pen', 'pens');
  await cleanDB('Animal', 'animals');
  await cleanDB('User', 'users');




  console.log('pens seeded');

  // Seed animals for the Turtle Pen (pens[0] is Turtle Pen)
  const animals = await Animal.insertMany([
    {
      name: 'Turtle',
      //pen: pens[0]._id, // Belongs to Turtle Pen
      quantity: 4,
      unlocked: true,
    },
    {
      name: 'Snake',
      //pen: pens[1]._id, // Belongs to Snake Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Alligator',
      //pen: pens[2]._id, // Belongs to Alligator Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Parrot',
      //pen: pens[3]._id, // Belongs to Parrot Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Flamingo',
      //pen: pens[4]._id, // Belongs to Flamingo Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Ostrich',
      //pen: pens[5]._id, // Belongs to Ostrich Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Penguin',
      //pen: pens[6]._id, // Belongs to Penguin Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Sea Lion',
      //pen: pens[7]._id, // Belongs to Sea Lion Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Polar Bear',
      //pen: pens[8]._id, // Belongs to Polar Bear Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Zebra',
      //pen: pens[9]._id, // Belongs to Zebra Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Elephant',
      //pen: pens[10]._id, // Belongs to Elephant Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Lion',
      //pen: pens[11]._id, // Belongs to Lion Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Dolphin',
      //pen: pens[12]._id, // Belongs to Dolphin Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Shark',
      //pen: pens[13]._id, // Belongs to Shark Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Blue Whale',
      //pen: pens[14]._id, // Belongs to Blue Whale Pen
      quantity: 0,
      unlocked: false,
    },
  ]);

  
  // Seed pens for the Forest and Avian environments
  const pens = await Pen.insertMany([
    {
      name: 'Turtle Pen',
      //environment: environments[0]._id, // Belongs to Forest environment
      unlocked: true,
      animals: [animals[0]._id,], // Will add animals later
    },
    {
      name: 'Snake Pen',
      //environment: environments[0]._id, // Belongs to Forest environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Alligator Pen',
      //environment: environments[0]._id, // Belongs to Forest environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Parrot Pen',
      //environment: environments[1]._id, // Belongs to Avian environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Flamingo Pen',
      //environment: environments[1]._id, // Belongs to Avian environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Ostrich Pen',
      //environment: environments[1]._id, // Belongs to Avian environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Penguin Pen',
      //environment: environments[2]._id, // Belongs to Arctic environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Sea Lion Pen',
      //environment: environments[2]._id, // Belongs to Arctic environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Polar Bear Pen',
      //environment: environments[2]._id, // Belongs to Arctic environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Zebra Pen',
      //environment: environments[3]._id, // Belongs to Savanna environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Elephant Pen',
      //environment: environments[3]._id, // Belongs to Savanna environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Lion Pen',
      //environment: environments[3]._id, // Belongs to Savanna environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Dolphin Pen',
      //environment: environments[4]._id, // Belongs to Marine environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Shark Pen',
      //environment: environments[4]._id, // Belongs to Marine environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Blue Whale Pen',
      //environment: environments[4]._id, // Belongs to Marine environment
      unlocked: false,
      animals: [],
    },
  ]);

    // Seed environments
    const environments = await Environment.insertMany([
      {
        name: 'Swamp',
        unlocked: true,
        pens: pens[0]._id,
      },
      { name: 'Avian', unlocked: false },
      { name: 'Arctic', unlocked: false },
      { name: 'Savanna', unlocked: false },
      { name: 'Marine', unlocked: false },
    ]);
  
    console.log('environments seeded');

  console.log('animals seeded');

  // Update pens with animal references
  await Pen.updateOne({ _id: pens[0]._id }, { $push: { animals: animals[0]._id } });
  await Pen.updateOne({ _id: pens[1]._id }, { $push: { animals: animals[1]._id } });
  await Pen.updateOne({ _id: pens[2]._id }, { $push: { animals: animals[2]._id } });
  await Pen.updateOne({ _id: pens[3]._id }, { $push: { animals: animals[3]._id } });
  await Pen.updateOne({ _id: pens[4]._id }, { $push: { animals: animals[4]._id } });
  await Pen.updateOne({ _id: pens[5]._id }, { $push: { animals: animals[5]._id } });
  await Pen.updateOne({ _id: pens[6]._id }, { $push: { animals: animals[6]._id } });
  await Pen.updateOne({ _id: pens[7]._id }, { $push: { animals: animals[7]._id } });
  await Pen.updateOne({ _id: pens[8]._id }, { $push: { animals: animals[8]._id } });
  await Pen.updateOne({ _id: pens[9]._id }, { $push: { animals: animals[9]._id } });
  await Pen.updateOne({ _id: pens[10]._id }, { $push: { animals: animals[10]._id } });
  await Pen.updateOne({ _id: pens[11]._id }, { $push: { animals: animals[11]._id } });
  await Pen.updateOne({ _id: pens[12]._id }, { $push: { animals: animals[12]._id } });
  await Pen.updateOne({ _id: pens[13]._id }, { $push: { animals: animals[13]._id } });
  await Pen.updateOne({ _id: pens[14]._id }, { $push: { animals: animals[14]._id } });

  const envIds = environments.map(env => env._id)

  // Add a sample user
  const users = await User.create({
    username: 'zookeeper',
    email: 'zookeeper@testmail.com',
    password: 'password12345',
    currency: 500,
    //unlockedPens: [pens[0]._id], // Only Turtle Pen is unlocked
    //unlockedAnimals: [animals[0]._id], // Only Turtle is unlocked
    unlockedEnvironments: envIds// [environments[0]._id], // Only Forest is unlocked
  });

  console.log('users seeded');

  process.exit();
});