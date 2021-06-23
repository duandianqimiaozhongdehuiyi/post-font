<!--
 * @Author: your name
 * @Date: 2021-03-01 10:01:35
 * @LastEditTime: 2021-03-01 14:46:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\user\Settings.vue
-->
<!--  -->
<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title" id="LAY_mine">
        <li lay-id="info">
          <router-link :to="{ name: 'info' }">我的资料</router-link>
        </li>
        <li lay-id="avatar">
          <router-link :to="{ name: 'pic' }">头像</router-link>
        </li>
        <li lay-id="pass">
          <router-link :to="{ name: 'password' }">密码</router-link>
        </li>
        <li lay-id="bind">
          <router-link :to="{ name: 'accounts' }">帐号绑定</router-link>
        </li>
      </ul>
      <div class="layui-tab-content" style="padding: 20px 0">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-settints',
  components: {},
  data() {
    return {
      user: {},
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style scoped></style>
