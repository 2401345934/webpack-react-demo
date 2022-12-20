import React, { createContext, useState } from 'react'
import PageWarp from '@/components/BusinessComponent/PageWarp'
import styles from './styles.module.less'
import CenterContent from './components/layout/CenterContent'
import ConfigContext from './components/layout/ConfigContent'
import ComponentsContent from './components/layout/ComponentsContent'

export const Context: any = createContext({
  sourceData: [],
  setSourceData: () => {}
})

const Component: React.FC = (): JSX.Element => {
  const [sourceData, setSourceData] = useState<any[]>([])

  return (
    <PageWarp>
      <Context.Provider
        value={{
          sourceData,
          setSourceData
        }}
      >
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
      </Context.Provider>
    </PageWarp>
  )
}

export default Component
