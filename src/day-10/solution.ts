import { getSum } from '../utils/array'

interface Coord {
  x: number
  y: number
}
type Cell = number | '.'

export function solvePt1(input: string): number {
  const map = parseFile(input)
  const startingPoints = getStartingPoints(map)
  const reachableTops = startingPoints.map((point) => analyzeTrailHeadBreadthFirst(map, point))
  const scores = reachableTops.map((tops) => tops.length)
  return getSum(scores)
}

export function solvePt2(input: string): number {
  const map = parseFile(input)
  const startingPoints = getStartingPoints(map)
  console.log('startingPoints', startingPoints.length, startingPoints)
  const reachableTops = startingPoints.map((point) => analyzeTrailHeadUniquePaths(map, point))
  console.log('reachableTops', reachableTops.length, reachableTops)
  const scores = reachableTops.map((tops) => tops.length)
  console.log('scores', scores.length, scores)
  return getSum(scores)
}

export function removeDuplicateCoord(coords: Coord[]): Coord[] {
  const set = new Set(coords.map(stringifyCoord))
  return Array.from(set).map(parseCoord)
}

export function analyzeTrailHeadUniquePaths(map: Cell[][], start: Coord): Coord[] {
  const queue = [start]
  const reachableTops: Coord[] = []
  while (queue.length) {
    const current = queue.shift()
    if (!current) continue
    if (map[current.y][current.x] === 9) {
      reachableTops.push(current)
    } else {
      const neighbors = getNeighbors(map, current)
      queue.push(...neighbors)
    }
  }
  return reachableTops
}

export function analyzeTrailHeadBreadthFirst(map: Cell[][], start: Coord): Coord[] {
  const queue = [start]
  const visited = new Set<string>()
  const reachableTops: Coord[] = []
  while (queue.length) {
    const current = queue.shift()
    if (!current) continue
    const currentKey = stringifyCoord(current)
    if (!visited.has(currentKey)) {
      visited.add(currentKey)
      if (map[current.y][current.x] === 9) {
        reachableTops.push(current)
      } else {
        const neighbors = getNeighbors(map, current)
        queue.push(...neighbors)
      }
    }
  }
  return reachableTops
}

export function getNeighbors(map: Cell[][], coord: Coord): Coord[] {
  const vectors: Coord[] = [
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ]
  const currentHeight = map[coord.y][coord.x]
  if (currentHeight === '.') return []
  return vectors
    .map((vector) => ({ x: coord.x + vector.x, y: coord.y + vector.y }))
    .filter(({ x, y }) => {
      const val = map[y]?.[x]
      return val != null && val === currentHeight + 1
    })
}

export function getStartingPoints(map: Cell[][]): Coord[] {
  const startVal: Coord[] = []
  return map.reduce((result, row, y) => {
    const rowStartVal: Coord[] = []
    const add = row.reduce((rowResult, val, x) => {
      if (val === 0) {
        rowResult.push({ x, y })
      }
      return rowResult
    }, rowStartVal)
    result.push(...add)
    return result
  }, startVal)
}

function parseCoord(coordStr: string): Coord {
  // x/7
  const [x, y] = coordStr.split('/')
  return { x: Number(x), y: Number(y) }
}

function stringifyCoord(coord: Coord): string {
  return `${coord.x}/${coord.y}`
}

export function parseFile(file: string): Cell[][] {
  return file
    .split('\n')
    .map((line) => line.split('').map((char) => (char === '.' ? char : Number(char))))
}
