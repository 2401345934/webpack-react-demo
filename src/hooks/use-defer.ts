/*
 * 按照浏览器空闲时间优化性能渲染
 * */
const useDefer = (maxCount = 1000) => {
  let frameCount = 0
  const refreshFrameCount = () => {
    requestAnimationFrame(() => {
      frameCount++
      if (frameCount < maxCount) {
        refreshFrameCount()
      }
    })
  }
  refreshFrameCount()
  return function (showInFrameCount: number) {
    return frameCount >= showInFrameCount
  }
}

/*
 * const defer = useDefer()
 * v-if defer(number)
 * */
export default useDefer
