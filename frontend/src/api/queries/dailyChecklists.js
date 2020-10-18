import gql from 'graphql-tag'

export function getDailyChecklists(date) {
  return({
    query: gql`
      query dailyChecklists($date: String!) {
        dailyChecklists(date: $date) {
          name,
          items(date: $date) {
            id
            name
            done(date: $date)
          }
        }
      }
    `,
    variables: {
      date: date,
    }
  })
};
