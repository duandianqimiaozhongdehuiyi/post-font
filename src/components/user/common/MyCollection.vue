<!--
 * @Author: your name
 * @Date: 2021-03-01 14:55:33
 * @LastEditTime: 2021-03-12 11:16:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\user\common\MyCollection.vue
-->
<!--  -->
<template>
  <div>
    <div class="overflow">
      <table class="layui-table">
        <thead>
          <tr>
            <th class="title"><div class="layui-table-cell text-center">帖子标题</div></th>
            <th class=""><div class="layui-table-cell text-center">收藏时间</div></th>
          </tr>
        </thead>
        <tr v-for="(item, index) in list" :key="'mycollection' + index">
          <td class="text-center">
            <router-link class="link" :to="{ name: 'detail', params: { tid: item._id } }">{{
              item.title
            }}</router-link>
          </td>
          <td class="text-center">{{ item.created | moment }}</td>
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
import { getCollect } from '@/api/user'
import Pagination from '@/components/modules/pagination/Index'
export default {
  name: 'myCollection',
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
      this.getCollectList()
    },
    changeLimit(val) {
      this.limit = val
      this.getCollectList()
    },
    getCollectList() {
      getCollect({
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
  },
  created() {},
  mounted() {
    this.getCollectList()
  },
}
</script>
<style scoped lang="scss">
.title {
  width: 70%;
}
.overflow {
  overflow-y: auto;
}
.min-cell {
  min-width: 80px;
}
.link {
  color: #009688;
}
</style>
