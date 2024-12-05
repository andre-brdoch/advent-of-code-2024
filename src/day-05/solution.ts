type RulesDictionary = Record<number, [number, number][]>

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function updateIsOrderedCorrectly(update: number[]): boolean {
  //
}

export function getRulesDictionary(allRules: [number, number][]): RulesDictionary {
  const startVal: RulesDictionary = {}
  return allRules.reduce((result, current) => {
    current.forEach((page) => {
      if (!(page in result)) {
        result[page] = [current]
      } else {
        result[page].push(current)
      }
    })
    return result
  }, startVal)
}

export function parseFile(file: string): { rules: [number, number][]; updates: number[][] } {
  const [rulesStr, updatesStr] = file.split('\n\n')
  const rules = rulesStr
    .split('\n')
    .map((line) => line.split('|').map((pageStr) => parseInt(pageStr)) as [number, number])
  const updates = updatesStr
    .split('\n')
    .map((line) => line.split(',').map((pageStr) => parseInt(pageStr)))
  return { rules, updates }
}
