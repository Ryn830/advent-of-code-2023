/**
  Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
  Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11

  - Column 1: Winning numbers
  - Column 2: Numbers you have

  - Determine how many winning numbers you have per card
  - Calculate how many points each card is worth.
    (0W = 0, 1W = 1, 2W = 2, 3W = 4, 4W = 8, 5W = 16)
  - Sum all the points together to get your result
 */

export const solution = (input: string[]): number => {
  return input
    .map(line => {
      const [winningNumbers, choosenNumbers] = line
        .slice(input[0].indexOf(':') + 1)
        .split('|')
        .map(numString =>
          numString
            .trim()
            .split(/\s+/)
            .map(num => parseInt(num)),
        )
      const matches = choosenNumbers.reduce(
        (matches, num) => matches + (winningNumbers.includes(num) ? 1 : 0),
        0,
      )

      return matches === 0 ? 0 : matches === 1 ? 1 : Math.pow(2, matches - 1)
    })
    .reduce((sum, points) => sum + points, 0)
}
