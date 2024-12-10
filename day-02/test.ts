import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  isSafeDistance,
  parseFile,
  possibleReportsWhenRemovingOne,
  reportIsSafe,
  reportIsSafeIfRemovingAtMostOne,
  solvePt1,
  solvePt2,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-02', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  describe('helpers', () => {
    it('parseFile()', () => {
      const result = parseFile(inputExample)
      const expected = [
        [7, 6, 4, 2, 1],
        [1, 2, 7, 8, 9],
        [9, 7, 6, 2, 1],
        [1, 3, 2, 4, 5],
        [8, 6, 4, 4, 1],
        [1, 3, 6, 7, 9],
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
      assert.strictEqual(reportIsSafe([7, 6, 4, 2, 1]), true)
      assert.strictEqual(reportIsSafe([1, 2, 7, 8, 9]), false)
      assert.strictEqual(reportIsSafe([9, 7, 6, 2, 1]), false)
      assert.strictEqual(reportIsSafe([1, 3, 2, 4, 5]), false)
      assert.strictEqual(reportIsSafe([8, 6, 4, 4, 1]), false)
      assert.strictEqual(reportIsSafe([1, 3, 6, 7, 9]), true)
    })
    it('possibleReportsWhenRemovingOne()', () => {
      const result = possibleReportsWhenRemovingOne([1, 2, 3, 4])
      const expected = [
        [2, 3, 4],
        [1, 3, 4],
        [1, 2, 4],
        [1, 2, 3],
      ]
      assert.deepEqual(result, expected)
    })
    it('reportIsSafeIfRemovingAtMostOne()', () => {
      assert.strictEqual(reportIsSafeIfRemovingAtMostOne([7, 6, 4, 3, 2]), true)
      assert.strictEqual(reportIsSafeIfRemovingAtMostOne([1, 2, 7, 8, 9]), false)
      assert.strictEqual(reportIsSafeIfRemovingAtMostOne([9, 7, 6, 2, 1]), false)
      assert.strictEqual(reportIsSafeIfRemovingAtMostOne([1, 3, 2, 4, 5]), true)
      assert.strictEqual(reportIsSafeIfRemovingAtMostOne([8, 6, 4, 4, 1]), true)
      assert.strictEqual(reportIsSafeIfRemovingAtMostOne([1, 3, 6, 7, 9]), true)
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
      const expected = 549
      assert.strictEqual(result, expected)
    })
  })

  describe('part 2', () => {
    it('example data', () => {
      const result = solvePt2(inputExample)
      const expected = 4
      assert.strictEqual(result, expected)
    })
    it('real data', () => {
      const result = solvePt2(inputReal)
      consola.success(`=== Result pt. 2: ${result} ===`)
      const expected = 589
      assert.strictEqual(result, expected)
    })
  })
})
