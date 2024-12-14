import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import {
  getNextCoord,
  getRobotsPerQuadrant,
  GridSizes,
  moveRobotNTimes,
  parseFile,
  Robot,
  solvePt1,
  solvePt2,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-14', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  let gridSizesExample: GridSizes
  let gridSizesReal: GridSizes
  let robotsExample: Robot[]

  beforeEach(() => {
    gridSizesExample = [11, 7]
    gridSizesReal = [101, 103]
    robotsExample = [
      { vector: { x: 3, y: -3 }, history: [{ x: 0, y: 4 }] },
      { vector: { x: -1, y: -3 }, history: [{ x: 6, y: 3 }] },
      { vector: { x: -1, y: 2 }, history: [{ x: 10, y: 3 }] },
      { vector: { x: 2, y: -1 }, history: [{ x: 2, y: 0 }] },
      { vector: { x: 1, y: 3 }, history: [{ x: 0, y: 0 }] },
      { vector: { x: -2, y: -2 }, history: [{ x: 3, y: 0 }] },
      { vector: { x: -1, y: -3 }, history: [{ x: 7, y: 6 }] },
      { vector: { x: -1, y: -2 }, history: [{ x: 3, y: 0 }] },
      { vector: { x: 2, y: 3 }, history: [{ x: 9, y: 3 }] },
      { vector: { x: -1, y: 2 }, history: [{ x: 7, y: 3 }] },
      { vector: { x: 2, y: -3 }, history: [{ x: 2, y: 4 }] },
      { vector: { x: -3, y: -3 }, history: [{ x: 9, y: 5 }] },
    ]
  })

  describe('helpers', () => {
    it('parseFile()', () => {
      assert.deepEqual(parseFile(inputExample), robotsExample)
    })
    it('getNextCoord()', () => {
      const robot = { vector: { x: 2, y: -3 }, history: [{ x: 2, y: 4 }] }
      const next1 = { x: 4, y: 1 }
      assert.deepEqual(getNextCoord(robot, gridSizesExample), next1)
      robot.history.push(next1)
      const next2 = { x: 6, y: 5 }
      assert.deepEqual(getNextCoord(robot, gridSizesExample), next2)
      robot.history.push(next2)
      const next3 = { x: 8, y: 2 }
      assert.deepEqual(getNextCoord(robot, gridSizesExample), next3)
      robot.history.push(next3)
      const next4 = { x: 10, y: 6 }
      assert.deepEqual(getNextCoord(robot, gridSizesExample), next4)
      robot.history.push(next4)
      const next5 = { x: 1, y: 3 }
      assert.deepEqual(getNextCoord(robot, gridSizesExample), next5)
    })
    it('moveRobotNTimes()', () => {
      const start = { x: 2, y: 4 }
      // eslint-disable-next-line func-style
      const makeRobot = () => ({ vector: { x: 2, y: -3 }, history: [start] })
      const next1 = { x: 4, y: 1 }
      const next2 = { x: 6, y: 5 }
      const next3 = { x: 8, y: 2 }
      const next4 = { x: 10, y: 6 }
      const next5 = { x: 1, y: 3 }
      const robot1 = makeRobot()
      moveRobotNTimes(robot1, 1, gridSizesExample)
      assert.deepEqual(robot1, {
        ...robot1,
        history: [start, next1],
      })
      const robot2 = makeRobot()
      moveRobotNTimes(robot2, 2, gridSizesExample)
      assert.deepEqual(robot2, {
        ...robot2,
        history: [start, next1, next2],
      })
      const robot3 = makeRobot()
      moveRobotNTimes(robot3, 3, gridSizesExample)
      assert.deepEqual(robot3, {
        ...robot3,
        history: [start, next1, next2, next3],
      })
      const robot4 = makeRobot()
      moveRobotNTimes(robot4, 4, gridSizesExample)
      assert.deepEqual(robot4, {
        ...robot4,
        history: [start, next1, next2, next3, next4],
      })
      const robot5 = makeRobot()
      moveRobotNTimes(robot5, 5, gridSizesExample)
      assert.deepEqual(robot5, {
        ...robot5,
        history: [start, next1, next2, next3, next4, next5],
      })
    })
    it('getRobotsPerQuadrant()', () => {
      const vector = { x: 0, y: 0 }
      const r1: Robot = { history: [{ x: 6, y: 0 }], vector }
      const r2: Robot = { history: [{ x: 6, y: 0 }], vector }
      const r3: Robot = { history: [{ x: 9, y: 0 }], vector }
      const r4: Robot = { history: [{ x: 0, y: 2 }], vector }
      const r5: Robot = { history: [{ x: 1, y: 3 }], vector }
      const r6: Robot = { history: [{ x: 2, y: 3 }], vector }
      const r7: Robot = { history: [{ x: 5, y: 4 }], vector }
      const r8: Robot = { history: [{ x: 3, y: 5 }], vector }
      const r9: Robot = { history: [{ x: 4, y: 5 }], vector }
      const r10: Robot = { history: [{ x: 4, y: 5 }], vector }
      const r11: Robot = { history: [{ x: 1, y: 6 }], vector }
      const r12: Robot = { history: [{ x: 6, y: 6 }], vector }
      const robots = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12]
      const result = getRobotsPerQuadrant(robots, gridSizesExample)
      const expected = [
        // q1
        [r4],
        // q2
        [r1, r2, r3],
        // q3
        [r8, r9, r10, r11],
        // q4
        [r12],
      ]
      assert.deepEqual(result, expected)
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample, gridSizesExample)
      const expected = 12
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt1(inputReal, gridSizesReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 229980828
      assert.strictEqual(result, expected)
    })
  })

  describe('part 2', () => {
    it('example data', () => {
      const result = solvePt2(inputExample, gridSizesExample, 'outputExample.txt')
      const expected = undefined
      assert.strictEqual(result, expected)
    })
    it('real data', () => {
      const result = solvePt2(inputReal, gridSizesReal, 'outputReal.txt')
      consola.success(`=== Result pt. 2: ${result} ===`)
      const expected = undefined
      assert.strictEqual(result, expected)
    })
  })
})
