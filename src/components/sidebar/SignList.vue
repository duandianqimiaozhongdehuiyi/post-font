<!--
 * @Author: your name
 * @Date: 2021-03-02 11:13:06
 * @LastEditTime: 2021-03-02 11:22:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\sidebar\SignList.vue
-->
<!--  -->
<template>
  <div class="model" v-show="isShow">
    <div class="mask" @click="close()"></div>
    <div class="layui-layer layui-layer-page" :class="{ active: isShow }">
      <div class="layui-layer-title">
        签到活跃榜
        <i class="layui-icon layui-icon-close pull-right" @click="close()"></i>
      </div>
      <div class="layui-layer-content pd0">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li :class="{ 'layui-this': current === 0 }" @click="choose(0)">最新签到</li>
            <li :class="{ 'layui-this': current === 1 }" @click="choose(1)">今日最快</li>
            <li :class="{ 'layui-this': current === 2 }" @click="choose(2)">签到总榜</li>
          </ul>
          <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
              <li v-for="(item, index) in lists" :key="'sign' + index">
                <img src="/img/header.jpeg" alt="" class="mr1" />
                <cite class="fly-link">{{ item.name }}</cite>
                <span class="fly-grey" v-if="current !== 2">签到于 {{ item.created }}</span>
                <span class="fly-grey" v-else
                  >已经连续签到<i class="orange">{{ item.count }}</i
                  >天</span
                >
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      current: 0,
      lists: [
        {
          name: 'test1',
          count: 4,
          created: '2019-01-01',
        },
        {
          name: 'test2',
          count: 3,
          created: '2019-01-01',
        },
        {
          name: 'test3',
          count: 2,
          created: '2019-01-01',
        },
        {
          name: 'test4',
          count: 1,
          created: '2019-01-01',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {
    close() {
      this.$emit('close')
    },
    choose(val) {
      this.current = val
    },
  },
  created() {},
  mounted() {},
}
</script>
<style scoped></style>
