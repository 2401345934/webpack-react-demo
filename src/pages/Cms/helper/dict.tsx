import { TypeObjStr } from '@/utils/utilsTypes.type'
import LinePicture from '../components/components/LinePicture/center'
import LinePictureConfig from '../components/components/LinePicture/config'

import LineVideo from '../components/components/LineVideo/center'
import LineVideoConfig from '../components/components/LineVideo/config'

type COMPONENTS_TYPE_TYPE = TypeObjStr
type COMPONENTS_MAPPER_TYPE = {
  [key: string]: (props: any) => JSX.Element
}
export const COMPONENTS_TYPE: COMPONENTS_TYPE_TYPE = {
  YI_HANG_YI_TU: '一行一图',
  YI_HANG_YI_VIDEO: '一行一视频'
}

export const INIT_PARAMS: any = {
  config: {
    styles: {}
  }
}

export const COMPONENTS_MAPPER: COMPONENTS_MAPPER_TYPE = {
  YI_HANG_YI_TU: (props: any) => <LinePicture {...props}></LinePicture>,
  YI_HANG_YI_VIDEO: (props: any) => <LineVideo {...props}></LineVideo>
}

export const CONFIG_COMPONENT_MAPPER: COMPONENTS_MAPPER_TYPE = {
  YI_HANG_YI_TU: (props: any) => (
    <LinePictureConfig {...props}></LinePictureConfig>
  ),
  YI_HANG_YI_VIDEO: (props: any) => (
    <LineVideoConfig {...props}></LineVideoConfig>
  )
}
