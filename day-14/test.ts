import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { findIdenticalVectors, getNextCoord, GridSizes, parseFile, Robot } from './solution'
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
  })

  // describe('part 1', () => {
  //   it('example data', () => {
  //     const result = solvePt1(inputExample)
  //     const expected = undefined
  //     assert.strictEqual(result, expected)
  //   })

  //   // it('real data', () => {
  //   //   const result = solvePt1(inputReal)
  //   //   consola.success(`=== Result pt. 1: ${result} ===`)
  //   //   const expected = undefined
  //   //   assert.strictEqual(result, expected)
  //   // })
  // })

  // describe('part 2', () => {
  //   it('example data', () => {
  //     const result = solvePt2(inputExample)
  //     const expected = undefined
  //     assert.strictEqual(result, expected)
  //   })

  //   // it('real data', () => {
  //   //   const result = solvePt2(inputReal)
  //   //   consola.success(`=== Result pt. 2: ${result} ===`)
  //   //   const expected = undefined
  //   //   assert.strictEqual(result, expected)
  //   // })
  // })
})
