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

const getParimeterIndicies = (r: number, c: number) => [
  [r - 1, c - 1],
  [r - 1, c],
  [r - 1, c + 1],
  [r, c - 1],
  [r, c + 1],
  [r + 1, c - 1],
  [r + 1, c],
  [r + 1, c + 1],
]
/**
 * For each number:
 *   trace it's perimeter
 *     if the perimeter contains a symbol, add it to a set
 *     if not move on to the next number
 */
export const solution = (input: string[]): number => {
  return 0
}

function findNumbers(grid: string[]) {
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

const test = findNumbers(mock)
console.log(`test:`, test)
console.log(`test:`, Object.keys(test).length)
