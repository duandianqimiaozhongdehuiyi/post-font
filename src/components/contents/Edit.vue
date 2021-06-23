<!--
 * @Author: your name
 * @Date: 2021-03-04 13:33:34
 * @LastEditTime: 2021-03-11 17:09:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\contents\Add.vue
-->
<!--  -->
<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel" pad20 style="padding-top: 5px">
      <!-- <div class="fly-none" v-if="d.edit">并无权限</div> -->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">编辑帖子</li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
            <ValidationObserver ref="observer" v-slot="{ validate }">
              <div class="layui-tab-item layui-show">
                <form>
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <div class="layui-row">
                        <label class="layui-form-label">所在专栏</label>
                        <div class="layui-input-block">
                          <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                              <input
                                type="text"
                                placeholder="请选择"
                                readonly
                                v-model="catalogs[cataIndex].text"
                                class="layui-input layui-unselect layui-disabled"
                              />
                              <i class="layui-edge"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="layui-col-md9">
                      <div class="layui-row">
                        <label for="L_title" class="layui-form-label">标题</label>
                        <div class="layui-input-block">
                          <input
                            type="text"
                            id="L_title"
                            autocomplete="off"
                            v-model="title"
                            class="layui-input"
                          />
                          <!-- <input type="hidden" name="id" :value="d.edit.id" /> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div
                    class="layui-row layui-col-space15 layui-form-item"
                    :class="d.edit ? (d.edit['class'] != '0' ? ' layui-hide' : '') : ' layui-hide'"
                    id="LAY_quiz"
                  ></div> -->
                  <div class="layui-form-item layui-form-text">
                    <div class="layui-input-block">
                      <editor @changeContent="add" :initContent="content"></editor>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-inline" style="width: 190px">
                        <div class="layui-unselect layui-form-select">
                          <div class="layui-select-title">
                            <input
                              type="text"
                              placeholder="请选择"
                              readonly
                              v-model="favList[favIndex]"
                              class="layui-input layui-unselect layui-disabled"
                            />
                            <i class="layui-edge"></i>
                          </div>
                        </div>
                      </div>
                      <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                    </div>
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

                    <div
                      class="layui-form-mid layui-word-aux svg"
                      @click="_getCode()"
                      v-html="svg"
                    ></div>
                  </div>
                  <div class="layui-form-item">
                    <button type="button" class="layui-btn" @click="validate().then(submit)">
                      立即发布
                    </button>
                  </div>
                </form>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '../modules/editor/Index'
import CodeMixin from '@/mixin/code'
// import { v4 as uuidv4 } from 'uuid'
import { updatePost } from '@/api/content.js'
export default {
  name: 'edit',
  components: { Editor },
  mixins: [CodeMixin],
  props: ['tid', 'page'],
  data() {
    return {
      cataIndex: 0,
      favIndex: 0,
      catalogs: [
        {
          text: '请选择',
          value: '',
        },
        {
          text: '提问',
          value: 'ask',
        },
        {
          text: '分享',
          value: 'share',
        },
        {
          text: '讨论',
          value: 'discuss',
        },
        {
          text: '建议',
          value: 'advise',
        },
      ],
      favList: ['20', '30', '50', '60', '80'],
      content: '',
      title: '',
      sid: '',
    }
  },
  computed: {},
  watch: {},
  methods: {
    chooseCatalog(item, index) {
      this.cataIndex = index
    },
    chooseFav(item, index) {
      this.favIndex = index
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      if (this.content === '') {
        this.$alert('文章不得为空!')
        return
      }
      // 添加新的文章
      updatePost({
        title: this.title,
        content: this.content,
        code: this.code,
        sid: this.$store.state.sid,
        tid: this.tid,
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          // 清空已经发布的内容
          localStorage.setItem('editData', '')
          this.$pop('', res.msg)
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { tid: this.tid } })
          }, 1000)
        } else {
          this.$pop('', res.msg)
        }
      })
    },
    add(val) {
      console.log('val:', val)
      this.content = val
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex,
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        const editData = localStorage.getItem('editData')
        let newObj = {}
        if (editData && editData !== '') {
          newObj = { ...saveData, ...JSON.parse(editData) }
        }
        localStorage.setItem('editData', JSON.stringify(newObj))
      }
    },
  },
  created() {},
  mounted() {
    if (this.page) {
      this.content = this.page.content
      this.title = this.page.title
      this.favIndex = this.favList.indexOf(this.page.fav)
      this.cataIndex = this.catalogs.indexOf(
        this.catalogs.filter((item) => item.value === this.page.catalog)[0],
      )
      this.page.cataIndex = this.cataIndex
      this.page.favIndex = this.favIndex
      console.log(this.page)
      // 缓存edit内容
      localStorage.setItem('editData', JSON.stringify(this.page))
    } else {
      // 页面上无page内容，可能是用户进行了刷新，则取本地缓存的内容
      const saveData = localStorage.getItem('editData')
      if (saveData && saveData !== '') {
        this.$confirm(
          '是否加载未编辑完的内容？',
          () => {
            const obj = JSON.parse(saveData)
            this.content = obj.content
            this.title = obj.title
            this.cataIndex = obj.cataIndex
            this.favIndex = obj.favIndex
          },
          () => {
            localStorage.setItem('editData', '')
          },
        )
      }
    }
  },
}
</script>
<style scoped lang="scss">
.svg {
  position: relative;
  top: -20px;
}
</style>
