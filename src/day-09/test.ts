import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { moveBlock, moveBlocks, parseFile, unCondense } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-09', async () => {
  const reader = new InputReader(__dirname)
  const { inputMini, inputExample, inputReal } = await reader.readAllInputFiles()

  let discMapMini: number[]
  let discMapExample: number[]
  let unCondensedMini: string
  let unCondensedExample: string

  beforeEach(() => {
    discMapMini = [1, 2, 3, 4, 5]
    discMapExample = [2, 3, 3, 3, 1, 3, 3, 1, 2, 1, 4, 1, 4, 1, 3, 1, 4, 0, 2]
    unCondensedMini = '0..111....22222'
    unCondensedExample = '00...111...2...333.44.5555.6666.777.888899'
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
      assert.deepEqual(moveBlock(unCondensedMini), ['02.111....2222.', false])
      assert.deepEqual(moveBlock('02.111....2222.'), ['022111....222..', false])
      assert.deepEqual(moveBlock('022111....222..'), ['0221112...22...', false])
      assert.deepEqual(moveBlock('0221112...22...'), ['02211122..2....', false])
      assert.deepEqual(moveBlock('02211122..2....'), ['022111222......', false])
      assert.deepEqual(moveBlock('022111222......'), ['022111222......', true])
    })
    it('moveBlocks()', () => {
      assert.deepEqual(moveBlocks(unCondensedMini), '022111222......')
      assert.deepEqual(moveBlocks(unCondensedExample), '0099811188827773336446555566..............')
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
