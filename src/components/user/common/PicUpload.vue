<!--
 * @Author: your name
 * @Date: 2021-03-01 13:59:18
 * @LastEditTime: 2021-03-03 18:26:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\user\common\PicUpload.vue
-->
<!--  -->
<template>
  <!-- 上传头像 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label type="button" for="pic" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
        </label>
        <input
          type="file"
          id="pic"
          name="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          @change="upload"
        />
        <img :src="pic" />
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api/content'
import { updateUserInfo } from '@/api/user'
import config from '@/config'
export default {
  name: 'picupload',
  components: {},
  data() {
    return {
      user: {},
      pic:
        this.$store.state.userInfo && this.$store.state.userInfo.pic
          ? this.$store.state.userInfo.pic
          : '/img/xiaoxin.jpg',
      formData: '',
    }
  },
  computed: {},
  watch: {},
  methods: {
    upload(e) {
      console.log(e)
      const file = e.target.files
      let formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      // 上传图片之后 => uploadImg
      uploadImg(formData).then((res) => {
        if (res.code === 200) {
          const baseUrl =
            process.env.NODE_ENV === 'production' ? config.baseURL.prod : config.baseURL.dev
          this.pic = baseUrl + res.data
        }
        console.log('pic:', this.pic)
        // 更新用户基本资料 =》 updateUserInfo
        updateUserInfo({ pic: this.pic }).then((res) => {
          if (res.code === 200) {
            // 修改全局store内的用户信息
            let user = this.$store.state.userInfo
            user.pic = this.pic
            this.$store.commit('setUserInfo', user)
            this.$alert('图片上传成功')
          }
        })
        document.getElementById('pic').value = ''
      })
    },
  },
  created() {},
  mounted() {},
}
</script>
<style scoped lang="scss">
#pic {
  display: none;
}
</style>
