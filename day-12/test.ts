import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import {
  getCostForRegions,
  getPlotsPerimeter,
  getRegionsByType,
  parseFile,
  solvePt1,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'
import { Coord } from '../utils/coordinates'

describe('day-12', async () => {
  const reader = new InputReader(__dirname)
  const { inputMini1, inputMini2, inputExample, inputReal } = await reader.readAllInputFiles()

  let mapMini1: string[][]
  let mapMini2: string[][]
  let mapExample: string[][]
  let regionsDictMini1: Record<string, Coord[][]>
  let regionsDictMini2: Record<string, Coord[][]>

  beforeEach(() => {
    mapMini1 = [
      ['A', 'A', 'A', 'A'],
      ['B', 'B', 'C', 'D'],
      ['B', 'B', 'C', 'C'],
      ['E', 'E', 'E', 'C'],
    ]
    mapMini2 = [
      ['O', 'O', 'O', 'O', 'O'],
      ['O', 'X', 'O', 'X', 'O'],
      ['O', 'O', 'O', 'O', 'O'],
      ['O', 'X', 'O', 'X', 'O'],
      ['O', 'O', 'O', 'O', 'O'],
    ]
    mapExample = [
      ['R', 'R', 'R', 'R', 'I', 'I', 'C', 'C', 'F', 'F'],
      ['R', 'R', 'R', 'R', 'I', 'I', 'C', 'C', 'C', 'F'],
      ['V', 'V', 'R', 'R', 'R', 'C', 'C', 'F', 'F', 'F'],
      ['V', 'V', 'R', 'C', 'C', 'C', 'J', 'F', 'F', 'F'],
      ['V', 'V', 'V', 'V', 'C', 'J', 'J', 'C', 'F', 'E'],
      ['V', 'V', 'I', 'V', 'C', 'C', 'J', 'J', 'E', 'E'],
      ['V', 'V', 'I', 'I', 'I', 'C', 'J', 'J', 'E', 'E'],
      ['M', 'I', 'I', 'I', 'I', 'I', 'J', 'J', 'E', 'E'],
      ['M', 'I', 'I', 'I', 'S', 'I', 'J', 'E', 'E', 'E'],
      ['M', 'M', 'M', 'I', 'S', 'S', 'J', 'E', 'E', 'E'],
    ]
    regionsDictMini1 = {
      A: [
        [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
        ],
      ],
      B: [
        [
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 2 },
          { x: 1, y: 1 },
        ],
      ],
      C: [
        [
          { x: 2, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 2 },
          { x: 3, y: 3 },
        ],
      ],
      D: [[{ x: 3, y: 1 }]],
      E: [
        [
          { x: 0, y: 3 },
          { x: 1, y: 3 },
          { x: 2, y: 3 },
        ],
      ],
    }
    regionsDictMini2 = {
      O: [
        [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 },
          { x: 0, y: 4 },
          { x: 1, y: 4 },
          { x: 2, y: 4 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 4, y: 3 },
          { x: 4, y: 2 },
          { x: 3, y: 2 },
          { x: 2, y: 2 },
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 2, y: 1 },
          { x: 2, y: 0 },
          { x: 1, y: 0 },
          { x: 3, y: 0 },
          { x: 4, y: 0 },
          { x: 4, y: 1 },
        ],
      ],
      X: [[{ x: 1, y: 1 }], [{ x: 3, y: 1 }], [{ x: 1, y: 3 }], [{ x: 3, y: 3 }]],
    }
  })

  describe('helpers', () => {
    it('parseFile()', () => {
      assert.deepEqual(parseFile(inputMini1), mapMini1)
      assert.deepEqual(parseFile(inputMini2), mapMini2)
      assert.deepEqual(parseFile(inputExample), mapExample)
    })
    it('getPlotsPerimeter()', () => {
      assert.strictEqual(getPlotsPerimeter(mapMini1, { x: 0, y: 0 }), 3)
      assert.strictEqual(getPlotsPerimeter(mapMini1, { x: 3, y: 1 }), 4)
      assert.strictEqual(getPlotsPerimeter(mapMini2, { x: 1, y: 1 }), 4)
      assert.strictEqual(getPlotsPerimeter(mapMini2, { x: 1, y: 0 }), 2)
    })
    it('getRegionsByType()', () => {
      assert.deepEqual(getRegionsByType(mapMini1), regionsDictMini1)
      assert.deepEqual(getRegionsByType(mapMini2), regionsDictMini2)
    })
    it('getCostForRegions()', () => {
      assert.strictEqual(getCostForRegions(mapMini1, regionsDictMini1.A), 40)
      assert.strictEqual(getCostForRegions(mapMini1, regionsDictMini1.B), 32)
      assert.strictEqual(getCostForRegions(mapMini1, regionsDictMini1.C), 40)
      assert.strictEqual(getCostForRegions(mapMini1, regionsDictMini1.D), 4)
      assert.strictEqual(getCostForRegions(mapMini1, regionsDictMini1.E), 24)
      assert.strictEqual(getCostForRegions(mapMini2, regionsDictMini2.O), 756)
      assert.strictEqual(getCostForRegions(mapMini2, regionsDictMini2.X), 16)
    })
    // it('divideTypeIntoRegions()', () => {
    //   assert.deepEqual(divideTypeIntoRegions(typeDictMini2.O), [typeDictMini2.O])
    //   assert.deepEqual(divideTypeIntoRegions(typeDictMini2.X), [
    //     [{ x: 1, y: 1 }],
    //     [{ x: 3, y: 1 }],
    //     [{ x: 1, y: 3 }],
    //     [{ x: 3, y: 3 }],
    //   ])
    //   const regions = getTypeDict(mapExample).I
    //   assert.deepEqual(divideTypeIntoRegions(regions), [regions.slice(0, 4), regions.slice(4)])
    // })
  })

  describe('part 1', () => {
    it('mini 1 data', () => {
      const result = solvePt1(inputMini1)
      const expected = 140
      assert.strictEqual(result, expected)
    })
    it('mini 2 data', () => {
      const result = solvePt1(inputMini2)
      const expected = 772
      assert.strictEqual(result, expected)
    })
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 1930
      assert.strictEqual(result, expected)
    })
    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 1450816
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
