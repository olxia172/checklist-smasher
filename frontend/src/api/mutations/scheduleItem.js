import gql from "graphql-tag";
import { toString } from "../../helpers/dateHelpers"

export default function scheduleItem(itemId, scheduleData) {
  return({
      query: gql`
        mutation scheduleItem($input: ScheduleItemMutationInput!) {
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
            startDate: toString(scheduleData.startDate),
            repeat: scheduleData.repeat,
            every: Number(scheduleData.every) || 1,
            days: scheduleData.days,
            endDate: toString(scheduleData.endDate),
            occurencesCount: Number(scheduleData.occurencesCount) || null,
            daysOfMonth: scheduleData.daysOfMonth ? scheduleData.daysOfMonth.map((el) => Number(el)) : [],
          },
        },
      },
    }
  )
}
