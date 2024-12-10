import { describe, it } from 'node:test'
import assert from 'node:assert'
import { parseFile, solvePt1, solvePt2 } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-10', async () => {
  const reader = new InputReader(__dirname)
  const {
    inputMini1,
    inputMini2,
    inputMini3,
    inputMini4,
    inputMini5,
    inputMini6,
    inputMini7,
    inputExample,
    inputReal,
  } = await reader.readAllInputFiles()

  describe('helpers', () => {
    it('parseFile()', () => {
      assert.deepEqual(parseFile(inputExample), [
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [8, 7, 6, 5],
        [9, 8, 7, 6],
      ])
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 1
      assert.strictEqual(result, expected)
    })

    it('mini data 1', () => {
      const result = solvePt1(inputMini1)
      const expected = 2
      assert.strictEqual(result, expected)
    })

    it('mini data 2', () => {
      const result = solvePt1(inputMini2)
      const expected = 4
      assert.strictEqual(result, expected)
    })

    it('mini data 3', () => {
      const result = solvePt1(inputMini3)
      const expected = 3
      assert.strictEqual(result, expected)
    })

    it('mini data 4', () => {
      const result = solvePt1(inputMini4)
      const expected = 36
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 611
      assert.strictEqual(result, expected)
    })
  })

  describe('part 2', () => {
    // it('example data', () => {
    //   const result = solvePt2(inputExample)
    //   const expected = 81
    //   assert.strictEqual(result, expected)
    // })

    it('mini data 5', () => {
      const result = solvePt2(inputMini5)
      const expected = 3
      assert.strictEqual(result, expected)
    })

    it('mini data 6', () => {
      const result = solvePt2(inputMini6)
      const expected = 13
      assert.strictEqual(result, expected)
    })

    it('mini data 7', () => {
      const result = solvePt2(inputMini7)
      const expected = 227
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt2(inputReal)
      consola.success(`=== Result pt. 2: ${result} ===`)
      const expected = 1380
      assert.strictEqual(result, expected)
    })
  })
})
