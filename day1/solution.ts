export const day1Solution = (input: string[]): number =>
  input.reduce((sum, line) => {
    const nums = line
      .split('')
      .map(item => parseInt(item, 10))
      .filter(v => !isNaN(v))

    return sum + parseInt(`${nums[0]}${nums[nums.length - 1]}`, 10)
  }, 0)

const numbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]
const wordToNum = new Map([
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9'],
])

export const day1Part2Solution = (input: string[]): number =>
  input.reduce((sum, line) => {
    const digitStrings: string[] = []
    while (line.length) {
      if (line[0].match(/\d/)) {
        digitStrings.push(line[0])
        line = line.slice(1, line.length)
      } else {
        const match = numbers.filter(num => line.startsWith(num))
        if (match.length) {
          digitStrings.push(wordToNum.get(match[0]) || '')
          line = line.slice(match[0].length, line.length)
        } else {
          line = line.slice(1, line.length)
        }
      }
    }

    return (
      sum +
      parseInt(`${digitStrings[0]}${digitStrings[digitStrings.length - 1]}`, 10)
    )
  }, 0)
