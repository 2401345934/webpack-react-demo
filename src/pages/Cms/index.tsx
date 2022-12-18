import React from 'react'
import PageWarp from '@/components/BusinessComponent/PageWarp'
import styles from './styles.module.less'
import CenterContent from './components/CenterContent'
import ConfigContext from './components/ConfigContent'
import ComponentsContent from './components/ComponentsContent'

const Component: React.FC = (): JSX.Element => {
  return (
    <PageWarp>
      <div className={styles.warp}>
        {/* 组件区域 */}
        <div className={styles.left}>
          <ComponentsContent></ComponentsContent>
        </div>
        {/* 展示区域 */}
        <div className={styles.center}>
          <CenterContent></CenterContent>
        </div>
        {/* 配置区域 */}
        <div className={styles.right}>
          <ConfigContext></ConfigContext>
        </div>
      </div>
    </PageWarp>
  )
}

export default Component
