export type MENU_LAYOUT_LIST_TYPE = {
  title: string
  value: string
}

interface GlobalConfig {
  IS_OPEN_TAB: boolean
  TAB_CATCH_OPEN: boolean
  UPDATE_SETTING_OPEN: boolean
  UPDATE_THEME_OPEN: boolean
  IS_OPEN_MENU_ACTIVE_CHANGE: boolean
  IS_OPEN_MENU_TOGGLE_ACTIVE: boolean
  IS_OPEN_LAYOUT_WIDTH: boolean
  IS_OPEN_GLOBAL_SEARCH: boolean
  MENU_LAYOUT_LIST: Array<MENU_LAYOUT_LIST_TYPE>
  LAYOUT_LIST: Array<MENU_LAYOUT_LIST_TYPE>
}

const GLOBAL_CONFIG: GlobalConfig = {
  // 是否开启多页签
  IS_OPEN_TAB: true,
  // 是否开启 TAB 切换记忆功能
  TAB_CATCH_OPEN: false,
  // 是否开启全局配置功能
  UPDATE_SETTING_OPEN: true,
  // 是否开启 修改主题色功能
  UPDATE_THEME_OPEN: true,
  // 是否支持导航栏切换
  IS_OPEN_MENU_ACTIVE_CHANGE: true,
  // 是否支持展开收取menu
  IS_OPEN_MENU_TOGGLE_ACTIVE: true,
  // 是否开启页面布局宽度切换
  IS_OPEN_LAYOUT_WIDTH: true,
  // 是否支持全局搜索
  IS_OPEN_GLOBAL_SEARCH: true,
  // 页面布局模式
  LAYOUT_LIST: [
    {
      title: '满屏自适应',
      value: '100vw',
    },
    {
      title: '定宽居中',
      value: '80vw',
    },
  ],
  // 导航栏模式
  MENU_LAYOUT_LIST: [
    {
      title: 'SLIDE',
      value: 'slide',
    },
    {
      title: 'HEADER',
      value: 'header',
    },
    {
      title: 'SLIDEANDHEADER',
      value: 'slideAndHeader',
    },
  ],
}

export default GLOBAL_CONFIG
