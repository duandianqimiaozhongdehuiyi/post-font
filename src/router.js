/*
 * @Author: your name
 * @Date: 2020-11-29 09:00:58
 * @LastEditTime: 2021-03-23 14:46:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\router.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'moment'
Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('./views/channels/Index.vue'),
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: () => import('./views/channels/Template1.vue'),
        },
      ],
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/Test.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('./views/Reg.vue'),
      beforeEnter: (to, from, next) => {
        console.log(to)
        console.log(from)
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      },
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('./views/Forget.vue'),
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('./components/contents/Add.vue'),
    },
    {
      path: '/edit/:tid',
      name: 'edit',
      props: true,
      component: () => import('./components/contents/Edit.vue'),
      beforeEnter(to, from, next) {
        // 正常情况，从detail
        console.log('to:', to)
        console.log('from:', from)
        console.log('isEnd', to.params.page.isEnd)
        if (
          ['detail', 'mypost'].includes(from.name) &&
          to.params.page &&
          to.params.page.isEnd === '0'
        ) {
          next()
        } else {
          // 用户在edit页面刷新的情况
          const editData = localStorage.getItem('editData')
          if (editData && editData !== '') {
            const editObj = JSON.parse(editData)
            if (editObj.isEnd === '0') {
              next()
            } else {
              next('/')
            }
          } else {
            next('/')
          }
        }
      },
    },
    {
      path: '/detail/:tid',
      props: true,
      name: 'detail',
      component: () => import('./components/contents/Detail.vue'),
    },
    {
      path: '/user/:uid',
      name: 'home',
      props: true,
      component: () => import('./views/User.vue'),
    },
    {
      path: '/center',
      component: () => import('./views/Center.vue'),
      linkActiveClass: 'layui-this',
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'center',
          component: () => import('./components/user/Center.vue'),
        },
        {
          path: 'set',
          component: () => import('./components/user/Settings.vue'),
          children: [
            {
              path: '',
              name: 'info',
              component: () => import('./components/user/common/MyInfo.vue'),
            },
            {
              path: 'pic',
              name: 'pic',
              component: () => import('./components/user/common/PicUpload.vue'),
            },
            {
              path: 'password',
              name: 'password',
              component: () => import('./components/user/common/Password.vue'),
            },
            {
              path: 'accounts',
              name: 'accounts',
              component: () => import('./components/user/common/Accounts.vue'),
            },
          ],
        },
        {
          path: 'posts',
          component: () => import('./components/user/Posts.vue'),
          children: [
            {
              path: '',
              name: 'mypost',
              component: () => import('./components/user/common/MyPost.vue'),
            },
            {
              path: 'mycollection',
              name: 'mycollection',
              component: () => import('./components/user/common/MyCollection.vue'),
            },
          ],
        },
        {
          path: 'msg',
          name: 'msg',
          component: () => import('./components/user/Msg.vue'),
        },
        {
          path: 'others',
          name: 'others',
          component: () => import('./components/user/Others.vue'),
        },
      ],
    },
    {
      path: '/404',
      component: () => import('./views/NotFound.vue'),
    },
    // 所有没有定义的路由都重定向到404页面
    {
      path: '*',
      redirect: '/404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    console.log('payload:', payload)
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 说明没有过期
      //取localstoreage里卖弄的token信息 + 用户信息
      // 8-24小时， refresh token 1个月
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    } else {
      localStorage.clear()
      next('/login')
    }
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    // 需要用户登录的页面区别
    if (isLogin) {
      // 已经登录的状态
      // 权限判断，meta元数据
      next()
    } else {
      next('/login')
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router
