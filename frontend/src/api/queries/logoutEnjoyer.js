import gql from "graphql-tag";

export const logoutEnjoyer = {
  query: gql`
    query {
      logout
    }
  `,
};
