import { describe, it } from 'node:test'
import assert from 'node:assert'
import { parseFile } from './solution'
import { getTodaysData } from '../utils/read-data'

describe('day-xx', async () => {
  const [
    inputExample,
    // inputReal
  ] = await Promise.all([getTodaysData('example-input.txt'), getTodaysData('real-input.txt')])

  describe('helpers', () => {
    it('parseFile()', () => {
      const result = parseFile(inputExample)
      const expected = undefined
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
  //   //   console.log(`=== Result pt. 1: ${result} ===`)
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
  //   //   console.log(`=== Result pt. 2: ${result} ===`)
  //   //   const expected = undefined
  //   //   assert.strictEqual(result, expected)
  //   // })
  // })
})
