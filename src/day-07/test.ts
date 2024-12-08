import { describe, it } from 'node:test'
import assert from 'node:assert'
import { getMinMax, parseFile } from './solution'
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
    it('getMinMax()', () => {
      assert.deepEqual(getMinMax([10, 19], 190), [29, 190, false])
      assert.deepEqual(getMinMax([81, 40, 27], 3267), [148, 87480, false])
    })
  })

  // describe('part 1', () => {
  //   it('example data', () => {
  //     const result = solvePt1(inputExample)
  //     const expected = undefined
  //     assert.strictEqual(result, expected)
  //   })

  //   // it('real data', () => {
  //   //   const result = solvePt1(inputReal)
  //   //   consola.success(`=== Result pt. 1: ${result} ===`)
  //   //   const expected = undefined
  //   //   assert.strictEqual(result, expected)
  //   // })
  // })

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
