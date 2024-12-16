import { Coord, stringifyCoord } from '../utils/coordinates'

export const WALL = '#' as const
export const FREE = '.' as const
export const START = 'S' as const
export const END = 'E' as const

export type Token = typeof WALL | typeof FREE | typeof START | typeof END

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export class PriorityQueue<T> {
  private sortedValues: { value: T; priority: number }[] = []

  public add(value: T, priority: number): void {
    for (let i = 0; i <= this.sortedValues.length - 1; i += 1) {
      const current = this.sortedValues[i]
      if (priority > current.priority) {
        this.sortedValues.splice(i, 0, { value, priority })
        return
      }
    }
    this.sortedValues.push({ value, priority })
  }

  public get(): { value: T; priority: number } | null {
    const hit = this.sortedValues.shift()
    return hit ?? null
  }

  public get length() {
    return this.sortedValues.length
  }
}

export function findShortestWay(map: Token[][]): void {
  const queue = new PriorityQueue<Coord>()
  const startPosition = findToken(map, START)
  const startKey = stringifyCoord(startPosition)
  queue.add(startPosition, 0)
  const cameFrom: Record<string, Coord | null> = { [startKey]: null }
  const costSoFar: Record<string, number> = { [startKey]: 0 }

  while (queue.length > 0) {
    const { value: currentPos, priority: currentPrio } = queue.get()
    const currentKey = stringifyCoord(currentPos)
    if (currentPos == null) throw new Error('Not possible')
    const current = map[currentPos.y][currentPos.x]
    if (current === END) break
    const neighbors = []
    for (let i = 0; i <= neighbors.length - 1; i += 1) {
      const next = neighbors[i]
      const nextKey = stringifyCoord(next.position)
      const newCost = costSoFar[currentPos] + next.cost
    }
  }
}

export function findToken(map: Token[][], token: Token): Coord {
  for (let y = 0; y <= map.length - 1; y += 1) {
    for (let x = 0; x <= map[0].length - 1; x += 1) {
      if (map[y][x] === token) return { x, y }
    }
  }
  throw new Error(`Token does not exist: ${token}`)
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
