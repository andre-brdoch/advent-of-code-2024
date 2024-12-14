import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { parseFile, Robot } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-14', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  let robotsExample: Robot[]

  beforeEach(() => {
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
