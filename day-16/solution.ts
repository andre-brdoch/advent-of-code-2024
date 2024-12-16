import consola from 'consola'
import { addCoords, Coord } from '../utils/coordinates'

export const WALL = '#' as const
export const FREE = '.' as const
export const START = 'S' as const
export const END = 'E' as const

const COST_MOVEMENT = 1
const COST_ROTATE = 1000

export const UP = '^' as const
export const RIGHT = '>' as const
export const BOTTOM = 'v' as const
export const LEFT = '<' as const
const DIRECTIONS = [UP, RIGHT, BOTTOM, LEFT] as const

export type Token = typeof WALL | typeof FREE | typeof START | typeof END
export type Direction = typeof UP | typeof RIGHT | typeof BOTTOM | typeof LEFT
export interface Position extends Coord {
  direction: Direction
}

const VECTOR_BY_DIRECTION: Record<Direction, Coord> = {
  [UP]: { x: 0, y: -1 },
  [RIGHT]: { x: 1, y: 0 },
  [BOTTOM]: { x: 0, y: 1 },
  [LEFT]: { x: -1, y: 0 },
}
const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
  [UP]: BOTTOM,
  [RIGHT]: LEFT,
  [BOTTOM]: UP,
  [LEFT]: RIGHT,
}

export function solvePt1(input: string): number {
  const map = parseFile(input)
  return findCostForShortestWay(map)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export class PriorityQueue<T> {
  private sortedValues: { value: T; priority: number }[] = []

  public add(value: T, priority: number): void {
    for (let i = 0; i <= this.sortedValues.length - 1; i += 1) {
      const current = this.sortedValues[i]
      if (priority < current.priority) {
        this.sortedValues.splice(i, 0, { value, priority })
        return
      }
    }
    this.sortedValues.push({ value, priority })
  }

  public get(): T | null {
    const hit = this.sortedValues.shift()
    return hit?.value ?? null
  }

  public get length() {
    return this.sortedValues.length
  }
}

export function findCostForShortestWay(map: Token[][]): number {
  const queue = new PriorityQueue<Position>()
  const startPosition: Position = { ...findToken(map, START), direction: RIGHT }
  const startKey = stringifyPosition(startPosition)
  queue.add(startPosition, 0)
  const cameFrom: Record<string, Position | null> = { [startKey]: null }
  const costSoFar: Record<string, number> = { [startKey]: 0 }
  let result: number | undefined

  while (queue.length > 0) {
    const currentPos = queue.get()
    if (currentPos == null) throw new Error('Not possible')
    const currentKey = stringifyPosition(currentPos)
    const current = map[currentPos.y][currentPos.x]
    if (current === END) {
      consola.success('found end')
      result = costSoFar[currentKey]
      break
    }
    const neighbors = getNeighbors(map, currentPos)
    for (let i = 0; i <= neighbors.length - 1; i += 1) {
      const nextPos = neighbors[i]
      const nextKey = stringifyPosition(nextPos)
      const newCost = costSoFar[currentKey] + getCost(currentPos, nextPos)
      if (!(nextKey in costSoFar) || newCost < costSoFar[nextKey]) {
        costSoFar[nextKey] = newCost
        queue.add(nextPos, newCost)
        cameFrom[nextKey] = currentPos
      }
    }
  }
  if (result == null) throw new Error('No end in sight!')
  return result
}

export function getNeighbors(map: Token[][], currentPosition: Position): Position[] {
  const result: Position[] = []
  for (let i = 0; i <= DIRECTIONS.length - 1; i += 1) {
    const dir = DIRECTIONS[i]
    if (OPPOSITE_DIRECTIONS[dir] === currentPosition.direction) {
      // no point in going backwards
      continue
    }
    const vector = VECTOR_BY_DIRECTION[dir]
    const nextPos = addCoords(currentPosition, vector)
    const next = map[nextPos.y][nextPos.x]
    if (next === WALL || next === START) continue
    result.push({ ...nextPos, direction: dir })
  }
  return result
}

export function getCost(posA: Position, posB: Position): number {
  let cost = COST_MOVEMENT
  if (posA.direction === OPPOSITE_DIRECTIONS[posB.direction]) cost += COST_ROTATE * 2
  if (posA.direction !== posB.direction) cost += COST_ROTATE
  return cost
}

export function findToken(map: Token[][], token: Token): Coord {
  for (let y = 0; y <= map.length - 1; y += 1) {
    for (let x = 0; x <= map[0].length - 1; x += 1) {
      if (map[y][x] === token) return { x, y }
    }
  }
  throw new Error(`Token does not exist: ${token}`)
}

export function stringifyPosition(pos: Position): string {
  return `${pos.x}/${pos.y}/${pos.direction}`
}

export function parseFile(file: string): Token[][] {
  return file.split('\n').map((line) =>
    line.split('').map((token) => {
      if (!isToken(token)) throw new Error(`No a valid token: ${token}`)
      return token
    })
  )
}

export function isToken(str: string): str is Token {
  return str === WALL || str === FREE || str === START || str === END
}
