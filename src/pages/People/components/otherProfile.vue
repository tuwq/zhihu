<template>
	<div id="otherProfile">
		<div class="Card" v-if="otherUser">
			<div class="top"></div>
			<div class="bottom">
				<div class="userInfo-box">
					<div class="avatar-box">
						<div class="avatar-inner">
							<img :src="base+otherUser.avatar" width="160" height="160" class="avatar-img">
						</div>
					</div>
					<div class="info" v-if="otherUser.info">
						<div class="info-header">
							<h1>
								<span class="name">{{otherUser.username}}</span>
								<span class="signature">{{otherUser.info.intro}}</span>
							</h1>
						</div>
						<div class="info-body">
							<span class="intro-font">个人简介</span>
							<span class="intro">{{otherUser.info.introduction}}</span>
						</div>
						<div class="info-footer"><button class="drop"><svg viewBox="0 0 10 6" width="10" height="16" fill="currentColor" style="margin: 0 16px 0 4px;transform: rotate(180deg);"><title></title><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg>收起详细资料</button></div>	
						<div class="buttons">
							<button class="attention" v-show="fllowerStatus==0" @click.stop.prevent="followPeople(otherUser._id,1)"><span>&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em" style="margin-right: 8px;position: relative;top: 3px;"><path d="M13.491 10.488s-.012-5.387 0-5.998c-.037-1.987-3.035-1.987-2.997 0-.038 1.912 0 5.998 0 5.998H4.499c-1.999.01-1.999 3.009 0 3.009s5.995-.01 5.995-.01v5.999c0 2.019 3.006 2.019 2.997 0-.01-2.019 0-5.998 0-5.998s3.996.009 6.004.009c2.008 0 2.008-3-.01-3.009h-5.994z"></path></svg></span>关注{{otherUser.info.gender==0?'他':otherUser.info.gender==1?'他':'她'}}</button>
							<button class="attention cancel" v-show="fllowerStatus==1" type="button" @click.stop.prevent="followPeople(otherUser._id,0)" 
	 						@mouseenter="enter($event)" @mouseleave="leave($event)" style="color: #fff;background-color: #8590a6;">已关注</button>
							<button class="private"><span>&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em" style="margin-right: 8px;"><path d="M11 2c5.571 0 9 4.335 9 8 0 6-6.475 9.764-11.481 8.022-.315-.07-.379-.124-.78.078-1.455.54-2.413.921-3.525 1.122-.483.087-.916-.25-.588-.581 0 0 .677-.417.842-1.904.064-.351-.14-.879-.454-1.171A8.833 8.833 0 0 1 2 10c0-3.87 3.394-8 9-8zm10.14 9.628c.758.988.86 2.009.86 3.15 0 1.195-.619 3.11-1.368 3.938-.209.23-.354.467-.308.722.12 1.073.614 1.501.614 1.501.237.239-.188.562-.537.5-.803-.146-1.495-.42-2.546-.811-.29-.146-.336-.106-.563-.057-2.043.711-4.398.475-6.083-.927 5.965-.524 8.727-3.03 9.93-8.016z"></path></svg></span>发私信</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import {communicationMixin} from 'common/js/mixin.js'
 	export default {
 		props: {
 			otherUser: {
 				type: Object,
 				default() {
 					return {
 						info:{}
 					}
 				}
 			},
 			fllowerStatus: {
 				type: Number,
 				default: 0
 			}
 		},
 		data() {
 			return {
 				base: '../../../../static/avatar/160/'
 			}
 		},
 		methods: {
 			enter(e) {
 				e.target.innerText = '取消关注'
 			},
 			leave(e) {
 				e.target.innerText = '已关注'
 			},
 			followPeople(target_id,action) {
 				axios.post('/follow/followTarget',{
 					target_id: target_id,
 					action: action
 				}).then((res)=> {
 					if (res.data.status) {
 						alert(res.data.result.msg)
 					}
 					this.$emit('changeFllowerStatus',action==1?1:0)
 					communicationMixin.$emit('reloadFollwer')
 					communicationMixin.$emit('changeFollowCount',1,action==1?1:0)
 				})
 			}
 		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/otherProfile.less');
</style>
