<!--
 * @Author: your name
 * @Date: 2021-03-04 15:03:13
 * @LastEditTime: 2021-03-10 15:34:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\modules\editor\index.vue
-->
<!--  -->
<template>
  <div class="edit-wrapper">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <span @click="choose(0)" ref="face">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="choose(1)" ref="img">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span @click="choose(2)" ref="link">
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span @click="choose(3)" class="quote"> ” </span>
          <span @click="choose(4)">
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span @click="addHr()"> hr </span>
          <span @click="choose(6)">
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea
          id="edit"
          class="layui-textarea fly-editor"
          name="content"
          ref="textEdit"
          v-model="content"
          @focus="focusEvent()"
          @blur="blurEvent()"
        ></textarea>
      </div>
    </div>
    <div ref="modal">
      <face v-show="current === 0" @closeEvent="closeModal()" @addEvent="addFace"></face>
      <img-upload v-show="current === 1" @closeEvent="closeModal()" @addEvent="addPic"></img-upload>
      <link-add v-show="current === 2" @closeEvent="closeModal()" @addEvent="addLink"></link-add>
      <quote v-show="current === 3" @closeEvent="closeModal()" @addEvent="addQuote"></quote>
      <code-input
        v-show="current === 4"
        @closeEvent="closeModal()"
        :width="codeWidth"
        :height="codeHeight"
        @addEvent="addCode"
      ></code-input>
      <preview v-show="current === 6" :content="content" @closeEvent="closeModal()"></preview>
    </div>
  </div>
</template>

<script>
import Face from './Face'
import ImgUpload from './ImgUpload'
import LinkAdd from './LinkAdd'
import CodeInput from './Code'
import Quote from './Quote'
import Preview from './Preview'
export default {
  name: 'editor',
  props: ['initContent'],
  components: { Face, ImgUpload, LinkAdd, CodeInput, Quote, Preview },
  data() {
    return {
      faceStatus: false,
      imgStatus: false,
      linkStatus: false,
      current: '',
      codeWidth: 400,
      codeHeight: 200,
      content: '',
      pos: '',
    }
  },
  computed: {},
  watch: {
    initContent(newval, oldval) {
      this.content = newval
    },
  },
  methods: {
    focusEvent() {
      this.getPos()
    },
    blurEvent() {
      this.getPos()
    },
    // 计算光标的当前位置
    getPos() {
      let cursorPos = 0
      let elem = document.getElementById('edit')
      if (document.selection) {
        // IE
        let selectRange = document.selection.createRange()
        selectRange.moveStart('character', -elem.value.length)
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.selectionStart === '0') {
        cursorPos = elem.selectionStart
      }
      this.pos = cursorPos
    },
    handleBodyClick(e) {
      e.stopPropagation()
      // 触发隐藏本组件的关闭事件，改变isShow的状态
      // 是否点击到了非控制Icon + 本组件以外的地方
      if (!(this.$refs.icons.contains(e.target) || this.$refs.modal.contains(e.target))) {
        this.current = ''
      }
    },
    choose(index) {
      if (this.current === index) {
        this.closeModal()
      } else {
        this.current = index
      }
    },
    closeModal() {
      this.current = ''
    },
    // 添加表情
    addFace(item) {
      const insertContent = ` face${item}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加图片链接
    addPic(item) {
      const insertContent = ` img[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加链接
    addLink(item) {
      const insertContent = ` a(${item})[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加代码
    addCode(item) {
      const insertContent = ` \n[pre]\n${item}[/pre]\n`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加引用
    addQuote(item) {
      const insertContent = ` \n[quote]\n${item}[/quote]\n`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加hr
    addHr() {
      this.insert('\n[hr]')
      this.pos += 5
    },
    insert(content) {
      if (typeof this.content === 'undefined') {
        return
      }
      let tmp = this.content.split('')
      tmp.splice(this.pos, 0, content)
      this.content = tmp.join('')
    },
  },
  updated() {
    this.$emit('changeContent', this.content)
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
    this.codeWidth = this.$refs.textEdit.offsetWidth - 60
    this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    window.addEventListener('resize', () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    })
  },
  beforeDestroy() {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  },
}
</script>
<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(0.7);
  }
}
.fade-leave-active {
  animation: bounceOut 0.3s;
}
.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 2000;
  background: #fff;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-wrapper {
  position: relative;
}

.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
