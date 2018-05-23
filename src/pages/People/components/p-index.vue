<template>
	<div>
		<loading v-show="total_loading"></loading>
		<div v-show="!total_loading">
			<div class="header" v-show="user||otherUser">
				<my-profile v-if="index_type == 1 " :user="user"></my-profile>
				<other-profile v-if="index_type == 2" :otherUser="otherUser" :fllowerStatus="fllowerStatus"
				@changeFllowerStatus="changeFllowerStatus"></other-profile>
			</div>
			<div class="main-content">
				<main-column :otherUser="otherUser" 
				:questionSum="questionSum" :answerSum="answerSum"></main-column>
				<side-column :detail_user_id="detail_user_id"
				:fansSum="fansSum" :followerSum="followerSum"
				:approveSum="approveSum"
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
  				total_loading: true,
  				fllowerStatus: 0,
  				fansSum: 0,
  				followerSum: 0,
  				approveSum: 0,
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
						this.index_type = 1
						this.updateCountInfo()
						
					}else {
						axios.post('/user/getInfoById',{
							_id: this.detail_user_id
						}).then((res)=> {
							this.otherUser = res.data.result.userInfo
							// 当前用户是否关注目标用户
							axios.post('/follow/userBind',{
								detail_id: this.detail_user_id
							}).then((res)=> {
								this.fllowerStatus = res.data.result.fllowerStatus
								this.index_type = 2
								this.updateCountInfo()
							})
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
 					this.fansSum = res.data.result.fansSum
 					this.followerSum = res.data.result.followerSum
 					this.approveSum = res.data.result.approveSum
 					this.answerSum = res.data.result.answerSum
 					this.questionSum = res.data.result.questionSum
 					this.total_loading = false
 					communicationMixin.$emit('ChangeScrollCount',{questionSum: this.questionSum,answerSum: this.answerSum})
 					communicationMixin.$emit('setScrollHeaderAvatar',this.user)
 				})
			},
			listenerFollowChange() {
 				// 改变关注列表数量和粉丝列表数量
 				// from， 	0:关注列表  1:粉丝列表
 				// action, 	0:关注增加  1；关注减少
 				communicationMixin.$on('changeFollowCount',(from,action)=> {
 					if (from==0) {
 						if (action==1) {
 							this.followerSum++
 						}else {
 							this.followerSum--
 						}
 					}else {
 						if (action==1) {
 							this.fansSum++
 						}else {
 							this.fansSum--
 						}
 					}
 				})
 			}
		},
		created() {
			this.init()
			this.listenerFollowChange()
		},
		computed: {
			detail_user_id() {
				return this.$route.params.user_url
			},
			...mapGetters([
				'user',
			])
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/p-index.less');
</style>
