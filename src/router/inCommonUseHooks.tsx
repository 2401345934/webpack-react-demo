import { RouterType } from './index'
import { AlertTwoTone } from '@ant-design/icons'
import IncludesSubmenusWarp from '@/components/IncludesSubmenusWarp'

const initRouter: RouterType[] = [
  {
    path: 'hooks',
    icon: <AlertTwoTone />,
    authCode: '0009',
    label: '常用hooks',
    element: () => <IncludesSubmenusWarp />,
    children: [],
  },
]

export default initRouter
