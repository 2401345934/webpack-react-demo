import utils from '@/utils'
import { RouterType, deepFlatRouter } from './index'
/**
 * 生成路由项的 key 和 path 属性
 *
 * @param {RouterType[]} list 路由项列表
 * @returns {RouterType[]} 更新后的路由项列表
 */
export const generateRouterItemKey = (list: RouterType[]): RouterType[] => {
  const deepList = utils.deepClone(list)
  /**
   * 递归生成路由项的 key 和 path 属性
   *
   * @param {RouterType[]} arr 路由项列表
   * @param {RouterType | undefined} parent 父级路由项
   * @returns {void}
   */
  function deepGenerate(arr: RouterType[], parent?: RouterType): void {
    arr.forEach((item: RouterType) => {
      item.path = parent ? `${parent.path}/${item.path}` : item.path
      item.key = item.path
      // 回溯上一级的label
      const label = Array.isArray(item.label) ? item.label : [item.label]
      // 回溯上一级的path
      const path = Array.isArray(item.path) ? item.path : [item.path]
      item.labelList = parent ? [parent?.label, ...label] : [item.label]
      item.pathList = parent ? [parent.path, ...path] : [item.path]
      if (item.children) {
        deepGenerate(item.children, item)
      }
    })
  }
  deepGenerate(deepList)
  return deepList
}

// 递归执行路由的 children 属性中的函数
export const generateRouterItemFnc = (list: any[]): any[] => {
  /**
   * 递归生成路由项的 key 和 path 属性
   *
   * @param {RouterType[]} arr 路由项列表
   * @param {RouterType | undefined} parent 父级路由项
   * @returns {void}
   */
  function deepGenerate(arr: any[], parent?: RouterType): void {
    arr.forEach((item: any) => {
      if (item.element) {
        item.element = item.element()
      }
      if (item.children) {
        deepGenerate(item.children, item)
      }
    })
  }
  deepGenerate(list)
  return list
}

/**
 * 将嵌套路由项数组转换为扁平路由项数组
 *
 * @param {RouterType[]} arr 嵌套路由项数组
 * @returns {RouterType[]} 扁平路由项数组
 */
export const flattenRouter = (arr: RouterType[]): RouterType[] => {
  return arr.reduce((prev: RouterType[], next: RouterType) => {
    return prev.concat(
      Array.isArray(next.children) ? flattenRouter(next.children) : next,
    )
  }, [])
}

/**
 * Find the current router from the deepFlatRouter array that matches the given location object.
 *
 * @param {any} location - The location object to match against.
 * @return {RouterType | undefined} - The router object that matches the location, or undefined if no match is found.
 */
export const findCurrentRouter = (key: string): any => {
  return (
    deepFlatRouter.find((route: RouterType) => `/${route.path}` === key) || {}
  )
}
