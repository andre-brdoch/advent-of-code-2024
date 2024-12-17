import { Coord } from '../utils/coordinates'

const COST_A = 3
const COST_B = 1

const MAX_PER_BUTTON = 100

export interface Machine {
  a: Coord
  b: Coord
  price: Coord
}

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
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
