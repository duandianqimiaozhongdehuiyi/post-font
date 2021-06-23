<!--
 * @Author: your name
 * @Date: 2021-03-09 09:48:21
 * @LastEditTime: 2021-03-12 09:39:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\contents\Detail.vue
-->
<!--  -->
<template>
  <div class="layui-container">
    <imooc-panel></imooc-panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{ page.title }}</h1>
          <div class="fly-detail-info">
            <!-- <span v-if="rows.status == -1" class="layui-badge">审核中</span> -->
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog === 'share'"
            >
              分享
            </span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'ask'"
            >
              提问
            </span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'advise'"
            >
              建议
            </span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'logs'"
            >
              动态
            </span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'discuss'"
            >
              交流
            </span>
            <span class="layui-badge layui-bg-green fly-detail-column" v-else> 公告 </span>
            <span class="layui-badge" style="background-color: #999" v-if="page.isEnd === '0'"
              >未结</span
            >
            <span class="layui-badge" style="background-color: #5fb878" v-else>已结</span>
            <span class="layui-badge layui-bg-black" v-show="page.isTop === '1'">置顶</span>
            <span
              class="layui-badge layui-bg-red"
              v-for="(tag, index) in page.tags"
              :key="'tag' + index"
              :class="tag.class"
              >{{ tag.name }}</span
            >

            <!-- <div class="fly-admin-box">
              <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>
              <template>
                <span
                  v-if="rows.stick > 0"
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="stick"
                  rank="0"
                  style="background-color: #ccc"
                  >取消置顶</span
                >
                <span
                  v-else
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="stick"
                  rank="1"
                  >置顶</span
                >
                <span
                  v-if="rows.status == 1"
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="status"
                  rank="0"
                  style="background-color: #ccc"
                  >取消加精</span
                >
                <span
                  v-else
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="status"
                  rank="1"
                  >加精</span
                >
              </template>
            </div> -->
            <span class="fly-list-nums">
              <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i> {{ page.answer }}</a>
              <i class="iconfont" title="人气">&#xe60b;</i> {{ page.reads }}
            </span>
          </div>
          <!-- 收藏、作者信息 -->
          <div class="detail-about">
            <a class="fly-avatar" href="">
              <img :src="page.uid ? page.uid.pic : '/img/xiaoxin.jpg'" alt="贤心" />
            </a>
            <div class="fly-detail-user">
              <a href="" class="fly-link">
                <cite>{{ page.uid ? page.uid.name : 'imooc' }}</cite>
                <!-- <i class="iconfont icon-renzheng" :title="'认证信息：' + rows.user.approve"></i> -->
                <i
                  class="layui-badge fly-badge-vip mr1"
                  v-if="page.uid && page.uid.isVip !== '0' ? page.uid.isVip : false"
                  >VIP{{ page.uid ? page.uid.isVip : '' }}</i
                >
              </a>
              <span>{{ page.created | moment }}</span>
            </div>
            <div class="detail-hits">
              <span style="padding-right: 10px; color: #ff7200">悬赏：{{ page.fav }}飞吻</span>
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin pt1">
            <router-link
              v-show="page.isEnd === '0'"
              class="layui-btn layui-btn-sm jie-admin jie-admin-collect"
              :to="{ name: 'edit', params: { tid: tid, page: page } }"
              >编辑</router-link
            >
            <!-- <a href="" class="layui-btn layui-btn-sm jie-admin jie-admin-collect">编辑</a> -->
            <a
              href=""
              class="layui-btn layui-btn-sm jie-admin jie-admin-collect"
              :class="{ 'layui-btn-primary': page.isFav === 1 }"
              @click.prevent="setCollect()"
              >{{ page.isFav === 1 ? '取消收藏' : '收藏' }}</a
            >
          </div>
          <div class="detail-body photos" v-html="content"></div>
        </div>
        <!-- 回帖相关的内容 -->
        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center">
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li v-for="(item, index) in comments" :key="'comments' + index">
              <a name=""></a>
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href="">
                  <img :src="item.cuid ? item.cuid.pic : '/img/xiaoxin.jpg'" alt="贤心" />
                </a>
                <div class="fly-detail-user">
                  <a href="" class="fly-link">
                    <cite>{{ item.cuid ? item.cuid.name : '' }}</cite>
                    <!-- <i class="iconfont icon-renzheng" :title="'认证信息：' + item.user.approve"></i> -->
                    <i
                      class="layui-badge fly-badge-vip mr1"
                      v-if="item.cuid && item.cuid.isVip !== '0' ? item.cuid.isVip : false"
                      >VIP{{ item.cuid ? item.cuid.isVip : '' }}</i
                    >
                  </a>

                  <span v-if="index === 0">(楼主)</span>
                  <!-- <span style="color: #5fb878">(管理员)</span>
                  <span style="color: #ff9e3f">（社区之光）</span>
                  <span style="color: #999">（该号已被封）</span> -->
                </div>

                <div class="detail-hits">
                  <span>{{ item.created | moment }}</span>
                </div>
                <i class="iconfont icon-caina" title="最佳答案" v-show="item.isBest === '1'"></i>
              </div>
              <div class="detail-body jieda-body photos" v-richtext="item.content"></div>
              <div class="jieda-reply">
                <span
                  class="jieda-zan"
                  :class="{ zanok: item.handed === '1' }"
                  type="zan"
                  @click="hands(item)"
                >
                  <i class="iconfont icon-zan"></i>
                  <em>{{ item.hands }}</em>
                </span>
                <span type="reply" @click="reply(item)">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span
                    type="edit"
                    @click="editComment(item)"
                    v-show="
                      page.isEnd === '0' &&
                      user &&
                      item.cuid._id === user._id &&
                      user.status === '0'
                    "
                  >
                    编辑
                  </span>
                  <!-- <span type="del"> 删除 </span> -->
                  <span
                    class="jieda-accept"
                    type="accept"
                    @click="setBest(item)"
                    v-show="
                      page.isEnd === '0' &&
                      user &&
                      item.cuid._id === user._id &&
                      user.status === '0'
                    "
                  >
                    采纳
                  </span>
                </div>
              </div>
            </li>
            <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
          </ul>
          <imooc-pagination
            v-show="comments.length > 0 && total > 0"
            :align="'right'"
            :showType="'icon'"
            :hasSelect="false"
            :showEnd="true"
            :hasTotal="false"
            :total="total"
            :size="size"
            :current="current"
            @changeCurrent="handleChange"
            @changeLimit="changeLimit"
          ></imooc-pagination>

          <!-- <div style="text-align: center">
            {{ d.laypage }}
          </div> -->

          <div class="layui-form layui-form-pane">
            <ValidationObserver ref="observer" v-slot="{ validate }">
              <form>
                <imooc-editor
                  @changeContent="addContent"
                  :initContent="editInfo.content"
                ></imooc-editor>
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                  <ValidationProvider rules="required|length:4" ref="codefield" v-slot="{ errors }">
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
                  <!-- <input type="hidden" name="jid" :value="rows.id" /> -->
                  <!-- <input type="hidden" name="daPages" value="{{rows.jieda.pages}}" /> -->
                  <button class="layui-btn" type="button" @click="validate().then(submit)">
                    提交回复
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <imooc-hotlist></imooc-hotlist>
        <imooc-ads></imooc-ads>
        <imooc-links></imooc-links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Panel from '@/components/Panel'
import Editor from '../modules/editor/Index'
import CodeMixin from '@/mixin/code'
import Pagination from '@/components/modules/pagination/Index'
import { getDetail } from '@/api/content'
import { addCollect } from '@/api/user'
import { getComments, addComment, updateComment, setCommentBest, setHands } from '@/api/comments'
import { escapeHtml } from '@/utils/escapeHtml'
import { scrollToElement } from '@/utils/common'

export default {
  components: {
    'imooc-hotlist': HotList,
    'imooc-ads': Ads,
    'imooc-links': Links,
    'imooc-panel': Panel,
    'imooc-editor': Editor,
    'imooc-pagination': Pagination,
  },
  mixins: [CodeMixin],
  props: ['tid'],
  data() {
    return {
      lay: {
        base: {},
      },
      comments: [],
      code: '',
      total: 0,
      size: 10,
      current: 1,
      page: {},
      editInfo: {
        content: '',
        code: '',
        sid: '',
        tid: '',
        item: {},
      },
    }
  },
  computed: {
    content() {
      if (typeof this.page.content === 'undefined') {
        return ''
      }
      if (this.page.content && this.page.content.trim() === '') {
        return
      }
      return escapeHtml(this.page.content)
    },
    user() {
      return this.$store.state.userInfo
    },
  },
  watch: {
    tid(newVal, oldVal) {
      this.getPostDetail()
      this.getCommentsList()
    },
  },
  methods: {
    handleChange(val) {
      this.current = val
      this.getCommentsList()
    },
    changeLimit(val) {
      this.size = val
      this.getCommentsList()
    },
    getPostDetail() {
      getDetail(this.tid).then((res) => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    getCommentsList() {
      this.comments = []
      getComments({
        tid: this.tid,
        page: this.current - 1,
        limit: this.size,
      }).then((res) => {
        if (res.code === 200) {
          this.comments.push(...res.data)
          console.log(this.comments)
          this.total = res.total
        }
      })
    },
    addContent(val) {
      this.editInfo.content = val
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      // 用户未登录
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$pop('shake', '请先登录')
      }

      // 用户禁言状态判断
      if (this.user.status !== '0') {
        this.$pop('shake', '用户已经禁言，请联系管理员')
        return
      }

      if (this.editInfo.content.trim() === this.editInfo.item.content) {
        this.$pop('shake', '请编辑评论后提交')
        return
      }
      // 添加评论
      this.editInfo.code = this.code
      this.editInfo.sid = this.$store.state.sid
      this.editInfo.tid = this.tid
      if (typeof this.editInfo.cid !== 'undefined' && this.editInfo.cid !== '') {
        // 更新评论
        const obj = { ...this.editInfo }
        delete obj['item']
        updateComment(obj).then((res) => {
          if (res.code === 200) {
            this.code = ''
            this.editInfo.content = ''
            this.getCommentsList()
            requestAnimationFrame(() => {
              this.$refs.observer.reset()
            })
            // 刷新图形验证码
            this._getCode()
          }
          this.$pop('', res.msg)
        })
        return
      }
      addComment(this.editInfo).then((res) => {
        if (res.code === 200) {
          // 发表成功后，清空回复内容
          this.code = ''
          this.editInfo.content = ''
          this.getCommentsList()
          this.$set(this.page, 'answer', parseInt(this.page.answer + 1))
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          // 刷新图形验证码
          this._getCode()
        }
        this.$pop('', res.msg)
      })
    },
    editComment(item) {
      this.editInfo.content = item.content
      // 动态滚动到输入框的位置，并且进行focus
      scrollToElement('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
      // 确定需要编辑的记录
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },
    setBest(item) {
      this.$confirm(
        '确定采纳未最佳答案吗？',
        () => {
          // const
          // 发送采纳未最佳答案的请求
          setCommentBest({
            cid: item._id,
            tid: this.tid,
          }).then((res) => {
            if (res.code === 200) {
              this.$pop('', res.msg)
              // this.getCommentsList()
              item.isBest = '1'
              this.page.isEnd = '1'
            }
          })
        },
        () => {},
      )
    },
    hands(item) {
      setHands({ cid: item._id }).then((res) => {
        if (res.code === 200) {
          this.$pop('', res.msg)
          item.handed = '1'
          item.hands += 1
        } else {
          this.$pop('shake', res.msg)
        }
      })
    },
    reply(item) {
      // 插入@ + name 到content
      // 滚动页面到输入框
      // focus
      const reg = /^@[\S]+/g
      if (this.editInfo.content) {
        if (reg.test(this.editInfo.content)) {
          this.editInfo.content.replace(reg, '@' + item.cuid.name)
        } else {
          if (this.editInfo.content !== '') {
            // 非空情况
            this.editInfo.content = `@${item.cuid.name} ${this.editInfo.content}`
          }
        }
      } else {
        // 评论框为空
        this.editInfo.content = '@' + item.cuid.name
      }

      // 动态滚动到输入框的位置，并且进行focus
      scrollToElement('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
      // 确定需要编辑的记录
      // this.editInfo.cid = item._id
      // this.editInfo.item = item
    },
    setCollect() {
      // 设置/取消收藏
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        const collect = {
          tid: this.tid,
          title: this.page.title,
          isFav: this.page.isFav ? 1 : 0,
        }
        addCollect(collect).then((res) => {
          if (res.code === 200) {
            this.page.isFav = this.page.isFav === 0 ? 1 : 0
            this.$pop('', this.page.isFav ? '设置收藏成功' : '取消收藏成功')
          }
        })
      } else {
        this.$pop('shake', '请先登录后再进行收藏')
      }
    },
  },
  created() {},
  mounted() {
    this.getPostDetail()
    this.getCommentsList()
  },
}
</script>
<style scoped lang="scss">
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}
.fly-detail-info {
  span {
    margin-right: 5px;
  }
}
</style>
