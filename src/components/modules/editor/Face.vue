<!--
 * @Author: your name
 * @Date: 2021-03-04 15:46:10
 * @LastEditTime: 2021-03-08 11:52:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\modules\editor\Face.vue
-->
<!--  -->
<template>
  <transition name="fade">
    <div class="layui-layer-tips layui-edit-face edit-content">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li v-for="(value, key) in lists" :key="key" @click="handleFaceClick(key)">
            <img :src="value" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import faces from '@/assets/js/face'
export default {
  name: 'fase',
  components: {},
  data() {
    return {
      lists: faces,
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleFaceClick(item) {
      this.$emit('addEvent', item)
      this.$emit('closeEvent')
    },
  },
  created() {},
}
</script>
<style scoped lang="scss"></style>
