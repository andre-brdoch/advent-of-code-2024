export const GUARD_UP = '^' as const
export const GUARD_DOWN = 'v' as const
export const GUARD_LEFT = '<' as const
export const GUARD_RIGHT = '>' as const
export const FREE = '.' as const
export const BARRIER = '#' as const

export type Guard = typeof GUARD_UP | typeof GUARD_DOWN | typeof GUARD_LEFT | typeof GUARD_RIGHT
export type Cell = Guard | typeof FREE | typeof BARRIER

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function parseFile(file: string): Cell[][] {
  return file
    .split('\n')
    .filter((line) => line)
    .map((line) => line.split('') as Cell[])
}
