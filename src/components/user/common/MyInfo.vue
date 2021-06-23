<!--
 * @Author: your name
 * @Date: 2021-03-01 13:58:24
 * @LastEditTime: 2021-03-03 16:11:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\user\common\MyInfo.vue
-->
<!--  -->
<template>
  <!-- 我的资料 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ValidationObserver ref="observer" v-slot="{ validate }">
      <form method="post">
        <div class="layui-form-item">
          <label for="L_email" class="layui-form-label">邮箱</label>
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input
                type="text"
                id="L_email"
                name="email"
                autocomplete="off"
                v-model="username"
                class="layui-input"
              />
            </div>
            <!-- <div class="layui-form-mid layui-word-aux">
              如果您在邮箱已激活的情况下，变更了邮箱，需<a
                href="/user/activate/"
                style="font-size: 12px; color: #4f99cf"
                >重新验证邮箱</a
              >。
            </div> -->
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <label for="L_username" class="layui-form-label">昵称</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input
                type="text"
                id="L_name"
                name="name"
                autocomplete="off"
                v-model="name"
                class="layui-input"
              />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="layui-form-item" style="margin-bottom: 3px">
          <label for="L_city" class="layui-form-label">城市</label>
          <div class="layui-input-inline">
            <input
              type="text"
              id="L_city"
              name="city"
              autocomplete="off"
              v-model="location"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label" style="margin-top: 12px">性别</label>
          <div class="layui-input-inline custom1 ml1">
            <label for="gender1" class="custom2">
              <input
                type="radio"
                id="gender1"
                name="sex"
                v-model="gender"
                value="0"
                :checked="user.sex === '0' ? 'checked' : ''"
                title="男"
              />
              <i
                class="layui-icon"
                :class="gender === '0' ? 'layui-icon-radio' : 'layui-icon-circle'"
              ></i>
              男
            </label>
            <label for="gender2">
              <input
                id="gender2"
                type="radio"
                name="sex"
                v-model="gender"
                value="1"
                :checked="user.sex === '1' ? 'checked' : ''"
                title="女"
              />
              <i
                class="layui-icon"
                :class="gender === '1' ? 'layui-icon-radio' : 'layui-icon-circle'"
              ></i>
              女
            </label>
          </div>
        </div>
        <div class="layui-form-item layui-form-text">
          <label for="L_sign" class="layui-form-label">签名</label>
          <div class="layui-input-block">
            <textarea
              placeholder="随便写些什么刷下存在感"
              id="L_sign"
              name="sign"
              autocomplete="off"
              class="layui-textarea"
              style="height: 80px"
              v-model="remark"
            ></textarea>
          </div>
        </div>
        <div class="layui-form-item">
          <button class="layui-btn" type="button" @click="validate().then(submit)">确认修改</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'
export default {
  name: 'myinfo',
  components: {},
  data() {
    return {
      user: {
        sex: '0',
      },
      username: '',
      name: '',
      location: '',
      gender: '',
      remark: '',
    }
  },
  computed: {},
  watch: {},
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        const params = {
          username: this.username,
          name: this.name,
          location: this.location,
          gender: this.gender,
          remark: this.remark,
        }
        console.log(params)
        updateUserInfo(params).then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.$store.commit('setUserInfo', {
              ...this.$store.state.userInfo,
              ...params,
            })
            this.$alert('保存成功')
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
  mounted() {
    let { username, name, location, gender, remark } = this.$store.state.userInfo
    this.username = username || ''
    this.name = name || ''
    this.gender = gender || ''
    this.remark = remark || ''
    this.location = location || ''
  },
}
</script>
<style scoped lang="scss">
.custom1 {
  margin-top: 21px;
  color: #333;
}
.custom2 {
  margin-right: 10px;
}
.layui-icon-radio {
  color: #5fb878;
}
.error {
  color: red;
  line-height: 36px;
}
</style>
