<!--
 * @Author: your name
 * @Date: 2020-11-30 09:58:26
 * @LastEditTime: 2021-03-04 09:30:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\views\Reg.vue
-->
<!--  -->
<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'login' }">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
          <ValidationObserver ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">邮箱</label>
                    <ValidationProvider rules="required|email" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          id="L_email"
                          name="email"
                          v-model="username"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_username" class="layui-form-label" rules="required|min:4|name"
                      >昵称</label
                    >
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        id="L_username"
                        name="name"
                        v-model="name"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <ValidationProvider
                      rules="required|minmax:4,16|confirmed:confirmation"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          id="L_pass"
                          name="password"
                          v-model="password"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_repass" class="layui-form-label">确认密码</label>
                    <ValidationProvider v-slot="{ errors }" vid="confirmation">
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          id="L_repass"
                          name="repassword"
                          v-model="repassword"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <span class="error">{{ errors[0] }}</span>
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
                    <button class="layui-btn" @click="validate().then(submit)">立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
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
import { getCode, reg } from '@/api/login.js'
import { v4 as uuidv4 } from 'uuid'
export default {
  components: {},
  data() {
    return {
      username: '',
      name: '',
      password: '',
      repassword: '',
      code: '',
      svg: '',
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
          name: this.name,
          password: this.password,
          repassword: this.repassword,
          code: this.code,
          sid: this.$store.state.sid,
        }

        reg(params).then((res) => {
          console.log(res)
          if (res.code === 200) {
            console.log(res)
            this.username = ''
            this.name = ''
            this.password = ''
            this.repassword = ''
            this.code = ''
            requestAnimationFrame(() => {
              this.$refs.observer.reset()
            })
            // 跳转到登录页面，让用户登录
            this.$router.push('/login')
          } else {
            console.log(res.msg)
            // username -> '用户名已经注册
            // res.msg = { username: [], name: [], code: [] }
            this.$refs.codefield.setErrors(res.msg)
            return
          }
        })
      }
    },
  },
  created() {},
  mounted() {},
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
