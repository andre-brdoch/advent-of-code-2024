import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  getPairsOfSameFreq,
  getAntinodesBetween,
  mapToLookup,
  parseFile,
  getAllPairs,
  solvePt1,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-08', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  const exampleMap = [
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '0', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '0', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '0', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '0', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', 'A', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', 'A', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', 'A', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ]
  const exampleLookup = {
    0: [
      { x: 8, y: 1 },
      { x: 5, y: 2 },
      { x: 7, y: 3 },
      { x: 4, y: 4 },
    ],
    A: [
      { x: 6, y: 5 },
      { x: 8, y: 8 },
      { x: 9, y: 9 },
    ],
  }

  describe('helpers', () => {
    it('parseFile()', () => {
      const result = parseFile(inputExample)
      assert.deepEqual(result, exampleMap)
    })
    it('mapToLookup()', () => {
      assert.deepEqual(mapToLookup(exampleMap), exampleLookup)
    })
    it('getAntinodesBetween()', () => {
      assert.deepEqual(getAntinodesBetween(exampleMap, { x: 4, y: 3 }, { x: 5, y: 5 }), [
        { x: 3, y: 1 },
        { x: 6, y: 7 },
      ])
    })
    it('getPairsOfSameFreq()', () => {
      assert.deepEqual(
        getPairsOfSameFreq([
          { x: 4, y: 3 },
          { x: 8, y: 4 },
          { x: 5, y: 5 },
        ]),
        [
          [
            { x: 4, y: 3 },
            { x: 8, y: 4 },
          ],
          [
            { x: 4, y: 3 },
            { x: 5, y: 5 },
          ],
          [
            { x: 8, y: 4 },
            { x: 5, y: 5 },
          ],
        ]
      )
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 14
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 367
      assert.strictEqual(result, expected)
    })
  })

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
