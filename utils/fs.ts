import { openSync, readFileSync, rmSync, writeFileSync, writeSync } from 'fs'

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

export function prependFileSync(fileName: string, contentToAdd: string): void {
  const existing = readFileSync(fileName)
  const fileDescriptor = openSync(fileName, 'w+')
  const insert = Buffer.from(contentToAdd)
  writeSync(fileDescriptor, insert, 0, insert.length, 0)
  writeSync(fileDescriptor, existing, 0, existing.length, insert.length)
}
