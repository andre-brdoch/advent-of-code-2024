export interface Coord {
  x: number
  y: number
}

export const UP = '^' as const
export const RIGHT = '>' as const
export const DOWN = 'v' as const
export const LEFT = '<' as const
export const DIRECTIONS = [UP, RIGHT, DOWN, LEFT] as const

export type Direction = (typeof DIRECTIONS)[number]

export const VECTOR_BY_DIRECTION: Record<Direction, Coord> = {
  [UP]: { x: 0, y: -1 },
  [RIGHT]: { x: 1, y: 0 },
  [DOWN]: { x: 0, y: 1 },
  [LEFT]: { x: -1, y: 0 },
}
export const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
  [UP]: DOWN,
  [RIGHT]: LEFT,
  [DOWN]: UP,
  [LEFT]: RIGHT,
}

export function stringifyCoord(coord: Coord): string {
  return `${coord.x}/${coord.y}`
}

export function unStringifyCoord(coordKey: string): Coord {
  const [x, y] = coordKey.split('/')
  return { x: Number(x), y: Number(y) }
}

export function getUniqueCoordinates(coords: Coord[]): Coord[] {
  const strings = coords.map(stringifyCoord)
  const set = new Set(strings)
  return Array.from(set).map(unStringifyCoord)
}

export function addCoords(a: Coord, b: Coord): Coord {
  const x = a.x + b.x
  const y = a.y + b.y
  return { x, y }
}

export function subtractCords(a: Coord, b: Coord): Coord {
  const x = a.x - b.x
  const y = a.y - b.y
  return { x, y }
}

export function vectorBetween(a: Coord, b: Coord): Coord {
  return { x: b.x - a.x, y: b.y - a.y }
}

export function coordsMatch(a: Coord, b: Coord): boolean {
  return a.x === b.x && a.y === b.y
}

export function areCoordsAdjacent(a: Coord, b: Coord): boolean {
  return DIRECTIONS.some((dir) => {
    const vector = VECTOR_BY_DIRECTION[dir]
    const target = addCoords(a, vector)
    return coordsMatch(target, b)
  })
}

export function isDirection(str: string): str is Direction {
  return str === UP || str === RIGHT || str === DOWN || str === LEFT
}

export function isHorizontal(direction: Direction): direction is typeof LEFT | typeof RIGHT {
  return direction === LEFT || direction === RIGHT
}

export function isVertical(direction: Direction): direction is typeof UP | typeof DOWN {
  return direction === UP || direction === DOWN
}
