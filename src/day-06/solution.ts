export const GUARD_UP = '^' as const
export const GUARD_DOWN = 'v' as const
export const GUARD_LEFT = '<' as const
export const GUARD_RIGHT = '>' as const
export const FREE = '.' as const
export const VISITED = 'X' as const
export const BARRIER = '#' as const

export type Guard = typeof GUARD_UP | typeof GUARD_DOWN | typeof GUARD_LEFT | typeof GUARD_RIGHT
export type Cell = Guard | typeof FREE | typeof BARRIER | typeof VISITED
interface Point {
  x: number
  y: number
}

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function getGuardPosition(map: Cell[][]): Point {
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

export function parseFile(file: string): Cell[][] {
  return file
    .split('\n')
    .filter((line) => line)
    .map((line) => line.split('') as Cell[])
}
