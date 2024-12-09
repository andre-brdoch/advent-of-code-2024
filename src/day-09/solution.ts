export function solvePt1(input: string): number {
  const parsed = parseFile(input)
  const unCondensed = unCondense(parsed.slice(0, 10))
  console.log(unCondensed)
  // const moved = moveBlocks(unCondensed)
  // const checksum = getChecksum(moved)
  // return checksum
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
  let isDone = false
  while (!isDone) {
    const [newResult, newIsDone] = moveBlock(result)
    result = newResult
    isDone = newIsDone
  }
  return result
}

export function moveBlock(unCondensed: string): [result: string, isDone: boolean] {
  const leftIndex = unCondensed.indexOf('.')
  let rightIndex: number = leftIndex
  if (leftIndex === -1) return [unCondensed, true]
  for (let i = unCondensed.length - 1; i >= 0 && i >= leftIndex; i -= 1) {
    const char = unCondensed[i]
    const isFree = char === '.'
    if (!isFree) {
      rightIndex = i
      break
    }
  }
  if (leftIndex === rightIndex) return [unCondensed, true]
  let result = replaceCharAt(unCondensed, leftIndex, unCondensed[rightIndex])
  result = replaceCharAt(result, rightIndex, '.')
  return [result, false]
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
    const add = isFree ? '.' : currentId
    for (let j = 0; j <= n - 1; j += 1) {
      result += add
    }
    if (!isFree) currentId += 1
  }
  return result
}

export function parseFile(file: string): number[] {
  return file.split('').map((str) => Number(str))
}
