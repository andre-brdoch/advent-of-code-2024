import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import {
  Instruction,
  LEFT,
  Map,
  moveToken,
  parseFile,
  PLAYER,
  RIGHT,
  stringifyMap,
  UP,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'
import { Coord } from '../utils/coordinates'

describe('day-15', async () => {
  const reader = new InputReader(__dirname)
  const { inputMini, inputExample, inputReal } = await reader.readAllInputFiles()

  let mapMini: Map
  let mapMiniString: string
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
    mapMiniString = `########
#..O.O.#
##..O..#
#...O..#
#.#.O..#
#...O..#
#......#
########`
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
    it('moveToken()', () => {
      const [success1, position1] = moveToken(mapMini, PLAYER, startPositionMini, LEFT)
      assert.strictEqual(stringifyMap(mapMini), mapMiniString)
      assert.strictEqual(success1, false)
      assert.deepEqual(position1, startPositionMini)
      const [success2, position2] = moveToken(mapMini, PLAYER, position1, UP)
      assert.strictEqual(stringifyMap(mapMini), mapMiniString)
      assert.strictEqual(success2, true)
      assert.deepEqual(position2, { x: 2, y: 1 })
      const [success3, position3] = moveToken(mapMini, PLAYER, position2, UP)
      assert.strictEqual(stringifyMap(mapMini), mapMiniString)
      assert.strictEqual(success3, false)
      assert.deepEqual(position3, position2)
      const [success4, position4] = moveToken(mapMini, PLAYER, position3, RIGHT)
      assert.strictEqual(
        stringifyMap(mapMini),
        `########
#...OO.#
##..O..#
#...O..#
#.#.O..#
#...O..#
#......#
########`
      )
      assert.strictEqual(success4, true)
      assert.deepEqual(position4, { x: 3, y: 1 })
      const [success5, position5] = moveToken(mapMini, PLAYER, position4, RIGHT)
      assert.strictEqual(
        stringifyMap(mapMini),
        `########
#....OO#
##..O..#
#...O..#
#.#.O..#
#...O..#
#......#
########`
      )
      assert.strictEqual(success5, true)
      assert.deepEqual(position5, { x: 4, y: 1 })
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
