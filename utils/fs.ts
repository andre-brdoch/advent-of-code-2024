import { openSync, rmSync, writeFileSync } from 'fs'

export function createFileSync(fileName: string): void {
  try {
    openSync(fileName, 'r')
    // didn't throw, file already existed
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    writeFileSync(fileName, '')
  }
}

export function removeFileSync(fileName: string): void {
  try {
    rmSync(fileName)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    // file did not exist
  }
}
