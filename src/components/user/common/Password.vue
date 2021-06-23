<!--
 * @Author: your name
 * @Date: 2021-03-01 13:59:41
 * @LastEditTime: 2021-03-04 11:06:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\user\common\Password.vue
-->
<!--  -->
<template>
  <!-- 修改密码 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ValidationObserver ref="observer" v-slot="{ validate }">
      <form action="/user/repass" method="post">
        <div v-if="!user.weibo_id && !user.qq_id" class="layui-form-item">
          <label for="L_nowpass" class="layui-form-label">当前密码</label>
          <ValidationProvider rules="required|minmax:4,16" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input
                type="password"
                id="L_nowpass"
                name="oldpassword"
                v-model="oldpassword"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <label for="L_pass" class="layui-form-label">新密码</label>
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
                name="repassord"
                v-model="repassord"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <button class="layui-btn" type="button" @click="validate().then(submit)">确认修改</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { changePassword } from '@/api/user'
export default {
  name: 'password',
  components: {},
  data() {
    return {
      password: '',
      oldpassword: '',
      repassord: '',
      user: {},
    }
  },
  computed: {},
  watch: {},
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        if (this.oldpassword === this.password) {
          this.$alert('新旧密码不能相同，请确认！')
          return
        }
        changePassword({
          oldpwd: this.oldpassword,
          newpwd: this.password,
        }).then((res) => {
          if (res.code === 200) {
            this.$alert('密码更新成功')
            this.oldpassword = ''
            this.password = ''
            this.repassord = ''
            requestAnimationFrame(() => {
              this.$refs.observer.reset()
            })
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
.error {
  color: red;
  line-height: 36px;
}
</style>
