<!--
 * @Author: your name
 * @Date: 2021-03-02 11:12:46
 * @LastEditTime: 2021-03-02 11:17:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\sidebar\SignInfo.vue
-->
<!--  -->
<template>
  <div class="model" v-show="isShow">
    <div class="mask" @click="close()"></div>
    <div class="layui-layer layui-layer-page" :class="{ active: isShow }">
      <div class="layui-layer-title">
        签到说明
        <i class="layui-icon layui-icon-close pull-right" @click="close()"></i>
      </div>
      <div class="layui-layer-content">
        <div class="layui-text">
          <blockquote class="layui-elem-quote">"签到可获得的社区积分，规则如下"</blockquote>
          <table class="layui-table">
            <thead>
              <tr>
                <th>连续签到天数</th>
                <th>每天可获积分</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&lt;5</td>
                <td>5</td>
              </tr>
              <tr>
                <td>&ge;5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>&ge;15</td>
                <td>15</td>
              </tr>
              <tr>
                <td>&ge;30</td>
                <td>20</td>
              </tr>
              <tr>
                <td>&lt;100</td>
                <td>30</td>
              </tr>
              <tr>
                <td>&lt;365</td>
                <td>50</td>
              </tr>
            </tbody>
          </table>
          <div>
            <p class="">中间若有间隔，则连续天数重新计算</p>
            <p class="orange">不可重复程序自动签到，否则积分清零</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign-info',
  props: {
    isShow: {
      default: false,
      type: Boolean,
    },
  },
  components: {},
  data() {
    return {
      currretn: 0,
    }
  },
  computed: {},
  watch: {},
  methods: {
    close() {
      this.$emit('close')
    },
  },
  created() {},
  mounted() {},
}
</script>
<style scoped></style>
