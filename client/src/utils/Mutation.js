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
mutation Mutation($currency: Int) {
  updateCurrency(currency: $currency) {
    _id
    username
    currency
  }
}
`;

