import {shuffle} from 'common/js/util'
import Vue from 'vue'
import {mapGetters, mapMutations, mapActions} from 'vuex'

//用于组件中 方便通信
export const communicationMixin = new Vue({
});

//用户组件中 混入方法
export const MethodMixin = {
	methods: {
		con() {
			console.log('con');
		}
	}
}