import gql from "graphql-tag";

export const loginEnjoyer = (email, password) => {
  return {
    query: gql`
      query {
        login(email: "${email}", password: "${password}")
      }
    `,
  };
};
