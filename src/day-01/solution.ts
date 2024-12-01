type Columns = [number[], number[]]

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

// export function solvePt2(input: string): number {
//   const parsed = parseFile(input)
// }

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
