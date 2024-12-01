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
import { getTodaysData } from '../utils/read-data'

describe('day-01', async () => {
  const [inputExample, inputReal] = await Promise.all([
    getTodaysData('example-input.txt'),
    getTodaysData('real-input.txt'),
  ])

  describe('helpers', () => {
    it('parseFile()', async () => {
      const input = await getTodaysData('example-input.txt')
      console.log(input)

      const result = parseFile(input)
      assert.deepEqual(result, [
        [3, 4, 2, 1, 3, 3],
        [4, 3, 5, 3, 9, 3],
      ])
    })

    it('pairColumns()', () => {
      const result = pairColumns([
        [1, 2, 7],
        [4, 1, 3],
      ])
      assert.deepEqual(result, [
        [1, 1],
        [2, 3],
        [7, 4],
      ])
    })

    it('getDistances()', () => {
      const result = getDistances([
        [1, 1],
        [2, 3],
        [7, 4],
      ])
      assert.deepEqual(result, [0, 1, 3])
    })

    it('sum()', () => {
      const result = sum([2, 7, 4])
      assert.strictEqual(result, 13)
    })

    it('getTimesIncluded()', () => {
      const result = getTimesIncluded([3, 4, 2, 1, 3, 3], 3)
      assert.strictEqual(result, 3)
    })

    it('getSimilarityScore()', () => {
      const result = getSimilarityScore([
        [3, 4, 2, 1, 3, 3],
        [4, 3, 5, 3, 9, 3],
      ])
      assert.strictEqual(result, 31)
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      assert.strictEqual(result, 11)
    })

    it('real data', () => {
      const result = solvePt1(inputReal)
      console.log(`=== Result pt. 1: ${result} ===`)
      assert.strictEqual(result, 2756096)
    })
  })

  describe('part 2', () => {
    it('example data', () => {
      const result = solvePt2(inputExample)
      assert.strictEqual(result, 31)
    })

    it('real data', () => {
      const result = solvePt2(inputReal)
      console.log(`=== Result pt. 2: ${result} ===`)
      assert.strictEqual(result, 23117829)
    })
  })
})
