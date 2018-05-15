<template>
	<div>
		<div v-if="user||otherUser">
			<div class="header" v-show="user">
				<my-profile v-if="index_type == 1 " :user="user"></my-profile>
				<other-profile v-if="index_type == 2" :otherUser="otherUser"></other-profile>
			</div>
			<div class="main-content">
				<main-column></main-column>
				<side-column></side-column>
			</div>
		</div>	
	</div>
</template>

<script type="text/ecmascript-6">
import mainColumn from 'p_components/main-column.vue';
import sideColumn from 'p_components/side-column.vue';
import myproFile from 'p_components/myProfile.vue';
import otherProfile from 'p_components/otherProfile.vue';
import {mapMutations,mapGetters} from 'vuex';
import { set, get } from '../../../common/js/cookie.js'
import axios from 'axios'
  	export default {
  		data() {
  			return {
  				index_type: 0,
  				preFrom: '',
  				preNext: '',
  				otherUser: null
  			}	
  		},
  		components: {
  			'main-column': mainColumn,
  			'side-column': sideColumn,
  			'my-profile': myproFile,
  			'other-profile': otherProfile
  		},
		methods: {
			init(callback) {
				axios.post('/user/getIdByToken').then((res)=>{
					if (res.data.result._id === this.detail_user_id ) {
						this.index_type = 1
					}else {
						axios.post('/user/getInfoById',{
							_id: this.detail_user_id
						}).then((res)=> {
							if (res.data.status) {
								// 404
							}else {
								this.index_type = 2
								this.otherUser = res.data.result
							}
						})
					}
				})		
			}
		},
		mounted() {
			this.init()
		},
		computed: {
			...mapGetters([
				'user',
				'detail_user_id'
			])
		},
		watch: {
			// 解决组件内部修改地址栏同路由不更新页面数据的BUG
			'$route' (to, from) {
		        const toDepth = to.path
		        const fromDepth = from.path
		        if (this.preFrom != toDepth && this.preTo == fromDepth) {
		        	this.$router.go(0);
		        } else if (toDepth.indexOf('/people')!=-1 && fromDepth!='/home') {
		        	this.$router.go(0)
		        }else {
		        	 this.preFrom = fromDepth  		
		         	 this.preTo = toDepth	
		        }
		     }
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/p-index.less');
</style>
