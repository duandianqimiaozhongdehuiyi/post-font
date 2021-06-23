<!--
 * @Author: your name
 * @Date: 2021-03-04 13:33:34
 * @LastEditTime: 2021-03-11 16:33:34
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
            <li class="layui-this">发表新帖</li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
            <ValidationObserver ref="observer" v-slot="{ validate }">
              <div class="layui-tab-item layui-show">
                <form>
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <ValidationProvider name="catalog" rules="is_not:请选择" v-slot="{ errors }">
                        <div class="layui-row">
                          <label class="layui-form-label">所在专栏</label>
                          <div class="layui-input-block" @click="showCatalogs()">
                            <div
                              class="layui-unselect layui-form-select"
                              :class="{ 'layui-form-selected': isSelect }"
                            >
                              <div class="layui-select-title">
                                <input
                                  type="text"
                                  placeholder="请选择"
                                  readonly
                                  v-model="catalogs[cataIndex].text"
                                  class="layui-input layui-unselect"
                                />
                                <i class="layui-edge"></i>
                              </div>
                              <dl class="layui-anim layui-anim-upbit">
                                <dd
                                  v-for="(item, index) in catalogs"
                                  :key="'catalog' + index"
                                  :class="{ 'layui-this': index === cataIndex }"
                                  @click="chooseCatalog(item, index)"
                                >
                                  {{ item.text }}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>

                        <div class="layui-row">
                          <span class="error" v-if="errors[0]">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="layui-col-md9">
                      <ValidationProvider name="title" rules="required" v-slot="{ errors }">
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
                        <div class="layui-row">
                          <span class="error" v-if="errors[0]">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <!-- <div
                    class="layui-row layui-col-space15 layui-form-item"
                    :class="d.edit ? (d.edit['class'] != '0' ? ' layui-hide' : '') : ' layui-hide'"
                    id="LAY_quiz"
                  ></div> -->
                  <div class="layui-form-item layui-form-text">
                    <div class="layui-input-block">
                      <editor @changeContent="add"></editor>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-inline" style="width: 190px" @click="showFav()">
                        <div
                          class="layui-unselect layui-form-select"
                          :class="{ 'layui-form-selected': isSelect_fav }"
                        >
                          <div class="layui-select-title">
                            <input
                              type="text"
                              placeholder="请选择"
                              readonly
                              v-model="favList[favIndex]"
                              class="layui-input layui-unselect"
                            />
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit">
                            <dd
                              v-for="(item, index) in favList"
                              :key="'fav' + index"
                              :class="{ 'layui-this': index === favIndex }"
                              @click="chooseFav(item, index)"
                            >
                              {{ item }}
                            </dd>
                          </dl>
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
import { addPost } from '@/api/content.js'
export default {
  name: 'add',
  components: { Editor },
  mixins: [CodeMixin],
  data() {
    return {
      isSelect: false,
      isSelect_fav: false,
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
    showCatalogs() {
      this.isSelect = !this.isSelect
    },
    showFav() {
      this.isSelect_fav = !this.isSelect_fav
    },
    chooseCatalog(item, index) {
      this.cataIndex = index
    },
    chooseFav(item, index) {
      this.favIndex = index
    },
    // _getCode() {
    //   let sid = this.$store.state.sid
    //   getCode(sid).then((res) => {
    //     console.log(res)
    //     this.svg = res.data
    //   })
    // },
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
      addPost({
        title: this.title,
        catalog: this.catalogs[this.cataIndex].value,
        content: this.content,
        fav: this.favList[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid,
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          // 清空已经发布的内容
          localStorage.setItem('addData', '')
          this.$pop('', '发布成功')
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { tid: res.data._id } })
          }, 2000)
        } else {
          this.$pop('', res.msg)
        }
      })
    },
    add(val) {
      this.content = val
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex,
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        localStorage.setItem('addData', JSON.stringify(saveData))
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
  top: -20px;
}
</style>
