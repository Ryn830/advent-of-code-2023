import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { parseTxtToLines } from '../prompt_helpers'
const INPUT_PATH = './day5/input.txt'

import { solution } from './solution'

describe('Day 4', () => {
  it('should return the result expected from the prompt', () => {
    const mock = [
      'seeds: 79 14 55 13',
      '',
      'seed-to-soil map:',
      '50 98 2',
      '52 50 48',
      '',
      'soil-to-fertilizer map:',
      '0 15 37',
      '37 52 2',
      '39 0 15',
      '',
      'fertilizer-to-water map:',
      '49 53 8',
      '0 11 42',
      '42 0 7',
      '57 7 4',
      '',
      'water-to-light map:',
      '88 18 7',
      '18 25 70',
      '',
      'light-to-temperature map:',
      '45 77 23',
      '81 45 19',
      '68 64 13',
      '',
      'temperature-to-humidity map:',
      '0 69 1',
      '1 0 69',
      '',
      'humidity-to-location map:',
      '60 56 37',
      '56 93 4',
    ]
    assert.equal(solution(mock), 35)
  })

  it('should return the correct result for the input', () => {
    const input = parseTxtToLines(INPUT_PATH)
    const actual = solution(input)
    assert.equal(actual, 309796150)
  })
})
