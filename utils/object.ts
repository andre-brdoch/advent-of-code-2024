export function getTypedKeys<TObj extends object>(obj: TObj): (keyof TObj)[] {
  return Object.keys(obj) as Array<keyof typeof obj>
}
