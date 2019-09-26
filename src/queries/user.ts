import gql from "graphql-tag";

export const GET_USERS = gql`
  {
    getUsers {
      count
      rows {
        id
        username
        nickname
        isAdmin
        deleted
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($userId: Int!) {
    getUserById(id: $userId) {
      isAdmin
    }
  }
`;
