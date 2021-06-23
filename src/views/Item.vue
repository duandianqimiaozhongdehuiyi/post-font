<!--
 * @Author: your name
 * @Date: 2021-03-23 14:43:56
 * @LastEditTime: 2021-03-23 14:44:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\views\Item.vue
-->
<!--  -->
<template>
  <div>{{ index }} - {{ source.text }}</div>
</template>

<script>
export default {
  name: 'item-component',
  props: {
    index: {
      // index of current item
      type: Number,
    },
    source: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>
