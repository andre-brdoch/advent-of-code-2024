import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  hasEquation,
  hasEquationWithConcatenation,
  parseFile,
  solvePt1,
  solvePt2,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-07', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  describe('helpers', () => {
    it('parseFile()', () => {
      const result = parseFile(inputExample)
      const expected = [
        { result: 190, parts: [10, 19] },
        { result: 3267, parts: [81, 40, 27] },
        { result: 83, parts: [17, 5] },
        { result: 156, parts: [15, 6] },
        { result: 7290, parts: [6, 8, 6, 15] },
        { result: 161011, parts: [16, 10, 13] },
        { result: 192, parts: [17, 8, 14] },
        { result: 21037, parts: [9, 7, 18, 13] },
        { result: 292, parts: [11, 6, 16, 20] },
      ]
      assert.deepEqual(result, expected)
    })
    describe('hasEquation()', () => {
      assert.strictEqual(hasEquation(190n, [10n, 19n]), true)
      assert.strictEqual(hasEquation(3267n, [81n, 40n, 27n]), true)
      assert.strictEqual(hasEquation(83n, [17n, 5n]), false)
      assert.strictEqual(hasEquation(156n, [15n, 6n]), false)
      assert.strictEqual(hasEquation(7290n, [6n, 8n, 6n, 15n]), false)
      assert.strictEqual(hasEquation(161011n, [16n, 10n, 13n]), false)
      assert.strictEqual(hasEquation(192n, [17n, 8n, 14n]), false)
      assert.strictEqual(hasEquation(21037n, [9n, 7n, 18n, 13n]), false)
      assert.strictEqual(hasEquation(292n, [11n, 6n, 16n, 20n]), true)
    })
    describe('hasEquationWithConcatenation()', () => {
      assert.strictEqual(hasEquationWithConcatenation(190n, [10n, 19n]), true)
      assert.strictEqual(hasEquationWithConcatenation(3267n, [81n, 40n, 27n]), true)
      assert.strictEqual(hasEquationWithConcatenation(83n, [17n, 5n]), false)
      assert.strictEqual(hasEquationWithConcatenation(156n, [15n, 6n]), true)
      assert.strictEqual(hasEquationWithConcatenation(7290n, [6n, 8n, 6n, 15n]), true)
      assert.strictEqual(hasEquationWithConcatenation(161011n, [16n, 10n, 13n]), false)
      assert.strictEqual(hasEquationWithConcatenation(192n, [17n, 8n, 14n]), true)
      assert.strictEqual(hasEquationWithConcatenation(21037n, [9n, 7n, 18n, 13n]), false)
      assert.strictEqual(hasEquationWithConcatenation(292n, [11n, 6n, 16n, 20n]), true)
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 3749n
      assert.strictEqual(result, expected)
    })
    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 465126289353n
      assert.strictEqual(result, expected)
    })
  })

  describe('part 2', () => {
    it('example data', () => {
      const result = solvePt2(inputExample)
      const expected = 11387n
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt2(inputReal)
      consola.success(`=== Result pt. 2: ${result} ===`)
      const expected = 70597497486371n
      assert.strictEqual(result, expected)
    })
  })
})
