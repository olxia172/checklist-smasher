import gql from "graphql-tag";

export default function createChecklist(checklistName) {
  return({
      query: gql`
        mutation CreateChecklistMutation($input: CreateChecklistMutationInput!) {
          createChecklist(input: $input) {
            checklist {
              id
              name
            }
          }
        }
      `,
      variables: {
        input: {
          name: checklistName,
        },
      },
    }
  )
}
