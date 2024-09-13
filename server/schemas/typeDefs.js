const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    currency: Int
    unlockedPens: [Pen]
    unlockedAnimals: [Animal]
    unlockedEnvironments: [Environment]
  }

  type Pen {
  name: String!
  environment: [Environment]
  animals: [Animal]
  unlocked: Boolean
  }


  type Auth {
    token: ID!
    user: User
  }

  type Animal {
  name: String!
  pen: [Pen]
  quantity: Int
  unlocked: Boolean
  }

  type Environment {
  name: String!
  pens: [Pen]
  unlocked: Boolean
  }



  type Query {
    getUser: User
    getEnvironment(name: String!): Environment
    getAnimal: [Animal] 
    getPen(name: String!, environment: ID): Pen
    getAllPens: [Pen]
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;
module.exports = typeDefs;