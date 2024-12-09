import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { moveBlock, moveBlocks, parseFile, solvePt1, Spot, unCondense } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-09', async () => {
  const reader = new InputReader(__dirname)
  const { inputMini, inputExample, inputReal } = await reader.readAllInputFiles()

  let discMapMini: number[]
  let discMapExample: number[]
  let unCondensedMini: Spot[]
  let unCondensedExample: Spot[]

  beforeEach(() => {
    discMapMini = [1, 2, 3, 4, 5]
    discMapExample = [2, 3, 3, 3, 1, 3, 3, 1, 2, 1, 4, 1, 4, 1, 3, 1, 4, 0, 2]
    unCondensedMini = [0, '.', '.', 1, 1, 1, '.', '.', '.', '.', 2, 2, 2, 2, 2]
    unCondensedExample = [
      0,
      0,
      '.',
      '.',
      '.',
      1,
      1,
      1,
      '.',
      '.',
      '.',
      2,
      '.',
      '.',
      '.',
      3,
      3,
      3,
      '.',
      4,
      4,
      '.',
      5,
      5,
      5,
      5,
      '.',
      6,
      6,
      6,
      6,
      '.',
      7,
      7,
      7,
      '.',
      8,
      8,
      8,
      8,
      9,
      9,
    ]
  })

  describe('helpers', () => {
    it('parseFile()', () => {
      assert.deepEqual(parseFile(inputMini), discMapMini)
      assert.deepEqual(parseFile(inputExample), discMapExample)
    })
    it('unCondense()', () => {
      assert.deepEqual(unCondense(discMapMini), unCondensedMini)
      assert.deepEqual(unCondense(discMapExample), unCondensedExample)
    })
    it('moveBlock()', () => {
      assert.deepEqual(moveBlock(unCondensedMini), [
        [0, 2, '.', 1, 1, 1, '.', '.', '.', '.', 2, 2, 2, 2, '.'],
        false,
      ])
    })
    it('moveBlocks()', () => {
      assert.deepEqual(moveBlocks(unCondensedMini), [
        0,
        2,
        2,
        1,
        1,
        1,
        2,
        2,
        2,
        '.',
        '.',
        '.',
        '.',
        '.',
        '.',
      ])
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 1928
      assert.strictEqual(result, expected)
    })
    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 6259790630969
      assert.strictEqual(result, expected)
    })
  })

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
