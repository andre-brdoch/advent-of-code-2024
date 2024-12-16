import {
  addCoords,
  Coord,
  Direction,
  DIRECTIONS,
  getUniqueCoordinates,
  isDirection,
  OPPOSITE_DIRECTIONS,
  RIGHT,
  VECTOR_BY_DIRECTION,
} from '../utils/coordinates'

export const WALL = '#' as const
export const FREE = '.' as const
export const START = 'S' as const
export const END = 'E' as const

const START_DIRECTION = RIGHT

const COST_MOVEMENT = 1
const COST_ROTATE = 1000

export type Token = typeof WALL | typeof FREE | typeof START | typeof END
export interface Position extends Coord {
  direction: Direction
}
export type CameFrom = Record<string, Set<string>>

export function solvePt1(input: string): number {
  const map = parseFile(input)
  const [cost] = findShortestWays(map, 'single')
  return cost
}

export function solvePt2(input: string): number {
  const map = parseFile(input)
  const [, cameFrom, endPosition] = findShortestWays(map)
  const allBestPaths = reconstructPaths(cameFrom, [endPosition])
  return countUniqueCoords(allBestPaths)
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

export function findShortestWays(
  map: Token[][],
  mode: 'all' | 'single' = 'all'
): [lowestCost: number, cameFrom: CameFrom, endPosition: Position] {
  const queue = new PriorityQueue<Position>()
  const startPosition: Position = { ...findToken(map, START), direction: START_DIRECTION }
  let endPosition: Position | undefined
  const startKey = stringifyPosition(startPosition)
  queue.add(startPosition, 0)
  const cameFrom: CameFrom = { [startKey]: new Set([]) }
  const costSoFar: Record<string, number> = { [startKey]: 0 }
  let lowestCost: number | undefined

  while (queue.length > 0) {
    const currentPos = queue.get()
    if (currentPos == null) throw new Error('Not possible')
    const currentKey = stringifyPosition(currentPos)
    const currentCost = costSoFar[currentKey]
    if (lowestCost && currentCost > lowestCost) continue
    const current = map[currentPos.y][currentPos.x]
    if (current === END) {
      if (!lowestCost) {
        lowestCost = costSoFar[currentKey]
        endPosition = currentPos
      }
      if (mode === 'single') break
      else continue
    }
    const neighbors = getNeighbors(map, currentPos)
    for (let i = 0; i <= neighbors.length - 1; i += 1) {
      const nextPos = neighbors[i]
      const nextKey = stringifyPosition(nextPos)
      const newCost = currentCost + getCost(currentPos, nextPos)
      if (
        (!(nextKey in costSoFar) || newCost <= costSoFar[nextKey]) &&
        // no point in continuing if already over budget
        (!lowestCost || newCost <= lowestCost)
      ) {
        costSoFar[nextKey] = newCost
        queue.add(nextPos, newCost)
        if (!(nextKey in cameFrom)) cameFrom[nextKey] = new Set([])
        cameFrom[nextKey].add(stringifyPosition(currentPos))
      }
    }
  }
  if (lowestCost == null || !endPosition) throw new Error('No end in sight!')
  return [lowestCost, cameFrom, endPosition]
}

export function reconstructPaths(cameFrom: CameFrom, positions: Position[]): Position[][] {
  const earliest = positions[0]
  const earliestKey = stringifyPosition(earliest)
  const ancestors = Array.from(cameFrom[earliestKey]).map(unStringifyPosition)
  if (ancestors.length === 0) {
    return [positions]
  }
  return ancestors.flatMap((a) => reconstructPaths(cameFrom, [a, ...positions]))
}

function countUniqueCoords(paths: Position[][]): number {
  const flatPaths = paths.flatMap((p) => p)
  const unique = getUniqueCoordinates(flatPaths)
  return unique.length
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
  else if (posA.direction !== posB.direction) cost += COST_ROTATE
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

export function unStringifyPosition(posStr: string): Position {
  const [x, y, dir] = posStr.split('/')
  if (!isDirection(dir)) throw new Error(`Not a direction: ${dir}`)
  return { x: Number(x), y: Number(y), direction: dir }
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
