export type Spot = number | '.'

export function solvePt1(input: string): number {
  const parsed = parseFile(input)
  const unCondensed = unCondense(parsed)
  const moved = moveBlocks(unCondensed)
  const checksum = getChecksum(moved, true)
  return checksum
}

export function solvePt2(input: string): number {
  const parsed = parseFile(input)
  const unCondensed = unCondense(parsed)
  const moved = moveFiles(unCondensed)
  const checksum = getChecksum(moved, false)
  return checksum
}

export function getChecksum(moved: Spot[], breakIfEmpty: boolean): number {
  let result = 0
  for (let i = 0; i <= moved.length - 1; i += 1) {
    const n = moved[i]
    const isFree = n === '.'
    if (isFree) {
      if (breakIfEmpty) break
      else continue
    }
    const add = n * i
    result += add
  }
  return result
}

export function moveFiles(unCondensed: Spot[]): Spot[] {
  let result: Spot[] = unCondensed
  let nextRightIndex: number | undefined
  let isDone = false

  let lastId = getLastId(unCondensed)
  while (!isDone) {
    const [newResult, rightIndex, newIsDone] = moveFile(result, nextRightIndex, lastId)
    result = newResult
    nextRightIndex = rightIndex
    isDone = newIsDone
    lastId -= 1
  }
  return result
}

function getLastId(unCondensed: Spot[]): number {
  for (let i = unCondensed.length - 1; i >= 0; i -= 1) {
    const n = unCondensed[i]
    const isFree = n === '.'
    if (!isFree) {
      return Number(n)
    }
  }
  throw new Error('all are free')
}

export function moveBlocks(unCondensed: Spot[]): Spot[] {
  let result: Spot[] = unCondensed
  let isDone = false
  while (!isDone) {
    const [newResult, newIsDone] = moveBlock(result)
    result = newResult
    isDone = newIsDone
  }
  return result
}

export function moveFile(
  unCondensed: Spot[],
  lastRightIndex?: number,
  lastId?: number
): [result: Spot[], lastRightIndex: number, isDone: boolean] {
  const result = [...unCondensed]
  let rightStart: number | undefined
  let rightEnd: number | undefined
  let spot: Spot | undefined
  for (let i = lastRightIndex ?? unCondensed.length - 1; i >= 0; i -= 1) {
    const char = unCondensed[i]
    const isFree = char === '.'
    if (spot != null && char !== spot) {
      break
    } else if (!isFree && (lastId == null || char <= lastId)) {
      if (rightEnd == null) rightEnd = i
      rightStart = i
      spot = char
    }
  }
  if (rightStart == null || rightEnd == null) throw new Error('right is missing')
  const rightSize = rightEnd - rightStart + 1
  let leftStart: number | undefined
  let leftEnd: number | undefined
  for (let i = 0; i <= (rightStart ?? unCondensed.length - 1); i += 1) {
    const char = unCondensed[i]
    const isFree = char === '.'
    if (isFree) {
      if (leftStart == null) leftStart = i
      leftEnd = i
    } else if (leftStart != null && leftEnd != null) {
      const leftSize = leftEnd - leftStart + 1
      const fits = leftSize >= rightSize
      if (fits) {
        break
      } else {
        leftStart = undefined
        leftEnd = undefined
      }
    } else {
      leftStart = undefined
      leftEnd = undefined
    }
  }
  if (leftStart == null || leftEnd == null) {
    const nextRightStart = rightStart - 1
    return [unCondensed, nextRightStart, nextRightStart < 0]
  }

  const emptySpots = Array.from(Array(rightSize).keys()).map(() => '.' as const)
  const removed = result.splice(rightStart, rightSize, ...emptySpots)
  result.splice(leftStart, rightSize, ...removed)
  return [result, rightStart - 1, false]
}

export function moveBlock(unCondensed: Spot[]): [result: Spot[], isDone: boolean] {
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
  const result = [...unCondensed]
  result[leftIndex] = unCondensed[rightIndex]
  result[rightIndex] = '.'
  return [result, false]
}

export function stringToArray(str: string): Spot[] {
  return str.split('').map((char) => (char === '.' ? char : Number(char)))
}

export function arrayToString(arr: Spot[]): string {
  return arr.join('')
}

export function unCondense(mapDisc: number[]): Spot[] {
  const result: Spot[] = []
  let currentId = 0
  for (let i = 0; i <= mapDisc.length - 1; i += 1) {
    const n = mapDisc[i]
    const isFree = i % 2 !== 0
    const add = isFree ? '.' : currentId
    for (let j = 0; j <= n - 1; j += 1) {
      result.push(add)
    }
    if (!isFree) currentId += 1
  }
  return result
}

export function parseFile(file: string): number[] {
  return file.split('').map((str) => Number(str))
}
