import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { parseTxtToLines } from '../prompt_helpers'
const INPUT_PATH = './day3/input.txt'

import { solution } from './solution'

describe('Day 3', () => {
  it('should return the result expected from the prompt', () => {
    const mock = [
      '467..114..',
      '..._......',
      '..35..633.',
      '......#...',
      '617_......',
      '.....+.58.',
      '..592.....',
      '......755.',
      '...$.*....',
      '.664.598..',
    ]
    const actual = solution(mock)
    assert.equal(actual, 4361)
  })

  it('should return a solution for the provide input', () => {
    const input = parseTxtToLines(INPUT_PATH)
    const actual = solution(input)
    assert.notEqual(actual, 322385) // Incorrect
  })
})
