export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function getMinMax(
  numbers: number[],
  result: number
): [min: number, max: number, earlyExist: boolean] {
  let min = 0
  let max = 1
  let earlyExit = false
  for (let i = 0; i <= numbers.length - 1; i += 1) {
    const n = numbers[i]
    if (n !== 1) {
      min += n
      max *= n
    } else {
      min *= n
      max += n
    }
    if (min > result) {
      earlyExit = true
      break
    }
  }
  return [min, max, earlyExit]
}

export function parseFile(file: string): { result: number; parts: number[] }[] {
  return file.split('\n').map((line) => {
    const [resultStr, partsStr] = line.split(': ')
    const result = Number(resultStr)
    const parts = partsStr.split(' ').map((partStr) => Number(partStr))
    return { result, parts }
  })
}
