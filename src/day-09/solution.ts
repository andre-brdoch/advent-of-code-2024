export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
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
  console.log('left', leftIndex, 'right', rightIndex)

  if (leftIndex === rightIndex) return [unCondensed, true]
  const result =
    unCondensed.substring(0, leftIndex) +
    unCondensed[rightIndex] +
    unCondensed.substring(leftIndex + 1, rightIndex) +
    '.' +
    unCondensed.substring(rightIndex + 1)
  return [result, false]
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
