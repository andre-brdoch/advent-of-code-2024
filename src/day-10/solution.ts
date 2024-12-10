export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function parseFile(file: string): number[][] {
  return file.split('\n').map((line) => line.split('').map((char) => Number(char)))
}
