import * as fs from 'fs'
const INPUT_PATH = './day3/input.txt'

export const parseTxtToLines = (path: string): string[] =>
  fs.readFileSync(path, { encoding: 'utf-8' }).split('\n')
/**
  Example grid:
    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..

    114 & 58 aren't parts
    Return sum of all part#s
 */

/**
 * For each number:
 *   trace it's perimeter
 *     if the perimeter contains a symbol, add it to a set
 *     if not move on to the next number
 */
export const solution = (input: string[]): number => {
  const numberPositions = input
    .map((line, row) => parseLineForNumbersWithPositions(row, line))
    .flat()

  const positionsToCheck: [number, number[][]][] = numberPositions.reduce<
    [number, number[][]][]
  >((numbers, [number, positions]) => {
    return numbers.concat([
      [
        number,
        positions
          .map(([r, c]) => getParimeterIndicies(r, c))
          .flat()
          .filter(([r, c]) => isValidPosition(input, r, c)),
      ],
    ])
  }, [])

  const partNumbers = positionsToCheck
    .filter(([_, positions]) =>
      positions.some(position => positionContainsSymbol(input, position)),
    )
    .reduce((sum, [number, _]) => sum + number, 0)

  return partNumbers
}

function parseLineForNumbersWithPositions(row: number, line: string) {
  let i = 0
  let current: [string, number[][]] = ['', []]
  let result: [number, number[][]][] = []
  while (i <= line.length) {
    if (/\d/.test(line[i])) {
      current[0] = current[0].length ? current[0] + line[i] : line[i]
      current[1] = current[1].concat([[row, i]])
    } else {
      if (current[0].length) {
        result = result.concat([[parseInt(current[0]), current[1]]])
        current = ['', []]
      }
    }
    i++
  }
  return result
}

function getParimeterIndicies(r: number, c: number) {
  return [
    [r - 1, c - 1],
    [r - 1, c],
    [r - 1, c + 1],
    [r, c - 1],
    [r, c + 1],
    [r + 1, c - 1],
    [r + 1, c],
    [r + 1, c + 1],
  ]
}

function isValidPosition(grid: string[], r: number, c: number) {
  if (r < 0 || c < 0) return false
  if (!grid[r]) return false
  if (grid[r].length <= c) return false
  return true
}

// Returns true if a position is not a number or a '.'
function positionContainsSymbol(grid: string[], position: number[]) {
  const [r, c] = position
  return /[^\d\.]/.test(grid[r].charAt(c))
}

/**
  Example grid:
    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..

    Gears are identified by '*' adjacent to exactly 2 numbers
    [467, 35] and [755, 598] are gears in this schematic
    16345(467 * 35) + 451490(755 * 589) = 467835
 */

/**
 * Collect the position(s) of all numbers
 * Collect the position of all '*'
 * For each *:
 *   trace it's perimeter
 *     if a position with the star's perimeter is a number, search through all number positions and add the matching
 *      number position record to an set w/ the key being the stringified positions
 *     Add the sets to an array of star sets
 *   Filter the array to sets with size 2
 *   Reduce over array to get result
 */
export const part2 = (input: string[]): number => {
  const numberPositions = input
    .map((line, row) => parseLineForNumbersWithPositions(row, line))
    .flat()
  const starPositions = input
    .map((line, row) => parseLineForStarPositions(row, line))
    .filter(line => line.length > 0)
    .map(line =>
      line.map(([r, c]) =>
        getParimeterIndicies(r, c).filter(([r, c]) =>
          isValidPosition(input, r, c),
        ),
      ),
    )
  const gears = starPositions.reduce((acc, star) => {
    const numbers = new Set()
    star.forEach(positions => {
      positions.forEach(p => {
        const [r, c] = p
        numberPositions.forEach(([num, numPositions]) => {
          const stringPosition = numPositions
            .map(position => position.join())
            .join(';')
          if (stringPosition.includes(`${r},${c}`)) {
            numbers.add(`${stringPosition}=${num}`)
          }
        })
      })
    })
    if (numbers.size === 2) {
      const values: number[] = ([...numbers.values()] as string[]).map(value =>
        parseInt(value.split('=')[1]),
      )
      return acc.concat(values.reduce((acc, value) => acc * value))
    }
    return acc
  }, [])

  return gears.reduce((sum, gear) => sum + gear, 0)
}

function parseLineForStarPositions(row, line) {
  return line.split('').reduce((stars, char, col) => {
    if (/\*/.test(char)) {
      return stars.concat([[row, col]])
    }
    return stars
  }, [])
}

export const part2_2 = (input: string[]): number => {
  const stars: Record<string, string[]> = input
    .map((line, row) => parseLineForStarPositions(row, line))
    .flat()
    .reduce((acc, position) => {
      let [r, c] = position
      r = r < 10 ? `0${r}` : r
      c = c < 10 ? `0${c}` : c
      return Object.assign({}, acc, {
        [`${r},${c}`]: getParimeterIndicies(r, c)
          .filter(([row, col]) => isValidPosition(input, row, col))
          .map(p => p.join()),
      })
    }, {})
  const numberMap = createNumberMap(input)

  return Object.values(stars)
    .map(perimeter =>
      perimeter
        .map(position =>
          Object.keys(numberMap).filter(key => key.includes(position)),
        )
        .flat()
        .reduce((set, numKey) => set.add(numKey), new Set<string>()),
    )
    .filter(set => set.size === 2)
    .map(set => {
      return [...set.values()].reduce(
        (acc, numKey) => acc * numberMap[numKey],
        1,
      )
    })
    .reduce((sum, value) => sum + value, 0)
}

// Returns true if a position is not a number or a '.'
function positionContainsStar(grid: string[], position: number[]) {
  const [r, c] = position
  return grid[r].charAt(c) === '*'
}

function createNumberMap(grid: string[]): Record<string, number> {
  const numberMap = grid.reduce((acc, line, rowIndex) => {
    const numbers = parseLineForNumberPositions(rowIndex, line)
    return { ...acc, ...numbers }
  }, {})
  return numberMap
}

function parseLineForNumberPositions(
  row: number,
  line: string,
): Record<string, number> {
  let i = 0
  let current: [string, string] = ['', '']
  let result: Record<string, number> = {}
  let rowString = row < 10 ? `0${row}` : `${row}`
  while (i <= line.length) {
    if (/\d/.test(line[i])) {
      const colString = i < 10 ? `0${i}` : `${i}`
      current[0] = current[0].length ? current[0] + line[i] : line[i]
      current[1] = current[1].length
        ? `${current[1]};${rowString},${colString}`
        : `${rowString},${colString}`
    } else {
      if (current[0].length) {
        result = Object.assign({}, result, {
          [current[1]]: parseInt(current[0]),
        })
        current = ['', '']
      }
    }
    i++
  }
  return result
}

export const part2_3 = (input: string[]): number => {
  const result: number[] = []
  input.forEach((line, row) => {
    line.split('').forEach((char, col) => {
      if (/\*/.test(char)) {
        const { up, down, left, right } = getValidPositions(input, [row, col])
        const gears = [
          ...parseAboveOrBelowStar(input[row - 1], up),
          ...parseAboveOrBelowStar(input[row + 1], down),
          ...[
            left && /\d/.test(input[row].charAt(left))
              ? findNumber(input[row], left, -1)
              : [],
            right && /\d/.test(input[row].charAt(right))
              ? findNumber(input[row], right, 1)
              : [],
          ].flat(),
        ]
        if (gears.length === 2) {
          result.push(gears[0] * gears[1])
        }
      }
    })
  })
  return result.reduce((sum, ratio) => sum + ratio, 0)
}

// 0  1  2  3  4  5  6  7  8  9 10 11
// 8  .  .  .  9  0  *  1  2  .  .  .

// ..78........
// ..*....60...
// 78.........9
export function parseAboveOrBelowStar(
  line: string,
  positions: number[],
): number[] {
  const hasDigits = positions.map(p => /\d/.test(line.charAt(p)))
  if (hasDigits.every(v => v === false)) {
    return []
  }
  if (hasDigits.every(v => v === true)) {
    return [findNumber(line, positions[0], 1)]
  }
  if (hasDigits.length === 2) {
    const numbers = positions.reduce<number[]>((acc, position) => {
      const left = findNumber(line, position, -1)
      const right = findNumber(line, position, 1)
      return acc.concat(isNaN(left) ? 0 : left, isNaN(right) ? 0 : right)
    }, [])
    return [Math.max(...numbers)]
  }
  if (!hasDigits[0] && hasDigits[1] && !hasDigits[2]) {
    return [findNumber(line, positions[1], -1)]
  }
  if (hasDigits[0] && !hasDigits[1] && !hasDigits[2]) {
    return [findNumber(line, positions[0], -1)]
  }
  if (hasDigits[0] && hasDigits[1] && !hasDigits[2]) {
    return [findNumber(line, positions[1], -1)]
  }
  if (!hasDigits[0] && !hasDigits[1] && hasDigits[2]) {
    return [findNumber(line, positions[positions.length - 1], 1)]
  }
  if (!hasDigits[0] && hasDigits[1] && hasDigits[2]) {
    return [findNumber(line, positions[1], 1)]
  }
  if (hasDigits[0] && !hasDigits[1] && hasDigits[2]) {
    const left = findNumber(line, positions[0], -1)
    const right = findNumber(line, positions[positions.length - 1], 1)
    return [left, right]
  }
  return []
}

function findNumber(line: string, position: number, direction: number): number {
  let result = ''
  if (Math.sign(direction) === -1) {
    for (let i = position; /[\d]/.test(line[i]) && i >= 0; i--) {
      result = `${line[i]}${result}`
    }
  } else if (Math.sign(direction) === 1) {
    for (let i = position; /[\d]/.test(line[i]) && i <= line.length; i++) {
      result = `${result}${line[i]}`
    }
  }
  return parseInt(result)
}

type Perimeter = {
  up: number[]
  down: number[]
  left: number | null
  right: number | null
}

function getValidPositions(
  grid: string[],
  position: [number, number],
): Perimeter {
  const [row, col] = position
  let perimeter: Perimeter = { up: [], down: [], left: null, right: null }
  perimeter.up = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
  ]
    .filter(([r, c]) => isValidPosition(grid, r, c))
    .map(([_, c]) => c)
  perimeter.down = [
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ]
    .filter(([r, c]) => isValidPosition(grid, r, c))
    .map(([_, c]) => c)
  perimeter.left = isValidPosition(grid, row, col - 1) ? col - 1 : null
  perimeter.right = isValidPosition(grid, row, col + 1) ? col + 1 : null

  return perimeter
}
