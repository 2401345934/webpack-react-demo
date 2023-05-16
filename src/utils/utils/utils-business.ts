// 计算首屏加载时间
const getFirstScreenRenderingTime = (): number => {
  return new Date().getTime() - performance.timing.navigationStart
}

// 网页上获取选定的文本
const getSelectedText = (): string | undefined => {
  if (window && window.getSelection) {
    return window.getSelection()?.toString()
  }
  return ''
}

const toggleFullscreen = ({
  fullscreenFlag,
  className,
}: {
  fullscreenFlag: boolean
  className: string
}) => {
  // true 是全屏幕
  // false  取消全凭
  const isFullScreen: any =
    document.fullscreen ||
    (document as any).webkitIsFullScreen ||
    (document as any).mozFullScreen
  const contentEle: any = document.querySelector(`.${className}`)
  // 全屏幕
  if (contentEle && !fullscreenFlag) {
    let fullScreenEle: any =
      contentEle.requestFullscreen ||
      contentEle.mozRequestFullScreen ||
      contentEle.webkitRequestFullScreen ||
      contentEle.msRequestFullscreen
    if (fullScreenEle) {
      // 是否全屏
      fullScreenEle.call(contentEle)
    }
  }
  // 取消全凭
  if (document && isFullScreen && fullscreenFlag) {
    let exitFullScreen: any =
      document.exitFullscreen ||
      (document as any).mozCancelFullScreen ||
      (document as any).webkitCancelFullScreen ||
      (document as any).msExitFullscreen
    if (exitFullScreen) {
      // 是否取消 全屏
      exitFullScreen.call(document)
    }
  }
}

function uuid() {
  return URL.createObjectURL(new Blob()).substr(-36)
}
function deepClone(value: any): any {
  if (Array.isArray(value)) {
    // 处理数组
    return value.map(item => deepClone(item))
  } else if (typeof value === 'object' && value !== null) {
    // 处理对象
    const result: any = {}
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        result[key] = deepClone(value[key])
      }
    }
    return result
  } else {
    // 处理原始值和函数
    return value
  }
}

export default {
  uuid,
  deepClone,
  getFirstScreenRenderingTime,
  getSelectedText,
  toggleFullscreen,
}
