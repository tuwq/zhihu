import {shuffle} from 'common/js/util'
import Vue from 'vue'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import axios from 'axios'
//用于组件中 方便通信
export const communicationMixin = new Vue({
});

//用户组件中 混入方法
export const MethodMixin = {
	
}

export const userMixin = {
	methods: {
		toUser(user) {
			if (!user) {
				return
			}
			let user_url = user._id
			this.$router.push({name: 'people_url',params: {user_url: user_url}}) 
		}
	}
}