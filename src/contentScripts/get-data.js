// 执行
function getData () {
  // 各种类名
  const CLASSNAME = {
    HEAD: 'ag-header',
    HEAD_INNER: 'ag-header-cell-text',
    CONTAINER: 'ag-center-cols-container',
    ROW: 'ag-row',
    ROW_TEXT: '_19IrTnxB',
    ROW_LINK: '_3mxww4IO'
  }
  // 表头和对应的字段名称
  const TITLE_LIST = [
    { title: '用户故事编码', propName: 'code' },
    { title: '用户故事名称', propName: 'desc' },
    { title: '迭代阶段', propName: 'period' },
    { title: '状态', propName: 'current' },
  ]

  //排序函数，配合 Array.prototype.sort 使用
  const compare = property =>
    (obj1, obj2) => (obj1[property] > obj2[property] ? 1 : -1) // 升序
  // 获取类元素
  function getSubClassEleList (ele, className) {
    return ele.getElementsByClassName(className)
  }

  // 获取标题列表
  function getTitleList () {
    let res = []
    const getInnerText = el => el.children[0].innerHTML
    // 特殊处理。表格数据会突然变化
    const specialHandle = res => {
      console.log(res[0])
      // 扔掉 '#'
      if (res[0] === '#') {
        res.shift()
      }
      // UI 上与格子反过来
      if (res[0] !== '用户故事编码') {
        res.reverse()
      }

      console.log(res)
      return res
    }

    const tableHead = getSubClassEleList(document, CLASSNAME.HEAD)[0]
    const headList = getSubClassEleList(tableHead, CLASSNAME.HEAD_INNER)
    for (let i = 0; i < headList.length; i++) {
      const item = headList[i]
      const text = getInnerText(item)
      res.push(text)
    }

    return specialHandle(res)
  }

  // 获取内容数据列表
  function getContent () {
    const tableBody = getSubClassEleList(document, CLASSNAME.CONTAINER)[0]
    if (!tableBody) {
      return false
    }

    const rowList = getSubClassEleList(tableBody, CLASSNAME.ROW)
    const bodyList = []

    for (let i = 0; i < rowList.length; i++) {
      const strList = []
      const row = rowList[i] // 一行

      if (row) {
        const cellList = row.children
        for (let j = 0; j < cellList.length; j++) {
          const cell = cellList[j]
          const textBox = getSubClassEleList(cell, CLASSNAME.ROW_TEXT)[0]
          const linkBox = getSubClassEleList(cell, CLASSNAME.ROW_LINK)[0]

          const text = textBox && textBox.innerHTML // 字段
          const link = linkBox && linkBox.innerHTML // 链接
          strList.push(link ? link : text)
        }
      }

      bodyList.push(strList)
    }
    return bodyList
  }

  // 列表数据转对象
  function listToObj (list, headProp) {
    const res = {}

    for (const key in headProp) {
      const index = headProp[key]
      res[key] = list[index]
    }
    return res
  }

  // 标题列表转对象
  function headListToPropObj (list) {
    const res = {}
    // 列表项标记上相应的 index
    const markPropName = list => {
      const titleList = [...TITLE_LIST]
      list.forEach((str, index) => {
        const foundIndex = titleList.findIndex(item => item.title === str)
        if (foundIndex >= 0) {
          titleList[foundIndex].index = index
        }
      })
      return titleList
    }
    // 简化对象
    const setPropToRes = (obj) => {
      const { propName, index } = obj
      res[propName] = index
    }

    list = markPropName(list)
    list.forEach(item => setPropToRes(item))
    return res
  }

  // 执行
  const bodyList = getContent()
  if (!bodyList || !bodyList.length) {
    return []
  }
  const headList = getTitleList()
  const headProp = headListToPropObj(headList)
  const contentList = bodyList.map(list => listToObj(list, headProp))
  // 排序
  contentList.sort(compare('current'))
    .sort(compare('period'))

  return contentList
}

export default getData


