import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import {
  arrayToString,
  moveBlock,
  moveBlocks,
  moveFile,
  moveFiles,
  parseFile,
  solvePt1,
  solvePt2,
  Spot,
  stringToArray,
  unCondense,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-09', async () => {
  const reader = new InputReader(__dirname)
  const { inputMini, inputExample, inputReal } = await reader.readAllInputFiles()

  let discMapMini: number[]
  let discMapExample: number[]
  let unCondensedMiniString: string
  let unCondensedMini: Spot[]
  let unCondensedExampleString: string
  let unCondensedExample: Spot[]

  beforeEach(() => {
    discMapMini = [1, 2, 3, 4, 5]
    discMapExample = [2, 3, 3, 3, 1, 3, 3, 1, 2, 1, 4, 1, 4, 1, 3, 1, 4, 0, 2]
    unCondensedMiniString = '0..111....22222'
    unCondensedMini = stringToArray(unCondensedMiniString)
    unCondensedExampleString = '00...111...2...333.44.5555.6666.777.888899'
    unCondensedExample = stringToArray(unCondensedExampleString)
  })

  describe('helpers', () => {
    it('parseFile()', () => {
      assert.deepEqual(parseFile(inputMini), discMapMini)
      assert.deepEqual(parseFile(inputExample), discMapExample)
    })
    it('unCondense()', () => {
      assert.deepEqual(unCondense(discMapMini), unCondensedMini)
      assert.deepEqual(unCondense(discMapExample), unCondensedExample)
    })
    it('moveBlock()', () => {
      const r1 = moveBlock(unCondensedMini)
      assert.strictEqual(arrayToString(r1[0]), '02.111....2222.')
      assert.strictEqual(r1[1], false)
      const r2 = moveBlock(stringToArray('02.111....2222.'))
      assert.strictEqual(arrayToString(r2[0]), '022111....222..')
      assert.strictEqual(r2[1], false)
      const r3 = moveBlock(stringToArray('022111....222..'))
      assert.strictEqual(arrayToString(r3[0]), '0221112...22...')
      assert.strictEqual(r3[1], false)
      const r4 = moveBlock(stringToArray('0221112...22...'))
      assert.strictEqual(arrayToString(r4[0]), '02211122..2....')
      assert.strictEqual(r4[1], false)
      const r5 = moveBlock(stringToArray('02211122..2....'))
      assert.strictEqual(arrayToString(r5[0]), '022111222......')
      assert.strictEqual(r5[1], false)
      const r6 = moveBlock(stringToArray('022111222......'))
      assert.strictEqual(arrayToString(r6[0]), '022111222......')
      assert.strictEqual(r6[1], true)
    })
    it('moveFile()', () => {
      // moving id 9
      const [result1, lastRight1, isDone1] = moveFile(unCondensedExample)
      assert.strictEqual(arrayToString(result1), '0099.111...2...333.44.5555.6666.777.8888..')
      assert.strictEqual(lastRight1, 39)
      assert.strictEqual(isDone1, false)
      // can't move id 8
      const [result2, lastRight2, isDone2] = moveFile(result1, lastRight1, 9)
      assert.strictEqual(arrayToString(result2), arrayToString(result1))
      assert.strictEqual(lastRight2, 35)
      assert.strictEqual(isDone2, false)
      // moving id 7
      const [result3, lastRight3, isDone3] = moveFile(result2, lastRight2, 8)
      assert.strictEqual(arrayToString(result3), '0099.1117772...333.44.5555.6666.....8888..')
      assert.strictEqual(lastRight3, 31)
      assert.strictEqual(isDone3, false)
      // can't move id 6
      const [result4, lastRight4, isDone4] = moveFile(result3, lastRight3, 7)
      assert.strictEqual(arrayToString(result4), arrayToString(result3))
      assert.strictEqual(lastRight4, 26)
      assert.strictEqual(isDone4, false)
      // can't move id 5
      const [result5, lastRight5, isDone5] = moveFile(result4, lastRight4, 6)
      assert.strictEqual(arrayToString(result5), arrayToString(result4))
      assert.strictEqual(lastRight5, 21)
      assert.strictEqual(isDone5, false)
      // moving id 4
      const [result6, lastRight6, isDone6] = moveFile(result5, lastRight5, 5)
      assert.strictEqual(arrayToString(result6), '0099.111777244.333....5555.6666.....8888..')
      assert.strictEqual(lastRight6, 18)
      assert.strictEqual(isDone6, false)
      // can't move id 3
      const [result7, lastRight7, isDone7] = moveFile(result6, lastRight6, 4)
      assert.strictEqual(arrayToString(result7), arrayToString(result6))
      assert.strictEqual(lastRight7, 14)
      assert.strictEqual(isDone7, false)
      // moving id 2
      const [result8, lastRight8, isDone8] = moveFile(result7, lastRight7, 3)
      assert.strictEqual(arrayToString(result8), '00992111777.44.333....5555.6666.....8888..')
      assert.strictEqual(lastRight8, 10)
      assert.strictEqual(isDone8, false)
      // can't move id 1
      const [result9, lastRight9, isDone9] = moveFile(result8, lastRight8, 2)
      assert.strictEqual(arrayToString(result9), arrayToString(result8))
      assert.strictEqual(lastRight9, 4)
      assert.strictEqual(isDone9, false)
      // can't move id 0
      const [result10, lastRight10, isDone10] = moveFile(result9, lastRight9, 1)
      assert.strictEqual(arrayToString(result10), arrayToString(result9))
      assert.strictEqual(lastRight10, -1)
      assert.strictEqual(isDone10, true)
    })
    it('moveBlocks()', () => {
      assert.deepEqual(moveBlocks(unCondensedMini), stringToArray('022111222......'))
      assert.deepEqual(
        arrayToString(moveBlocks(unCondensedExample)),
        '0099811188827773336446555566..............'
      )
    })
    it('moveFiles()', () => {
      assert.deepEqual(
        arrayToString(moveFiles(unCondensedExample)),
        '00992111777.44.333....5555.6666.....8888..'
      )
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 1928
      assert.strictEqual(result, expected)
    })
    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 6259790630969
      assert.strictEqual(result, expected)
    })
  })

  describe('part 2', () => {
    it('example data', () => {
      const result = solvePt2(inputExample)
      const expected = 2858
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt2(inputReal)
      consola.success(`=== Result pt. 2: ${result} ===`)
      const expected = 6289564433984
      assert.strictEqual(result, expected)
    })
  })
})
