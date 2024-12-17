import { Coord } from '../utils/coordinates'

type RegionsDict = Record<string, Coord[]>

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function getRegionsDict(map: string[][]): RegionsDict {
  const dict: RegionsDict = {}
  for (let y = 0; y <= map.length - 1; y += 1) {
    for (let x = 0; x <= map[0].length - 1; x += 1) {
      const region = map[y][x]
      if (!(region in dict)) dict[region] = []
      dict[region].push({ x, y })
    }
  }
  return dict
}

export function parseFile(file: string): string[][] {
  return file.split('\n').map((line) => line.split(''))
}
