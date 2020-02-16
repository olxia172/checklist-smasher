import gql from "graphql-tag";

export default function addItemToChecklist(itemName, checklistId) {
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