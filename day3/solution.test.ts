import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { parseTxtToLines } from '../prompt_helpers'
const INPUT_PATH = './day3/input.txt'

import { solution, part2 } from './solution'

describe('Day 3', () => {
  it('should return the result expected from the prompt', () => {
    const mock = [
      '467..114..',
      '...*......',
      '..35..633.',
      '......#...',
      '617*......',
      '.....+.58.',
      '..592.....',
      '......755.',
      '...$.*....',
      '.664.598..',
    ]
    const actual = solution(mock)
    assert.equal(actual, 4361)
  })

  it('should produce the correct part# for each of these cases', () => {
    const mocks = [
      { input: ['123...', '...#..'], expected: 123 },
      { input: ['+34+....', '....16..'], expected: 50 },
      { input: ['......5', '......+'], expected: 5 },
      { input: ['22.5..5', '......+'], expected: 5 },
      { input: ['......5', '.....5+'], expected: 10 },
      { input: ['...1000', '......+'], expected: 1000 },
      { input: ['......5', '..5...+'], expected: 5 },
      { input: ['......5', '20+...+'], expected: 25 },
    ]
    mocks.forEach(mock =>
      assert.equal(solution(mock.input), mock.expected, `Mock: ${mock.input}`),
    )
  })

  it('should return a solution for the provide input', () => {
    const input = parseTxtToLines(INPUT_PATH)
    const actual = solution(input)
    assert.notEqual(actual, 322385) // Part numbers are not unique.
    assert.equal(actual, 538046)
  })
})

describe.only('Day 3, Part 2', () => {
  it('should return the correct sum of gear ratios for the mock schematic', () => {
    const mock = [
      '467..114..',
      '...*......',
      '..35..633.',
      '......#...',
      '617*......',
      '.....+.58.',
      '..592.....',
      '......755.',
      '...$.*....',
      '.664.598..',
    ]
    const actual = part2(mock)
    assert.equal(actual, 467835)
  })

  it('should return a solution for the provide input', () => {
    const input = parseTxtToLines(INPUT_PATH)
    const actual = part2(input)
    assert.notEqual(actual, 3679697)
  })
})
