import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { Instruction, Map, parseFile } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'
import { Coord } from '../utils/coordinates'

describe('day-15', async () => {
  const reader = new InputReader(__dirname)
  const { inputMini, inputExample, inputReal } = await reader.readAllInputFiles()

  let mapMini: Map
  let startPositionMini: Coord
  let instructionsMini: Instruction[]

  beforeEach(() => {
    mapMini = [
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '.', '.', 'O', '.', 'O', '.', '#'],
      ['#', '#', '.', '.', 'O', '.', '.', '#'],
      ['#', '.', '.', '.', 'O', '.', '.', '#'],
      ['#', '.', '#', '.', 'O', '.', '.', '#'],
      ['#', '.', '.', '.', 'O', '.', '.', '#'],
      ['#', '.', '.', '.', '.', '.', '.', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ]
    startPositionMini = { x: 2, y: 2 }
    instructionsMini = ['<', '^', '^', '>', '>', '>', 'v', 'v', '<', 'v', '>', '>', 'v', '<', '<']
  })

  describe('helpers', () => {
    it('parseFile()', () => {
      const { map, startPosition, instructions } = parseFile(inputMini)
      assert.deepEqual(map, mapMini)
      assert.deepEqual(startPosition, startPositionMini)
      assert.deepEqual(instructions, instructionsMini)
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
