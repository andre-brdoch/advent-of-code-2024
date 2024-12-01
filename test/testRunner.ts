import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { run as runTestRunner } from 'node:test'
import { spec } from 'node:test/reporters'

type Day = number | 'all'

interface CliArgs {
  day: Day
  watch: boolean
}

run()

async function run() {
  const { day, watch } = parseCliArgs()

  const files = await getTestFiles(day)

  runTestRunner({ files, watch, inspectPort: 4000 })
    .on('test:fail', () => {
      process.exitCode = 1
    })
    .compose(spec)
    .pipe(process.stdout)
}

async function getTestFiles(day: Day): Promise<string[]> {
  if (typeof day === 'number') {
    const dayPadded = String(day).padStart(2, '0')
    return [join(process.cwd(), `src/day-${dayPadded}/test.ts`)]
  }
  // all
  const srcDir = join(process.cwd(), 'src')
  const subDirs = await readdir(srcDir)
  const targetDirs = subDirs.filter((dir) => dir.startsWith('day-') && dir !== 'day-xx')
  return targetDirs.map((targetDir) => join(srcDir, targetDir, 'test.ts'))
}

function parseCliArgs(): CliArgs {
  const args = process.argv
  const startVal: CliArgs = {
    day: 'all',
    watch: false,
  }
  // --[NAME]=[VALUE]
  const argRegex = /^--(\w+)(=(.+))?$/
  const result = args
    .map((str) => str.match(argRegex))
    .filter((match) => match != null)
    .reduce((result, match) => {
      const [, name, , val] = match
      if (name === 'day') {
        return { ...result, day: parseCliDay(val) }
      }
      if (name === 'watch') {
        return { ...result, [name]: parseCliBool(val) }
      }
      return { ...result }
    }, startVal)
  return result
}

function parseCliBool(x: string): boolean {
  return (
    x === 'true' ||
    // flag was passed without value
    x === undefined
  )
}

function parseCliDay(dayString: string): Day {
  if (dayString === 'all') return dayString
  const day = parseInt(dayString)
  if (isNaN(day) || day < 1 || day > 25) {
    throw new Error(`Invalid day: ${dayString}`)
  }
  return day
}
