export function solvePt1(input: string): bigint {
  const parsed = parseFile(input)
  return sumValidEquations(parsed)
}

export function solvePt2(input: string): bigint {
  const parsed = parseFile(input)
  return sumValidEquations(parsed, true)
}

export function sumValidEquations(
  equations: { result: bigint; parts: bigint[] }[],
  withConcat = false
): bigint {
  return equations.reduce((total, current) => {
    const valid = (withConcat ? hasEquationWithConcatenation : hasEquation)(
      current.result,
      current.parts
    )
    if (!valid) {
      return total
    }
    return total + current.result
  }, 0n)
}

export function hasEquationWithConcatenation(result: bigint, parts: bigint[]): boolean {
  let possibleResults: bigint[] = [parts[0]]
  for (let i = 1; i <= parts.length - 1; i += 1) {
    const b = parts[i]
    const newResults = []
    for (let j = 0; j <= possibleResults.length - 1; j += 1) {
      const a = possibleResults[j]
      const addition = a + b
      const multiplication = a * b
      const concat = BigInt(`${a}${b}`)
      newResults.push(addition, multiplication, concat)
    }
    possibleResults = newResults
  }
  return possibleResults.some((r) => r === result)
}

export function hasEquation(result: bigint, parts: bigint[]): boolean {
  let possibleResults: bigint[] = [parts[0]]
  for (let i = 1; i <= parts.length - 1; i += 1) {
    const b = parts[i]
    const newResults = []
    for (let j = 0; j <= possibleResults.length - 1; j += 1) {
      const a = possibleResults[j]
      const addition = a + b
      const multiplication = a * b
      newResults.push(addition, multiplication)
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
