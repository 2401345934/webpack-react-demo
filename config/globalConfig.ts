export type MENU_LAYOUT_LIST_TYPE = {
  title: string
  value: string
}

interface GlobalConfig {
  TAB_CATCH_OPEN: boolean
  UPDATE_SETTING_OPEN: boolean
  UPDATE_THEME_OPEN: boolean
  IS_OPEN_MENU_ACTIVE_CHANGE: boolean
  IS_OPEN_MENU_TOGGLE_ACTIVE: boolean
  MENU_LAYOUT_LIST: Array<MENU_LAYOUT_LIST_TYPE>
}

const GLOBAL_CONFIG: GlobalConfig = {
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
