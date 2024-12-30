import { getSum } from '../utils/array'
import {
  addCoords,
  Coord,
  DIRECTIONS,
  stringifyCoord,
  VECTOR_BY_DIRECTION,
} from '../utils/coordinates'
import { Queue } from '../utils/queue'

export type TypeDict = Record<string, Coord[]>

export function solvePt1(input: string): number {
  const map = parseFile(input)
  const regionsByType = getRegionsByType(map)
  return getTotalCost(map, regionsByType)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function getRegionsByType(map: string[][]): Record<string, Coord[][]> {
  const result: Record<string, Coord[][]> = {}
  const visited: Record<string, true> = {}
  for (let y = 0; y <= map.length - 1; y += 1) {
    for (let x = 0; x <= map[0].length - 1; x += 1) {
      const queue = new Queue<Coord>()
      const type = map[y][x]
      queue.add({ x, y })
      const region: Coord[] = []
      while (queue.length) {
        const current = queue.get()
        if (!current) break
        const currentType = map[current.y][current.x]
        const key = stringifyCoord(current)
        if (key in visited || currentType !== type) continue
        visited[key] = true
        region.push(current)
        const startVal: Coord[] = []
        DIRECTIONS.forEach((dir) => {
          const vector = VECTOR_BY_DIRECTION[dir]
          const neighbor = addCoords(current, vector)
          const sameType = map[neighbor.y]?.[neighbor.x] === type
          if (!sameType) return
          queue.add(neighbor)
        }, startVal)
      }
      if (!(type in result)) result[type] = []
      if (region.length) result[type].push(region)
    }
  }
  return result
}

export function getTotalCost(map: string[][], regionsDict: Record<string, Coord[][]>): number {
  return Object.keys(regionsDict).reduce(
    (result, type) => result + getCostForRegions(map, regionsDict[type]),
    0
  )
}

export function getCostForRegions(map: string[][], regions: Coord[][]): number {
  const costs = regions.map((region) => {
    const area = region.length
    const perimeters = getSum(region.map((point) => getPlotsPerimeter(map, point)))
    return area * perimeters
  })
  return getSum(costs)
}

export function getPlotsPerimeter(map: string[][], point: Coord): number {
  const type = map[point.y][point.x]
  let perimeter = 0
  for (let i = 0; i <= DIRECTIONS.length - 1; i += 1) {
    const dir = DIRECTIONS[i]
    const vector = VECTOR_BY_DIRECTION[dir]
    const targetPoint = addCoords(point, vector)
    const targetType = map[targetPoint.y]?.[targetPoint.x]
    if (type !== targetType) perimeter += 1
  }
  return perimeter
}

export function parseFile(file: string): string[][] {
  return file.split('\n').map((line) => line.split(''))
}
