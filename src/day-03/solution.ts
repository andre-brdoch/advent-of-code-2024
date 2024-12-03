import { getSum } from '../utils/array'

export function solvePt1(input: string): number {
  const parsed = parseFile(input)
  return sumMul(parsed)
}

export function solvePt2(input: string): number {
  const parsed = parseFileWithInstructions(input)
  const filtered = filterMuls(parsed)
  return sumMul(filtered)
}

export function sumMul(mulStrings: string[]): number {
  const multiplied = mulStrings.map(mul)
  return getSum(multiplied)
}

export function filterMuls(instructions: string[]): string[] {
  const startVal: string[] = []
  let isDisabled = false
  return instructions.reduce((result, current) => {
    if (current === "don't()") {
      isDisabled = true
    } else if (current === 'do()') {
      isDisabled = false
    } else if (!isDisabled) {
      return [...result, current]
    }
    return result
  }, startVal)
}

export function mul(mulString: string): number {
  const regex = /(\d{1,3}),(\d{1,3})/
  const match = mulString.match(regex)
  if (match == null) throw new Error(`No match found: ${mulString}`)
  const [, aStr, bStr] = match
  return Number(aStr) * Number(bStr)
}

export function parseFileWithInstructions(file: string): string[] {
  const regex = /(mul\(\d{1,3},\d{1,3}\))|(don't\(\))|(do\(\))/g
  const matched = file.match(regex)
  if (!matched) throw new Error('No parse match found')
  return matched
}

export function parseFile(file: string): string[] {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g
  const matched = file.matchAll(regex)
  const arr = [...matched].map((m) => m[0])
  return arr
}
