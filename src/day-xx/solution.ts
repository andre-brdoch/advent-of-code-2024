export function solvePt1(input: string): number {
  const numbers = parseFile(input)
  return getSum(numbers)
}

export function solvePt2(input: string): number {
  const numbers = parseFile(input)
  const doubled = numbers.map((num) => num * 2)
  return getSum(doubled)
}

export function parseFile(file: string): number[] {
  return file.split('\n').map((line) => Number(line))
}

export function getSum(numbers: number[]): number {
  return numbers.reduce((result, number) => result + number, 0)
}
