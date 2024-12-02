import consola from 'consola'

type Direction = 1 | -1

export function solvePt1(input: string): number {
  const parsed = parseFile(input)
  const save = parsed.filter(reportIsSafe)
  return save.length
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function reportIsSafe(report: number[]): boolean {
  let direction: Direction | undefined
  for (let i = 0; i < report.length; i += 1) {
    if (i === 0) continue
    const prev = report[i - 1]
    const current = report[i]
    if (!isSafeDistance(prev, current)) {
      consola.error('unsafe report', report, 'not save distance', prev, current)
      return false
    }
    const newDirection = current > prev ? 1 : -1
    if (i === 1) {
      direction = newDirection
    }
    if (direction && newDirection !== direction) {
      consola.error('unsafe report', report, 'wrong dir, before', direction, ', now', newDirection)
      return false
    }
  }
  // consola.success('save report', report)
  return true
}

export function isSafeDistance(a: number, b: number): boolean {
  const [lower, higher] = [a, b].sort((aa, bb) => aa - bb)
  const diff = higher - lower
  const result = diff >= 1 && diff <= 3
  if (!result) console.log(lower, higher, diff)
  return result
}

export function parseFile(file: string): number[][] {
  return file
    .split('\n')
    .map((line) =>
      line
        .split(/\s/)
        .map((c) => parseInt(c))
        .filter((n) => !isNaN(n))
    )
    .filter((line) => line.length > 1)
}
