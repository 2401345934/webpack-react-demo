import { RouterType, deepFlatRouter } from '@/router'
import localDataManagement from '@/utils/localDataManagement'

type LocationType = {
  hash: string
  key: string
  pathname: string
  search: string
  state: null
}

// 获取
export const GET_CATCH_TAB = () => {
  const routerList: any = JSON.parse(
    localDataManagement.getItem('routerList') || '[]'
  )
  const originItems: any = []
  if (routerList.length) {
    routerList.forEach((item: any) => {
      const routerItem = deepFlatRouter.find(
        (route: RouterType) => route.path === item.key
      )
      originItems.push({
        key: routerItem.key,
        label: routerItem.menuLabel || routerItem.label,
        closable: true,
        children: routerItem.element
      })
    })
  }
  return originItems || []
}
// 新增
export const ADD_CATCH_TAB = (location: LocationType) => {
  const uuid: string = location.pathname + location.search
  const routerItem: RouterType = deepFlatRouter.find(
    (route: RouterType) => `/${route.path}` === location.pathname
  )
  const routerList: any[] = JSON.parse(
    localDataManagement.getItem('routerList') || '[]'
  )
  if (!routerList.find((item: any) => item.uuid === uuid) && routerItem) {
    routerList.push({
      key: routerItem.key,
      label: routerItem.menuLabel || routerItem.label,
      closable: true,
      children: routerItem.element,
      uuid
    })
    localDataManagement.setItem('routerList', JSON.stringify(routerList))
  }
}

// 修改状态
// 删除
export const DELETE_CATCH_TAB = (uuid: string) => {
  let routerList: any[] = JSON.parse(
    localDataManagement.getItem('routerList') || '[]'
  )
  routerList = routerList.filter((item: any) => item.uuid !== uuid)
  localDataManagement.setItem('routerList', JSON.stringify(routerList))
}

// 清空
export const CLEAR_CATCH_TAB = () => {
  localDataManagement.setItem('routerList', JSON.stringify([]))
}
