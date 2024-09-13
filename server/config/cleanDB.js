const models = require('../models');  // Import all models
const db = require('../config/connection');  // Import the database connection

module.exports = async (modelName, collectionName) => {
  try {
    // Check if the collection exists in the database
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray();

    if (modelExists.length) {
      // Drop the collection if it exists
      await db.dropCollection(collectionName);
      console.log(`${collectionName} collection dropped`);
    } else {
      console.log(`${collectionName} collection does not exist`);
    }
  } catch (err) {
    console.error(`Error dropping ${collectionName}:`, err);
    throw err;
  }
};