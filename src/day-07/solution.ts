export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function parseFile(file: string): { result: number; parts: number[] }[] {
  return file.split('\n').map((line) => {
    const [resultStr, partsStr] = line.split(': ')
    const result = Number(resultStr)
    const parts = partsStr.split(' ').map((partStr) => Number(partStr))
    return { result, parts }
  })
}
