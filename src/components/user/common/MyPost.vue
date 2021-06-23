<!--
 * @Author: your name
 * @Date: 2021-03-01 14:54:53
 * @LastEditTime: 2021-03-12 11:01:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\user\common\M有Post.vue
-->
<!--  -->
<template>
  <div>
    <div class="overflow">
      <table class="layui-table">
        <thead>
          <tr class="">
            <th class=""><div class="layui-table-cell pl0 text-left">帖子标题</div></th>
            <th><div class="layui-table-cell text-center">状态</div></th>
            <th><div class="layui-table-cell text-center">结帖</div></th>
            <th><div class="layui-table-cell text-center">发表时间</div></th>
            <th><div class="layui-table-cell text-center">数据</div></th>
            <th><div class="layui-table-cell text-center min-cell">操作</div></th>
          </tr>
        </thead>
        <tr class="text-center" v-for="(item, index) in list" :key="'mypost' + index">
          <td class="text-left">
            <router-link class="link" :to="{ name: 'detail', params: { tid: item._id } }">{{
              item.title
            }}</router-link>
          </td>
          <td>{{ item.status === '0' ? '打开' : '关闭' }}</td>
          <td :class="{ success: item.isEnd !== '0' }">
            {{ item.isEnd === '0' ? '未结' : '已结贴' }}
          </td>
          <td>{{ item.created | moment }}</td>
          <td>{{ item.reads }}阅/{{ item.answer }}答</td>
          <td>
            <div
              class="layui-btn layui-btn-xs"
              :class="{ 'layui-btn-disabled': item.isEnd === '1' }"
              @click="editPost(item)"
            >
              编辑
            </div>
            <div class="layui-btn layui-btn-xs layui-btn-danger" @click="deletePost(item)">
              删除
            </div>
          </td>
        </tr>
      </table>
    </div>
    <imooc-pagination
      v-show="list.length > 0 && total > 0"
      :align="'left'"
      :total="total"
      :current="current"
      :hasTotal="true"
      :hasSelect="true"
      @changeCurrent="handleChange"
      @changeLimit="changeLimit"
    ></imooc-pagination>
  </div>
</template>

<script>
import { getPostListByUid, deletePostByUid } from '@/api/user'
import Pagination from '@/components/modules/pagination/Index'
export default {
  name: 'myPost',
  components: {
    'imooc-pagination': Pagination,
  },
  data() {
    return {
      list: [],
      limit: 10,
      total: 0,
      current: 1,
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleChange(val) {
      this.current = val
      this.getPostList()
    },
    changeLimit(val) {
      this.limit = val
      this.getPostList()
    },
    getPostList() {
      getPostListByUid({
        page: this.current - 1,
        limit: this.limit,
      }).then((res) => {
        if (res.code === 200) {
          this.list = res.data
          this.total = res.total
        } else {
          this.$pop('', res.msg)
        }
      })
    },
    editPost(item) {
      if (item.isEnd === '1') {
        this.$pop('shake', '帖子已经结帖， 无法编辑')
        return
      } else {
        this.$router.push({ name: 'edit', params: { tid: item._id, page: item } })
      }
    },
    deletePost(item) {
      this.$confirm(
        '确定删除吗？',
        () => {
          if (item.isEnd === '0') {
            deletePostByUid({
              tid: item._id,
            }).then((res) => {
              if (res.code === 200) {
                this.$pop('', '删除成功')
                this.getPostList()
              } else {
                this.$pop('shake', res.msg)
              }
            })
          } else {
            this.$pop('shake', '帖子已结帖，无法删除')
          }
        },
        () => {},
      )
    },
  },
  created() {},
  mounted() {
    this.getPostList()
  },
}
</script>
<style scoped lang="scss">
.overflow {
  overflow-y: auto;
}
.min-cell {
  min-width: 80px;
}
.link {
  color: #009688;
}
.success {
  color: #009688;
}
</style>
