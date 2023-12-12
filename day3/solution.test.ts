import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { parseTxtToLines } from '../prompt_helpers'
const INPUT_PATH = './day3/input.txt'

import {
  solution,
  part2,
  part2_2,
  parseAboveOrBelowStar,
  part2_3,
} from './solution'

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

describe.skip('Day 3, Part 2', () => {
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
    assert.equal(actual, 3679697) // Incorrect
  })
})

describe.skip('Day 3, Part 2 2nd try', () => {
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
    const actual = part2_2(mock)
    assert.equal(actual, 467835)
  })

  it('should produce the correct result for the reddit edge case test', () => {
    const mock = [
      '12.......*..',
      '+.........34',
      '.......-12..',
      '..78........',
      '..*....60...',
      '78.........9',
      '.5.....23..$',
      '8...90*12...',
      '............',
      '2.2......12.',
      '.*.........*',
      '1.1..503+.56',
    ]
    // 78 * 78 + 12 * 56
    const actual = part2_2(mock)
    assert.equal(actual, 6756)
  })

  it('should return a solution for the provide input', () => {
    const input = parseTxtToLines(INPUT_PATH)
    const actual = part2_2(input)
    assert.notEqual(actual, 53993463) // Incorrect. Missed an equal?
    assert.notEqual(actual, 54576054) // Also incorrect.
  })
})

describe('parseAboveOrBelowStar', () => {
  it('should produce the correct number for each of the possible variations of positions', () => {
    const mocks = [
      { line: '123...', positions: [0, 1], expected: [123] },
      { line: '123...', positions: [1, 2, 3], expected: [123] },
      { line: '123...', positions: [2, 3, 4], expected: [123] },
      { line: '123.456', positions: [2, 3, 4], expected: [123, 456] },
      { line: '123.456', positions: [3, 4, 5], expected: [456] },
      { line: '123+456', positions: [3, 4, 5], expected: [456] },
      { line: '...456', positions: [3, 4, 5], expected: [456] },
      { line: '...456', positions: [0, 1], expected: [] },
    ]
    mocks.forEach(mock => {
      const actual = parseAboveOrBelowStar(mock.line, mock.positions)
      assert.deepEqual(
        actual,
        mock.expected,
        `${mock.line}: ${JSON.stringify(mock.positions)}. Expected: ${
          mock.expected
        } !== Actual: ${actual}`,
      )
    })
  })
})

describe.only('Day 3 Part2 3rd type', () => {
  it('should return the correct value for the mock and the reddit mock', () => {
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
    const actual = part2_3(mock)
    assert.equal(actual, 467835)

    const mock1 = [
      '12.......*..',
      '+.........34',
      '.......-12..',
      '..78........',
      '..*....60...',
      '78.........9',
      '.5.....23..$',
      '8...90*12...',
      '............',
      '2.2......12.',
      '.*.........*',
      '1.1..503+.56',
    ]
    // 78 * 78 + 12 * 56 = 6756
    const actual1 = part2_3(mock1)
    assert.equal(actual1, 6756)
  })

  it('should return the correct answer for the input', () => {
    const input = parseTxtToLines(INPUT_PATH)
    const actual = part2_3(input)
    assert.equal(actual, 81709807)
  })
})
