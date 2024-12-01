export function getSum(numbers: number[]): number {
  return numbers.reduce((result, current) => result + current, 0)
}
