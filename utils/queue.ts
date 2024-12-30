type Sorting = 'lowToHigh' | 'highToLow'

interface Entry<T> {
  value: T
  priority: number
}

export class PriorityQueue<T> {
  private entries: Entry<T>[] = []
  private sorting: Sorting

  constructor(sorting: Sorting) {
    this.sorting = sorting
  }

  public add(value: T, priority: number): void {
    for (let i = 0; i <= this.entries.length - 1; i += 1) {
      const current = this.entries[i]
      if (this.isHigherPriority(priority, current)) {
        this.entries.splice(i, 0, { value, priority })
        return
      }
    }
    this.entries.push({ value, priority })
  }

  public get(): T | null {
    const mutationFn = this.sorting === 'highToLow' ? 'pop' : 'shift'
    const hit = this.entries[mutationFn]()
    return hit?.value ?? null
  }

  public get length() {
    return this.entries.length
  }

  private isHigherPriority(priority: number, entry: Entry<T>): boolean {
    if (this.sorting === 'highToLow') {
      return priority > entry.priority
    } else if (this.sorting === 'lowToHigh') {
      return priority < entry.priority
    }
    throw new Error(`Unsupported sorting: ${this.sorting}`)
  }
}

export class Queue<T> {
  private values: T[] = []

  public add(v: T) {
    this.values.push(v)
  }

  public get(): T | null {
    return this.values.pop() ?? null
  }

  public get length() {
    return this.values.length
  }
}
