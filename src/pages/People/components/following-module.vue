<template>
 	<div id="following">
 		<div class="list-header">
 			<h4 class="header-text">
 				<div class="sub-tabs">
 					<a class="sub-item is-active">他关注的人</a>
 					<a class="sub-item">关注他的人</a>
 					<a class="sub-item">他的专栏</a>
 				</div>
 			</h4>
 		</div>
 		<div v-show="listIndex==0">
 			<div class="list-item" v-for="(item,index) in follows" :key="item._id">
 				<div class="list-item">
 					<div class="item-main">
 						<div class="item-image"><a><img :src="base+item.avatar" width="60" height="60"></a></div>
 						<div class="item-header">
 							<h2 class="item-title"><a href="">{{item.username}}</a></h2>
 							<div class="item-meta">
 								<div class="ztext" v-if="item.info">{{item.info.intro}}</div>
 								<div class="status">
 									<span class="status-item">{{item.answerSum}}回答</span>
 									<span class="status-item">{{item.questionSum}}提问</span>
 									<span class="status-item">{{item.answeredSum}}回答者</span>
 								</div>
 							</div>
 						</div>
 						<div class="item-extra">
 							<button class="followButton">
 								<span style="display: inline-flex;align-item: center;">&#8203;<svg fill="currentColor" 
 									viewBox="0 0 24 24" width="1.2em" height="1.2em" style="margin-right: 8px; 
 									position: relative;top: 7px;">
 										<path d="M13.491 10.488s-.012-5.387 0-5.998c-.037-1.987-3.035-1.987-2.997 0-.038 1.912 0 5.998 0 5.998H4.499c-1.999.01-1.999 3.009 0 3.009s5.995-.01 5.995-.01v5.999c0 2.019 3.006 2.019 2.997 0-.01-2.019 0-5.998 0-5.998s3.996.009 6.004.009c2.008 0 2.008-3-.01-3.009h-5.994z"></path>
 									</svg>关注他</span>
 							</button>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 		<div v-show="listIndex==1">
 			<div class="list-item">
 				<div class="list-item" v-for="(fan,index) in fans" :key="fan._id">
 					<div class="item-main">
 						<div class="item-image"><a><img :src="base+fan.avatar" width="60" height="60"></a></div>
 						<div class="item-header">
 							<h2 class="item-title"><a href="">{{fan.username}}</a></h2>
 							<div class="item-meta">
 								<div class="status">
 									<span class="status-item">{{fan.questionSum}} 回答</span>
 									<span class="status-item">{{fan.followSum}} 关注者</span>
 								</div>
 							</div>
 						</div>
 						<div class="item-extra" v-if="fan.info">
 							<button class="followButton">
 								<span style="display: inline-flex;align-item: center;">&#8203;<svg fill="currentColor" 
 									viewBox="0 0 24 24" width="1.2em" height="1.2em" style="margin-right: 8px; 
 									position: relative;top: 7px;">
 										<path d="M13.491 10.488s-.012-5.387 0-5.998c-.037-1.987-3.035-1.987-2.997 0-.038 1.912 0 5.998 0 5.998H4.499c-1.999.01-1.999 3.009 0 3.009s5.995-.01 5.995-.01v5.999c0 2.019 3.006 2.019 2.997 0-.01-2.019 0-5.998 0-5.998s3.996.009 6.004.009c2.008 0 2.008-3-.01-3.009h-5.994z"></path>
 									</svg>关注{{fan.info.gender==0?'他':fan.info.gender==1?'他':'她'}}</span>
 							</button>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 		<div v-show="listIndex==2"></div>
 	</div>
</template>

<script type="text/ecmascript-6">
import {mapMutations,mapGetters} from 'vuex';
import {mergeData} from 'common/js/common'
import axios from 'axios'
import {communicationMixin} from 'common/js/mixin.js'
	export default {
		data() {
			return {
				listIndex: 0,
				fans: [],
				follows: [],
				base: '../../../../static/avatar/60/'
			}
		},
		methods: {
			initLink() {
				$('.sub-item').each((index,item)=> {
					$(item).on('click',(e)=> {
						$(item).addClass('is-active').siblings().removeClass('is-active')
						this.listIndex = index
					})
				})
			},
			getFansList() {
				axios.post('/follow/user/fans',{
					detail_id: this.detail_user_id
				}).then((res)=> {
					let users = res.data.result.users
					let infos = res.data.result.infos
					this.fans = mergeData(users,infos)
				})
			},
			getFollowList() {
				axios.post('/follow/user/follow',{
					detail_id: this.detail_user_id
				}).then((res)=> {
					let users = res.data.result.users
					let infos = res.data.result.infos
					this.follows = mergeData(users,infos)	
				})
			},
			openList() {
				communicationMixin.$on('openFollw',()=> {
					this.listIndex = 0
					$('.sub-item').eq(0).addClass('is-active').siblings().removeClass('is-active')
				})
				communicationMixin.$on('openFans',()=> {
					this.listIndex = 1
					$('.sub-item').eq(1).addClass('is-active').siblings().removeClass('is-active')
				})
			}
		},
		mounted() {
			this.initLink()
		},
		created() {
			this.openList()
			this.getFollowList()
			this.getFansList()
		},
		computed: {
			...mapGetters([
				'detail_user_id'
			])
		},
		watch: {
			detail_user_id(newval,oldval) {
				if (newval!=oldval && newval != undefined) {
					this.getFollowList()
					this.getFansList()
				}
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/following-module.less');
</style>
