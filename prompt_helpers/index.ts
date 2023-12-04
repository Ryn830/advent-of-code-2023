import * as fs from 'fs'

export const parseTxtToLines = (path: string): string[] =>
  fs.readFileSync(path, { encoding: 'utf-8' }).split('\n')
