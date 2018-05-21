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
				<main-column :otherUser="otherUser" 
				:questionSum="questionSum" :answerSum="answerSum"></main-column>
				<side-column :detail_user_id="detail_user_id"
				:fansCount="fansCount" :followerCount="followerCount"
				:approveCount="approveCount"
				></side-column>
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
  				fllowerStatus: 0,
  				fansCount: 0,
  				followerCount: 0,
  				approveCount: 0,
  				questionSum: 0,
  				answerSum: 0
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
			},
			updateCountInfo() {
				// 查找赞同数，粉丝数，关注列表数
 				axios.post('/user/readApprove',{
 					detail_id: this.detail_user_id
 				}).then((res)=> {
 					this.fansCount = res.data.result.fansCount
 					this.followerCount = res.data.result.followerCount
 					this.approveCount = res.data.result.approveCount
 					this.answerSum = res.data.result.answerSum
 					this.questionSum = res.data.result.questionSum
 					communicationMixin.$emit('ChangeScrollCount',{questionSum: this.questionSum,answerSum: this.answerSum})
 				})
			},
			listenerFollowChange() {
 				// 改变关注列表数量和粉丝列表数量
 				// from， 	0:关注列表  1:粉丝列表
 				// action, 	0:关注增加  1；关注减少
 				communicationMixin.$on('changeFollowCount',(from,action)=> {
 					if (from==0) {
 						if (action==1) {
 							this.followerCount++
 						}else {
 							this.followerCount--
 						}
 					}else {
 						if (action==1) {
 							this.fansCount++
 						}else {
 							this.fansCount--
 						}
 					}
 				})
 			}
		},
		created() {
			this.init()
			this.updateCountInfo()
			this.listenerFollowChange()
			// 退出用户后再次登录后index_type不会被改变，无法init,所以要监听改变用户
			communicationMixin.$on('changeUser',()=> {
				this.loading = true,
				this.detail_loading = false
				this.init()
				this.updateCountInfo()
			})
		},
		computed: {
			detail_user_id() {
				return this.$route.params.user_url
			},
			...mapGetters([
				'user',
			])
		},
		watch: {
			detail_user_id (newval,oldval) {
				if ( newval != oldval && newval != undefined ) {
					this.detail_loading = false
					this.init()
					this.updateCountInfo()
				}
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/p-index.less');
</style>
