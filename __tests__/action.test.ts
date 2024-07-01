import { expect, test, describe, setSystemTime, beforeAll, beforeEach, jest } from 'bun:test'
import { setOutput, getInput, setFailed } from '@actions/core'
import { default as action } from '../src/action'

describe('Verify biweekly', () => {
  beforeAll(() => {
    setSystemTime(new Date("2020-01-01T00:00:00.000Z"))
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("action - pass on 2 week interval", () => {
    process.env.MOCK_COMPARISON_DATE = '2000-01-12'
    // Make sure mocks are cleared
    expect(setOutput).toBeCalledTimes(0)
    expect(getInput).toHaveBeenCalledTimes(0)
    expect(setFailed).toHaveBeenCalledTimes(0)
    // Call the function
    const result = action()
    // Check the results
    expect(result).toBe(true)
    expect(setOutput).toBeCalledTimes(1)
    expect(setFailed).toHaveBeenCalledTimes(0)
  })

  test("is biweekly - return false when not 2 biweekly", () => {
    // process.env.MOCK_FAIL_ON_ERROR = 'true'
    process.env.MOCK_COMPARISON_DATE = '2024-06-06' // not a 2 week interval
    // Make sure mocks are cleared
    expect(setOutput).toBeCalledTimes(0)
    expect(getInput).toHaveBeenCalledTimes(0)
    expect(setFailed).toHaveBeenCalledTimes(0)
    // Call the function
    const result = action()
    // Check the results
    expect(result).toBe(false)
    expect(setOutput).toBeCalledTimes(1)
    expect(setFailed).toHaveBeenCalledTimes(0)
  })
  
  test("is biweekly - fail on error", () => {
    process.env.MOCK_FAIL_ON_ERROR = 'true'
    process.env.MOCK_COMPARISON_DATE = '2024-06-06' // not a 2 week interval
    // Make sure mocks are cleared
    expect(setOutput).toBeCalledTimes(0)
    expect(getInput).toHaveBeenCalledTimes(0)
    expect(setFailed).toHaveBeenCalledTimes(0)
    // Call the function
    const result = action()
    // Check the results
    expect(setOutput).toBeCalledTimes(1)
    expect(setFailed).toHaveBeenCalledTimes(1)
    expect(result).toBe(false)
  })
})
