import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  getDistances,
  getSimilarityScore,
  getTimesIncluded,
  pairColumns,
  parseFile,
  solvePt1,
  solvePt2,
  sum,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-01', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  describe('helpers', () => {
    it('parseFile()', () => {
      const result = parseFile(inputExample)
      const expected = [
        [3, 4, 2, 1, 3, 3],
        [4, 3, 5, 3, 9, 3],
      ]
      assert.deepEqual(result, expected)
    })

    it('pairColumns()', () => {
      const result = pairColumns([
        [1, 2, 7],
        [4, 1, 3],
      ])
      const expected = [
        [1, 1],
        [2, 3],
        [7, 4],
      ]
      assert.deepEqual(result, expected)
    })

    it('getDistances()', () => {
      const result = getDistances([
        [1, 1],
        [2, 3],
        [7, 4],
      ])
      const expected = [0, 1, 3]
      assert.deepEqual(result, expected)
    })

    it('sum()', () => {
      const result = sum([2, 7, 4])
      const expected = 13
      assert.strictEqual(result, expected)
    })

    it('getTimesIncluded()', () => {
      const result = getTimesIncluded([3, 4, 2, 1, 3, 3], 3)
      const expected = 3
      assert.strictEqual(result, expected)
    })

    it('getSimilarityScore()', () => {
      const result = getSimilarityScore([
        [3, 4, 2, 1, 3, 3],
        [4, 3, 5, 3, 9, 3],
      ])
      const expected = 31
      assert.strictEqual(result, expected)
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 11
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===\n`)
      const expected = 2756096
      assert.strictEqual(result, expected)
    })
  })

  describe('part 2', () => {
    it('example data', () => {
      const result = solvePt2(inputExample)
      const expected = 31
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt2(inputReal)
      consola.success(`=== Result pt. 2: ${result} ===\n`)
      const expected = 23117829
      assert.strictEqual(result, expected)
    })
  })
})
