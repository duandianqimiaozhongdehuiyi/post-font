<!--
 * @Author: your name
 * @Date: 2020-11-26 15:09:41
 * @LastEditTime: 2021-03-09 14:16:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\App.vue
-->
<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view />
    <imooc-footer></imooc-footer>
    <!-- <div class="layui-container">
      <form class="layui-form layui-form-pane" action="" layui-form-pane>
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input
                type="text"
                name="title"
                v-model.trim="name"
                required
                lay-verify="required"
                placeholder="请输入用户名"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <span class="error" v-if="errors[0]">请输入用户名</span>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input
                type="password"
                name="title"
                v-model="password"
                required
                lay-verify="required"
                placeholder="请输入密码"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <span class="error" v-if="errors[0]">请输入密码</span>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input
                type="text"
                name="title"
                v-model="code"
                required
                lay-verify="required"
                placeholder="请输入验证码"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <span class="error" v-if="errors[0]">请输入验证码</span>
          </ValidationProvider>
          <div class="layui-form-mid layui-word-aux svg" @click="getCaptcha()" v-html="svg"></div>
        </div>
        <button type="button" class="layui-btn" @click="checkForm()">点击登录</button>
        <a class="imooc-link" href="http://www.layui.com">找回密码</a>
      </form>
    </div> -->
  </div>
</template>

<script>
import { extend } from 'vee-validate'
import ImoocHeader from './components/Header.vue'
import ImoocFooter from './components/Footer.vue'
extend('required', {
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1,
    }
  },
  computesRequired: true,
})
export default {
  name: 'App',
  components: { ImoocHeader, ImoocFooter },
  data() {
    return {
      svg: '',
      name: '',
      password: '',
      code: '',
      errorMsg: [],
    }
  },
  mounted() {},
  methods: {
    checkForm() {
      this.errorMsg = []
      // regEx email
      if (!this.name) {
        this.errorMsg.push('登录名为空！')
      }
      if (!this.password) {
        this.errorMsg.push('密码不得为空！')
      }
      if (!this.code) {
        this.errorMsg.push('验证码为空！')
      }
    },
  },
}
</script>

<style lang="scss">
// #app {
//   background: #f2f2f2;
// }
// .layui-container {
//   background: #fff;
// }
// input {
//   width: 190px;
// }
// .imooc-link {
//   margin-left: 10px;
//   &:hover {
//     color: #009688;
//   }
// }

@import 'assets/css/global.css';
@import 'assets/css/layui-layer/layer.css';
// .pd20 {
//   padding: 20px;
// }
// .pl0 {
//   padding-left: 0;
// }
// .pr0 {
//   padding-right: 0;
// }
@for $i from 0 through 5 {
  .pd#{$i * 10} {
    padding: $i * 10 + px !important;
  }
  .pl#{$i} {
    padding-left: $i * 10 + px !important;
  }
  .pr#{$i} {
    padding-left: $i * 10 + px !important;
  }
  .pt#{$i} {
    padding-top: $i * 10 + px !important;
  }
  .mr#{$i} {
    margin-right: $i * 10 + px !important;
  }
  .ml#{$i} {
    margin-left: $i * 10 + px !important;
  }
}
.mt20 {
  margin-top: -20px;
}

.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.orange {
  color: #ff5722;
}
.pull-right {
  float: right !important;
}
.error {
  color: red;
  line-height: 36px;
}
.svg {
  position: relative;
  top: -20px;
}
.d-flex {
  display: flex;
  flex-wrap: row nowrap;
  align-items: center;
  &.flex-start {
    justify-content: flex-start;
  }
  &.flex-center {
    justify-content: center;
  }
  &.flex-end {
    justify-content: flex-end;
  }
}
</style>
