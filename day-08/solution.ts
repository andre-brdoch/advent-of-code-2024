interface Coord {
  x: number
  y: number
}
type Vector = Coord
type Lookup = Record<string, Coord[]>

export function solvePt1(input: string): number {
  const parsed = parseFile(input)
  const lookup = mapToLookup(parsed)
  const allPairs = getAllPairs(lookup)
  const antinodes = allPairs.flatMap(([a, b]) => getAntinodesBetween(parsed, a, b))
  const unique = uniqueCoordinates(antinodes)
  return unique.length
}

export function solvePt2(input: string): number {
  const parsed = parseFile(input)
  const lookup = mapToLookup(parsed)
  const allPairs = getAllPairs(lookup)
  const antinodes = allPairs.flatMap(([a, b]) => getAntinodesBetweenPt2(parsed, a, b))
  const unique = uniqueCoordinates(antinodes)
  return unique.length
}

export function uniqueCoordinates(coords: Coord[]): Coord[] {
  const strings = coords.map((c) => `${c.x}/${c.y}`)
  const set = new Set(strings)
  return Array.from(set).map((s) => {
    const [x, y] = s.split('/')
    return { x: Number(x), y: Number(y) }
  })
}

export function getAllPairs(lookup: Lookup): [Coord, Coord][] {
  return Object.keys(lookup)
    .map((freq) => getPairsOfSameFreq(lookup[freq]))
    .flatMap((pairsPer) => pairsPer)
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
  const coords = [applyVector(a, vectorPlus), applyVector(b, vectorMinus)]
  // filter out off board coords
  return coords.filter((c) => map[c.y]?.[c.x] != null)
}

export function getAntinodesBetweenPt2(map: string[][], a: Coord, b: Coord): Coord[] {
  const vectorPlus = vectorBetween(b, a)
  const vectorMinus = vectorBetween(a, b)
  const vectors = [
    { vector: vectorPlus, point: a },
    { vector: vectorMinus, point: b },
  ]
  const coords = []
  for (let i = 0; i <= vectors.length - 1; i += 1) {
    const { vector, point } = vectors[i]
    let isOffMap = false
    let j = 0
    while (!isOffMap) {
      if (j === 0) coords.push(point)
      const newCoord = applyVector(coords[coords.length - 1], vector)
      if (map[newCoord.y]?.[newCoord.x] != null) {
        coords.push(newCoord)
      } else {
        isOffMap = true
      }
      j += 1
    }
  }
  return coords
}

export function applyVector(coord: Coord, vector: Vector): Coord {
  return { x: coord.x + vector.x, y: coord.y + vector.y }
}

export function vectorBetween(a: Coord, b: Coord): Vector {
  return { x: b.x - a.x, y: b.y - a.y }
}

export function mapToLookup(map: string[][]): Lookup {
  const result: Lookup = {}
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
