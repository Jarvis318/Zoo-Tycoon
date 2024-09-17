import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;




export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password

    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_CURRENCY = gql`
mutation updateCurrency($currency: Float) {
  updateCurrency(currency: $currency) {
    _id
    username
    currency
    unlockedEnvironments {
      _id
      name
      unlocked
    }
  }
}
`;


export const UPDATE_ENVIRONMENT = gql`
mutation Mutation($environmentInput: EnvironmentData) {
  updateEnvironment(EnvironmentInput: $environmentInput) {
    _id
    username
    currency
    unlockedEnvironments {
      _id
      name
      unlocked
    }
    email
    clickAmount
  }
}
`;
