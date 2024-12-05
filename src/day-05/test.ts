import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  getCommonRule,
  getMiddlePage,
  getRulesDictionary,
  parseFile,
  Rule,
  RulesDictionary,
  solvePt1,
  updateIsOrderedCorrectly,
} from './solution'
import { InputReader } from '../utils/InputReader'
import consola from 'consola'

describe('day-05', async () => {
  const reader = new InputReader(__dirname)
  const { inputExample, inputReal } = await reader.readAllInputFiles()

  const exampleRules: Rule[] = [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
    [75, 29],
    [61, 13],
    [75, 53],
    [29, 13],
    [97, 29],
    [53, 29],
    [61, 53],
    [97, 53],
    [61, 29],
    [47, 13],
    [75, 47],
    [97, 75],
    [47, 61],
    [75, 61],
    [47, 29],
    [75, 13],
    [53, 13],
  ]
  const exampleRulesDict: RulesDictionary = {
    '13': [
      [97, 13],
      [61, 13],
      [29, 13],
      [47, 13],
      [75, 13],
      [53, 13],
    ],
    '29': [
      [75, 29],
      [29, 13],
      [97, 29],
      [53, 29],
      [61, 29],
      [47, 29],
    ],
    '47': [
      [47, 53],
      [97, 47],
      [47, 13],
      [75, 47],
      [47, 61],
      [47, 29],
    ],
    '53': [
      [47, 53],
      [75, 53],
      [53, 29],
      [61, 53],
      [97, 53],
      [53, 13],
    ],
    '61': [
      [97, 61],
      [61, 13],
      [61, 53],
      [61, 29],
      [47, 61],
      [75, 61],
    ],
    '75': [
      [75, 29],
      [75, 53],
      [75, 47],
      [97, 75],
      [75, 61],
      [75, 13],
    ],
    '97': [
      [97, 13],
      [97, 61],
      [97, 47],
      [97, 29],
      [97, 53],
      [97, 75],
    ],
  }

  describe('helpers', () => {
    it('parseFile()', () => {
      const { rules, updates } = parseFile(inputExample)
      assert.deepEqual(rules, exampleRules)
      assert.deepEqual(updates, [
        [75, 47, 61, 53, 29],
        [97, 61, 53, 29, 13],
        [75, 29, 13],
        [75, 97, 47, 61, 53],
        [61, 13, 29],
        [97, 13, 75, 29, 47],
      ])
    })
    it('getRulesDictionary()', () => {
      assert.deepEqual(
        getRulesDictionary([
          [1, 2],
          [1, 3],
          [3, 2],
        ]),
        {
          1: [
            [1, 2],
            [1, 3],
          ],
          2: [
            [1, 2],
            [3, 2],
          ],
          3: [
            [1, 3],
            [3, 2],
          ],
        }
      )
      assert.deepEqual(getRulesDictionary(exampleRules), exampleRulesDict)
    })
    it('getCommonRule()', () => {
      assert.deepEqual(getCommonRule(75, 47, exampleRulesDict), [75, 47])
    })
    it('updateIsOrderedCorrectly()', () => {
      assert.strictEqual(updateIsOrderedCorrectly([75, 47, 61, 53, 29], exampleRulesDict), true)
      assert.strictEqual(updateIsOrderedCorrectly([97, 61, 53, 29, 13], exampleRulesDict), true)
      assert.strictEqual(updateIsOrderedCorrectly([75, 29, 13], exampleRulesDict), true)
      assert.strictEqual(updateIsOrderedCorrectly([75, 97, 47, 61, 53], exampleRulesDict), false)
      assert.strictEqual(updateIsOrderedCorrectly([61, 13, 29], exampleRulesDict), false)
      assert.strictEqual(updateIsOrderedCorrectly([97, 13, 75, 29, 47], exampleRulesDict), false)
    })
    it('getMiddlePage()', () => {
      assert.strictEqual(getMiddlePage([3]), 3)
      assert.strictEqual(getMiddlePage([1, 7, 3]), 7)
      assert.strictEqual(getMiddlePage([1, 165, 99, 42, 2]), 99)
    })
  })

  describe('part 1', () => {
    it('example data', () => {
      const result = solvePt1(inputExample)
      const expected = 143
      assert.strictEqual(result, expected)
    })

    it('real data', () => {
      const result = solvePt1(inputReal)
      consola.success(`=== Result pt. 1: ${result} ===`)
      const expected = 4569
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
