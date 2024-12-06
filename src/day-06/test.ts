import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'
import {
  Cell,
  findGuardPosition,
  historyHasLoop,
  HistoryEntry,
  moveGuard,
  moveUntilConditionMeet,
  parseFile,
  Point,
  removeDuplicatePositions,
  removeGuardFromMap,
  solvePt1,
  barrierWouldCauseLoop,
  solvePt2,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-06', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  describe('helpers', () => {
    let exampleMap: Cell[][]
    let exampleMapNoGuard: Cell[][]
    let guardStartPoint: Point
    let startHistoryEntry: HistoryEntry

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
      exampleMapNoGuard = [
        ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '#', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '#', '.'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
      ]
      guardStartPoint = { x: 4, y: 6 }
      startHistoryEntry = { ...guardStartPoint, guard: '^' }
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
      assert.deepEqual(removeGuardFromMap(exampleMap), {
        firstHistoryEntry: startHistoryEntry,
        map: exampleMapNoGuard,
      })
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
          { x: 1, y: 2, guard: '^' },
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
      assert.deepEqual(
        moveUntilConditionMeet(
          [
            ['.', '#', '.', '.'],
            ['#', '.', '.', '#'],
            ['.', '^', '#', '.'],
          ],
          { x: 1, y: 2, guard: '^' },
          (history) => historyHasLoop(history)
        ),
        [
          { x: 1, y: 2, guard: '^' },
          { x: 1, y: 1, guard: '^' },
          { x: 1, y: 1, guard: '>' },
          { x: 2, y: 1, guard: '>' },
          { x: 2, y: 1, guard: 'v' },
          { x: 2, y: 1, guard: '<' },
          { x: 1, y: 1, guard: '<' },
          { x: 1, y: 1, guard: '^' },
        ]
      )
    })
    it('historyHasLoop()', () => {
      assert.strictEqual(
        historyHasLoop([
          { x: 0, y: 0, guard: '^' },
          { x: 0, y: 1, guard: '^' },
          { x: 0, y: 0, guard: '^' },
        ]),
        true
      )
      assert.strictEqual(
        historyHasLoop([
          { x: 0, y: 0, guard: '^' },
          { x: 0, y: 1, guard: '^' },
          { x: 0, y: 2, guard: '^' },
        ]),
        false
      )
      assert.strictEqual(
        historyHasLoop([
          { x: 0, y: 0, guard: '^' },
          { x: 0, y: 1, guard: '^' },
          { x: 0, y: 0, guard: '>' },
        ]),
        false
      )
    })
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
    it('barrierWouldCauseLoop()', () => {
      assert.strictEqual(
        barrierWouldCauseLoop(exampleMapNoGuard, startHistoryEntry, { x: 3, y: 6 }),
        true
      )
      assert.strictEqual(
        barrierWouldCauseLoop(exampleMapNoGuard, startHistoryEntry, { x: 6, y: 7 }),
        true
      )
      assert.strictEqual(
        barrierWouldCauseLoop(exampleMapNoGuard, startHistoryEntry, { x: 7, y: 7 }),
        true
      )
      assert.strictEqual(
        barrierWouldCauseLoop(exampleMapNoGuard, startHistoryEntry, { x: 1, y: 8 }),
        true
      )
      assert.strictEqual(
        barrierWouldCauseLoop(exampleMapNoGuard, startHistoryEntry, { x: 3, y: 8 }),
        true
      )
      assert.strictEqual(
        barrierWouldCauseLoop(exampleMapNoGuard, startHistoryEntry, { x: 7, y: 9 }),
        true
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

  describe('part 2', () => {
    it('example data', () => {
      const result = solvePt2(inputExample)
      const expected = 6
      assert.strictEqual(result, expected)
    })
    // it('real data', () => {
    //   const result = solvePt2(inputReal)
    //   consola.success(`=== Result pt. 2: ${result} ===`)
    //   const expected = 1697
    //   assert.strictEqual(result, expected)
    // })
  })
})
