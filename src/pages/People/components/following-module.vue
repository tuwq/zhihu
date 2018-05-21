<template>
 	<div id="following">
 		<div class="list-header" v-if="otherUser||user">
 			<h4 class="header-text">
 				<div class="sub-tabs" v-if=" otherUser && detail_user_id!=user._id">
 					<a class="sub-item is-active" 
 					@click.stop.prevent="changeItem($event,0)"  
 					v-if="otherUser.info">{{otherUser.info.gender==0?'他':otherUser.info.gender==1?'他':'她'}}关注的人</a>
 					<a class="sub-item" 
 					@click.stop.prevent="changeItem($event,1)" 
 					v-if="otherUser.info">关注{{otherUser.info.gender==0?'他':otherUser.info.gender==1?'他':'她'}}的人</a>
 					<a class="sub-item" 
 					@click.stop.prevent="changeItem($event,2)" 
 					v-if="otherUser.info">{{otherUser.info.gender==0?'他':otherUser.info.gender==1?'他':'她'}}的专栏</a>
 				</div>
 				<div class="sub-tabs" v-if="detail_user_id==user._id">
 					<a class="sub-item is-active" @click.stop.prevent="changeItem($event,0)">我关注的人</a>
 					<a class="sub-item" @click.stop.prevent="changeItem($event,1)">关注我的人</a>
 					<a class="sub-item" @click.stop.prevent="changeItem($event,2)">我的专栏</a>
 				</div>
 			</h4>
 		</div>
 		<div v-show="listIndex==0">
 			<div class="list-item" v-for="(item,index) in follows" :key="item._id">
 				<div class="list-item">
 					<div class="item-main">
 						<div class="item-image"
 						@click.stop.prevent="toUser(item)"><a><img :src="base+item.avatar" width="60" height="60" ></a></div>
 						<div class="item-header">
 							<h2 class="item-title" @click.stop.prevent="toUser(item)"><a href="">{{item.username}}</a></h2>
 							<div class="item-meta">
 								<div class="ztext" v-if="item.info">{{item.info.intro}}</div>
 								<div class="status">
 									<span class="status-item">{{item.answerSum}}回答</span>
 									<span class="status-item">{{item.questionSum}}提问</span>
 									<span class="status-item">{{item.answeredSum}}回答者</span>
 								</div>
 							</div>
 						</div>
 						<div class="item-extra" v-show="user._id!=item._id">
 							<button class="followButton" v-show="item.flowerStatus==0" 
 							@click.stop.prevent="followPeople(item._id,1,index,0)">
 								<span style="display: inline-flex;align-item: center;">&#8203;<svg fill="currentColor" 
 									viewBox="0 0 24 24" width="1.2em" height="1.2em" style="margin-right: 8px; 
 									position: relative;top: 7px;">
 										<path d="M13.491 10.488s-.012-5.387 0-5.998c-.037-1.987-3.035-1.987-2.997 0-.038 1.912 0 5.998 0 5.998H4.499c-1.999.01-1.999 3.009 0 3.009s5.995-.01 5.995-.01v5.999c0 2.019 3.006 2.019 2.997 0-.01-2.019 0-5.998 0-5.998s3.996.009 6.004.009c2.008 0 2.008-3-.01-3.009h-5.994z"></path>
 									</svg>关注{{item.info.gender==0?'他':item.info.gender==1?'他':'她'}}</span>
 							</button>
 							<button class="followButton cancel" v-show="item.flowerStatus==1"
 							@click.stop.prevent="followPeople(item._id,0,index,0)"
 							@mouseenter="enter($event)" @mouseleave="leave($event)">
 								<span style="display: inline-flex;align-item: center;">已关注</span>
 							</button>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 		<div v-show="listIndex==1">
 			<div class="list-item">
 				<div class="list-item" v-for="(fan,fIndex) in fans" :key="fan._id">
 					<div class="item-main">
 						<div class="item-image" @click.stop.prevent="toUser(fan)"><a><img :src="base+fan.avatar" width="60" height="60"
 							></a></div>
 						<div class="item-header">
 							<h2 class="item-title" @click.stop.prevent="toUser(fan)"><a href="">{{fan.username}}</a></h2>
 							<div class="item-meta">
 								<div class="status">
 									<span class="status-item">{{fan.answerSum}} 回答</span>
 									<span class="status-item">{{fan.followSum}} 关注者</span>
 								</div>
 							</div>
 						</div>
 						<div class="item-extra" v-show="user._id!=fan._id">
 							<button class="followButton" v-show="fan.flowerStatus==0"
 							@click.stop.prevent="followPeople(fan._id,1,fIndex,1)">
 								<span style="display: inline-flex;align-item: center;">&#8203;<svg fill="currentColor" 
 									viewBox="0 0 24 24" width="1.2em" height="1.2em" style="margin-right: 8px; 
 									position: relative;top: 7px;">
 										<path d="M13.491 10.488s-.012-5.387 0-5.998c-.037-1.987-3.035-1.987-2.997 0-.038 1.912 0 5.998 0 5.998H4.499c-1.999.01-1.999 3.009 0 3.009s5.995-.01 5.995-.01v5.999c0 2.019 3.006 2.019 2.997 0-.01-2.019 0-5.998 0-5.998s3.996.009 6.004.009c2.008 0 2.008-3-.01-3.009h-5.994z"></path>
 									</svg>关注{{fan.info.gender==0?'他':fan.info.gender==1?'他':'她'}}</span>
 							</button>
 							<button class="followButton cancel" v-show="fan.flowerStatus==1"
 							@click.stop.prevent="followPeople(fan._id,0,fIndex,1)"
 							@mouseenter="enter($event)" @mouseleave="leave($event)">
 								<span style="display: inline-flex;align-item: center;">已关注</span>
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
import {communicationMixin,userMixin} from 'common/js/mixin.js'
	export default {
		mixins: [userMixin],
		props: {
 			otherUser: {
 				type: Object,
 				default() {
 					return {
 						info:{}
 					}
 				}
 			}
 		},
		data() {
			return {
				listIndex: 0,
				base: '../../../../static/avatar/60/',
				fans: [],
				follows: []
			}
		},
		methods: {
			enter(e) {
				e.target.innerText = '取消关注'
			},
			leave(e) {
				e.target.innerText = '已关注'
			},
			changeItem(e,index) {
				$(e.target).addClass('is-active').siblings().removeClass('is-active')
				this.listIndex = index	
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
			followPeople(target_id,action,index,from) {
				axios.post('/follow/followTarget',{
 					target_id: target_id,
 					action: action
 				}).then((res)=> {
 					if (res.data.status) {
 						alert(res.data.result.msg)
 					}
 					if (from==0) {	
 						if (action==1) {
 							this.follows[index].flowerStatus = 1
 						}else {
 							this.follows[index].flowerStatus = 0
 							// 当在本人主页修改关注信息时
 							if (this.user._id == this.detail_user_id) {
 								// 当我取消关注了后我的关注列表要刷新，同时我的右侧关注数要减少 
 								this.getFollowList()
 								// 粉丝列表状态没有同步，也需要刷新
 								this.getFansList()
 								communicationMixin.$emit('changeCount',0,0)
 							}
 						}
 					}else{
 						if (action==1) {
 							this.fans[index].flowerStatus = 1
 							if (this.user._id == this.detail_user_id) {
								// 当我在我的粉丝列表中关注我的粉丝时
								// 我的关注列表要刷新，同时我的右侧关注数要增加
								this.getFollowList()
								communicationMixin.$emit('changeCount',0,1)
 							}
 							
 						}else {
 							this.fans[index].flowerStatus = 0
 							if (this.user._id == this.detail_user_id) {
 								// 当我取消关注我的粉丝时,我的关注列表要刷新，同时我的右侧关注数要减少
	 							this.getFollowList()
	 							communicationMixin.$emit('changeCount',0,0)
 							}
 						}	
 					}
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
				communicationMixin.$on('reloadFollwer',()=> {
					this.getFansList()
				})
				// 当改变用户时，因为缓存，也要刷新一次
				communicationMixin.$emit('changeUser',()=> {
					this.getFollowList()
					this.getFansList()
				})
			}
		},
		created() {
			this.openList()
			this.getFollowList()
			this.getFansList()
		},
		computed: {
			...mapGetters([
				'detail_user_id',
				'user'
			])
		},
		watch: {
			detail_user_id(newval,oldval) {
				if (newval!=oldval && newval != undefined) {
					this.getFollowList()
					this.getFansList()
					// 更改查看用户时，回到动态第一页
					communicationMixin.$emit('changeMainIndex',0)
					communicationMixin.$emit('changeScrollIndex',0)
				}
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/following-module.less');
</style>
