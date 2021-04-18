import './index.styl'
import getData from './get-data'

function getDataAndSend () {
  const contentDataList = getData()

  // 发送数据
  console.log('发送数据到插件...')
  chrome.runtime.sendMessage({
    key: 'kingdee',
    data: contentDataList
  })
}

// 持续尝试获取页面数据
function listenToDomGetData (cb) {
  const OPTION = {
    childList: true,
    subtree: true
  }

  const ob = new MutationObserver(mutationList => {
    cb && cb()
  })
  const body = document.getElementsByTagName('body')[0]
  ob.observe(body, OPTION)
}

console.log('Content script start...')
getDataAndSend()
listenToDomGetData(() => {
  getDataAndSend()
})
// update by time
setInterval(() => {
  getDataAndSend()
}, 2000)
