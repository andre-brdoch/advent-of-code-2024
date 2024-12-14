export interface Coord {
  x: number
  y: number
}

export function stringifyCoord(coord: Coord): string {
  return `${coord.x}/${coord.y}`
}

export function addCoords(a: Coord, b: Coord): Coord {
  const x = a.x + b.x
  const y = a.y + b.y
  return { x, y }
}
