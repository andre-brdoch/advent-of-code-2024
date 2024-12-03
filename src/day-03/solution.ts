import { getSum } from '../utils/array'

export function solvePt1(input: string): number {
  const parsed = parseFile(input)
  return sumMul(parsed)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function sumMul(mulStrings: string[]): number {
  const multiplied = mulStrings.map(mul)
  return getSum(multiplied)
}

export function mul(mulString: string): number {
  const regex = /(\d{1,3}),(\d{1,3})/
  const match = mulString.match(regex)
  if (match == null) throw new Error('No match found')
  const [, aStr, bStr] = match
  return Number(aStr) * Number(bStr)
}

export function parseFile(file: string): string[] {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g
  const matched = file.matchAll(regex)
  const arr = [...matched].map((m) => m[0])
  return arr
}
