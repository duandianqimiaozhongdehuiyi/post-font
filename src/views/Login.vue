<!--
 * @Author: your name
 * @Date: 2020-11-30 09:58:19
 * @LastEditTime: 2021-03-04 15:21:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\views\Login.vue
-->
<!--  -->
<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{ name: 'reg' }">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
          <ValidationObserver ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">用户名</label>
                    <ValidationProvider rules="required|email" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="username"
                          v-model="username"
                          placeholder="请输入用户名"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <ValidationProvider rules="required|minmax:4,10" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="password"
                          v-model="password"
                          placeholder="请输入密码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <span class="error" v-if="errors[0]">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <ValidationProvider
                      rules="required|length:4"
                      ref="codefield"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="code"
                          v-model="code"
                          placeholder="请输入验证码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <span class="error" v-if="errors[0]">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <div class="layui-form-mid">
                      <div
                        class="layui-form-mid layui-word-aux svg"
                        @click="_getCode()"
                        v-html="svg"
                      ></div>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="button" @click="validate().then(submit)">
                      立即登录
                    </button>
                    <span style="padding-left: 20px">
                      <router-link :to="{ name: 'forget' }">忘记密码？</router-link>
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
                </form>
              </div>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCode, login } from '@/api/login.js'
import { v4 as uuidv4 } from 'uuid'
export default {
  components: {},
  data() {
    return {
      svg: '',
      username: '',
      password: '',
      code: '',
      errorMsg: [],
    }
  },
  computed: {},
  watch: {},
  methods: {
    _getCode() {
      let sid = this.$store.state.sid
      getCode(sid).then((res) => {
        console.log(res)
        this.svg = res.data
      })
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        const params = {
          username: this.username,
          password: this.password,
          code: this.code,
          sid: this.$store.state.sid,
        }
        login(params)
          .then((res) => {
            if (res.code === 401) {
              console.log(res.msg)
              this.$refs.codefield.setErrors([res.msg])
              return
            } else {
              console.log(res)
              // this.username = ''
              // this.password = ''
              // this.code = ''
              res.data.username = this.username
              this.$store.commit('setToken', res.token)
              this.$store.commit('setUserInfo', res.data)
              this.$store.commit('setIsLogin', true)
              requestAnimationFrame(() => {
                this._getCode()
                // this.$refs.observer.reset()
              })
              this.$router.push({ name: 'index' })
            }
          })
          .catch((err) => {
            if (err.code === 500) {
              this.$alert('用户校验失败，请检查')
            } else {
              this.$alert('服务器错误')
            }
            console.log(err)
          })
      }
    },
  },
  created() {},
  mounted() {
    window.vue = this
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    this._getCode()
  },
}
</script>
<style scoped lang="scss">
.svg {
  position: relative;
  top: -28px;
}
.error {
  color: red;
  line-height: 36px;
}
</style>
