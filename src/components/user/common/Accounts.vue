<!--
 * @Author: your name
 * @Date: 2021-03-01 14:00:00
 * @LastEditTime: 2021-03-01 14:29:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\user\common\Accounts.vue
-->
<!--  -->
<template>
  <!-- 账号绑定 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ul class="app-bind">
      <li class="fly-msg" :class="user.qq_id ? 'app-havebind' : ''">
        <i class="iconfont icon-qq"></i>
        <span v-if="user.qq_id">已成功绑定，您可以使用QQ帐号直接登录Imooc社区，当然，您也可以</span>
        <a v-if="user.qq_id" href="javascript:;" class="acc-unbind" type="qq_id">解除绑定</a>
        <a v-else href="/app/qq" class="acc-bind" type="qq_id">立即绑定</a>
        <span>，即可使用QQ帐号登录Imooc社区</span>
      </li>
      <li class="fly-msg" :class="user.weibo_id ? 'app-havebind' : ''">
        <i class="iconfont icon-weibo"></i>
        <span v-if="user.weibo_id"
          >已成功绑定，您可以使用微博直接登录Imooc社区，当然，您也可以</span
        >
        <a v-if="user.weibo_id" href="javascript:;" class="acc-unbind" type="weibo_id">解除绑定</a>
        <a v-else href="/app/weibo/" class="acc-weibo" type="weibo_id">立即绑定</a>
        <span>，即可使用微博帐号登录Imooc社区</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'accounts',
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
