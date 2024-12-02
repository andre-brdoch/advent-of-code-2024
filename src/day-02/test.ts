import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isSafeDistance, parseFile, reportIsSafe, solvePt1 } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-02', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  describe('helpers', () => {
    it('parseFile()', () => {
      const input = '1 2 3 4 5\n6 7 8 9 8\n\n'
      const result = parseFile(input)
      const expected = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 8],
      ]
      assert.deepEqual(result, expected)
    })

    it('isSafeDistance()', () => {
      assert.strictEqual(isSafeDistance(0, 1), true)
      assert.strictEqual(isSafeDistance(3, 0), true)
      assert.strictEqual(isSafeDistance(0, 3), true)
      assert.strictEqual(isSafeDistance(8, 11), true)
      assert.strictEqual(isSafeDistance(11, 8), true)
      assert.strictEqual(isSafeDistance(1, 1), false)
      assert.strictEqual(isSafeDistance(1, 5), false)
      assert.strictEqual(isSafeDistance(5, 1), false)
    })

    it('reportIsSafe()', () => {
      assert.strictEqual(reportIsSafe([1, 2, 3]), true)
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 2
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      // const expected = undefined
      // assert.strictEqual(result, expected)
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
