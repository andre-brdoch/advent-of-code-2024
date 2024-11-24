import { describe, it } from 'node:test'
import assert from 'node:assert'
import { getSum, parseFile, solvePt1, solvePt2 } from './solution'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

describe('day-xx', () => {
  describe('utils', () => {
    it('parses data', () => {
      const path = join(__dirname, 'data/dev-input.txt')
      const input = readFileSync(path, 'utf8')
      const result = parseFile(input)
      assert.deepEqual(result, [1, 2])
    })

    it('calculates sums', () => {
      const result = getSum([2, 5, 11])
      assert.strictEqual(result, 18)
    })
  })

  describe('example data', () => {
    const path = join(__dirname, 'data/example-input.txt')
    const input = readFileSync(path, 'utf8')

    it('solves pt 1', () => {
      const result = solvePt1(input)
      assert.strictEqual(result, 6)
    })

    it('solves pt 2', () => {
      const result = solvePt2(input)
      assert.strictEqual(result, 12)
    })
  })

  describe('real data', () => {
    const path = join(__dirname, 'data/real-input.txt')
    const input = readFileSync(path, 'utf8')

    const result1 = solvePt1(input)
    console.log(`=== Result pt. 1: ${result1} ===`)

    const result2 = solvePt2(input)
    console.log(`=== Result pt. 2: ${result2} ===`)
  })
})
