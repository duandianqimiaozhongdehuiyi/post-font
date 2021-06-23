<!--
 * @Author: your name
 * @Date: 2021-03-05 15:03:19
 * @LastEditTime: 2021-03-08 11:52:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\modules\editor\Code.vue
-->
<!--  -->
<template>
  <transition name="fade">
    <div class="layui-layer-page layui-layer-prompt edit-content">
      <div class="layui-layer-title">请输入引用内容</div>
      <div class="layui-layer-content">
        <textarea
          class="layui-layer-input"
          name=""
          id="quoteInput"
          v-model="quote"
          style="width: 300px; height: 100px"
        ></textarea>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a
          href="javascript: void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
      <div class="layui-layer-btn">
        <a href="javascript:void(0)" class="layui-layer-btn0" @click.prevent="submit()">确定</a>
        <a href="javascript:void(0)" class="layui-layer-btn" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'quote',
  components: {},
  data() {
    return {
      quote: '',
    }
  },
  computed: {},
  watch: {},
  methods: {
    submit() {
      if (this.quote === '') {
        document.getElementById('quoteInput').focus()
        this.$pop('shake', '请输入引用内容')
        return
      }
      this.$emit('addEvent', this.quote)
      setTimeout(() => {
        this.quote = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel() {
      this.quote = ''
      this.$emit('closeEvent')
    },
  },
  created() {},
  mounted() {},
}
</script>
<style scoped></style>
