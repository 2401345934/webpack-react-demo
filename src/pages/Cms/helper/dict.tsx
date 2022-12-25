import LinePicture from '../components/components/LinePicture/center'
import LineVideo from '../components/components/LineVideo/center'

type COMPONENTS_TYPE_TYPE = {
  [key: string]: string
}
type COMPONENTS_MAPPER_TYPE = {
  [key: string]: JSX.Element
}
export const COMPONENTS_TYPE: COMPONENTS_TYPE_TYPE = {
  YI_HANG_YI_TU: '一行一图',
  YI_HANG_YI_VIDEO: '一行一视频'
}

export const COMPONENTS_MAPPER: COMPONENTS_MAPPER_TYPE = {
  YI_HANG_YI_TU: <LinePicture></LinePicture>,
  YI_HANG_YI_VIDEO: <LineVideo></LineVideo>
}
