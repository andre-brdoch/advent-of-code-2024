import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { Cell, getGuardPosition, parseFile } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-06', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  describe('helpers', () => {
    let exampleMap: Cell[][]

    beforeEach(() => {
      exampleMap = [
        ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '#', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '#', '.', '.', '^', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '#', '.'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
      ]
    })

    it('parseFile()', () => {
      assert.deepEqual(parseFile(inputExample), exampleMap)
    })
    it('getGuardPosition()', () => {
      assert.deepEqual(getGuardPosition(exampleMap), { x: 4, y: 6 })
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
