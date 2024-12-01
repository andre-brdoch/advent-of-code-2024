import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { run as runTestRunner } from 'node:test'
import { tap } from 'node:test/reporters'

type Day = number | 'all'

interface CliArgs {
  day: Day
}

run()

async function run() {
  const args = parseCliArgs()

  const files = await getTestFiles(args.day)

  runTestRunner({ files })
    .on('test:fail', () => {
      process.exitCode = 1
    })
    .compose(tap)
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
  }
  // --[NAME]=[VALUE]
  const argRegex = /^--(\w+)=(.+)$/
  const result = args
    .map((str) => str.match(argRegex))
    .filter((match) => match != null)
    .reduce((result, [, name, val]) => {
      if (name === 'day') {
        return { ...result, day: parseCliDay(val) }
      }
      return { ...result }
    }, startVal)
  return result
}

function parseCliDay(dayString: string): Day {
  if (dayString === 'all') return dayString
  const day = parseInt(dayString)
  if (isNaN(day) || day < 1 || day > 25) {
    throw new Error(`Invalid day: ${dayString}`)
  }
  return day
}
