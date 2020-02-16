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

export function toggleDoneItem(itemId, done) {
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
      }
    },
  })
}

export function addItemToChecklist(itemName, checklistId) {
  return({
      query: gql`
        mutation AddItemMutation($input: AddItemMutationInput!) {
          addItem(input: $input) {
            errors
            item {
              id
              name
            }
          }
        }
      `,
      variables: {
        input: {
          name: itemName,
          checklistId: Number(checklistId),
        },
      },
    }
  )
}