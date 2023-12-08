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
