import { RouterType } from './index'
/**
 * 生成路由项的 key 和 path 属性
 *
 * @param {RouterType[]} list 路由项列表
 * @returns {RouterType[]} 更新后的路由项列表
 */
export const generateRouterItemKey = (list: RouterType[]): RouterType[] => {
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
      // 是否需要带上 上一级别菜单的 label
      // item.menuLabel = parent ? `${parent.label}-${item.label}` : item.label
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
