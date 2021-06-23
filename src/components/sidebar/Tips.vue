<!--
 * @Author: your name
 * @Date: 2021-02-23 11:19:20
 * @LastEditTime: 2021-02-26 11:43:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\sidebar\Tips.vue
-->
<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="fly-panel-main layui-row">
      <ul class="layui-clear imooc-quick">
        <li class="layui-col-xs6" v-for="(item, index) in lists" :key="'tips' + index">
          <a :href="item.link" target="_blank">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTips } from '@/api/content'
export default {
  name: 'tips',
  data() {
    return {
      lists: [],
    }
  },
  mounted() {
    getTips().then((res) => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  },
}
</script>

<style lang="scss" scoped>
$border-color: #f2f2f2;
.fly-panel-main {
  padding: 15px;
}
.imooc-quick {
  border: 1px solid $border-color;
  border-bottom: none;
  border-right: none;
  .layui-col-xs6 {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border: 1px solid $border-color;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-left: none;
    border-top: none;
    a {
      display: block;
    }
  }
}
</style>
