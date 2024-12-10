import { describe, it } from 'node:test'
import assert from 'node:assert'
import { hasEquation, parseFile, solvePt1, solvePt2 } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-07', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  describe('helpers', () => {
    it('parseFile()', () => {
      const result = parseFile(inputExample)
      const expected = [
        { result: 190n, parts: [10n, 19n] },
        { result: 3267n, parts: [81n, 40n, 27n] },
        { result: 83n, parts: [17n, 5n] },
        { result: 156n, parts: [15n, 6n] },
        { result: 7290n, parts: [6n, 8n, 6n, 15n] },
        { result: 161011n, parts: [16n, 10n, 13n] },
        { result: 192n, parts: [17n, 8n, 14n] },
        { result: 21037n, parts: [9n, 7n, 18n, 13n] },
        { result: 292n, parts: [11n, 6n, 16n, 20n] },
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

      describe('with concatenation', () => {
        assert.strictEqual(hasEquation(190n, [10n, 19n], true), true)
        assert.strictEqual(hasEquation(3267n, [81n, 40n, 27n], true), true)
        assert.strictEqual(hasEquation(83n, [17n, 5n], true), false)
        assert.strictEqual(hasEquation(156n, [15n, 6n], true), true)
        assert.strictEqual(hasEquation(7290n, [6n, 8n, 6n, 15n], true), true)
        assert.strictEqual(hasEquation(161011n, [16n, 10n, 13n], true), false)
        assert.strictEqual(hasEquation(192n, [17n, 8n, 14n], true), true)
        assert.strictEqual(hasEquation(21037n, [9n, 7n, 18n, 13n], true), false)
        assert.strictEqual(hasEquation(292n, [11n, 6n, 16n, 20n], true), true)
      })
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
