export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function columnsToSets(table: string[][]): string[][] {
  const result: string[][] = []
  for (let y = 0; y <= table[0].length - 1; y += 1) {
    const newRow: string[] = []
    for (let x = 0; x <= table.length - 1; x += 1) {
      newRow.push(table[x][y])
    }
    result.push(newRow)
  }
  return result
}

export function upDiagonalsToSets(table: string[][]): string[][] {
  const result: string[][] = []
  let y = 0
  let x = 0

  for (; y <= table.length - 1; y += 1) {
    const newRow: string[] = [table[y][x]]
    let i = y
    let j = x
    while (true) {
      i -= 1
      j += 1
      if (!isOnTable(table, i, j)) {
        break
      }
      newRow.push(table[i][j])
    }
    result.push(newRow)
  }

  y = table.length - 1
  x = 1

  for (; x <= table[0].length - 1; x += 1) {
    const newRow: string[] = [table[y][x]]

    let i = y
    let j = x
    while (true) {
      i -= 1
      j += 1
      if (!isOnTable(table, i, j)) {
        break
      }
      newRow.push(table[i][j])
    }
    result.push(newRow)
  }
  return result
}

export function downDiagonalsToSets(table: string[][]): string[][] {
  const result: string[][] = []
  let y = 0
  let x = table[0].length - 1

  for (; x >= 0; x -= 1) {
    const newRow: string[] = [table[y][x]]
    console.log('newRow', newRow)

    let i = y
    let j = x
    while (true) {
      i += 1
      j += 1
      if (!isOnTable(table, i, j)) {
        break
      }
      newRow.push(table[i][j])
    }
    result.push(newRow)
  }

  y = 1
  x = 0

  for (; y <= table.length - 1; y += 1) {
    const newRow: string[] = [table[y][x]]
    let i = y
    let j = x
    while (true) {
      i += 1
      j += 1
      if (!isOnTable(table, i, j)) {
        break
      }
      newRow.push(table[i][j])
    }
    result.push(newRow)
  }

  return result
}

export function isOnTable(table: string[][], x: number, y: number): boolean {
  return table?.[x]?.[y] != null
}

export function countXmasInSet(set: string[]): number {
  let total = 0
  const sequence = [null, 'X', 'M', 'A', 'S']
  let progress = 0
  for (let i = 0; i <= set.length - 1; i += 1) {
    if (set[i] === sequence[progress + 1]) {
      progress += 1
      if (progress === sequence.length - 1) {
        total += 1
        progress = 0
      }
    } else if (set[i] === sequence[1]) {
      progress = 1
    } else {
      progress = 0
    }
  }
  return total
}

export function parseFile(file: string): string[][] {
  return file
    .split('\n')
    .filter((line) => line)
    .map((line) => line.split(''))
}
