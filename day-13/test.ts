import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import {
  adjustPricePositions,
  findCheapest,
  getDivisor,
  Machine,
  parseFile,
  solvePt1,
  solvePt2,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-13', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  let machinesExample: Machine[]

  beforeEach(
    () =>
      (machinesExample = [
        { a: { x: 94, y: 34 }, b: { x: 22, y: 67 }, price: { x: 8400, y: 5400 } },
        { a: { x: 26, y: 66 }, b: { x: 67, y: 21 }, price: { x: 12748, y: 12176 } },
        { a: { x: 17, y: 86 }, b: { x: 84, y: 37 }, price: { x: 7870, y: 6450 } },
        { a: { x: 69, y: 23 }, b: { x: 27, y: 71 }, price: { x: 18641, y: 10279 } },
      ])
  )

  describe('helpers', () => {
    it('parseFile()', () => {
      const result = parseFile(inputExample)
      const expected = machinesExample
      assert.deepEqual(result, expected)
    })
    it('getDivisor()', () => {
      assert.strictEqual(getDivisor({ x: 100, y: 10 }, { x: 10, y: 1 }), 10)
      assert.strictEqual(getDivisor({ x: 100, y: 10 }, { x: 10, y: 2 }), null)
    })
    it('findCheapest()', () => {
      assert.deepEqual(findCheapest(machinesExample[0]), [280, 80, 40])
      assert.deepEqual(findCheapest(machinesExample[1]), null)
      assert.deepEqual(findCheapest(machinesExample[2]), [200, 38, 86])
      assert.deepEqual(findCheapest(machinesExample[3]), null)
    })
    it('findCheapest() after adjustment', () => {
      adjustPricePositions(machinesExample)
      assert.deepEqual(findCheapest(machinesExample[0]), null)
      // assert.deepEqual(findCheapest(machinesExample[1]), null)
      // assert.deepEqual(findCheapest(machinesExample[2]), [200, 38, 86])
      // assert.deepEqual(findCheapest(machinesExample[3]), null)
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 480
      assert.strictEqual(result, expected)
    })
    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 35255
      assert.strictEqual(result, expected)
    })
  })

  describe('part 2', () => {
    // it('example data', () => {
    //   const result = solvePt2(inputExample)
    //   const expected = undefined
    //   assert.strictEqual(result, expected)
    // })
    // it('real data', () => {
    //   const result = solvePt2(inputReal)
    //   consola.success(`=== Result pt. 2: ${result} ===`)
    //   const expected = undefined
    //   assert.strictEqual(result, expected)
    // })
  })
})
