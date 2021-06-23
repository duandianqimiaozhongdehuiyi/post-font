<!--
 * @Author: your name
 * @Date: 2021-03-05 09:26:37
 * @LastEditTime: 2021-03-08 11:54:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\modules\editor\LinkAdd.vue
-->
<!--  -->
<template>
  <transition name="fade">
    <div class="layui-layer-page layui-layer-prompt edit-content">
      <div class="layui-layer-title">请输入合法链接</div>
      <div class="layui-layer-content">
        <input type="text" class="layui-layer-input" v-model="link" id="inputItem" />
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a
          href="javascript:void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
      <div class="layui-layer-btn">
        <a href="javascript:void(0)" class="layui-layer-btn0" @click="submit()">确定</a>
        <a href="javascript:void(0)" class="layui-layer-btn" @click="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'linkadd',
  components: {},
  data() {
    return {
      link: '',
    }
  },
  computed: {},
  watch: {},
  methods: {
    cancel() {
      this.$emit('closeEvent')
      this.link = ''
    },
    submit() {
      if (this.link === '') {
        document.getElementById('inputItem').focus()
        this.$pop('shake', '请输入合法的链接')
        return
      }
      this.$emit('addEvent', this.link)
      setTimeout(() => {
        this.$emit('closeEvent')
        this.link = ''
      }, 0)
    },
  },
  created() {},
}
</script>
<style scoped></style>
