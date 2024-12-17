import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { getPlotsPerimeter, getRegionsDict, parseFile, solvePt1 } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-12', async () => {
  const reader = new InputReader(__dirname)
  const { inputMini1, inputMini2, inputExample, inputReal } = await reader.readAllInputFiles()

  let mapMini1: string[][]

  beforeEach(() => {
    mapMini1 = [
      ['A', 'A', 'A', 'A'],
      ['B', 'B', 'C', 'D'],
      ['B', 'B', 'C', 'C'],
      ['E', 'E', 'E', 'C'],
    ]
  })

  describe('helpers', () => {
    it('parseFile()', () => {
      const result = parseFile(inputMini1)
      const expected = mapMini1
      assert.deepEqual(result, expected)
    })
    it('getRegionsDict()', () => {
      assert.deepEqual(getRegionsDict(mapMini1), {
        A: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
        ],
        B: [
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 2 },
        ],
        C: [
          { x: 2, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 2 },
          { x: 3, y: 3 },
        ],
        D: [{ x: 3, y: 1 }],
        E: [
          { x: 0, y: 3 },
          { x: 1, y: 3 },
          { x: 2, y: 3 },
        ],
      })
    })
    it('getPlotsPerimeter()', () => {
      assert.strictEqual(getPlotsPerimeter(mapMini1, { x: 0, y: 0 }), 3)
      assert.strictEqual(getPlotsPerimeter(mapMini1, { x: 3, y: 1 }), 4)
    })
  })

  describe('part 1', () => {
    it('mini 1 data', () => {
      const result = solvePt1(inputMini1)
      const expected = 140
      assert.strictEqual(result, expected)
    })
    // it('mini 2 data', () => {
    //   const result = solvePt1(inputMini2)
    //   const expected = 772
    //   assert.strictEqual(result, expected)
    // })
    // it('example data', () => {
    //   const result = solvePt1(inputExample)
    //   const expected = 1930
    //   assert.strictEqual(result, expected)
  })

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
