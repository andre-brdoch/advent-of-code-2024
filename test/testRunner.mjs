import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { run as runTestRunner } from 'node:test'
import { spec } from 'node:test/reporters'

process.env.NODE_OPTIONS = '--require ts-node/register/transpile-only'

run()

async function run() {
  const { day, watch, only } = parseCliArgs()
  const files = await getTestFiles(day)

  runTestRunner({
    files,
    watch,
    only,
  })
    .on('test:fail', () => {
      process.exitCode = 1
    })
    .compose(spec)
    .pipe(process.stdout)
}

async function getTestFiles(day) {
  if (typeof day === 'number') {
    const dayPadded = String(day).padStart(2, '0')
    return [join(process.cwd(), `day-${dayPadded}/test.ts`)]
  }
  // all
  const srcDir = process.cwd()
  const subDirs = await readdir(srcDir)
  const targetDirs = subDirs.filter((dir) => dir.startsWith('day-') && dir !== 'day-xx')
  return targetDirs.map((targetDir) => join(srcDir, targetDir, 'test.ts'))
}

function parseCliArgs() {
  const customArgs = process.argv.slice(2)
  const startVal = {
    day: 'all',
    watch: false,
  }
  // [NAME]=[VALUE]
  // [BOOLEAN_VALUE]
  const argRegex = /^(\w+)(=(.+))?$/
  const result = customArgs
    .map((str) => str.match(argRegex))
    .filter((match) => match != null)
    .reduce((result, match) => {
      const [, name, , val] = match
      if (name === 'day') {
        return { ...result, day: parseCliDay(val) }
      }
      if (['watch', 'only']) {
        return { ...result, [name]: parseCliBool(val) }
      }
      return { ...result }
    }, startVal)
  return result
}

function parseCliBool(val) {
  return (
    val === 'true' ||
    // flag was passed without value
    val === undefined
  )
}

function parseCliDay(dayString) {
  if (dayString === 'all') return dayString
  const day = parseInt(dayString)
  if (isNaN(day) || day < 1 || day > 25) {
    throw new Error(`Invalid day: ${dayString}`)
  }
  return day
}
