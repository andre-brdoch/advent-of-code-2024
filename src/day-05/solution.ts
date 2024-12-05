export function solvePt1(input: string): any {
  const parsed = parseFile(input)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function parseFile(file: string): { rules: [number, number][]; updates: number[][] } {
  const [rulesStr, updatesStr] = file.split('\n\n')
  console.log('rules', rulesStr)
  const rules = rulesStr
    .split('\n')
    .map((line) => line.split('|').map((pageStr) => parseInt(pageStr)) as [number, number])
  console.log(rules)

  const updates = updatesStr
    .split('\n')
    .map((line) => line.split(',').map((pageStr) => parseInt(pageStr)))
  return { rules, updates }
}
