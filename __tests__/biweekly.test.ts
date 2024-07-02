import { expect, test, describe, setSystemTime, beforeAll } from 'bun:test'
import { isBiweekly } from '../src/biweekly'

describe('Verify biweekly', () => {
  beforeAll(() => {
    setSystemTime(new Date('2020-01-01T00:00:00.000Z'))
  });

  test('compared to the past', () => {
    expect(isBiweekly(['2000-01-12']).biweekly).toBe(true)
    expect(isBiweekly(['2000-01-13']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-14']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-15']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-16']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-17']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-18']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-19']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-20']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-21']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-22']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-23']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-24']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-25']).biweekly).toBe(false)
    expect(isBiweekly(['2000-01-26']).biweekly).toBe(true)
  })

  test('compared to the future', () => {
    expect(isBiweekly(['2020-01-15']).biweekly).toBe(true)
    expect(isBiweekly(['2020-01-16']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-17']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-18']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-19']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-10']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-20']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-21']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-22']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-23']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-24']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-25']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-26']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-27']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-28']).biweekly).toBe(false)
    expect(isBiweekly(['2020-01-29']).biweekly).toBe(true)
  });

  test('using different date formats', () => {
    expect(isBiweekly([1579046400000]).biweekly).toBe(true)
    expect(isBiweekly(['2020-01-15T00:00:00.000Z']).biweekly).toBe(true)
    expect(isBiweekly(['Tue Jan 14 2020 19:00:00 GMT-0500 (Eastern Standard Time)']).biweekly).toBe(true)
    expect(isBiweekly([
      1579046400000, // works
      '2020-01-29', // works
      '2020-01-15T00:00:00.000Z', // works
      'Tue Jan 14 2020 19:00:00 GMT-0500 (Eastern Standard Time)' // works
    ]).biweekly).toBe(true)
    expect(isBiweekly([
      1579046400000, // works
      '2020-02-29', // doesn't work
      '2020-01-12T00:00:00.000Z', // doesn't work
      'Mon Jan 13 2020 19:00:00 GMT-0500 (Eastern Standard Time)' // doesn't work
    ]).biweekly).toBe(true)
    expect(isBiweekly([
      1679046400000, // doesn't work
      '2020-02-29', // doesn't work
      '2020-01-12T00:00:00.000Z', // doesn't work
      'Mon Jan 13 2020 19:00:00 GMT-0500 (Eastern Standard Time)' // doesn't work
    ]).biweekly).toBe(false)
  })

  test('returns data for single date', () => {
    const originalDate = [
      1579046400000
    ]
    const results = isBiweekly(originalDate)
    expect(results).toBeObject()
    expect(results.biweekly).toBeBoolean()
    expect(results.matchDates).toBeArrayOfSize(1)
    expect(results?.matchDates[0].original).toBe(originalDate[0])
    expect(results?.matchDates[0].parsed).toStrictEqual(new Date(originalDate[0]))
  })
  
  test('returns data for multiple dates', () => {
    const originalDates = [
      1579046400000,
      '2020-02-29', // doesn't work
      'Tue Jan 14 2020 19:00:00 GMT-0500 (Eastern Standard Time)' // works
    ]
    const results = isBiweekly(originalDates)
    expect(results).toBeObject()
    expect(results.biweekly).toBeBoolean()
    expect(results.matchDates).toBeArrayOfSize(2)
    expect(results?.matchDates[0].original).toBe(originalDates[0])
    expect(results?.matchDates[0].parsed).toStrictEqual(new Date(originalDates[0]))
    // second date doesn't match, but the third does
    expect(results?.matchDates[1].original).toBe(originalDates[2])
    expect(results?.matchDates[1].parsed).toStrictEqual(new Date(originalDates[2]))
  })
})
