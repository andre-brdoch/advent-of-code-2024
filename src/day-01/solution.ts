type Columns = [number[], number[]]
type Pairs = [number, number][]

export function solvePt1(input: string): any {
  const columns = parseFile(input)
  const pairs = pairColumns(columns)
  const distances = getDistances(pairs)
  return sum(distances)
}

export function solvePt2(input: string): number {
  const columns = parseFile(input)
  return getSimilarityScore(columns)
}

export function getSimilarityScore(columns: Columns): number {
  const [colLeft, colRight] = columns
  return colLeft.reduce((result, ln) => {
    const hits = getTimesIncluded(colRight, ln)
    const increase = hits * ln
    return result + increase
  }, 0)
}

export function getTimesIncluded(numbers: number[], targetNumber: number): number {
  return numbers.filter((n) => n === targetNumber).length
}

export function sum(numbers: number[]): number {
  return numbers.reduce((result, current) => result + current, 0)
}

export function getDistances(pairs: Pairs): number[] {
  return pairs.map((pair) => {
    const [lower, higher] = pair.sort()
    return higher - lower
  })
}

export function pairColumns(columns: Columns): Pairs {
  const [colLeft, colRight] = sortColumns(columns)
  return colLeft.map((_, i) => [colLeft[i], colRight[i]])
}

export function sortColumns(columns: Columns): Columns {
  const [colLeft, colRight] = columns
  return [colLeft.sort(), colRight.sort()]
}

export function parseFile(file: string): Columns {
  const startVal: Columns = [[], []]
  return file.split('\n').reduce(([resultLeft, resultRight], line) => {
    const [left, right] = line.split(/\s\s\s/).map((n) => Number(n))
    return [
      [...resultLeft, left],
      [...resultRight, right],
    ]
  }, startVal)
}
