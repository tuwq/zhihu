import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home/home.vue';
import ZIndex from '@/pages/Home/components/z-index.vue';
import QuestionHome from '@/pages/Question/home.vue';
import QIndex from '@/pages/Question/components/q-index.vue';
import QuestionRecommend from '@/pages/Question/components/recommend.vue';
import QuestionHot from '@/pages/Question/components/hot.vue';
import QuestionInvite from '@/pages/Question/components/invite.vue';
import LoginHome from '@/pages/Login/home.vue';
import LoginLog from '@/pages/Login/components/login.vue';
import LoginRegist from '@/pages/Login/components/regist.vue';

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
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
          redirect: 'zindex'
        },
        {
          path: 'zindex',
          component: ZIndex
        }
      ]
   	},
    {
      path: '/question',
      component: QuestionHome,
      children: [
        {
          path: '',
          redirect: 'qindex'
        },
        {
          path: 'qindex',
          component: QIndex,
          children: [
            {
              path: '',
              redirect: 'recommend'
            },
            {
              path: 'recommend',
              component: QuestionRecommend
            },
            {
              path: 'hot',
              component: QuestionHot
            },
            {
              path: 'invite',
              component: QuestionInvite
            }
          ]
        },  
      ]
    },
    {
      path: '/login',
      component: LoginHome,
      children: [
        {
          path: '',
          redirect: 'login'
        },
        {
          path: 'login',
          component: LoginLog
        },
        {
          path: 'regist',
          component: LoginRegist
        }
      ]
    }
  ]
})
