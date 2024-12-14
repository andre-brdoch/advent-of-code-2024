export interface Coord {
  x: number
  y: number
}

export interface Robot {
  vector: Coord
  history: Coord[]
}

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function parseFile(file: string): Robot[] {
  return file.split('\n').map((line) => {
    const [startCoord, vector] = line.split(' ').map((part) => {
      const [xStr, yStr] = part.replace(/^[pv]=/, '').split(',')
      return { x: Number(xStr), y: Number(yStr) }
    })
    return { vector, history: [startCoord] }
  })
}
