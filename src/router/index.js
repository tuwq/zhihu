import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/pages/Main/main.vue'
import Home from '@/pages/Main/Home/home.vue';
import ZIndex from '@/pages/Main/Home/components/z-index.vue';
import Detail from '@/pages/Main/Detail/detail.vue';
import People from '@/pages/Main/People/people.vue';
import PIndex from '@/pages/Main/People/components/p-index.vue';
import Edit from '@/pages/Main/People/components//edit.vue'
import QuestionHome from '@/pages/Question/home.vue';
import QIndex from '@/pages/Question/components/q-index.vue';
import LoginHome from '@/pages/Login/home.vue';
import Test from 'base/testUpload.vue'
import Cut from 'base/cut.vue'
import NotFound from 'base/notFound.vue'

Vue.use(Router)

var router = new Router({
  linkActiveClass: 'active',
  // canReuse: function (transition) {
  //   return false
  // },
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          component: Home,
          children: [
            {
              path: '',
              component: ZIndex,
              name: 'zIndex',
              meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的,有子路由时需要写在子路由中
              }
            },
            {
              path: 'test',
              component: Test
            }]
        },
        {
          path: 'question/:question_id',
          name: 'question_detail',
          component: Detail,
        },
        {
          path: 'people',
          component: People,
          children: [
            {
              path: 'edit',     // 详细路由写前面
              component: Edit,
              name: 'edit',
              meta: {
                  requireAuth: true,
              }
            },
            {
              path: ':user_url',   // url上暴露用户id，其实并不合理，应该另取一个用户唯一标识
              component: PIndex,
              name: 'people_url', 
              meta: {
                  requireAuth: true, 
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: LoginHome
    },
    {
      path: '/cut',
      component: Cut,
      name: 'cut',
      meta: {
          requireAuth: true, 
      }
    },
    {
      path: '/question',
      component: QuestionHome,
      children: [
        {
          path: '',
          component: QIndex,
        }
      ]
    },
    {
      path: '*',
      component: NotFound,
      
    }
  ]
})

import store from 'store/main.js'
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

import axios from 'axios'
import * as types from '../store/mutation-types'
axios.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.token  = `${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
      if (response.data.status==401) {
          store.commit(types.REMOVE_TOKEN);
          router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}
          })
      }
      return response;
  },
  error => {
      console.log(err.res)
      if (error.res) {
          switch (error.response.status) {
              case 401:
                  // 返回 401 清除token信息并跳转到登录页面
              store.commit(types.REMOVE_TOKEN);
              router.replace({
                  path: '/login',
                  query: {redirect: router.currentRoute.fullPath}
              })
          }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  }
);

export default router
