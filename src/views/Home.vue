<!--
 * @Author: your name
 * @Date: 2021-02-22 16:59:35
 * @LastEditTime: 2021-02-24 09:45:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\views\Home.vue
-->
<!--  -->
<template>
  <div>
    <imooc-panel></imooc-panel>
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  components: {
    'imooc-panel': Panel,
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style scoped lang="scss"></style>
