import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import {
  Cell,
  findGuardPosition,
  HistoryEntry,
  moveGuard,
  moveUntilConditionMeet,
  parseFile,
  Point,
  removeDuplicatePositions,
  removeGuardFromMap,
  solvePt1,
} from './solution'
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
          firstHistoryEntry: { x: 1, y: 2, guard: '^' },
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
      assert.deepEqual(moveGuard(map, [{ x: 1, y: 2, guard: '^' }]), { x: 1, y: 1, guard: '^' })
      // running into barrier
      assert.deepEqual(moveGuard(map, [{ x: 1, y: 1, guard: '^' }]), { x: 1, y: 1, guard: '>' })
      // // running over edge
      assert.deepEqual(moveGuard(map, [{ x: 0, y: 0, guard: '^' }]), { x: 0, y: -1, guard: null })
    })
    it('moveUntilConditionMeet()', () => {
      // until guard is off map
      const map: Cell[][] = [
        ['.', '#', '.'],
        ['.', '.', '.'],
        ['.', '^', '.'],
      ]
      assert.deepEqual(
        moveUntilConditionMeet(
          map,
          (history: HistoryEntry[]) => history[history.length - 1].guard == null
        ),
        [
          { x: 1, y: 2, guard: '^' },
          { x: 1, y: 1, guard: '^' },
          { x: 1, y: 1, guard: '>' },
          { x: 2, y: 1, guard: '>' },
          { x: 3, y: 1, guard: null },
        ]
      )
      // until guard is caught in loop
      // assert.deepEqual(
      //   moveUntilConditionMeet(
      //     [
      //       ['.', '#', '.', '.'],
      //       ['.', '.', '.', '#'],
      //       ['#', '^', '#', '.'],
      //     ],
      //     ({ guard, history }) => guard == null
      //   ),
      //   [
      //     { x: 1, y: 2 },
      //     { x: 1, y: 1 },
      //     { x: 2, y: 1 },
      //     { x: 3, y: 1 },
      //   ]
      // )
    })
    // it ('hasLoop()', () => {
    //   assert.strictEqual(hasLoop([], [], '^'), true)
    // })
    it('removeDuplicatePositions()', () => {
      assert.deepEqual(
        removeDuplicatePositions([
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 0, y: 0 },
        ]),
        [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ]
      )
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 41
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 4988
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
