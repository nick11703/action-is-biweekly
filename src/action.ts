import { setOutput, getInput, setFailed } from '@actions/core'
import { isBiweekly } from './biweekly'
import { debug } from 'debug'

const logger = debug('is:biweekly')

export default (): boolean => {
  const failOnError = getInput('fail-on-error')
  logger(`fail-on-error: ${failOnError}`)
  const inputDates = getInput('comparison-date', { required: true })
  logger(`comparison-date: ${inputDates}`)
  // split the input into separate dates
  const dates = inputDates.split(/[\r\n]/gm).map((date) => date.trim())
  logger(`parsed dates: ${dates}`)
  const biweekly = isBiweekly(dates)

  // always set the output with the results
  setOutput('is-biweekly', biweekly.biweekly)

  if (failOnError && !biweekly.biweekly) {
    setFailed(`Action failed since this is not a biweekly run`)
    return false
  }
  
  return biweekly.biweekly
}
