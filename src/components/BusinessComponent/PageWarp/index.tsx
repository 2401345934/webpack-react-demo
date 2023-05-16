import { Fragment } from 'react'
import styles from './styles.module.less'
import { deepFlatRouter, initRoute } from '@/router'
import localDataManagement from '@/utils/localDataManagement'
import { findCurrentRouter } from '@/router/helper'

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
    const item = findCurrentRouter(location.pathname)
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
