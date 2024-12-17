import { describe, it } from 'node:test'
import assert from 'node:assert'
import { parseFile } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-13', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  describe('helpers', () => {
    it('parseFile()', () => {
      const result = parseFile(inputExample)
      const expected = [
        { a: { x: 94, y: 34 }, b: { x: 22, y: 67 }, price: { x: 8400, y: 5400 } },
        { a: { x: 26, y: 66 }, b: { x: 67, y: 21 }, price: { x: 12748, y: 12176 } },
        { a: { x: 17, y: 86 }, b: { x: 84, y: 37 }, price: { x: 7870, y: 6450 } },
        { a: { x: 69, y: 23 }, b: { x: 27, y: 71 }, price: { x: 18641, y: 10279 } },
      ]
      assert.deepEqual(result, expected)
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
