import { Coord } from '../utils/coordinates'

const WALL = '#' as const
const BOX = 'O' as const
const EMPTY = '.' as const
const PLAYER = '@' as const
const UP = '^' as const
const RIGHT = '>' as const
const BOTTOM = 'v' as const
const LEFT = '<' as const

export type Cell = typeof WALL | typeof BOX | typeof EMPTY
export type Map = Cell[][]
export type Instruction = typeof UP | typeof RIGHT | typeof BOTTOM | typeof LEFT

const vectorByInstruction: Record<Instruction, Coord> = {
  [UP]: { x: 0, y: -1 },
  [RIGHT]: { x: 1, y: 0 },
  [BOTTOM]: { x: 0, y: 1 },
  [LEFT]: { x: -1, y: 0 },
}

export function solvePt1(input: string): number {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): number {
  const parsed = parseFile(input)
}

export function parseFile(file: string): {
  map: Map
  startPosition: Coord
  instructions: Instruction[]
} {
  const [mapStr, instructionStr] = file.split('\n\n')
  let startPosition: Coord | undefined
  const map = mapStr.split('\n').map((line, y) => {
    const cells: Cell[] = line.split('').map((str, x) => {
      if (str === PLAYER) {
        // we remember player location and replace it with an empty space on the map
        startPosition = { x, y }
        return EMPTY
      }
      if (!isValidSymbol(str)) throw new Error(`Invalid symbol: ${str}`)
      return str
    })
    return cells
  })
  if (!startPosition) throw new Error('No player symbol found on map')
  const instructions: Instruction[] = instructionStr.split('').map((str) => {
    if (!isValidInstruction(str)) throw new Error(`Invalid instruction: ${str}`)
    return str
  })
  return { map, startPosition, instructions }
}

export function isValidSymbol(str: string): str is Cell {
  return str === WALL || str === BOX || str === EMPTY
}

export function isValidInstruction(str: string): str is Instruction {
  return str in vectorByInstruction
}
