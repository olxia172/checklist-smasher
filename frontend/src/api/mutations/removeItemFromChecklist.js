import gql from "graphql-tag";

export default function removeItemFromChecklist(itemId) {
  return({
      query: gql`
        mutation RemoveItemMutation($input: RemoveItemMutationInput!) {
          removeItem(input: $input) {
            errors
          }
        }
      `,
      variables: {
        input: {
          id: Number(itemId),
        },
      },
    }
  )
}