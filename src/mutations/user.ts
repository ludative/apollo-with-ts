import gql from "graphql-tag";

export const USER_MUTATION_TEST = gql`
  mutation userMutationTest($value: String!) {
    userMutationTest(value: $value) {
      value
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $nickname: String
    $password: String!
  ) {
    createUser(
      params: { username: $username, nickname: $nickname, password: $password }
    ) {
      username
      nickname
    }
  }
`;

export const DELETE_USER_BY_ID = gql`
  mutation deleteUserById($userId: Int!) {
    deleteUserById(id: $userId) {
      deleted
    }
  }
`;
