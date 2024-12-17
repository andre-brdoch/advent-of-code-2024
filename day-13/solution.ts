import { Coord, subtractCords, vectorBetween } from '../utils/coordinates'

const COST_A = 3
const COST_B = 1

/** introduced by pt 2 */
const POSITION_ADJUSTMENT = 10000000000000

const MAX_PER_BUTTON = 100

export interface Machine {
  a: Coord
  b: Coord
  price: Coord
}

export function solvePt1(input: string): number {
  const machines = parseFile(input)
  return getMinimumCostForMaximumWins(machines)
}

export function solvePt2(input: string): number {
  const machines = parseFile(input)
  adjustPricePositions(machines)
  return getMinimumCostForMaximumWins(machines)
}

export function adjustPricePositions(machines: Machine[]): void {
  machines.forEach((machine) => {
    machine.price.x += POSITION_ADJUSTMENT
    machine.price.y += POSITION_ADJUSTMENT
  })
}

export function getMinimumCostForMaximumWins(machines: Machine[]): number {
  return machines.reduce((total, machine) => {
    const result = findCheapest(machine)
    const add = result?.[0] ?? 0
    return total + add
  }, 0)
}

export function findCheapest(
  machine: Machine
): [cheapestCost: number, aPressed: number, bPressed: number] | null {
  const { a, b, price } = machine
  let clicksA: number | undefined
  let clicksB: number | undefined

  const bDivisor = getDivisor(price, b)
  if (bDivisor) {
    // can be achieved by only pressing the cheaper B button
    return [bDivisor * COST_B, 0, bDivisor]
  }

  // press B as often as possible, then take away 1 B click at a time, trying to fill up with A clicks
  const xDivisor = price.x / b.x
  const yDivisor = price.y / b.y
  const [lowerDivisor] = [xDivisor, yDivisor].sort((a, b) => a - b)
  clicksB = Math.floor(lowerDivisor)
  let current: Coord = { x: b.x * clicksB, y: b.y * clicksB }
  while (isLower(price, current) && clicksB >= 0) {
    const diff = vectorBetween(current, price)
    const aDivisor = getDivisor(diff, a)
    if (aDivisor != null) {
      // hit!
      clicksA = aDivisor
      break
    }
    current = subtractCords(current, b)
    clicksB -= 1
  }
  if (clicksA == null || clicksB == null) return null
  const cost = calcCost(clicksA, clicksB)
  return [cost, clicksA, clicksB]
}

export function calcCost(clicksA: number, clicksB: number): number {
  return clicksA * COST_A + clicksB * COST_B
}

export function isLower(target: Coord, current: Coord): boolean {
  return current.x <= target.x && current.y <= target.y
}

export function getDivisor(target: Coord, current: Coord): number | null {
  const xDivisor = target.x / current.x
  const yDivisor = target.y / current.y
  const isDividable =
    xDivisor === yDivisor && target.x % current.x === 0 && target.y % current.y === 0
  return isDividable ? xDivisor : null
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
