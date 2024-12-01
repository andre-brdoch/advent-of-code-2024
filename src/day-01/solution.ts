type Columns = [number[], number[]]
type Pairs = [number, number][]

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

// export function solvePt2(input: string): number {
//   const parsed = parseFile(input)
// }

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
  return columns.map((c) => c.sort())
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
