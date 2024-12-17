import { getSum } from '../utils/array'
import { addCoords, Coord, DIRECTIONS, VECTOR_BY_DIRECTION } from '../utils/coordinates'

type RegionsDict = Record<string, Coord[]>

export function solvePt1(input: string): any {
  const map = parseFile(input)
  const regionsDict = getRegionsDict(map)
  return getAllRegionCosts(map, regionsDict)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function getAllRegionCosts(map: string[][], regionsDict: RegionsDict): number {
  const costs = Object.keys(regionsDict).map((region) => getRegionCost(map, regionsDict[region]))
  return getSum(costs)
}

export function getRegionCost(map: string[][], regionPoints: Coord[]): number {
  const areaCost = regionPoints.length
  const perimeterCost = getRegionsPerimeter(map, regionPoints)
  return areaCost * perimeterCost
}

export function getRegionsPerimeter(map: string[][], regionPoints: Coord[]): number {
  const perimeters = regionPoints.map((point) => getPlotsPerimeter(map, point))
  return getSum(perimeters)
}

export function getPlotsPerimeter(map: string[][], point: Coord): number {
  const region = map[point.y][point.x]
  let perimeter = 0
  for (let i = 0; i <= DIRECTIONS.length - 1; i += 1) {
    const dir = DIRECTIONS[i]
    const vector = VECTOR_BY_DIRECTION[dir]
    const targetPoint = addCoords(point, vector)
    const targetRegion = map[targetPoint.y]?.[targetPoint.x]
    if (region !== targetRegion) perimeter += 1
  }
  return perimeter
}

export function getRegionsDict(map: string[][]): RegionsDict {
  const dict: RegionsDict = {}
  for (let y = 0; y <= map.length - 1; y += 1) {
    for (let x = 0; x <= map[0].length - 1; x += 1) {
      const region = map[y][x]
      if (!(region in dict)) dict[region] = []
      dict[region].push({ x, y })
    }
  }
  return dict
}

export function parseFile(file: string): string[][] {
  return file.split('\n').map((line) => line.split(''))
}
