import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { parseFile } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-12', async () => {
  const reader = new InputReader(__dirname)
  const { inputMini1, inputMini2, inputExample, inputReal } = await reader.readAllInputFiles()

  let mapMini1: string[][]

  beforeEach(() => {
    mapMini1 = [
      ['A', 'A', 'A', 'A'],
      ['B', 'B', 'C', 'D'],
      ['B', 'B', 'C', 'C'],
      ['E', 'E', 'E', 'C'],
    ]
  })

  describe('helpers', () => {
    it('parseFile()', () => {
      const result = parseFile(inputMini1)
      const expected = mapMini1
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
