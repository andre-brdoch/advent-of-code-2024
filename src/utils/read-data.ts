import { readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'

/** When called by a day's test file, this function will read the data file for that day. */
export function getTodaysData(fileName: string): Promise<string> {
  // In a regular project this function would be a red flag.
  // However, this is AoC, and we know that all production code will be
  // organized per day and follow the same structure.
  const callerFile = getCallerFile()
  if (!callerFile) throw new Error("Can not read today's data, could not determine caller file")
  const dir = dirname(callerFile)
  const path = join(dir, 'data', fileName)
  return readFile(path, 'utf8')
}

// @ts-expect-error --- error.stack is non-standard and poorly typed
interface ErrorWithStack extends Error {
  stack: NodeJS.CallSite[]
}

/** Will retrieve the file path of the function calling */
function getCallerFile(): string | undefined {
  const originalFunc = Error.prepareStackTrace

  let callerFile
  try {
    // @ts-expect-error
    const err = new Error() as ErrorWithStack

    Error.prepareStackTrace = (_err, stack) => stack

    const currentFile = err.stack.shift()?.getFileName()

    while (err.stack.length) {
      callerFile = err.stack.shift()?.getFileName()
      if (currentFile !== callerFile) break
    }
  } catch (err) {
    console.error(err)
  }

  Error.prepareStackTrace = originalFunc

  return callerFile
}
