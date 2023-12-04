import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { day1Part2Solution, day1Solution } from './solution'

import { parseTxtToLines } from '../prompt_helpers'
const INPUT_PATH = './day1/input.txt'

describe('Day 1', () => {
  it('should return the correct value for mock data', () => {
    const mock = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']
    const actual = day1Solution(mock)
    assert.equal(actual, 142)
  })

  it('should return the solution for the input', () => {
    const input = parseTxtToLines(INPUT_PATH)
    const solution = day1Solution(input)
    assert.equal(solution, 53334)
  })
})

describe('Day 1, Part 2', () => {
  it('should return the correct value for the mock data', () => {
    const mock = [
      'two1nine',
      'eightwothree',
      'abcone2threexyz',
      'xtwone3four',
      '4nineeightseven2',
      'zoneight234',
      '7pqrstsixteen',
    ]
    const actual = day1Part2Solution(mock)
    assert.equal(actual, 281)
  })

  it('should return the solution for the input file provided', () => {
    const input = parseTxtToLines(INPUT_PATH)
    const solution = day1Part2Solution(input)
    assert.equal(solution, 52834)
  })
})
