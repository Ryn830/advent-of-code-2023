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
  const positionsToCheck: Record<string, number[][]> = Object.entries(
    findNumberPositions(input),
  ).reduce((numbers, [number, positions]) => {
    numbers[number] = positions
      .map(([r, c]) => getParimeterIndicies(r, c))
      .flat()
      .filter(([r, c]) => isValidPosition(input, r, c))
    return numbers
  }, {})

  const partNumbers = Object.entries(positionsToCheck)
    .filter(([_, positions]) =>
      positions.some(position => positionContainsSymbol(input, position)),
    )
    .reduce((sum, [number, _]) => sum + parseInt(number), 0)

  return partNumbers
}

function findNumberPositions(grid: string[]): Record<string, number[][]> {
  return grid
    .map((line, row) =>
      line
        .split(/\D/g)
        .filter(l => l !== '')
        .reduce((partIndices, value) => {
          partIndices[value] = Array.from({ length: value.length }).map(
            (_, y) => [row, line.indexOf(value) + y],
          )
          return partIndices
        }, {}),
    )
    .reduce((all, row) => ({ ...all, ...row }), {})
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
