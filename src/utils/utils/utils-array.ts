// 计算数组的平均值
const average = (arr: any[]) => arr.reduce((a, b) => a + b) / arr.length

// 数组排序，{type} 1：从小到大 2：从大到小 3：随机
export const sortType = (arr: any, type: number = 1) => {
  return arr.sort((a: any, b: any) => {
    switch (type) {
      case 1:
        return a - b
      case 2:
        return b - a
      case 3:
        return Math.random() - 0.5
      default:
        return arr
    }
  })
}
/**
 * 递归地删除对象数组中的指定属性。
 *
 * @param {T[]} arr - 要删除属性的对象数组。
 * @param {string} prop - 要从对象中删除的属性名。
 * @return {T[]} - 删除指定属性后的新对象数组。
 * @template T
 */
function deletePropFromObjects<T extends { [key: string]: any }>(
  arr: T[],
  prop: string,
): T[] {
  // 遍历数组中的每个对象。
  return arr.map((obj: any) => {
    // 如果对象有指定的属性，则删除该属性。
    if (obj[prop]) {
      const { [prop]: deletedProp, ...rest } = obj
      obj = rest
    }

    // 如果对象有子对象，则递归地删除子对象中的指定属性。
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key] = deletePropFromObjects(obj[key], prop)
      }
    }

    // 返回更新后的对象。
    return obj
  })
}

export default {
  deletePropFromObjects,
  average,
  sortType,
}
