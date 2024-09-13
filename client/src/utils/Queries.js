import { gql } from '@apollo/client';

export const QUERY_USER = gql`

query GetUser {
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

export const QUERY_PENS = gql`

query GetPens {
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

query GetAnimal {
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