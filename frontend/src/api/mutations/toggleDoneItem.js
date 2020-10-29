import gql from "graphql-tag";

export default function toggleDoneItem(itemId, done, date) {
  return ({
    query: gql`
      mutation ToggleDoneItemMutation($input: ToggleDoneItemMutationInput!) {
        toggleDoneItem(input: $input) {
          item {
            name
            id
            done
          }
        }
      }
    `,
    variables: {
      input: {
        id: Number(itemId),
        done: done,
        date: date,
      }
    },
  })
}
