<template>
  <div>
    <div class="box">
      <div
          class="box__col"
          v-for="item in allList"
          :class="item.active && 'active'"
      >
        <h1> {{ item.title }}</h1>
        <div
            class="box__card"
            v-for="sub in item.list"
            v-show="sub.code"
        >
          <h2>{{ sub.code }}</h2>
          <div class="box__card-content">{{ sub.desc }}</div>
        </div>
      </div>
    </div>
    <div class="msg">{{ msg }}</div>
  </div>
</template>

<script>
import './style/index.styl'
// import {contentDataList} from "../utils/mock"; // mock data
const originAllList = Object.freeze([
  { title: '详细需求&amp;评审完成', list: [] },
  { title: '原型设计&amp;评审完成', list: [], active: true },
  { title: '后端开发&amp;自测完成', list: [], active: true },
  { title: '前端联调&amp;自测完成', list: [], },
  { title: '需求验证中', list: [] },
  { title: '测试中', list: [] },
  { title: 'feature1测试完成', list: [] },
  { title: '灰度发布完成', list: [] },
])

export default {
  data () {
    return {
      msg: '如有建议或者发现 BUG，请联系马兆铿',
      allList: JSON.parse(JSON.stringify(originAllList))
    }
  },
  mounted () {
    this.addBgListener()
  },
  methods: {
    // 监听背景窗口
    addBgListener () {
      console.log('lister messager')
      chrome.runtime.onMessage.addListener((message) => {
        const { key, data } = message
        if (key === 'kingdee' && data) {
          this.allList = this.classifyAllList(data)
        }
      })
    },
    // 获取周期列表
    classifyAllList (originList) {
      const allList = JSON.parse(JSON.stringify(originAllList))

      allList.forEach(item => {
        const { title, list } = item
        originList.forEach(sub => {
          if (sub.current === title) {
            list.push(sub)
          }
        })
      })
      return allList
    }
  }
}
</script>
