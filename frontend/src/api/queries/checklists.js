import gql from 'graphql-tag'

export const getChecklists = {
  query: gql`
    query {
      checklists {
        id
        name
        items(date: null) {
          id
          name
          done
          isScheduled
        }
      }
    }
  `,
};
