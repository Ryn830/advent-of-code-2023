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
export const solution = (input: string[]): any => {
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
  if (grid[r].length < c) return false
  return true
}

// Returns true if a position is not a number or a '.'
function positionContainsSymbol(grid: string[], position: number[]) {
  const [r, c] = position
  return /[^\d\.]/.test(grid[r].charAt(c))
}
