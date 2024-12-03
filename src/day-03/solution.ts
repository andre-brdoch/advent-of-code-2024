export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function parseFile(file: string): string[] {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g
  const matched = file.matchAll(regex)
  const arr = [...matched].map((m) => m[0])
  return arr
}
