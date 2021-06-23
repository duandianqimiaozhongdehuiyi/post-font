<!--
 * @Author: your name
 * @Date: 2021-03-23 14:25:49
 * @LastEditTime: 2021-03-23 15:04:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\views\Test.vue
-->
<!--  -->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <!-- // make list scrollable -->
      <virtual-list
        style="height: 360px; overflow-y: auto"
        :data-key="'uid'"
        :data-sources="items"
        :data-component="itemComponent"
      />
    </div>
  </div>
</template>

<script>
import Item from './Item'
import VirtualList from 'vue-virtual-scroll-list'
export default {
  components: { 'virtual-list': VirtualList },
  data() {
    return {
      itemComponent: Item,
      items: [],
    }
  },
  computed: {},
  watch: {},
  methods: {
    forss() {
      const items = []
      for (let i = 1; i <= 1000000; i++) {
        items.push({
          uid: i,
          text: i + '12123d5a45ad56addadjak放假啊就恢复健康发号放假安徽科技发货方就按客户',
        })
      }
      // this.items = items
      this.items = Object.freeze(items)
    },
  },
  created() {},
  mounted() {
    this.forss()
  },
}
</script>
<style scoped></style>
