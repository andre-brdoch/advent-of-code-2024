import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { END, findToken, parseFile, solvePt1, solvePt2, START, Token } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-16', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  let mapExample: Token[][]

  beforeEach(() => {
    mapExample = [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', 'E', '#'],
      ['#', '.', '#', '.', '#', '#', '#', '.', '#', '.', '#', '#', '#', '.', '#'],
      ['#', '.', '.', '.', '.', '.', '#', '.', '#', '.', '.', '.', '#', '.', '#'],
      ['#', '.', '#', '#', '#', '.', '#', '#', '#', '#', '#', '.', '#', '.', '#'],
      ['#', '.', '#', '.', '#', '.', '.', '.', '.', '.', '.', '.', '#', '.', '#'],
      ['#', '.', '#', '.', '#', '#', '#', '#', '#', '.', '#', '#', '#', '.', '#'],
      ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '#'],
      ['#', '#', '#', '.', '#', '.', '#', '#', '#', '#', '#', '.', '#', '.', '#'],
      ['#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '#', '.', '#'],
      ['#', '.', '#', '.', '#', '.', '#', '#', '#', '.', '#', '.', '#', '.', '#'],
      ['#', '.', '.', '.', '.', '.', '#', '.', '.', '.', '#', '.', '#', '.', '#'],
      ['#', '.', '#', '#', '#', '.', '#', '.', '#', '.', '#', '.', '#', '.', '#'],
      ['#', 'S', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '.', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ]
  })

  describe('helpers', () => {
    it('parseFile()', () => {
      const result = parseFile(inputExample)
      const expected = mapExample
      assert.deepEqual(result, expected)
    })
    it('findToken()', () => {
      assert.deepEqual(findToken(mapExample, START), { x: 1, y: 13 })
      assert.deepEqual(findToken(mapExample, END), { x: 13, y: 1 })
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 7036
      assert.strictEqual(result, expected)
    })
    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 114476
      assert.strictEqual(result, expected)
    })
  })

  describe('part 2', () => {
    it('example data', () => {
      const result = solvePt2(inputExample)
      const expected = 45
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt2(inputReal)
      consola.success(`=== Result pt. 2: ${result} ===`)
      const expected = 508
      assert.strictEqual(result, expected)
    })
  })
})
