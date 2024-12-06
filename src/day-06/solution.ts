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
export type Vector = Point

const VECTOR_BY_GUARD: Record<Guard, Vector> = {
  '^': { x: 0, y: -1 },
  'v': { x: 0, y: 1 },
  '<': { x: -1, y: 0 },
  '>': { x: 1, y: 0 },
}

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function moveGuard(map: Cell[][], history: Point[]): { history: Point[]; guard: Guard } {
  const currentPosition = history[history.length - 1]
  const guard = getCell(map, currentPosition)
  if (!isGuard(guard)) throw new Error('Not a guard!')
  const moveVector = VECTOR_BY_GUARD[guard]
  const newTargetPosition = addPoints(currentPosition, moveVector)
  const targetCell = getCell(map, newTargetPosition)
  console.log(`Target ${newTargetPosition.x}/${newTargetPosition.y}: ${targetCell}`)
  if (isFree(targetCell)) {
    return {
      history: [...history, newTargetPosition],
      guard,
    }
  }
  return {
    history,
    guard: turnGuard(guard),
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

export function parseFile(file: string): Cell[][] {
  return file
    .split('\n')
    .filter((line) => line)
    .map((line) => line.split('') as Cell[])
}
