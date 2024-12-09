import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import {
  arrayToString,
  moveBlock,
  moveBlocks,
  parseFile,
  solvePt1,
  Spot,
  stringToArray,
  unCondense,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-09', async () => {
  const reader = new InputReader(__dirname)
  const { inputMini, inputExample, inputReal } = await reader.readAllInputFiles()

  let discMapMini: number[]
  let discMapExample: number[]
  let unCondensedMiniString: string
  let unCondensedMini: Spot[]
  let unCondensedExampleString: string
  let unCondensedExample: Spot[]

  beforeEach(() => {
    discMapMini = [1, 2, 3, 4, 5]
    discMapExample = [2, 3, 3, 3, 1, 3, 3, 1, 2, 1, 4, 1, 4, 1, 3, 1, 4, 0, 2]
    unCondensedMiniString = '0..111....22222'
    unCondensedMini = stringToArray(unCondensedMiniString)
    unCondensedExampleString = '00...111...2...333.44.5555.6666.777.888899'
    unCondensedExample = stringToArray(unCondensedExampleString)
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
      const r1 = moveBlock(unCondensedMini)
      assert.strictEqual(arrayToString(r1[0]), '02.111....2222.')
      assert.strictEqual(r1[1], false)
      const r2 = moveBlock(stringToArray('02.111....2222.'))
      assert.strictEqual(arrayToString(r2[0]), '022111....222..')
      assert.strictEqual(r2[1], false)
      const r3 = moveBlock(stringToArray('022111....222..'))
      assert.strictEqual(arrayToString(r3[0]), '0221112...22...')
      assert.strictEqual(r3[1], false)
      const r4 = moveBlock(stringToArray('0221112...22...'))
      assert.strictEqual(arrayToString(r4[0]), '02211122..2....')
      assert.strictEqual(r4[1], false)
      const r5 = moveBlock(stringToArray('02211122..2....'))
      assert.strictEqual(arrayToString(r5[0]), '022111222......')
      assert.strictEqual(r5[1], false)
      const r6 = moveBlock(stringToArray('022111222......'))
      assert.strictEqual(arrayToString(r6[0]), '022111222......')
      assert.strictEqual(r6[1], true)
    })
    it('moveBlocks()', () => {
      assert.deepEqual(moveBlocks(unCondensedMini), stringToArray('022111222......'))
      assert.deepEqual(
        moveBlocks(unCondensedExample),
        stringToArray('0099811188827773336446555566..............')
      )
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
