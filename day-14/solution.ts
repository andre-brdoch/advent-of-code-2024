import { addCoords, stringifyCoord } from '../utils/coordinates'
import { getTypedKeys } from '../utils/object'

export interface Coord {
  x: number
  y: number
}

export interface Robot {
  vector: Coord
  history: Coord[]
}

export type GridSizes = [width: number, height: number]

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function getNextCoord(robot: Robot, gridSizes: GridSizes): Coord {
  const lastCoord = robot.history[robot.history.length - 1]
  const next = addCoords(lastCoord, robot.vector)
  getTypedKeys(next).forEach((axis) => {
    const gridSize = gridSizes[axis === 'x' ? 0 : 1]
    const tooSmall = next[axis] < 0
    const tooLarge = next[axis] >= gridSize
    if (!tooSmall && !tooLarge) return
    // teleport to other size
    if (tooSmall) {
      next[axis] = gridSize + next[axis]
    } else if (tooLarge) {
      next[axis] -= gridSize
    }
  })
  return next
}

// NOT NEEDED - Was hoping to find robots with identical vectors, so that I could reuse calculations between them. Sadly, there is none. Vectors might be aligning anyways, would need to check that too.
export function findIdenticalVectors(robots: Robot[]): Record<string, Robot[]> {
  const result: Record<string, Robot[]> = {}
  robots.forEach((robot) => {
    const key = stringifyCoord(robot.vector)
    const reverseKey = stringifyCoord({ x: robot.vector.x * -1, y: robot.vector.y * -1 })
    ;[key, reverseKey].forEach((k) => {
      if (!(k in result)) {
        result[k] = []
      }
      result[k] = [robot]
    })
  })
  return result
}

export function parseFile(file: string): Robot[] {
  return file.split('\n').map((line) => {
    const [startCoord, vector] = line.split(' ').map((part) => {
      const [xStr, yStr] = part.replace(/^[pv]=/, '').split(',')
      return { x: Number(xStr), y: Number(yStr) }
    })
    return { vector, history: [startCoord] }
  })
}
