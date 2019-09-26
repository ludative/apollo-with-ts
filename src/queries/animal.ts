import gql from "graphql-tag";

export const GET_ANIMALS = gql`
  {
    getAnimals {
      count
      rows {
        id
        name
        createdAt
      }
    }
  }
`;
