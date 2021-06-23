<!--
 * @Author: your name
 * @Date: 2021-03-01 10:01:57
 * @LastEditTime: 2021-03-01 15:38:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\user\Posts.vue
-->
<!--  -->
<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title" id="LAY_mine">
        <li lay-id="mypost">
          <router-link :to="{ name: 'mypost' }">我的发帖</router-link>
        </li>
        <li lay-id="mycollection">
          <router-link :to="{ name: 'mycollection' }">我收藏的贴</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-posts',
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
