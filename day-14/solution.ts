import { appendFileSync } from 'fs'
import { addCoords, stringifyCoord } from '../utils/coordinates'
import { getTypedKeys } from '../utils/object'
import { join } from 'path'
import { createFileSync, removeFileSync } from '../utils/fs'

export interface Coord {
  x: number
  y: number
}
export interface Robot {
  vector: Coord
  history: Coord[]
}
export type GridSizes = [width: number, height: number]
export type Quadrant = Robot[]
export type Quadrants = [Quadrant, Quadrant, Quadrant, Quadrant]

export function solvePt1(input: string, gridSizes: GridSizes): number {
  const robots = parseFile(input)
  robots.forEach((robot) => {
    moveRobotNTimes(robot, 100, gridSizes)
  })
  const quadrants = getRobotsPerQuadrant(robots, gridSizes)
  const safetyFactor = getSafetyFactor(quadrants)
  return safetyFactor
}

export function solvePt2(input: string, gridSizes: GridSizes, outputFile: string): number {
  const robots = parseFile(input)
  const n = 12000
  const path = join(__dirname, 'output', outputFile)
  removeFileSync(path)
  createFileSync(path)

  for (let i = 0; i <= n - 1; i += 1) {
    robots.forEach((robot) => {
      moveRobotNTimes(robot, 1, gridSizes)
    })
    if ((i - 24) % 103 === 0 || (i - 61) % 101 === 0) {
      const content = `\n============= n=${i} =============\n` + visualize(robots, gridSizes)
      appendFileSync(path, content)
    }
  }
}

export function visualize(robots: Robot[], gridSizes: GridSizes): string {
  const robotsByCoordinate = getRobotsByCoordinate(robots)
  let result = ''
  for (let y = 0; y <= gridSizes[1] - 1; y += 1) {
    for (let x = 0; x <= gridSizes[0] - 1; x += 1) {
      const key = stringifyCoord({ x, y })
      if (key in robotsByCoordinate) {
        result += robotsByCoordinate[key].length
      } else {
        result += '.'
      }
    }
    if (y < gridSizes[1] - 1) result += '\n'
  }
  return result
}

export function getRobotsByCoordinate(robots: Robot[]): Record<string, Robot[]> {
  const result: Record<string, Robot[]> = {}
  robots.forEach((robot) => {
    const current = robot.history[robot.history.length - 1]
    const key = stringifyCoord(current)
    if (!(key in result)) result[key] = []
    result[key].push(robot)
  })
  return result
}

export function getSafetyFactor(quadrants: Quadrants): number {
  return quadrants.map((q) => q.length).reduce((result, current) => result * current, 1)
}

export function getRobotsPerQuadrant(robots: Robot[], gridSizes: GridSizes): Quadrants {
  const xMiddle = (gridSizes[0] - 1) / 2
  const yMiddle = (gridSizes[1] - 1) / 2
  const result: Quadrants = [[], [], [], []]
  for (let i = 0; i <= robots.length - 1; i += 1) {
    const robot = robots[i]
    const { x, y } = robot.history[robot.history.length - 1]
    let targetQIndex: number | undefined
    if (y < yMiddle) {
      if (x < xMiddle) targetQIndex = 0
      else if (x > xMiddle) targetQIndex = 1
    } else if (y > yMiddle) {
      if (x < xMiddle) targetQIndex = 2
      else if (x > xMiddle) targetQIndex = 3
    }
    if (targetQIndex == null) {
      // lies on middle axis, ignore
      continue
    }
    result[targetQIndex].push(robot)
  }
  return result
}

export function moveRobotNTimes(robot: Robot, n: number, gridSizes: GridSizes): void {
  for (let i = 0; i < n; i += 1) {
    const next = getNextCoord(robot, gridSizes)
    robot.history.push(next)
  }
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
