import { debug } from 'debug'
const logger = debug('is:biweekly')

export type IsBiweekly = {
  biweekly: boolean
  matchDates: MatchedDates []
}
export type MatchedDates = {
  original: string | number
  parsed: Date
}
// All dates/times are UTC
export const isBiweekly = (dates: (string | number) [] ): IsBiweekly => {
  // Get today's day
  const now = new Date()
  // get the comparison date
  const compare = dates.map((date) => {
    return {
      original: date,
      parsed: new Date(date)
    }
  })

  // Get the current and comparison day of the week
  const today = now.getUTCDay()
  logger(`today (utc day of the week): ${today}`)
  // filter the list of days to those that match today
  const comparedDays = compare.filter((date) => today === date.parsed.getUTCDay())
  logger(`matching days of the week (utc day of the week): ${comparedDays.join(', ')}`)
  
  // return now if the list of compared days is empty
  if (!comparedDays.length)
    return {
      biweekly: false,
      matchDates: []
    }

  // Get number of weeks since epoch from now
  const currentWeeksFromEpoch = Math.floor(now.getTime() / 1000 / 60 / 60 / 24 / 7)
  // filter the list of remaining comparison days by
  // comparing the the diff of number of week from the epoch
  // for both now and each comparison date
  const matchDates = comparedDays.filter((day) => {
    // Get number of weeks since epoch from comparison day
    const compareWeeksFromEpoch = Math.floor(day.parsed.getTime() / 1000 / 60 / 60 / 24 / 7)
    // get diff in weeks
    const weeksDiff = Math.abs(currentWeeksFromEpoch - compareWeeksFromEpoch)
    logger(`diff in weeks: ${weeksDiff}`)
    // mod 2, return true on 0, otherwise false
    const isTwoWeekIncrement = weeksDiff % 2 == 0
    logger(`is a two week increment: ${isTwoWeekIncrement}`)

    return isTwoWeekIncrement
  })

  // if there are comparison days remaining return true
  return {
    biweekly: !!matchDates.length,
    matchDates: matchDates
  }
}
