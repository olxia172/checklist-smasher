import gql from "graphql-tag";

export default function scheduleItem(itemId, scheduleData) {
  return({
      query: gql`
        mutation scheduleItem($input, ScheduleItemMutationInput!)!) {
          scheduleItem(input: $input) {
            item {
              id
            }
            errors
          }
        }
      `,
      variables: {
        input: {
          id: itemId,
          scheduleData: {
            startDate: scheduleData.startDate,
            repeat: scheduleData.repeat,
            every: Number(scheduleData.every) || 1,
            days: scheduleData.days,
            endDate: scheduleData.endDate,
            occurencesCount: Number(scheduleData.occurencesCount),
            daysOfMonth: scheduleData.daysOfMonth ? scheduleData.daysOfMonth.map((el) => Number(el)) : [],
          },
        },
      },
    }
  )
}
