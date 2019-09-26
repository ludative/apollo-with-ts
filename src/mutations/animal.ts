import gql from "graphql-tag";

export const CREATE_ANIMAL = gql`
  mutation createAnimal($name: String!) {
    createAnimal(params: { name: $name }) {
      name
    }
  }
`;
