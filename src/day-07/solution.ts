export function solvePt1(input: string): bigint {
  const parsed = parseFile(input)
  return sumValidEquations(parsed)
}

export function solvePt2(input: string): any {
  const parsed = parseFile(input)
}

export function sumValidEquations(equations: { result: bigint; parts: bigint[] }[]): bigint {
  return equations.reduce((total, current) => {
    if (!hasEquation(current.result, current.parts)) {
      return total
    }
    return total + current.result
  }, 0n)
}

export function hasEquation(result: bigint, parts: bigint[]): boolean {
  let possibleResults: bigint[] = [parts[0]]
  let noAddition = false
  let noMultiplication = false
  for (let i = 1; i <= parts.length - 1; i += 1) {
    const b = parts[i]
    const newResults = []
    for (let j = 0; j <= possibleResults.length - 1; j += 1) {
      const a = possibleResults[j]
      if (!noAddition) {
        const addition = a + b
        if (addition > result) noAddition = true
        else newResults.push(addition)
      }
      if (!noMultiplication) {
        const multiplication = a * b
        if (multiplication > result) noMultiplication = true
        else newResults.push(multiplication)
      }
      // no reachable anymore
      if (noAddition && noMultiplication) return false
    }
    possibleResults = newResults
  }
  return possibleResults.some((r) => r === result)
}

export function parseFile(file: string): { result: bigint; parts: bigint[] }[] {
  return file.split('\n').map((line) => {
    const [resultStr, partsStr] = line.split(': ')
    const result = BigInt(resultStr)
    const parts = partsStr.split(' ').map((partStr) => BigInt(partStr))
    return { result, parts }
  })
}
