import Vue from 'vue'
import Router from 'vue-router'

import ZIndex from 'components/z-index.vue';

Vue.use(Router)

export default new Router({
  routes: [
   	{
   		path: '/',
   		redirect: '/index'
   	},
   	{
   		path: '/index',
		component: ZIndex,
		children: [
		]
   	}
  ]
})
