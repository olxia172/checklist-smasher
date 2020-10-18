import gql from 'graphql-tag'

export const checklists = {
  query: gql`
    query {
      checklists {
        id
        name
        items {
          id
          name
          done
          isScheduled
        }
      }
    }
  `,
};
