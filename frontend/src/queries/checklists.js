import gql from 'graphql-tag'

export const getChecklists = {
  query: gql`
      {
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