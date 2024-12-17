import consola from 'consola'
import { addCoords, Coord, coordsMatch, stringifyCoord } from '../utils/coordinates'
import { PriorityQueue } from '../utils/queue'

const COST_A = 3
const COST_B = 1

const MAX_PER_BUTTON = 100

export interface Machine {
  a: Coord
  b: Coord
  price: Coord
}
type CameFrom = Record<string, Set<Coord>>
type CostSoFar = Record<string, number>

export function solvePt1(input: string): number {
  const parsed = parseFile(input)
  const [lowestCost] = findCheapestPathToPrice(parsed[0])
  return lowestCost
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function findCheapestPathToPrice(
  machine: Machine
): [lowestCost: number | null, cameFrom: CameFrom] {
  const queue = new PriorityQueue<Coord>('lowToHigh')
  const start: Coord = { x: 0, y: 0 }
  const startKey = stringifyCoord(start)
  queue.add(start, 0)
  const cameFrom: CameFrom = { [startKey]: new Set<Coord>() }
  const costSoFar: CostSoFar = { [startKey]: 0 }
  let lowestCost: number | null = null

  while (queue.length > 0) {
    const current = queue.get()
    if (current == null) break
    const currentKey = stringifyCoord(current)
    if (coordsMatch(current, machine.price)) {
      lowestCost = costSoFar[currentKey]
      consola.success('Found a match!', lowestCost)
      break
    }
    const nextOptions = getNextOptions(machine, current)
    for (let i = 0; i < nextOptions.length - 1; i += 1) {
      const { position: next, cost: nextCost } = nextOptions[i]
      const nextKey = stringifyCoord(next)
      const newCost = costSoFar[currentKey] + nextCost
      const isReachable = next.x > machine.price.x || next.y > machine.price.y
      if (isReachable && (!(nextKey in costSoFar) || newCost < costSoFar[nextKey])) {
        costSoFar[nextKey] = newCost
        queue.add(next, newCost)
        if (!(nextKey in cameFrom)) cameFrom[nextKey] = new Set()
        cameFrom[nextKey].add(next)
      }
    }
  }
  return [lowestCost, cameFrom]
}

export function getNextOptions(
  machine: Machine,
  position: Coord
): { position: Coord; cost: number }[] {
  return [machine.a, machine.b].map((button, i) => ({
    position: addCoords(position, button),
    cost: i === 0 ? COST_A : COST_B,
  }))
}

export function parseFile(file: string): Machine[] {
  return file.split('\n\n').map((machine) => {
    const [a, b, price] = machine.split('\n').map((line) => {
      const match = /X[+=](\d*), Y[+=](\d*)$/g.exec(line)
      if (!match) throw new Error(`Can not parse line: ${line}`)
      const [, xStr, yStr] = match
      return { x: Number(xStr), y: Number(yStr) }
    })
    return { a, b, price }
  })
}
