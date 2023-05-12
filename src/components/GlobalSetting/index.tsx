import { SettingTwoTone } from '@ant-design/icons'
import styles from './index.module.less'
import GLOBAL_CONFIG from '@globalConfig'
import utils from '@/utils'

type PropsType = {
  menuLayout: string
  setMenuLayout: (e: string) => void
}
export default (props: PropsType) => {
  const { menuLayout, setMenuLayout } = props
  const [open, setOpen] = useState<boolean>(false)
  const handleToggleSetting = (): void => {
    setOpen(!open)
  }
  // 布局模式
  const [layoutMode, setLayoutMode] = useState<string>(
    GLOBAL_CONFIG.LAYOUT_LIST[0].value,
  )

  useEffect(() => {
    utils.updateCSSVar('max-layout-width', layoutMode)
  }, [layoutMode])

  const changeTabPosition = (e: any) => {
    setMenuLayout(e.target.value)
  }
  const changeLayoutMode = (e: any) => {
    setLayoutMode(e.target.value)
  }

  return (
    <>
      <Drawer
        title="全局配置"
        placement="right"
        onClose={handleToggleSetting}
        open={open}
      >
        {/* 导航栏切换 */}
        {GLOBAL_CONFIG.IS_OPEN_MENU_ACTIVE_CHANGE && (
          <>
            <Divider plain>导航栏模式</Divider>
            <Radio.Group value={menuLayout} onChange={changeTabPosition}>
              {GLOBAL_CONFIG.MENU_LAYOUT_LIST.map(item => {
                return (
                  <Radio.Button key={item.value} value={item.value}>
                    {item.title}
                  </Radio.Button>
                )
              })}
            </Radio.Group>
          </>
        )}
        {/* 页宽模式 */}
        {GLOBAL_CONFIG.IS_OPEN_LAYOUT_WIDTH && (
          <>
            <Divider plain>页宽模式</Divider>
            <Radio.Group value={layoutMode} onChange={changeLayoutMode}>
              {GLOBAL_CONFIG.LAYOUT_LIST.map(item => {
                return (
                  <Radio.Button key={item.value} value={item.value}>
                    {item.title}
                  </Radio.Button>
                )
              })}
            </Radio.Group>
          </>
        )}
      </Drawer>
      <div className={styles.settingWarp}>
        <SettingTwoTone
          className={styles.settingIcon}
          spin
          onClick={handleToggleSetting}
        />
      </div>
    </>
  )
}
