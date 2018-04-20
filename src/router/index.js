import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home/home.vue';
import ZIndex from '@/pages/Home/components/z-index.vue';
import QuestionHome from '@/pages/Question/home.vue';
import QIndex from '@/pages/Question/components/q-index.vue';
import LoginHome from '@/pages/Login/home.vue';


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
          ]
        },  
      ]
    },
    {
      path: '/login',
      component: LoginHome
    }
  ]
})
