// 根据 url 地址下载

const urlDownload = (url: string) => {
  let isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  let isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1
  if (isChrome || isSafari) {
    let link = document.createElement('a')
    link.href = url
    if (link.download !== undefined) {
      let fileName = url.substring(url.lastIndexOf('/') + 1, url.length)
      link.download = fileName
    }
    if (document.createEvent) {
      let e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download'
  }
  window.open(url, '_self')
  return true
}
export default {
  urlDownload
}
