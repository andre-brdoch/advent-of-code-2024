import { describe, it } from 'node:test'
import assert from 'node:assert'
import { getSum, parseFile, solvePt1, solvePt2 } from './solution'
import { getTodaysData } from '../utils/read-data'

describe('day-xx', () => {
  describe('utils', () => {
    it('parses data', async () => {
      const input = await getTodaysData('dev-input.txt')
      const result = parseFile(input)
      assert.deepEqual(result, [1, 2])
    })

    it('calculates sums', () => {
      const result = getSum([2, 5, 11])
      assert.strictEqual(result, 18)
    })
  })

  describe('example data', async () => {
    const input = await getTodaysData('example-input.txt')

    it('solves pt 1', () => {
      const result = solvePt1(input)
      assert.strictEqual(result, 6)
    })

    it('solves pt 2', () => {
      const result = solvePt2(input)
      assert.strictEqual(result, 12)
    })
  })

  describe('real data', async () => {
    const input = await getTodaysData('real-input.txt')

    const result1 = solvePt1(input)
    console.log(`=== Result pt. 1: ${result1} ===`)

    const result2 = solvePt2(input)
    console.log(`=== Result pt. 2: ${result2} ===`)
  })
})
