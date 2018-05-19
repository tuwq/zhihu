<template>
	<div>
		<loading v-show="loading||!detail_loading"></loading>
		<div v-show="detail_loading">
			<div class="header" v-show="user||otherUser">
				<my-profile v-if="index_type == 1 " :user="user"></my-profile>
				<other-profile v-if="index_type == 2" :otherUser="otherUser" :fllowerStatus="fllowerStatus"
				@changeFllowerStatus="changeFllowerStatus"></other-profile>
			</div>
			<div class="main-content">
				<main-column></main-column>
				<side-column :detail_user_id="detail_user_id"></side-column>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import mainColumn from 'p_components/main-column.vue';
import sideColumn from 'p_components/side-column.vue';
import myproFile from 'p_components/myProfile.vue';
import otherProfile from 'p_components/otherProfile.vue';
import loading from 'base/loading.vue'
import {mapMutations,mapGetters} from 'vuex';
import { set, get } from '../../../common/js/cookie.js'
import axios from 'axios'
import {communicationMixin} from 'common/js/mixin'
  	export default {
  		data() {
  			return {
  				index_type: 0,
  				preFrom: '',
  				preNext: '',
  				otherUser: null,
  				loading: true,
  				detail_loading: false,
  				fllowerStatus: 0
  			}
  		},
  		components: {
  			'main-column': mainColumn,
  			'side-column': sideColumn,
  			'my-profile': myproFile,
  			'other-profile': otherProfile,
  			'loading': loading
  		},
		methods: {
			init(callback) {
				axios.post('/user/getIdByToken').then((res)=>{
					if (res.data.result._id == this.detail_user_id ) {
						this.loading = false
						this.index_type = 1
						this.detail_loading = true
					}else {
						axios.post('/user/getInfoById',{
							_id: this.detail_user_id
						}).then((res)=> {
							this.loading = false
							this.otherUser = res.data.result.userInfo
							if (res.data.status) {
								// 404
							}else {
								// 当前用户是否关注目标用户
								axios.post('/follow/userBind',{
									detail_id: this.detail_user_id
								}).then((res)=> {
									this.fllowerStatus = res.data.result.fllowerStatus
									this.index_type = 2
									this.detail_loading = true
								})
							}
						})
					}
				})
			},
			changeFllowerStatus(status) {
				this.fllowerStatus = status
			}
		},
		created() {
			this.init()
			// 退出用户后再次登录后index_type不会被改变，无法init,所以要监听改变用户
			communicationMixin.$on('changeUser',()=> {
				this.loading = true,
				this.detail_loading = false
				this.init()
			})
		},
		computed: {
			...mapGetters([
				'user',
				'detail_user_id'
			])
		},
		watch: {
			detail_user_id (newval,oldval) {
				this.detail_loading = false
				this.init()
			}
		}
//		watch: {
//			// 解决组件内部修改地址栏同路由不更新页面数据的BUG
//			'$route' (to, from) {
//		        const toDepth = to.path
//		        const fromDepth = from.path
//		        if (this.preFrom != toDepth && this.preTo == fromDepth) {
//		        	this.$router.go(0);
//		        } else if (toDepth.indexOf('/people')!=-1 && fromDepth!='/home') {
//		        	this.$router.go(0)
//		        }else {
//		        	 this.preFrom = fromDepth
//		         	 this.preTo = toDepth
//		        }
//		     }
//		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/p-index.less');
</style>
