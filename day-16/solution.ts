export const WALL = '#' as const
export const FREE = '.' as const
export const START = 'S' as const
export const END = 'E' as const

export type Token = typeof WALL | typeof FREE | typeof START | typeof END

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function parseFile(file: string): Token[][] {
  return file.split('\n').map((line) =>
    line.split('').map((token) => {
      if (!isToken(token)) throw new Error(`No a valid token: ${token}`)
      return token
    })
  )
}

export function isToken(str: string): str is Token {
  return str === WALL || str === FREE || str === START || str === END
}
