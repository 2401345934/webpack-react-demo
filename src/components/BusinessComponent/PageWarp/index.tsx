import { useMount } from 'ahooks'
import { Fragment, useState } from 'react'
import styles from './styles.module.less'
import { useLocation } from 'react-router-dom'
import { deepFlatRouter, initRoute } from '@/router'

type PageWarpType = {
  isTitle?: boolean
  title?: string
  children: any
}
export default (props: PageWarpType): JSX.Element => {
  const { isTitle = true, title, children } = props
  const location = useLocation()
  const [routerItem, setRouterItem] = useState<any>({})

  useMount(() => {
    const item = deepFlatRouter.find(
      item => `/${item.path}` === location.pathname,
    )
    setRouterItem(item || initRoute)
  })
  return (
    <Fragment>
      <div className={styles.wrap}>
        {/* title */}
        {isTitle && (
          <div className={styles.title}>{title || routerItem?.label}</div>
        )}
        {children}
      </div>
    </Fragment>
  )
}
