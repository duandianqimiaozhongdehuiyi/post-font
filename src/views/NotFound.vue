<!--
 * @Author: your name
 * @Date: 2021-03-03 09:47:09
 * @LastEditTime: 2021-03-03 09:58:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\user\common\NotFound.vue
-->
<!--  -->
<template>
  <div class="layui-coontainer flex">
    <img src="../assets/logo.png" width="100" alt="" />
    <p>找不到页面了</p>
    <router-link class="layui-btn" to="/"> 回到首页 </router-link>
  </div>
</template>

<script>
export default {
  name: 'notfound',
  components: {},
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
<style scoped lang="scss">
.flex {
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
p {
  padding-bottom: 15px;
  padding-top: 10px;
  color: #ddd;
}
</style>
