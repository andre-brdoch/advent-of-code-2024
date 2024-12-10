import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  filterMuls,
  mul,
  parseFile,
  parseFileWithInstructions,
  solvePt1,
  solvePt2,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-03', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputExample2, inputReal } = await reader.readAllInputFiles()

  describe('helpers', () => {
    it('parseFile()', () => {
      assert.deepEqual(parseFile(inputExample), ['mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)'])
    })
    it('parseFileWithInstructions()', () => {
      assert.deepEqual(parseFileWithInstructions(inputExample2), [
        'mul(2,4)',
        "don't()",
        'mul(5,5)',
        'mul(11,8)',
        'do()',
        'mul(8,5)',
      ])
    })
    it('mul()', () => {
      assert.deepEqual(mul('mul(44,46)'), 2024)
      assert.deepEqual(mul('mul(123,4)'), 492)
    })
    it('filterMuls()', () => {
      const result = filterMuls([
        'mul(2,4)',
        "don't()",
        'mul(5,5)',
        'mul(11,8)',
        'do()',
        'mul(8,5)',
      ])
      const expected = ['mul(2,4)', 'mul(8,5)']
      assert.deepEqual(result, expected)
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 161
      assert.strictEqual(result, expected)
    })
    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 188741603
      assert.strictEqual(result, expected)
    })
  })

  describe('part 2', () => {
    it('example data', () => {
      const result = solvePt2(inputExample2)
      const expected = 48
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt2(inputReal)
      consola.success(`=== Result pt. 2: ${result} ===`)
      const expected = 67269798
      assert.strictEqual(result, expected)
    })
  })
})
