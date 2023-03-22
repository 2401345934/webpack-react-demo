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
  className
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
export default {
  uuid,
  getFirstScreenRenderingTime,
  getSelectedText,
  toggleFullscreen
}
