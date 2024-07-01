import { debug } from 'debug'
const logger = debug('is:biweekly')

// All dates/times are UTC
export const isBiweekly = (date: string | number ): boolean => {
  // Get today's day
  const now = new Date()
  // get the comparison date
  const compare = new Date(date)
  // Get the current and comparison day of the week
  const today = now.getUTCDay()
  logger(`today (utc day of the week): ${today}`)
  const compareDay = compare.getUTCDay()
  logger(`compare day (utc day of the week): ${compareDay}`)
  // Check if same day of the week, fail early, fail fast
  const isSameDayOfWeek = today == compareDay
  logger(`is the same day of the week: ${isSameDayOfWeek}`)
  // Get number of weeks since epoch
  const compareWeeksFromEpoch = Math.floor(compare.getTime() / 1000 / 60 / 60 / 24 / 7)
  const currentWeeksFromEpoch = Math.floor(now.getTime() / 1000 / 60 / 60 / 24 / 7)
  // get diff in weeks
  const weeksDiff = Math.abs(currentWeeksFromEpoch - compareWeeksFromEpoch)
  logger(`diff in weeks: ${weeksDiff}`)
  // mod 2, return true on 0, otherwise false
  const isTwoWeekIncrement = weeksDiff % 2 == 0
  logger(`is a two week increment: ${isTwoWeekIncrement}`)

  return isSameDayOfWeek && isTwoWeekIncrement
}