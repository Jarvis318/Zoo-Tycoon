const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    currency: Int
    unlockedPens: [Pen]
    unlockedAnimals: [Animal]
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
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;
module.exports = typeDefs;