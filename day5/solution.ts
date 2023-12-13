export const solution = (input: string[]): number => {
  const seeds = collectSeeds(input[0])
  const maps = collectMaps(input.slice(1))

  const locationNumbers = seeds.map(seed =>
    maps.reduce(
      (mappedValue, map) => matchSourceToDestination(mappedValue, map),
      seed,
    ),
  )

  return Math.min(...locationNumbers)
}

function collectSeeds(line: string): number[] {
  return line
    .slice('seeds: '.length)
    .split(' ')
    .map(num => parseInt(num))
}

function collectMaps(input: string[]): Record<string, string>[] {
  return input.reduce<Record<string, string>[]>((maps, line) => {
    if (!line.length) {
      return maps
    }
    if (line.includes('map:')) {
      return maps.concat({})
    } else {
      const [dest, source, range] = line.split(' ').map(num => parseInt(num))
      maps[maps.length - 1][`${source}-${source + range - 1}`] = `${dest}-${
        dest + range - 1
      }`

      return maps
    }
  }, [])
}

// Finds the key that matches the source and returns the destination number
function matchSourceToDestination(
  source: number,
  map: Record<string, string>,
): number {
  const mappedSource = Object.entries(map).reduce<number | null>(
    (match, [src, dest]) => {
      if (match) return match

      const [srcStart, srcEnd] = src.split('-').map(n => parseInt(n))
      if (source >= srcStart && source <= srcEnd) {
        const [destStart] = dest.split('_').map(n => parseInt(n))
        const difference = Math.abs(source - srcStart)
        return destStart + difference
      }
      return match
    },
    null,
  )

  return mappedSource ?? source
}
