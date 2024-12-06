import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import { Cell, findGuardPosition, moveGuard, parseFile, removeGuardFromMap } from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-06', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  describe('helpers', () => {
    let exampleMap: Cell[][]
    let guardStartPoint: Point

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
      guardStartPoint = { x: 4, y: 6 }
    })

    it('parseFile()', () => {
      assert.deepEqual(parseFile(inputExample), exampleMap)
    })
    it('findGuardPosition()', () => {
      assert.deepEqual(findGuardPosition(exampleMap), guardStartPoint)
    })
    it('removeGuardFromMap()', () => {
      assert.deepEqual(
        removeGuardFromMap([
          ['.', '#', '.'],
          ['.', '.', '.'],
          ['.', '^', '.'],
        ]),
        {
          currentPosition: { x: 1, y: 2 },
          map: [
            ['.', '#', '.'],
            ['.', '.', '.'],
            ['.', '.', '.'],
          ],
        }
      )
    })
    it('moveGuard()', () => {
      const map: Cell[][] = [
        ['.', '#', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ]
      assert.deepEqual(moveGuard(map, '^', [{ x: 1, y: 2 }]), {
        guard: '^',
        history: [
          { x: 1, y: 2 },
          { x: 1, y: 1 },
        ],
      })
      // running into barrier
      assert.deepEqual(moveGuard(map, '^', [{ x: 1, y: 1 }]), {
        guard: '>',
        history: [{ x: 1, y: 1 }],
      })
      // running over edge
      assert.deepEqual(moveGuard(map, '^', [{ x: 0, y: 0 }]), {
        guard: null,
        history: [{ x: 0, y: 0 }],
      })
    })
    // it('moveGuard()', () => {
    //   const { guard: guard1, history: history1 } = moveGuard(exampleMap, [guardStartPoint])
    //   assert.strictEqual(guard1, '^')
    //   assert.deepEqual(history1, [guardStartPoint, { x: 4, y: 5 }])
    // })
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
