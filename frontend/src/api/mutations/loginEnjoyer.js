import gql from "graphql-tag";

export const loginEnjoyer = (identifier, password) => {
  return {
    query: gql`
      mutation login($input: LoginMutationInput!) {
        login(input: $input) {
          key
        }
      }
    `,
    variables: {
      input: {
        identifier,
        password,
      }
    },
  };
};
