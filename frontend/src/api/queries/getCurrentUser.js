import gql from "graphql-tag";

export const getCurrentUser = {
  query: gql`
    query {
      currentUser {
        email
        name
      }
    }
  `,
};
