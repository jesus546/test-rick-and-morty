import { gql } from "@apollo/client";

const GET_ALL_CHARACTERS = gql`
query Characters($name: String, $status: String, $species: String, $gender: String){
  characters ( filter: {name: $name, status: $status, species: $species, gender: $gender }){
    info  {
      count
    },
    results { 
      id
      name
      species
      status
      type
      gender
      origin{name}
      location {name}
      image
    },
  },
}
`;
const GET_SINGLE_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      species
      status
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
    }
  }
`;

export { GET_ALL_CHARACTERS, GET_SINGLE_CHARACTER };
