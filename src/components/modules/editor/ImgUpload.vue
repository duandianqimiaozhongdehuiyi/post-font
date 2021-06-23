<!--
 * @Author: your name
 * @Date: 2021-03-04 16:30:04
 * @LastEditTime: 2021-03-08 11:52:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\modules\editor\ImgUpload.vue
-->
<!--  -->
<template>
  <transition name="fade">
    <div class="layui-layer-page layui-layer-border edit-content">
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <form>
          <div class="layui-form layui-form-pane">
            <div class="layui-form-item">
              <label for="fileInput" class="layui-form-label">URL</label>
              <div class="layui-input-inline">
                <input
                  type="text"
                  id="fileInput"
                  v-model="pic"
                  placeholder="粘贴图片地址或者点击上传"
                  class="layui-input"
                />
              </div>
              <button type="button" class="layui-btn layui-btn-primary">
                <label for="uploadImg">
                  <i class="layui-icon layui-icon-upload"></i>上传图片
                </label>
              </button>
              <input
                type="file"
                name="file"
                id="uploadImg"
                class="layui-upload-file"
                @change="upload"
              />
            </div>
            <div class="layui-form-item">
              <button type="button" class="layui-btn" @click="submit">确认</button>
            </div>
          </div>
        </form>
      </div>
      <span class="layui-layer-setwin" @click.stop="close()">
        <a
          href="javascript:void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { uploadImg } from '@/api/content'
import config from '@/config'
export default {
  name: 'ImgUpload',
  components: {},
  data() {
    return {
      pic: '',
      formData: '',
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleFaceClick(key) {
      this.$emit('addEvent', key)
    },
    close() {
      // 清空输入内容，选择的文件
      this.pic = ''
      this.formData = ''
      this.$emit('closeEvent')
    },
    upload(e) {
      let file = e.target.files
      let formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      // 上传图片
      uploadImg(this.formData).then((res) => {
        if (res.code === 200) {
          const baseUrl =
            process.env.NODE_ENV === 'production' ? config.baseURL.prod : config.baseURL.dev
          this.pic = baseUrl + res.data
        }
      })
      document.getElementById('uploadImg').val = ''
    },
    submit() {
      if (this.pic === '') {
        document.getElementById('fileInput').focus()
        this.$pop('shake', '请上传图片或者复制图片链接')
        return
      }
      this.$emit('addEvent', this.pic)
      setTimeout(() => {
        this.pic = ''
        this.formData = ''
        this.$emit('closeEvent')
      }, 0)
    },
  },
  created() {},
}
</script>
<style scoped lang="scss">
.layui-form-item {
  text-align: center;
}
.layui-form-pane {
  margin: 20px;
}
</style>
