import type { Gas } from '../typings'

export function transformObj(o: Gas | object = {}) {
  return Object.entries(o)
    .reduce<[string, number][][]>(
      (acc, _, i, self) => (i % 4 ? acc : [...acc, self.slice(i, i + 4)]),
      []
    )
    .map((e) => e.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}))
}

type numberObj = { [k: string]: number }

export function average<G extends Array<numberObj>>(arr: G): G[number] {
  if (arr.length) {
    const keys = Object.keys(arr[0])
    let output: numberObj = {}

    for (const key of keys) {
      output[key] = Math.round(
        arr.map((e) => e[key]).reduce((prev, cur) => prev + cur, 0) / arr.length
      )
    }
    return output
  }
  return {}
}
