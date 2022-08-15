export const objectsCompare = (obj1: any, obj2: any) => {
  if (obj1.length !== obj2.length) return false

  for (let i = 0; i < obj1.length; i++) {
    const key1 = Object.keys(obj1[i])
    const key2 = Object.keys(obj2[i])
    for (let k of key1) {
      if (obj1[i][`${k}`] !== obj2[i][`${k}`]) {
        return false
      }
    }
  }

  return true
}
