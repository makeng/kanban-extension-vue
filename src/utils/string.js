/* ---------------------------------------------------------------------------------------
* about:
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-
* ---------------------------------------------------------------------------------------- */
// 换掉字符中的转义字符
const replaceEscapeStr = (str) => {
  const list = [
    { origin: '&amp;', to: '&' } // 要还原的转义字符
  ]

  list.map(test => {
    const { origin, to } = test
    if (str.includes(origin)) {
      str = str.replace(origin, to)
    }
  })
  return str
}

export {
  replaceEscapeStr
}
