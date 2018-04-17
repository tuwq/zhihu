import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home/home.vue';
import ZIndex from '@/pages/Home/components/z-index.vue';
import QuestionHome from '@/pages/Question/home.vue';

Vue.use(Router)

export default new Router({
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
          component: ZIndex
        }
      ]
   	},
    {
      path: '/question',
      component: QuestionHome
    } 
  ]
})
