// 执行
function getData() {
  //排序函数，配合 Array.prototype.sort 使用
  const compare = property =>
    (obj1, obj2) => (obj1[property] > obj2[property] ? 1 : -1); // 升序
  // 获取类元素
  function getSubClassEleList(ele, className) {
    return ele.getElementsByClassName(className);
  }

  function getContent() {
    const tableBody = getSubClassEleList(document, 'ag-center-cols-container')[0];
    if (!tableBody) {
      return false;
    }

    const rowList = getSubClassEleList(tableBody, 'ag-row');
    const allStrList = [];

    for (let i = 0; i < rowList.length; i++) {
      const strList = [];
      const row = rowList[i]; // 一行

      if (row) {
        const cellList = row.children;
        for (let j = 0; j < cellList.length; j++) {
          const cell = cellList[j];
          const textBox = getSubClassEleList(cell, '_19IrTnxB')[0];
          const stateBox = getSubClassEleList(cell, '_3mxww4IO')[0];

          const text = textBox && textBox.innerHTML; // 字段
          const state = stateBox && stateBox.innerHTML; // 状态

          strList.push(state ? state : text);
        }
      }

      allStrList.push(strList);
    }

    return allStrList;
  }

  function listToObj(list) {
    return {
      code: list[0],
      desc: list[1],
      period: list[2],
      current: list[4]
    };
  }

  function describeObj(obj) {
    return `${obj.code} ${obj.period} ${obj.current} ${obj.desc}`;
  }

  // 执行
  const allStrList = getContent();
  if (!allStrList || !allStrList.length) {
    return [];
  }
  const objList = allStrList.map(list => listToObj(list));
  // 排序
  objList.sort(compare('current'))
    .sort(compare('period'));
  // 打印
  objList.forEach(item => {
    console.log(describeObj(item));
  });

  return objList;
}

console.log(getData())

// export default getData


