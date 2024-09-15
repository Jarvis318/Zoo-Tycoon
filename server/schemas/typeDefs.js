const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    currency: Int
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
  unlocked: Boolean
  }

  type Environment {
  name: String!
  pens: [Pen]
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
    addEnvironment(name: String!): Environment
    addPen(name: String!, unlocked: Boolean): Pen
    updateUser(currency: Int): User
    updateEnvironment(environment: ID): Environment
    updatePen(unlocked: Boolean): Pen
    updateAnimal(_id:ID, quantity: Int): Animal
  }
`;
module.exports = typeDefs;