export type formItemTypes = {
  label: string
  name: string
  type: string
  props?: any
  rules?: any[]
  span?: number
  source?: () => Array<any> | any[]
}
export type formPropsType = {
  // 表单项
  formItems?: Array<formItemTypes>
  // 搜索回调
  searchCallback?: (v: any) => void
  // 重置回调
  resetCallback?: () => void
}
