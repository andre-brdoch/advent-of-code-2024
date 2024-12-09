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
  let leftIndexLatest = 0
  let rightIndexLatest = result.length - 1
  all: while (true) {
    let leftIndex = leftIndexLatest
    let rightIndex = rightIndexLatest
    left: for (let i = leftIndexLatest; i <= rightIndexLatest; i += 1) {
      const char = result[i]
      const isFree = char === '.'
      if (isFree) {
        console.log('found left', i, 'right', rightIndexLatest)

        leftIndex = i
        leftIndexLatest = i

        break left
      } else if (i >= rightIndex) break left
    }
    if (leftIndex === -1) {
      break all
    }
    right: for (let i = rightIndexLatest; i >= 0 && i >= leftIndex; i -= 1) {
      const char = result[i]
      console.log('irght', i, char)
      const isFree = char === '.'
      if (!isFree) {
        rightIndex = i
        rightIndexLatest = i
        console.log('found right', i, 'left', leftIndexLatest)
        break right
      } else if (i <= leftIndex) break
    }
    if (leftIndex >= rightIndex) {
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
