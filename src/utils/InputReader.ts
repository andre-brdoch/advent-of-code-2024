import { readdir, readFile } from 'node:fs/promises'
import { parse } from 'node:path'
import { join } from 'path'

const DATA_DIRNAME = 'data'

export class InputReader {
  private dataDirPath: string

  constructor(dirName: string) {
    this.dataDirPath = join(dirName, DATA_DIRNAME)
  }

  public readInputFile(fileName: string): Promise<string> {
    const path = join(this.dataDirPath, fileName)
    return readFile(path, 'utf8')
  }

  public listInputFiles(): Promise<string[]> {
    return readdir(this.dataDirPath)
  }

  public async readAllInputFiles(): Promise<Record<string, string>> {
    const fileNames = await this.listInputFiles()
    const entries = await Promise.all(
      fileNames.map(async (fileName) => {
        const readResult = await this.readInputFile(fileName)
        const key = parse(fileName).name // 'input.txt' ==> 'input'
        return [key, readResult]
      })
    )
    return Object.fromEntries(entries)
  }
}
