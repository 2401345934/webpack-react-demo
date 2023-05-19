import utils from '@/utils'

export const getUserAuthCode = (): string[] => {
  return ['0003']
}

export const isHavePermission = (code: string): boolean => {
  // return getUserAuthCode().includes(code)
  return true
}

/**
 * 根据 authCode 字段和提供的 authCode 数组筛选路由数组。
 *
 * @param {any[]} routes - 要筛选的路由数组。
 * @param {string[]} [authCodes=getUserAuthCode()] - 要筛选的 authCode 数组。
 * @return {any[]} - 符合给定 authCode 的新路由数组。
 */

const filteredRoutesFn = (routes: any[]): any[] => {
  const filteredRoutes: any[] = []

  for (const route of routes) {
    if (route.authCode) {
      // 如果路由有 authCode 字段，则检查它是否匹配提供的 authCode 数组中的任何一个。
      if (isHavePermission(route.authCode)) {
        if (route.children) {
          // 如果路由有子路由，则递归筛选子路由。
          route.children = filteredRoutesFn(route.children)
        }
        filteredRoutes.push(route)
      }
    } else {
      // 如果路由没有 authCode 字段，则直接添加到新路由数组中。
      filteredRoutes.push(route)
    }
  }
  return filteredRoutes
}

export function filterRoutesByAuthCode(routes: any[]): any[] {
  const list = filteredRoutesFn(routes)
  return utils.deletePropFromObjects(list, 'authCode')
}
