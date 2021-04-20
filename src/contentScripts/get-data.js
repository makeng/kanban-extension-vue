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
    { title: '用户故事编码', propName: 'code', colId: 'number' },
    { title: '用户故事名称', propName: 'desc', colId: 'name' },
    { title: '迭代阶段', propName: 'period', colId: 'iteration_name' },
    { title: '状态', propName: 'current', colId: 'requirestatus_name' },
  ]

  //排序函数，配合 Array.prototype.sort 使用
  const compareAscending = property =>
    (obj1, obj2) => (obj1[property] > obj2[property] ? 1 : -1) // 升序
  // 获取类元素
  function getSubClassEleList (ele, className) {
    return ele.getElementsByClassName(className)
  }

  // 获取内容数据列表
  function getContent () {
    const tableBody = getSubClassEleList(document, CLASSNAME.CONTAINER)[0]
    if (!tableBody) {
      return false
    }

    const rowList = getSubClassEleList(tableBody, CLASSNAME.ROW)
    const bodyList = []
    const getClassInnerText = (dom, className) => {
      const box = getSubClassEleList(dom, className)[0]
      return box ? box.innerHTML : ''
    }

    for (let i = 0; i < rowList.length; i++) {
      const row = rowList[i] // 一行

      if (row) {
        const cellList = row.children
        const col = {}
        for (let j = 0; j < cellList.length; j++) {
          const cell = cellList[j]
          const colId = cell.getAttribute('col-id')
          TITLE_LIST.forEach(item => {
            if (colId === item.colId) {
              let text = getClassInnerText(cell, CLASSNAME.ROW_TEXT)
              const link = getClassInnerText(cell, CLASSNAME.ROW_LINK)
              col[item.propName] = link ? link : text
            }
          })
        }
        bodyList.push(col)
      }
    }
    return bodyList
  }

  // 执行
  const bodyList = getContent()
  if (!bodyList || !bodyList.length) {
    return []
  }
  // 排序
  bodyList.sort(compareAscending('current'))
    .sort(compareAscending('period'))

  return bodyList
}

// getData()

export default getData


