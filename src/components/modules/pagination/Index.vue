<!--
 * @Author: your name
 * @Date: 2021-03-09 11:27:25
 * @LastEditTime: 2021-03-11 09:49:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\modules\page\Index.vue
-->
<!--  -->
<template>
  <div
    class="d-flex"
    :class="{
      'flex-center': align === 'center',
      'flex-start': align === 'left',
      'flex-end': align === 'right',
    }"
  >
    <div class="layui-box layui-laypage layui-laypage-default">
      <a
        href="javascript:;"
        class="layui-laypage-next"
        v-show="showEnd"
        :class="{ 'layui-disabled': current === 1 }"
        @click.prevent="home()"
      >
        <i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
        <template v-else>首页</template>
      </a>
      <a
        href="javascript:;"
        class="layui-laypage-prev"
        :class="{ 'layui-disabled': current === 1 }"
        @click.prevent="prev()"
      >
        <i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
        <template v-else>上一页</template>
      </a>
      <!-- current + 2 < pages.length 显示... -->
      <!-- current -2 > 1 显示... -->
      <a v-if="pages.length > 5 && current - 2 > 1" href="javascript:;" class="layui-disabled"
        >...</a
      >
      <template v-for="(item, index) in pages">
        <a
          v-if="item >= current - 2 && item <= current + 2"
          href="javascript:;"
          :key="'page' + index"
          :class="[current === index + 1 ? theme : '', current === index + 1 ? 'active' : '']"
          @click="changeIndex(item)"
          >{{ item }}</a
        >
      </template>
      <a
        v-if="pages.length > 5 && current + 2 < pages.length"
        href="javascript:;"
        class="layui-disabled"
        >...</a
      >
      <a
        href="javascript:;"
        class="layui-laypage-next"
        :class="{ 'layui-disabled': current === pages.length }"
        @click.prevent="next()"
      >
        <i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i>
        <template v-else>下一页</template>
      </a>
      <a
        href="javascript:;"
        class="layui-laypage-next"
        v-show="showEnd"
        :class="{ 'layui-disabled': current === pages.length }"
        @click.prevent="end()"
      >
        <i class="layui-icon layui-icon-next" v-if="showType === 'icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div class="total" v-if="hasTotal">
      到第<input
        type="text"
        class="layui-input imooc-input"
        v-model="pageInput"
        v-on:keyup.enter="toPage()"
      />页 共 {{ pages.length }} 页
    </div>
    <div @click="showLimit()" v-if="hasSelect">
      <div class="layui-unselect layui-form-select" :class="{ 'layui-form-selected': isSelect }">
        <div class="layui-select-title">
          <input
            type="text"
            placeholder="请选择"
            readonly
            v-model="options[optIndex]"
            class="layui-input layui-unselect"
          />
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd
            v-for="(item, index) in options"
            :key="'fav' + index"
            :class="{ 'layui-this': index === optIndex }"
            @click="chooseLimit(item, index)"
          >
            {{ item }}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  components: {},
  props: {
    align: {
      type: String,
      default: 'left',
    },
    showType: {
      type: String,
      default: 'icon',
    },
    showEnd: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'layui-bg-green',
    },
    hasTotal: {
      type: Boolean,
      default: false,
    },
    hasSelect: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    },
  },
  watch: {
    total(newVal, oldVal) {
      this.initPages()
    },
  },
  data() {
    return {
      options: [10, 20, 30, 50, 100],
      optIndex: 0,
      isSelect: false,
      pages: [],
      limit: 10,
      pageInput: '',
    }
  },
  methods: {
    initPages() {
      const len = Math.ceil(this.total / this.limit)
      this.pages = _.range(1, len + 1)
      // this.current = this.current
    },
    chooseLimit(item, index) {
      if (this.optIndex !== index) {
        // 当页面上的limit发生变化，需要调整current数值
        this.$emit('changeLimit', this.options[index])
        if (this.current === 1) {
          this.$emit('changeCurrent', 1)
        } else {
          this.$emit('changeCurrent', Math.floor((this.limit * this.current) / this.options[index]))
        }
      }
      this.optIndex = index
      this.limit = this.options[this.optIndex]
      this.initPages()
    },
    showLimit() {
      this.isSelect = !this.isSelect
    },
    home() {
      this.$emit('changeCurrent', 1)
    },
    end() {
      this.$emit('changeCurrent', this.pages.length)
    },
    prev() {
      let cur = 0
      if (this.current - 1 <= 0) {
        cur = 1
      } else {
        cur = this.current - 1
      }
      this.$emit('changeCurrent', cur)
    },
    next() {
      let cur = 0
      if (this.current + 1 > this.pages.length) {
        cur = this.pages.length
      } else {
        cur = this.current + 1
      }
      this.$emit('changeCurrent', cur)
    },
    changeIndex(val) {
      if (val === this.current) {
        return
      }
      this.$emit('changeCurrent', val)
    },
    toPage() {
      if (this.current === parseInt(this.pageInput)) {
        return
      }
      this.$emit('changeCurrent', parseInt(this.pageInput))
    },
  },
  created() {},
  mounted() {
    // 初始化分页的长度
    this.limit = this.size
    this.initPages()
    // 设置select的内容
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
  },
}
</script>
<style scoped lang="scss">
.layui-laypage {
  a {
    // &:first-child {
    //   border-right: 0;
    // }
    // &:last-child {
    //   border-left: 0;
    // }
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
  .layui-bg-green {
    border-color: #009688;
  }
}
.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 10px;
  position: relative;
  top: -2px;
}
.imooc-input {
  width: 40px;
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
  display: inline-block;
}
.layui-input {
  height: 30px;
  line-height: 30px;
}
.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
