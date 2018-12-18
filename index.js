var loadScript = function (url) {
  return new Promise(function (resolve, reject) {
    let script = window.document.createElement('script')
    script.type = 'text/javascript'
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null
          resolve()
        }
      }
    } else {
      script.onload = function () {
        resolve()
      }
    }
    script.src = url
    window.document.body.appendChild(script)
  })
}

module.exports = module.exports.default = function (options) {
  options = options || {}
  let show = /demo.wysource.com.cn/g.test(window.HOST)
  if (typeof options.customShow !== 'undefined' && options.customShow !== null) {
    show = options.customShow
  }
  if (show) {
    Promise.all([
      loadScript('//cdn.jsdelivr.net/npm/eruda@latest'),
      loadScript('//cdn.jsdelivr.net/npm/eruda-vconsole@latest'),
      loadScript('//cdn.jsdelivr.net/npm/eruda-dom@latest')
    ]).then(function () {
      window.eruda.init(options)
      window.eruda.add(window.erudaDom)
      window.eruda.add(window.erudaVconsole)
      window.eruda.show('dom')
    })
  }
}
