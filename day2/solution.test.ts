import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { parseTxtToLines } from '../prompt_helpers'
const INPUT_PATH = './day2/input.txt'

import { solution, part2 } from './solution'

describe('Day 2', () => {
  it('should return the result expected from the prompt', () => {
    // 12 red cubes, 13 green cubes, and 14 blue cubes
    const mock = [
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
    ]
    const actual = solution(mock)
    assert.equal(actual, 8)
  })

  it('should return a solution for the provide input', () => {
    const input = parseTxtToLines(INPUT_PATH)
    const actual = solution(input)
    assert.notEqual(actual, 2209) // Forgot the '='
    assert.equal(actual, 2600)
  })
})

describe('Day 2, Part 2', () => {
  it('should return the result expected from the prompt', () => {
    const mock = [
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', // 4r,2g,6b => 4 * 2 * 6 = 48
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', // 1r,3g,4b = 12
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', // 20r,13g,6b = 1560
      'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', // 14r,3g,15b = 630
      'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', // 6r,3g,2b = 36
    ]
    // 48 + 12 + 1560 + 630 + 36 = 2286
    const actual = part2(mock)
    assert.equal(actual, 2286)
  })

  it('should return a solution for the provide input', () => {
    const input = parseTxtToLines(INPUT_PATH)
    const actual = part2(input)
    assert.equal(actual, 86036)
  })
})
