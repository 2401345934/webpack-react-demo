import { Context } from '@/pages/Cms'
import { CONFIG_COMPONENT_MAPPER } from '../../../helper/dict'

const Component: React.FC = (): JSX.Element => {
  const { sourceData, currentIndex }: any = useContext(Context)

  return (
    <div>
      {!!sourceData.length &&
        CONFIG_COMPONENT_MAPPER[sourceData[currentIndex].type](
          sourceData[currentIndex],
        )}
    </div>
  )
}

export default Component
