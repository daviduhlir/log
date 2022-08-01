/**
 * Make array unique
 * @param array
 */
export function arrayUnique<T>(array: T[]): T[] {
  const a = array.concat()
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1)
      }
    }
  }
  return a
}

/**
 * Make array unique extended
 * @param array
 */
export function arrayUniqueExtended<T>(array: T[]): { times: number; item: T }[] {
  return arrayUnique(array).map(item => {
    const times = array.filter(i => i === item).length
    return {
      times,
      item,
    }
  })
}
