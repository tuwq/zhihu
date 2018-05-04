import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home/home.vue';
import ZIndex from '@/pages/Home/components/z-index.vue';
import QuestionHome from '@/pages/Question/home.vue';
import QIndex from '@/pages/Question/components/q-index.vue';
import LoginHome from '@/pages/Login/home.vue';
import Detail from '@/pages/Detail/detail.vue';
import People from '@/pages/People/people.vue';
import PIndex from 'p_components/p-index.vue';
import Edit from 'p_components/edit.vue'
import Test from 'base/test.vue'

Vue.use(Router)

var router = new Router({
  linkActiveClass: 'active',
  canReuse: function (transition) {
    return false
  },
  routes: [
   	{
   		path: '/',
   		redirect: '/home'
   	},
   	{
   		path: '/home',
  		component: Home,
  		children: [
        {
          path: '',
          component: ZIndex,
          meta: {
              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的,有子路由时需要写在子路由中
          }
        },{
          path: 'test',
          component: Test
        }
      ]
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
      path: '/login',
      component: LoginHome
    },
    {
      path: '/question/:question_id',
      component: Detail
    },
    {
      path: '/people',
      component: People,  //拥有子路由的父路由无法取name
      children: [{
        path: 'edit',     // 详细路由写前面
        component: Edit,
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: ':user_url',
        component: PIndex,
        name: 'people_url', 
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }
      }]
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
