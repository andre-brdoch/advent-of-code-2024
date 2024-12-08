interface Coord {
  x: number
  y: number
}

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function mapToLookup(map: string[][]): Record<string, Coord[]> {
  const result: Record<string, Coord[]> = {}
  for (let y = 0; y <= map.length - 1; y += 1) {
    for (let x = 0; x <= map[0].length - 1; x += 1) {
      const cell = map[y][x]
      if (cell === '.') continue
      if (!(cell in result)) result[cell] = []
      result[cell].push({ x, y })
    }
  }
  return result
}

export function parseFile(file: string): string[][] {
  return file.split('\n').map((line) => line.split(''))
}
