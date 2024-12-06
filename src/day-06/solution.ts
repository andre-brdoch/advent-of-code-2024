export const GUARD_UP = '^' as const
export const GUARD_DOWN = 'v' as const
export const GUARD_LEFT = '<' as const
export const GUARD_RIGHT = '>' as const
export const FREE = '.' as const
export const VISITED = 'X' as const
export const BARRIER = '#' as const

export type Guard = typeof GUARD_UP | typeof GUARD_DOWN | typeof GUARD_LEFT | typeof GUARD_RIGHT
export type Cell = Guard | typeof FREE | typeof BARRIER | typeof VISITED
export interface Point {
  x: number
  y: number
}
export interface HistoryEntry extends Point {
  guard: Guard | null
}
export type Vector = Point

const VECTOR_BY_GUARD: Record<Guard, Vector> = {
  '^': { x: 0, y: -1 },
  'v': { x: 0, y: 1 },
  '<': { x: -1, y: 0 },
  '>': { x: 1, y: 0 },
}

export function solvePt1(input: string): number {
  const map = parseFile(input)
  const history = moveUntilConditionMeet(
    map,
    (history) => history[history.length - 1].guard == null
  )
  const historyNoDupes = removeDuplicatePositions(history)
  // need to remove final off-board position
  const result = historyNoDupes.length - 1
  return result
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function hasLoop(history: HistoryEntry[]): boolean {
  const latest = history[history.length - 1]
  const other = history.slice(0, history.length - 2)
  // we know it's a loop if the exact same history entry already exists
  return other.some(
    (entry) => entry.x === latest.x && entry.y === latest.y && entry.guard === latest.guard
  )
}

export function removeDuplicatePositions(history: Point[]): Point[] {
  const stringified = history.map((point) => `${point.x}/${point.y}`)
  const set = new Set(stringified)
  const stringifiedNoDupes = Array.from(set)
  return stringifiedNoDupes.map((str) => {
    const [x, y] = str.split('/').map((n) => Number(n))
    return { x, y }
  })
}

export function moveUntilConditionMeet(
  inputMap: Cell[][],
  conditionCb: (history: HistoryEntry[]) => boolean
): HistoryEntry[] {
  const { map, firstHistoryEntry } = removeGuardFromMap(inputMap)
  const history: HistoryEntry[] = [firstHistoryEntry]
  while (!conditionCb(history)) {
    const newHistoryEntry = moveGuard(map, history)
    // console.log('new entry', newHistoryEntry.x, newHistoryEntry.y, newHistoryEntry.guard)

    history.push(newHistoryEntry)
  }
  return history
}

export function moveGuard(map: Cell[][], history: HistoryEntry[]): HistoryEntry {
  const latestHistory = history[history.length - 1]
  if (latestHistory.guard == null) {
    throw new Error('Can not move guard that is already off map')
  }
  const moveVector = VECTOR_BY_GUARD[latestHistory.guard]
  const targetPosition = addPoints(latestHistory, moveVector)
  if (!isOnMap(map, targetPosition)) {
    // console.log(`Off board: ${targetPosition.x}/${targetPosition.y}`)
    return {
      ...targetPosition,
      guard: null,
    }
  }
  const targetCell = getCell(map, targetPosition)
  // console.log(`Target ${targetPosition.x}/${targetPosition.y}: ${targetCell}`)
  if (isFree(targetCell)) {
    return {
      ...targetPosition,
      guard: latestHistory.guard,
    }
  }
  return {
    ...latestHistory,
    guard: turnGuard(latestHistory.guard),
  }
}

export function turnGuard(guard: Guard): Guard {
  switch (guard) {
    case '^':
      return '>'
    case '>':
      return 'v'
    case 'v':
      return '<'
    case '<':
      return '^'
    default:
      throw new Error('No guard to rotate:', guard)
  }
}

export function addPoints(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y }
}

export function isSamePosition(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y
}

export function getCell(map: Cell[][], point: Point): Cell {
  return map[point.y][point.x]
}

export function findGuardPosition(map: Cell[][]): Point {
  for (let y = 0; y <= map.length - 1; y += 1) {
    for (let x = 0; x <= map[0].length - 1; x += 1) {
      if (isGuard(map[y][x])) {
        return { x, y }
      }
    }
  }
  throw new Error('No guard on the map!')
}

export function isGuard(cell: Cell): cell is Guard {
  return cell === GUARD_UP || cell === GUARD_DOWN || cell === GUARD_LEFT || cell === GUARD_RIGHT
}

export function isFree(cell: Cell): cell is typeof FREE | typeof VISITED {
  return cell === FREE || cell === VISITED
}

export function isOnMap(map: Cell[][], point: Point): boolean {
  return Boolean(map[point.y]?.[point.x])
}

export function removeGuardFromMap(map: Cell[][]): {
  map: Cell[][]
  firstHistoryEntry: HistoryEntry
} {
  const currentPosition = findGuardPosition(map)
  const guard = getCell(map, currentPosition)
  if (!isGuard(guard)) throw new Error('Not a guard :(')
  const firstHistoryEntry: HistoryEntry = { ...currentPosition, guard }
  const mapWithoutGuard = map.map((row, y) =>
    row.map((cell, x) => (x === currentPosition.x && y === currentPosition.y ? '.' : cell))
  )
  return { map: mapWithoutGuard, firstHistoryEntry }
}

export function parseFile(file: string): Cell[][] {
  return file
    .split('\n')
    .filter((line) => line)
    .map((line) => line.split('') as Cell[])
}
