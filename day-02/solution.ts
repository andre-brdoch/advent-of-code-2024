type Direction = 1 | -1

export function solvePt1(input: string): number {
  const parsed = parseFile(input)
  const saveReports = parsed.filter(reportIsSafe)
  return saveReports.length
}

export function solvePt2(input: string): number {
  const parsed = parseFile(input)
  const saveReports = parsed.filter(reportIsSafeIfRemovingAtMostOne)
  return saveReports.length
}

export function reportIsSafeIfRemovingAtMostOne(report: number[]): boolean {
  const isSafe = reportIsSafe(report)
  if (isSafe) return true
  const alternateReports = possibleReportsWhenRemovingOne(report)
  return alternateReports.some(reportIsSafe)
}

export function possibleReportsWhenRemovingOne(report: number[]): number[][] {
  return report.map((_, i) => {
    const copy = report.slice()
    copy.splice(i, 1)
    return copy
  })
}

export function reportIsSafe(report: number[]): boolean {
  let direction: Direction | undefined
  for (let i = 1; i < report.length; i += 1) {
    const prev = report[i - 1]
    const current = report[i]
    const newDirection = current > prev ? 1 : -1
    if (i === 1) {
      direction = newDirection
    }
    const validDistance = isSafeDistance(prev, current)
    const validDirection = newDirection === direction
    if (!validDistance || !validDirection) {
      return false
    }
  }
  return true
}

export function isSafeDistance(a: number, b: number): boolean {
  const [lower, higher] = [a, b].sort((aa, bb) => aa - bb)
  const diff = higher - lower
  const result = diff >= 1 && diff <= 3
  return result
}

export function parseFile(file: string): number[][] {
  return file
    .split('\n')
    .filter((line) => line)
    .map((line) =>
      line
        .split(/\s/)
        .filter((c) => c)
        .map((c) => parseInt(c))
    )
}
