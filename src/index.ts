import { setOutput, getInput, setFailed } from '@actions/core';

import { isBiweekly } from './biweekly'
const failOnError = getInput('fail-on-error')
const inputDate = getInput('comparison-date', { required: true })

const biweekly = isBiweekly(inputDate)
if (failOnError && !biweekly)
  setFailed(`Action failed since this is not a biweekly run`)
setOutput('is-biweekly', biweekly)
