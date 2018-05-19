<template>
 	<div id="attention">
 		<div class="Modal-wrapper" v-show="attention_question_modal">
 			<div class="Modal-backdrop" @click.stop.prevent="clsModal"></div>
			<div class="Modal Modal-fullPage">
				<loading v-show="loading"></loading>
				<div class="Modal-inner" v-show="!loading">
					<div class="Modal-content" >
						<div class="VoteList">
							<div class="topbar">
								<div class="topbar-title"><span>{{sum}}人关注了</span></div>
							</div>
							<div class="content">
								<div class="list-item" v-for="(item,index) in users">
									<div class="contentItem-image">
										<div class="user-link">
											<img :src="base+item.avatar">
										</div>
									</div>
									<div class="contentItem-head">
										<div class="contentItem-title"><a @click.stop.prevent="toUser(item)">{{item.username}}</a></div>
										<div class="contentItem-meta">
											<div class="contentItem-status">
												<span>{{item.answerSum}} 回答</span>
												<span>{{item.fansLength}} 关注者</span>
											</div>
										</div>
									</div>
									<div class="contentItem-extra" v-show="item.info && item._id!=user._id">
										<button class="follwButton" v-show="item.followStatus==0" 
										@click.stop.prevent="followPeople(item._id,1,index)"> 
											<span style="display: inline-flex; align-items: center;">​&#8203;<svg 
												fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em">
													<path d="M13.491 10.488s-.012-5.387 0-5.998c-.037-1.987-3.035-1.987-2.997 0-.038 1.912 0 5.998 0 5.998H4.499c-1.999.01-1.999 3.009 0 3.009s5.995-.01 5.995-.01v5.999c0 2.019 3.006 2.019 2.997 0-.01-2.019 0-5.998 0-5.998s3.996.009 6.004.009c2.008 0 2.008-3-.01-3.009h-5.994z"></path>
												</svg></span>
											关注{{item.info.gender==0?'他':item.info.gender==1?'他':'她'}}
										</button>
										<button class="follwButton cancel" ref="cancel" v-show="item.followStatus==1"
										@click.stop.prevent="followPeople(item._id,0,index)">
											{{followText}}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button class="Modal-closeButton" @click.stop="clsModal">
					<svg fill="#fff" style="vertical-align: top;" viewBox="0 0 24 24" width="24" height="24">
						<path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z"></path>
					</svg>
				</button>
			</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapMutations,mapActions} from 'vuex';
import loading from 'base/loading.vue'
import {communicationMixin,userMixin} from 'common/js/mixin'
import {extend} from 'common/js/common'
import axios from 'axios'
	export default {
		mixins: [communicationMixin,userMixin],
		data() {
			return {
				base: '../../../../static/avatar/60/',
				loading: true,
				users: [],
				sum: 0,
				followText: '已关注'
			}
		},
		methods: {
			clsModal() {
				this.setAttentionQuestionModal(false)
			},
			mergeData(users,infos) {
				infos.forEach((item,index)=> {
					extend(users[index],item)
				})
				return users
			},
			followPeople(target_id,action,index) {
				axios.post('/follow/followTarget',{
 					target_id: target_id,
 					action: action
 				}).then((res)=> {
 					if (res.data.status) {
 						alert(res.data.result.msg)
 					}
 					this.users[index].followStatus = action==1?1:0
 					action==1?this.users[index].fansLength++:this.users[index].fansLength--
 				})
			},
			...mapMutations({
				setAttentionQuestionModal: 'SET_ATTENTION_QUESTION_MODAL',
			})
		},
		computed: {
			...mapGetters([
				'attention_question_modal',
				'user'
			])
		},
		created() {
			communicationMixin.$on('openAttention',(question_id)=> {
				this.loading = true
				axios.post('/attention/question/read',{
					question_id: question_id
				}).then((res)=> {
					this.sum = res.data.result.sum
					this.users = this.mergeData(res.data.result.users,res.data.result.infos)	
					this.loading = false
					this.$nextTick(()=> {
						$(this.$refs.cancel).each((index,item)=> {
							$(item).hover(()=> {
								$(item).text('取消关注')
							},()=> {
								$(item).text('已关注')
							})
						})
					})
				})
			})
		},
		components: {
			loading
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/attention.less');
</style>
