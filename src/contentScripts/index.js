import './index.styl'
import getData from '../popup/js/get-data'

let contentDataList = []
// 持续尝试获取页面数据
const constantlyGetContentDataList = () => {
  // 页面数据
  const timer = setInterval(() => {
    contentDataList = getData()
    console.log('获取页面数据...', contentDataList)
  }, 500)
}

console.log('Content script start...')
constantlyGetContentDataList()

export {
  contentDataList
}
