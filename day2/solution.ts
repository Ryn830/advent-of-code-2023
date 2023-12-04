const cubes = new Map([
  ['blue', 14],
  ['red', 12],
  ['green', 13],
])

export const solution = (input: string[]): number =>
  input
    .map(gameStr => {
      const [idStr, drawStr] = gameStr.split(':')
      const id = idStr.slice('Game '.length)
      return [id, drawStr]
    })
    .filter(([_, drawStr]) => {
      const draws = drawStr
        .split(';')
        .map(draw =>
          draw
            .split(',')
            .flat()
            .map(d => d.trim()),
        )
        .flat()
      return draws.every(draw => {
        const [count, color] = draw.split(' ')
        return cubes.get(color)! >= parseInt(count)
      })
    })
    .map(([id]) => parseInt(id))
    .reduce((sum, id) => sum + id, 0)

export const part2 = (input: string[]): number =>
  input
    .map(gameStr => {
      const [_, drawStr] = gameStr.split(':')
      const counts = drawStr
        .split(';')
        .map(draw =>
          draw
            .split(',')
            .flat()
            .map(d => d.trim()),
        )
        .flat()
        .reduce(
          (counts, draw) => {
            const [count, color] = draw.split(' ')
            counts[color] = counts[color].concat(parseInt(count))
            return counts
          },
          { red: [], green: [], blue: [] },
        )
      return Object.values(counts)
        .map(countForColor => Math.max(...countForColor))
        .reduce((acc, value) => acc * value, 1)
    })
    .reduce((total, value) => total + value, 0)
