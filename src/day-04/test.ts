import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  parseFile,
  countXmasInSet,
  columnsToSets,
  upDiagonalsToSets,
  isOnTable,
  downDiagonalsToSets,
  getAllForwardSets,
} from './solution'
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
  it('isOnTable()', () => {
    const table = [
      ['1', '2', '3'],
      ['4', '5', '6'],
    ]
    assert.strictEqual(isOnTable(table, 0, 0), true)
    assert.strictEqual(isOnTable(table, 1, 0), true)
    assert.strictEqual(isOnTable(table, 0, 2), true)
    assert.strictEqual(isOnTable(table, 2, 0), false)
    assert.strictEqual(isOnTable(table, 0, 3), false)
    assert.strictEqual(isOnTable(table, -1, -1), false)
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
  it('upDiagonalsToSets()', () => {
    assert.deepEqual(
      upDiagonalsToSets([
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
      ]),
      [['1'], ['4', '2'], ['7', '5', '3'], ['8', '6'], ['9']]
    )
  })
  it('downDiagonalsToSets()', () => {
    assert.deepEqual(
      downDiagonalsToSets([
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
      ]),
      [['3'], ['2', '6'], ['1', '5', '9'], ['4', '8'], ['7']]
    )
  })
  it('getAllForwardSets()', () => {
    assert.deepEqual(
      getAllForwardSets([
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
      ]),
      [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1'],
        ['4', '2'],
        ['7', '5', '3'],
        ['8', '6'],
        ['9'],
        ['3'],
        ['2', '6'],
        ['1', '5', '9'],
        ['4', '8'],
        ['7'],
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
