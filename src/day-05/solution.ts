export type Rule = [number, number]
export type RulesDictionary = Record<number, Rule[]>

export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function updateIsOrderedCorrectly(update: number[], rulesDict: RulesDictionary): boolean {
  return update.every((_, i) => {
    if (i === update.length - 1) return true
    for (let j = i + 1; j <= update.length - 1; j += 1) {
      const a = update[i]
      const b = update[j]
      const commonRule = getCommonRule(a, b, rulesDict)
      console.log('a:', a, 'b:', b, 'rule:', commonRule)
      if (commonRule == null) continue
      if (commonRule[0] === b) return false
    }
    return true
  })
}

export function getCommonRule(
  pageA: number,
  pageB: number,
  rulesDict: RulesDictionary
): Rule | null {
  const aRules = rulesDict[pageA] ?? []
  const bRules = rulesDict[pageB] ?? []
  const common = [...aRules, ...bRules].find(
    ([a, b]) => (a === pageA && b === pageB) || (b === pageA && a === pageB)
  )
  return common ?? null
}

export function getRulesDictionary(allRules: Rule[]): RulesDictionary {
  const startVal: RulesDictionary = {}
  const result = allRules.reduce((result, current) => {
    current.forEach((page) => {
      if (!(page in result)) {
        result[page] = [current]
      } else {
        result[page].push(current)
      }
    })
    return result
  }, startVal)
  return result
}

export function parseFile(file: string): { rules: Rule[]; updates: number[][] } {
  const [rulesStr, updatesStr] = file.split('\n\n')
  const rules = rulesStr
    .split('\n')
    .map((line) => line.split('|').map((pageStr) => parseInt(pageStr)) as Rule)
  const updates = updatesStr
    .split('\n')
    .map((line) => line.split(',').map((pageStr) => parseInt(pageStr)))
  return { rules, updates }
}
