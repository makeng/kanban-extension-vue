import './index.styl'
import getData from './get-data'


const SEND_TIME_GAP = 800

// 持续尝试获取页面数据
const constantlyGetContentDataList = () => {
  // 页面数据
  const timer = setInterval(() => {
    const contentDataList = getData()

    // 发送数据
    console.log('发送数据到插件...')
    chrome.runtime.sendMessage({
      key:'kingdee',
      data: contentDataList
    })
  }, SEND_TIME_GAP)
}

console.log('Content script start...')
constantlyGetContentDataList()
