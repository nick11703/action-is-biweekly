import { setOutput, getInput, setFailed } from '@actions/core'
import { isBiweekly } from './biweekly'

export default (): boolean => {
  const failOnError = getInput('fail-on-error')
  const inputDate = getInput('comparison-date', { required: true })
  const biweekly = isBiweekly(inputDate)

  // always set the output with the results
  setOutput('is-biweekly', biweekly)

  if (failOnError && !biweekly) {
    setFailed(`Action failed since this is not a biweekly run`)
    return false
  }
  
  return biweekly
}
