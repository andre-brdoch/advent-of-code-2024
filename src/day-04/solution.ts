export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function countXmasInSet(set: string[]): number {
  let total = 0
  const sequence = [null, 'X', 'M', 'A', 'S']
  let progress = 0
  for (let i = 0; i <= set.length - 1; i += 1) {
    if (set[i] === sequence[progress + 1]) {
      progress += 1
      if (progress === sequence.length - 1) {
        total += 1
        progress = 0
      }
    } else if (set[i] === sequence[1]) {
      progress = 1
    } else {
      progress = 0
    }
  }
  return total
}

export function parseFile(file: string): string[][] {
  return file
    .split('\n')
    .filter((line) => line)
    .map((line) => line.split(''))
}
