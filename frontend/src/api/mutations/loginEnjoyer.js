import gql from "graphql-tag";

export const loginEnjoyer = (identifier, password) => {
  return {
    query: gql`
      mutation login($identifier: String!, $password: String!) {
        login(input: { identifier: $identifier, password: $password }) {
          key
        }
      }
    `,
    variables: {
      identifier,
      password,
    },
  };
};
