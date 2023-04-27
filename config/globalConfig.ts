interface GlobalConfig {
  TAB_CATCH_OPEN: boolean
  UPDATE_SETTING_OPEN: boolean
  UPDATE_THEME_OPEN: boolean
}

const GLOBAL_CONFIG: GlobalConfig = {
  // 是否开启 TAB 切换记忆功能
  TAB_CATCH_OPEN: false,
  // 是否开启配置功能
  UPDATE_SETTING_OPEN: true,
  // 是否开启 修改主题色功能
  UPDATE_THEME_OPEN: true
}

export default GLOBAL_CONFIG
