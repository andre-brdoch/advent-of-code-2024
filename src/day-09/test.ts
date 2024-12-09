import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { parseFile, uncondense } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-09', async () => {
  const reader = new InputReader(__dirname)
  const { inputMini, inputExample, inputReal } = await reader.readAllInputFiles()

  let discMapMini: number[]
  let discMapExample: number[]

  beforeEach(() => {
    discMapMini = [1, 2, 3, 4, 5]
    discMapExample = [2, 3, 3, 3, 1, 3, 3, 1, 2, 1, 4, 1, 4, 1, 3, 1, 4, 0, 2]
  })

  describe('helpers', () => {
    it('parseFile()', () => {
      assert.deepEqual(parseFile(inputMini), discMapMini)
      assert.deepEqual(parseFile(inputExample), discMapExample)
    })
    it('uncondense()', () => {
      assert.deepEqual(uncondense(discMapMini), '0..111....22222')
      assert.deepEqual(uncondense(discMapExample), '00...111...2...333.44.5555.6666.777.888899')
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
