import { SettingTwoTone } from '@ant-design/icons'
import styles from './index.module.less'
import { Divider, Drawer, Radio } from 'antd'
import { useState } from 'react'

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
  const changeTabPosition = (e: any) => {
    setMenuLayout(e.target.value)
  }
  return (
    <>
      <Drawer
        title="全局配置"
        placement="right"
        onClose={handleToggleSetting}
        open={open}
      >
        <Divider plain>导航栏模式</Divider>
        <Radio.Group value={menuLayout} onChange={changeTabPosition}>
          <Radio.Button value="slide">SLIDE</Radio.Button>
          <Radio.Button value="header">HEADER</Radio.Button>
          <Radio.Button value="slideAndHeader">SLIDEANDHEADER</Radio.Button>
        </Radio.Group>
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
