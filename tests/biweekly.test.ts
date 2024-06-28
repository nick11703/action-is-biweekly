import { expect, test, describe, setSystemTime, beforeAll } from 'bun:test'
import { isBiweekly } from '../src/biweekly'

describe('Verify biweekly', () => {
  beforeAll(() => {
    setSystemTime(new Date("2020-01-01T00:00:00.000Z"))
  });

  test("is biweekly - compared to the past", () => {
    expect(isBiweekly('2000-01-12')).toBe(true)
    expect(isBiweekly('2000-01-13')).toBe(false)
    expect(isBiweekly('2000-01-14')).toBe(false)
    expect(isBiweekly('2000-01-15')).toBe(false)
    expect(isBiweekly('2000-01-16')).toBe(false)
    expect(isBiweekly('2000-01-17')).toBe(false)
    expect(isBiweekly('2000-01-18')).toBe(false)
    expect(isBiweekly('2000-01-19')).toBe(false)
    expect(isBiweekly('2000-01-20')).toBe(false)
    expect(isBiweekly('2000-01-21')).toBe(false)
    expect(isBiweekly('2000-01-22')).toBe(false)
    expect(isBiweekly('2000-01-23')).toBe(false)
    expect(isBiweekly('2000-01-24')).toBe(false)
    expect(isBiweekly('2000-01-25')).toBe(false)
    expect(isBiweekly('2000-01-26')).toBe(true)
  })

  test("is biweekly - compared to the future", () => {
    expect(isBiweekly('2020-01-15')).toBe(true)
    expect(isBiweekly('2020-01-16')).toBe(false)
    expect(isBiweekly('2020-01-17')).toBe(false)
    expect(isBiweekly('2020-01-18')).toBe(false)
    expect(isBiweekly('2020-01-19')).toBe(false)
    expect(isBiweekly('2020-01-10')).toBe(false)
    expect(isBiweekly('2020-01-20')).toBe(false)
    expect(isBiweekly('2020-01-21')).toBe(false)
    expect(isBiweekly('2020-01-22')).toBe(false)
    expect(isBiweekly('2020-01-23')).toBe(false)
    expect(isBiweekly('2020-01-24')).toBe(false)
    expect(isBiweekly('2020-01-25')).toBe(false)
    expect(isBiweekly('2020-01-26')).toBe(false)
    expect(isBiweekly('2020-01-27')).toBe(false)
    expect(isBiweekly('2020-01-28')).toBe(false)
    expect(isBiweekly('2020-01-29')).toBe(true)
  });

  test("is biweekly - using different date formats", () => {
    expect(isBiweekly(1579046400000)).toBe(true)
    expect(isBiweekly('2020-01-15T00:00:00.000Z')).toBe(true)
    expect(isBiweekly('Tue Jan 14 2020 19:00:00 GMT-0500 (Eastern Standard Time)')).toBe(true)
  })
})
