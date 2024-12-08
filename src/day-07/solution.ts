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
    const valid = hasEquation(current.result, current.parts, withConcat)
    if (!valid) {
      return total
    }
    return total + current.result
  }, 0n)
}

export function hasEquation(result: bigint, parts: bigint[], withConcat = false): boolean {
  let possibleResults: bigint[] = [parts[0]]
  const actions = ['*', '+']
  if (withConcat) actions.push('||')
  for (let i = 1; i <= parts.length - 1; i += 1) {
    const b = parts[i]
    const newResults = []
    for (let j = 0; j <= possibleResults.length - 1; j += 1) {
      const a = possibleResults[j]
      for (let k = 0; k <= actions.length - 1; k += 1) {
        const action = actions[k]
        const val =
          action === '*'
            ? a * b
            : action === '+'
              ? a + b
              : action === '||'
                ? BigInt(`${a}${b}`)
                : (() => {
                    throw new Error(`Invalid action: ${action}`)
                  })()
        // found result
        if (val === result && i === parts.length - 1) return true
        // no point in continuing if already too large
        if (val <= result) newResults.push(val)
      }
    }
    possibleResults = newResults
  }
  return false
}

export function parseFile(file: string): { result: bigint; parts: bigint[] }[] {
  return file.split('\n').map((line) => {
    const [resultStr, partsStr] = line.split(': ')
    const result = BigInt(resultStr)
    const parts = partsStr.split(' ').map((partStr) => BigInt(partStr))
    return { result, parts }
  })
}
