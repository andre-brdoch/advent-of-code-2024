import { describe, it } from 'node:test'
import assert from 'node:assert'
import { parseFile, countXmasInSet, columnsToSets } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-04', async () => {
  const reader = new InputReader(__dirname)
  const { inputMini, inputExample, inputReal } = await reader.readAllInputFiles()

  describe('helpers', () => {
    it('parseFile()', () => {
      assert.deepEqual(parseFile(inputMini), [
        ['.', '.', 'X', '.', '.', '.'],
        ['.', 'S', 'A', 'M', 'X', '.'],
        ['.', 'A', '.', '.', 'A', '.'],
        ['X', 'M', 'A', 'S', '.', 'S'],
        ['.', 'X', '.', '.', '.', '.'],
      ])
    })
    it('setHasXmas()', () => {
      assert.strictEqual(countXmasInSet(['.', 'X', '.', 'A', 'S', '.']), 0)
      assert.strictEqual(countXmasInSet(['X', 'M', 'A', '.', '.', '.']), 0)
      assert.strictEqual(countXmasInSet(['.', '.', '.', 'M', 'A', 'S']), 0)
      assert.strictEqual(countXmasInSet(['.', 'X', 'M', 'A', 'S', '.']), 1)
      assert.strictEqual(countXmasInSet(['X', 'M', 'A', 'S', '.', '.']), 1)
      assert.strictEqual(countXmasInSet(['.', '.', 'X', 'M', 'A', 'S']), 1)
      assert.strictEqual(countXmasInSet(['X', 'M', 'A', 'S', 'X', 'M', 'A', 'S']), 2)
      assert.strictEqual(countXmasInSet(['X', 'M', 'A', 'S', '.', 'X', 'M', 'A', 'S']), 2)
      assert.strictEqual(countXmasInSet(['.', 'X', 'M', 'A', 'S', '.', 'X', 'M', 'A', 'S', '.']), 2)
      assert.strictEqual(countXmasInSet(['X', 'M', 'A', '.', 'X', 'M', 'A', 'S']), 1)
      assert.strictEqual(countXmasInSet(['X', 'M', 'A', 'X', 'M', 'A', 'S']), 1)
    })
  })
  it('columnsToSets()', () => {
    assert.deepEqual(
      columnsToSets([
        ['1', '2', '3'],
        ['4', '5', '6'],
      ]),
      [
        ['1', '4'],
        ['2', '5'],
        ['3', '6'],
      ]
    )
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
