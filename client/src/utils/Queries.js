import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query Query {
  getUser {
    _id
    username
    email
    currency
    clickAmount
    unlockedEnvironments {
      name
      unlocked
    }
  }
}
`;



export const QUERY_PENS = gql`

query GetAllPens {
    name
    unlocked
}
`;

export const QUERY_ENVIRONMENTS = gql`

query GetEnvironment {
    getUser {
      _id
      currency
      username
      email
      unlockedPens {
        name
        unlocked
        animals {
          quantity
          unlocked
          name
        }
        environment {
          unlocked
          name
        }
      }
    }
  }
`;

export const QUERY_ANIMALS = gql`

query Query {
  getAnimal {
    name
    quantity
    level
    unlocked
  }
}
`;