export function solvePt1(input: string): number {
  const parsed = parseFile(input)
  const unCondensed = unCondense(parsed)
  const moved = moveBlocks(unCondensed)
  const checksum = getChecksum(moved)
  return checksum
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function getChecksum(moved: string): number {
  let result = 0
  for (let i = 0; i <= moved.length - 1; i += 1) {
    const n = moved[i]
    const isFree = n === '.'
    if (isFree) break
    const add = Number(n) * i
    result += add
  }
  return result
}

export function moveBlocks(unCondensed: string): string {
  let result: string = unCondensed
  all: while (true) {
    const leftIndex = result.indexOf('.')
    let rightIndex: number = leftIndex
    if (leftIndex === -1) {
      break all
    }
    single: for (let i = result.length - 1; i >= 0 && i >= leftIndex; i -= 1) {
      const char = result[i]
      const isFree = char === '.'
      if (!isFree) {
        rightIndex = i
        break single
      }
    }

    if (leftIndex === rightIndex) {
      break all
    }
    let newResult = replaceCharAt(result, leftIndex, result[rightIndex])
    newResult = replaceCharAt(newResult, rightIndex, '.')
    result = newResult
  }
  return result
}

function replaceCharAt(str: string, index: number, char: string): string {
  const result = str.substring(0, index) + char + str.substring(index + 1)
  return result
}

export function unCondense(mapDisc: number[]): string {
  let result = ''
  let currentId = 0
  for (let i = 0; i <= mapDisc.length - 1; i += 1) {
    const n = mapDisc[i]
    const isFree = i % 2 !== 0
    for (let j = 0; j <= n - 1; j += 1) {
      const add = isFree ? '.' : currentId
      result += add
    }
    if (!isFree) currentId += 1
  }
  return result
}

export function parseFile(file: string): number[] {
  return file.split('').map((str) => Number(str))
}
