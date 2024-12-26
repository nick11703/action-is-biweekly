import { expect, test, describe, setSystemTime, beforeAll, beforeEach, jest } from 'bun:test'
import { setOutput, getInput, setFailed } from '@actions/core'
import { default as action } from '../src/action'

describe('Verify action', () => {
  beforeAll(() => {
    setSystemTime(new Date("2020-01-01T00:00:00.000Z"))
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("pass on 2 week interval", () => {
    process.env.MOCK_COMPARISON_DATE = '2000-01-12'
    // Make sure mocks are cleared
    expect(setOutput).toBeCalledTimes(0)
    expect(getInput).toHaveBeenCalledTimes(0)
    expect(setFailed).toHaveBeenCalledTimes(0)
    // Call the function
    const result = action()
    // Check the results
    expect(result.biweekly).toBe(true)
    expect(setOutput).toBeCalledTimes(1)
    expect(setFailed).toHaveBeenCalledTimes(0)
  })
  
  test("accepts multiple dates", () => {
    process.env.MOCK_COMPARISON_DATE = '2000-01-12\n2000-01-13'
    // Make sure mocks are cleared
    expect(setOutput).toBeCalledTimes(0)
    expect(getInput).toHaveBeenCalledTimes(0)
    expect(setFailed).toHaveBeenCalledTimes(0)
    // Call the function
    const result = action()
    // Check the results
    expect(result.biweekly).toBe(true)
    expect(setOutput).toBeCalledTimes(1)
    expect(setFailed).toHaveBeenCalledTimes(0)
  })
  
  test("accepts multiple date formats", () => {
    process.env.MOCK_COMPARISON_DATE = `2000-01-13
    1579046400000
    2020-01-15T00:00:00.000Z`
    // Make sure mocks are cleared
    expect(setOutput).toBeCalledTimes(0)
    expect(getInput).toHaveBeenCalledTimes(0)
    expect(setFailed).toHaveBeenCalledTimes(0)
    // Call the function
    const result = action()
    // Check the results
    expect(result.biweekly).toBe(true)
    expect(setOutput).toBeCalledTimes(1)
    expect(setFailed).toHaveBeenCalledTimes(0)
  })

  test("return false when not biweekly", () => {
    // process.env.MOCK_FAIL_ON_ERROR = 'true'
    process.env.MOCK_COMPARISON_DATE = '2024-06-06' // not a 2 week interval
    // Make sure mocks are cleared
    expect(setOutput).toBeCalledTimes(0)
    expect(getInput).toHaveBeenCalledTimes(0)
    expect(setFailed).toHaveBeenCalledTimes(0)
    // Call the function
    const result = action()
    // Check the results
    expect(result.biweekly).toBe(false)
    expect(setOutput).toBeCalledTimes(1)
    expect(setFailed).toHaveBeenCalledTimes(0)
  })
  
  test("fails on error", () => {
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
    expect(result.biweekly).toBe(false)
  })
})
