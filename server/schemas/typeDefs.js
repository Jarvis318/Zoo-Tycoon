const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    currency: Float
    clickAmount: Int
    unlockedEnvironments: [Environment]
  }

  type Pen {
  name: String!
  animals: [Animal]
  unlocked: Boolean
  }


  type Auth {
    token: ID!
    user: User
  }

  type Animal {
  name: String!
  quantity: Int
  level: Int
  unlocked: Boolean
  }

  type Environment {
  _id: ID
  name: String
  pens: [Pen]
  unlocked: Boolean
  }


  input EnvironmentData {
  _id: ID
  unlocked: Boolean
  }


  type Query {
    getUser: User
    getEnvironment: [Environment]
    getAnimal: [Animal] 
    getPen(name: String!, environment: ID): Pen
    getAllPens: [Pen]
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPen(name: String!, unlocked: Boolean): Pen
    updateCurrency(currency: Float): User
    updateEnvironment(EnvironmentInput: EnvironmentData): User
    updatePen(unlocked: Boolean): Pen
    updateAnimal(_id:ID, quantity: Int): Animal
  }
`;
module.exports = typeDefs;