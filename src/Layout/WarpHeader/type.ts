export type WarpHeaderPropsType = {
  collapsed: boolean
  defaultOpenKeys: string[]
  currentPath: string
  menuLayout: string
  changeTheme: (value: string) => void
  updateTheme: () => void
  setCollapsed: (e: boolean) => void
  setDefaultOpenKeys: (e: string[]) => void
  setChildrenRouterList: (e: any[]) => void
  setOpenSearch: (e: boolean) => void
  goRouter: (e: { key: string; keyPath: string[] }) => void
}
