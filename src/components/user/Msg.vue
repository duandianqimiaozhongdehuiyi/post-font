<!--
 * @Author: your name
 * @Date: 2021-03-01 10:02:34
 * @LastEditTime: 2021-03-01 15:39:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\user\Msg.vue
-->
<!--  -->
<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px">
      <button class="layui-btn layui-btn-danger layui-hide" id="LAY_delallmsg">清空全部消息</button>
      <div id="LAY_minemsg" style="margin-top: 10px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-msg',
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
<style scoped></style>
