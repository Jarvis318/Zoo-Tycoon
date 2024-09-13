const db = require('./connection'); // Database connection
const { User, Environment, Pen, Animal } = require('../models'); // Models for zoo game
const cleanDB = require('./cleanDB'); // Utility to clean database collections

db.once('open', async () => {
  // Clean the collections before seeding new data
  await cleanDB('Environment', 'environments');
  await cleanDB('Pen', 'pens');
  await cleanDB('Animal', 'animals');
  await cleanDB('User', 'users');

  // Seed environments
  const environments = await Environment.insertMany([
    { name: 'Forest', unlocked: true },
    { name: 'Avian', unlocked: false },
    { name: 'Arctic', unlocked: false },
    { name: 'Savanna', unlocked: false },
    { name: 'Marine', unlocked: false },
  ]);

  console.log('environments seeded');

  // Seed pens for the Forest and Avian environments
  const pens = await Pen.insertMany([
    {
      name: 'Turtle Pen',
      environment: environments[0]._id, // Belongs to Forest
      unlocked: true,
      animals: [], // Will add animals later
    },
    {
      name: 'Snake Pen',
      environment: environments[0]._id, // Belongs to Forest
      unlocked: false,
      animals: [],
    },
    {
      name: 'Alligator Pen',
      environment: environments[0]._id, // Belongs to Forest
      unlocked: false,
      animals: [],
    },
    {
      name: 'Parrot Pen',
      environment: environments[1]._id, // Belongs to Avian environment
      unlocked: false,
      animals: [],
    },
    {
      name: 'Flamingo Pen',
      environment: environments[1]._id, // Belongs to Avian environment
      unlocked: false,
      animals: [],
    },
    {
        name: 'Ostrich Pen',
        environment: environments[1]._id, // Belongs to Avian environment
        unlocked: false,
        animals: [],
    },
  ]);

  console.log('pens seeded');

  // Seed animals for the Turtle Pen (pens[0] is Turtle Pen)
  const animals = await Animal.insertMany([
    {
      name: 'Turtle',
      pen: pens[0]._id, // Belongs to Turtle Pen
      quantity: 4,
      unlocked: true,
    },
    {
      name: 'Snake',
      pen: pens[1]._id, // Belongs to Snake Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Alligator',
      pen: pens[2]._id, // Belongs to Alligator Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Parrot',
      pen: pens[3]._id, // Belongs to Parrot Pen
      quantity: 0,
      unlocked: false,
    },
    {
      name: 'Flamingo',
      pen: pens[4]._id, // Belongs to Flamingo Pen
      quantity: 0,
      unlocked: false,
    },
    {
        name: 'Ostrich',
        pen: pens[5]._id, // Belongs to Flamingo Pen
        quantity: 0,
        unlocked: false,
    },
  ]);

  console.log('animals seeded');

  // Update pens with animal references
  await Pen.updateOne({ _id: pens[0]._id }, { $push: { animals: animals[0]._id } });
  await Pen.updateOne({ _id: pens[1]._id }, { $push: { animals: animals[1]._id } });
  await Pen.updateOne({ _id: pens[2]._id }, { $push: { animals: animals[2]._id } });
  await Pen.updateOne({ _id: pens[3]._id }, { $push: { animals: animals[3]._id } });
  await Pen.updateOne({ _id: pens[4]._id }, { $push: { animals: animals[4]._id } });
  await Pen.updateOne({ _id: pens[5]._id }, { $push: { animals: animals[5]._id } });

  // Add a sample user
  const users = await User.create({
    username: 'zookeeper',
    email: 'zookeeper@testmail.com',
    password: 'password12345',
    currency: 500,
    unlockedPens: [pens[0]._id], // Only Turtle Pen is unlocked
    unlockedAnimals: [animals[0]._id], // Only Turtle is unlocked
    unlockedEnvironments: [environments[0]._id], // Only Forest is unlocked
  });

  console.log('users seeded');

  process.exit();
});