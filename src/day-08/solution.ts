interface Coord {
  x: number
  y: number
}
type Vector = Coord

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function getPairsOfSameFreq(sameFreqAntennas: Coord[]): [Coord, Coord][] {
  const result: [Coord, Coord][] = []
  for (let i = 0; i <= sameFreqAntennas.length - 1; i += 1) {
    const a = sameFreqAntennas[i]
    for (let j = i + 1; j <= sameFreqAntennas.length - 1; j += 1) {
      const b = sameFreqAntennas[j]
      result.push([a, b])
    }
  }
  return result
}

export function getAntinodesBetween(map: string[][], a: Coord, b: Coord): Coord[] {
  const vectorPlus = vectorBetween(b, a)
  const vectorMinus = vectorBetween(a, b)
  console.log('vectorPlus', vectorPlus)
  console.log('vectorMinus', vectorMinus)
  const coords = [applyVector(a, vectorPlus), applyVector(b, vectorMinus)]
  // filter out off board coords
  return coords.filter((c) => map[c.y]?.[c.x] != null)
}

export function applyVector(coord: Coord, vector: Vector): Coord {
  return { x: coord.x + vector.x, y: coord.y + vector.y }
}

export function vectorBetween(a: Coord, b: Coord): Vector {
  return { x: b.x - a.x, y: b.y - a.y }
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
