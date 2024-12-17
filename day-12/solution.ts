import { getSum } from '../utils/array'
import {
  addCoords,
  areCoordsAdjacent,
  Coord,
  DIRECTIONS,
  stringifyCoord,
  VECTOR_BY_DIRECTION,
} from '../utils/coordinates'

export type TypeDict = Record<string, Coord[]>

export function solvePt1(input: string): any {
  const map = parseFile(input)
  const typeDict = getTypeDict(map)
  const allRegions = getAllRegions(typeDict)
  return getAllRegionCosts(map, allRegions)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function getAllRegions(typeDict: TypeDict): Coord[][] {
  return Object.keys(typeDict).flatMap((type) => divideTypeIntoRegions(typeDict[type]))
}

export function divideTypeIntoRegions(typePoints: Coord[]): Coord[][] {
  const lookup = typePoints.reduce(
    (result, point) => {
      const key = stringifyCoord(point)
      return { ...result, [key]: point }
    },
    {} as Record<string, Coord>
  )
  // find all neighbors for every type point
  const typePointsWithNeighbors: { typePoint: Coord; neighbors: Cord[] }[] = []
  for (let i = 0; i <= typePoints.length - 1; i += 1) {
    const typePoint = typePoints[i]
    const neighbors = DIRECTIONS.map((dir) => {
      const vector = VECTOR_BY_DIRECTION[dir]
      const neighbor = addCoords(typePoint, vector)
      const neighborKey = stringifyCoord(neighbor)
      return neighborKey
    })
      .filter((neighborKey) => neighborKey in lookup)
      .map((neighborKey) => lookup[neighborKey])
    typePointsWithNeighbors.push({ typePoint, neighbors })
    // console.log('typePoint', typePoint)

    // regions: for (let j = 0; j <= regions.length - 1; j += 1) {
    //   const region = regions[j]
    //   // console.log('region', region)

    //   const isPartOfRegion = region.some((point) => areCoordsAdjacent(point, typePoint))
    //   // console.log(' ==== are adjacent', typePoint)

    //   if (isPartOfRegion) {
    //     region.push(typePoint)
    //     continue points
    //   }
    // }
    // regions.push([typePoint])
  }
  // group neighbors into regions
  const regions: Coord[][] = []
  while (typePointsWithNeighbors.length) {
    const current = typePointsWithNeighbors.shift()
  }
  return regions
  // const regions: Coord[][] = [[typePoints[0]]]
  // points: for (let i = 1; i <= typePoints.length - 1; i += 1) {
  //   const typePoint = typePoints[i]
  //   // console.log('typePoint', typePoint)

  //   regions: for (let j = 0; j <= regions.length - 1; j += 1) {
  //     const region = regions[j]
  //     // console.log('region', region)

  //     const isPartOfRegion = region.some((point) => areCoordsAdjacent(point, typePoint))
  //     // console.log(' ==== are adjacent', typePoint)

  //     if (isPartOfRegion) {
  //       region.push(typePoint)
  //       continue points
  //     }
  //   }
  //   regions.push([typePoint])
  // }
  // return regions
}

export function getAllRegionCosts(map: string[][], regions: Coord[][]): number {
  const costs = regions.map((region) => getRegionCost(map, region))
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

export function getTypeDict(map: string[][]): TypeDict {
  const dict: TypeDict = {}
  for (let y = 0; y <= map.length - 1; y += 1) {
    for (let x = 0; x <= map[0].length - 1; x += 1) {
      const type = map[y][x]
      if (!(type in dict)) dict[type] = []
      dict[type].push({ x, y })
    }
  }
  return dict
}

export function parseFile(file: string): string[][] {
  return file.split('\n').map((line) => line.split(''))
}
