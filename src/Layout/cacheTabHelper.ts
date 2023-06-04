import { RouterType, deepFlatRouter, initTabItem } from '@/router'
import { findCurrentRouter } from '@/router/helper'
import localDataManagement from '@/utils/localDataManagement'
import GLOBAL_CONFIG from '@globalConfig'

type LocationType = {
  hash: string
  key: string
  pathname: string
  search: string
  state: null
}

// 获取
export const GET_CATCH_TAB = () => {
  if (!GLOBAL_CONFIG.TAB_CATCH_OPEN) return []
  const routerList: any = JSON.parse(
    localDataManagement.getItem('routerList') || '[]',
  )
  const originItems: any = []
  if (routerList.length) {
    routerList.forEach((item: any) => {
      const routerItem = findCurrentRouter(item.key)
      originItems.push({
        key: routerItem.key,
        label: routerItem.menuLabel || routerItem.label,
        closable: true,
        children: routerItem.element,
      })
    })
  }
  return originItems || [initTabItem]
}
// 新增
export const ADD_CATCH_TAB = (location: LocationType) => {
  if (!GLOBAL_CONFIG.TAB_CATCH_OPEN) return
  const uuid: string = location.pathname + location.search
  const routerItem: RouterType = findCurrentRouter(location.pathname)
  const routerList: any[] = JSON.parse(
    localDataManagement.getItem('routerList') || '[]',
  )
  if (!routerList.find((item: any) => item.uuid === uuid) && routerItem) {
    routerList.push({
      key: routerItem.key,
      label: routerItem.menuLabel || routerItem.label,
      closable: true,
      children: routerItem.element,
      uuid,
    })
    localDataManagement.setItem('routerList', JSON.stringify(routerList))
  }
}

// 修改状态
// 删除
export const DELETE_CATCH_TAB = (uuid: string) => {
  if (!GLOBAL_CONFIG.TAB_CATCH_OPEN) return
  let routerList: any[] = JSON.parse(
    localDataManagement.getItem('routerList') || '[]',
  )
  routerList = routerList.filter((item: any) => item.uuid !== uuid)
  localDataManagement.setItem('routerList', JSON.stringify(routerList))
}

// 清空
export const CLEAR_CATCH_TAB = () => {
  if (!GLOBAL_CONFIG.TAB_CATCH_OPEN) return
  localDataManagement.setItem('routerList', JSON.stringify([]))
}
