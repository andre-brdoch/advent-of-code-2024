import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { END, findToken, parseFile, PriorityQueue, START, Token } from './solution'
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
    it('PriorityQueue', () => {
      const queue = new PriorityQueue<string>()
      assert.strictEqual(queue.length, 0)
      queue.add('a', 10)
      queue.add('b', 20)
      queue.add('c', 15)
      assert.strictEqual(queue.length, 3)
      assert.deepEqual(queue.get(), { value: 'b', priority: 20 })
      assert.deepEqual(queue.get(), { value: 'c', priority: 15 })
      assert.deepEqual(queue.get(), { value: 'a', priority: 10 })
      assert.strictEqual(queue.length, 0)
    })
    it('findToken()', () => {
      assert.deepEqual(findToken(mapExample, START), { x: 1, y: 13 })
      assert.deepEqual(findToken(mapExample, END), { x: 13, y: 1 })
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
