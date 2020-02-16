import gql from 'graphql-tag'

export const getChecklists = {
  query: gql`
    query {
      checklists {
        id
        name
        items {
          id
          name
          done
        }
      }
    }
  `,
};

