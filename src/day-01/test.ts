import { describe, it } from 'node:test'
import assert from 'node:assert'
import { getDistances, pairColumns, parseFile, solvePt1, solvePt2 } from './solution'
import { getTodaysData } from '../utils/read-data'

describe('day-xx', () => {
  describe('utils', () => {
    describe('parseFile()', () => {
      it('parses data', async () => {
        const input = await getTodaysData('example-input.txt')
        console.log(input)

        const result = parseFile(input)
        assert.deepEqual(result, [
          [3, 4, 2, 1, 3, 3],
          [4, 3, 5, 3, 9, 3],
        ])
      })
    })

    describe('pairColumns()', () => {
      it('pairs columns', () => {
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
    })

    // it('getDistances()', () => {
    //   const result = getDistances([
    //     [1, 2, 7],
    //     [4, 1, 3],
    //   ])
    //   assert.strictEqual(result, [0, 1, 3])
    // })
  })

  // describe('example data', async () => {
  //   const input = await getTodaysData('example-input.txt')

  //   it('solves pt 1', () => {
  //     const result = solvePt1(input)
  //     assert.strictEqual(result, 6)
  //   })

  //   it('solves pt 2', () => {
  //     const result = solvePt2(input)
  //     assert.strictEqual(result, 12)
  //   })
  // })

  // describe('real data', async () => {
  //   const input = await getTodaysData('real-input.txt')

  //   const result1 = solvePt1(input)
  //   console.log(`=== Result pt. 1: ${result1} ===`)

  //   const result2 = solvePt2(input)
  //   console.log(`=== Result pt. 2: ${result2} ===`)
  // })
})
