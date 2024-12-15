import { getSum } from '../utils/array'
import { addCoords, Coord } from '../utils/coordinates'

export const WALL = '#' as const
export const BOX = 'O' as const
export const EMPTY = '.' as const
export const PLAYER = '@' as const
export const UP = '^' as const
export const RIGHT = '>' as const
export const BOTTOM = 'v' as const
export const LEFT = '<' as const

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
  const { map, startPosition, instructions } = parseFile(input)
  let position = startPosition
  instructions.forEach((instruction) => {
    const [success, newPosition] = moveToken(map, PLAYER, position, instruction)
    if (success) position = newPosition
  })
  const boxCoordinates = getAllBoxCoordinates(map)
  const gpsValues = boxCoordinates.map((position) => getGps(map, position))
  return getSum(gpsValues)
}

export function solvePt2(input: string): number {
  const parsed = parseFile(input)
}

export function getAllBoxCoordinates(map: Map): Coord[] {
  const result: Coord[] = []
  for (let y = 0; y <= map.length - 1; y += 1) {
    for (let x = 0; x <= map[0].length - 1; x += 1) {
      if (map[y][x] === BOX) result.push({ x, y })
    }
  }
  return result
}

export function getGps(map: Map, position: Coord): number {
  return position.y * 100 + position.x
}

export function moveToken(
  map: Map,
  token: typeof PLAYER | typeof BOX,
  tokenPosition: Coord,
  instruction: Instruction
): [success: boolean, newTokenPosition: Coord] {
  const vector = vectorByInstruction[instruction]
  const nextCoord = addCoords(tokenPosition, vector)
  const next: Cell = map[nextCoord.y]?.[nextCoord.x]
  if (next === WALL) return [false, tokenPosition]
  if (next === EMPTY) {
    updateMap(map, nextCoord, tokenPosition, token)
    return [true, nextCoord]
  }
  // try moving boxes recursively
  const [success] = moveToken(map, next, nextCoord, instruction)
  if (success) {
    updateMap(map, nextCoord, tokenPosition, token)
    return [true, nextCoord]
  }
  return [false, tokenPosition]
}

function updateMap(
  map: Map,
  nextPosition: Coord,
  currentPosition: Coord,
  token: typeof PLAYER | typeof BOX
): void {
  map[nextPosition.y][nextPosition.x] = token === PLAYER ? EMPTY : BOX
  map[currentPosition.y][currentPosition.x] = EMPTY
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
      if (!isValidToken(str)) throw new Error(`Invalid token : ${str}`)
      return str
    })
    return cells
  })
  if (!startPosition) throw new Error('No player token found on map')
  const instructions: Instruction[] = instructionStr.split('\n').flatMap((instrLine) =>
    instrLine.split('').map((str) => {
      if (!isValidInstruction(str)) throw new Error(`Invalid instruction: ${str}`)
      return str
    })
  )

  return { map, startPosition, instructions }
}

// TYPE NARROWING

export function isValidToken(str: string): str is Cell {
  return str === WALL || str === BOX || str === EMPTY
}

export function isValidInstruction(str: string): str is Instruction {
  return str in vectorByInstruction
}

// FOR TESTING / VISUALIZING

export function stringifyMap(map: Map): string {
  let result = ''
  for (let y = 0; y <= map.length - 1; y += 1) {
    for (let x = 0; x <= map[0].length - 1; x += 1) {
      const token = map[y][x]
      result += token
    }
    if (y < map.length - 1) result += '\n'
  }
  return result
}
