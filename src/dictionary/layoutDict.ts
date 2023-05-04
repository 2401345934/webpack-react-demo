export const initialThemeValueList = [
  {
    key: 'mainColor',
    initColor: '#000000',
    label: '主题色',
  },
  {
    key: 'textMainColor',
    initColor: '#000000',
    label: '文字主题色',
  },
  {
    key: 'borderMainColor',
    initColor: '#ff0000',
    label: '边框主题色',
  },
  {
    key: 'headerBackground',
    initColor: '#ffffff',
    label: 'header 主题色',
  },
  {
    key: 'menuBackground',
    initColor: '#ffffff',
    label: 'menu 主题色',
  },
  {
    key: 'activeMenuBackgroundColor',
    initColor: '#e09a9a',
    label: 'menu 激活背景色',
  },
]

// menu 菜单模式 枚举
export enum MENU_MODE {
  SLIDE = 'slide',
  HEADER = 'header',
  SLIDEANDHEADER = 'slideAndHeader',
}
