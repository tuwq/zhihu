<template>
 	<div id="detail_right" v-if="detail_question">
 		<div>
 			<div class="Card" v-if="detail_question.user">
 				<div class="Card-header">
 					<div class="Card-headerText">关于提问者</div>
 				</div>
 				<div class="Card-section">
 					<div class="AuswerAuthor-user">
 						<div class="AnswerAuthor-user-avatar" v-if="detail_question.user.avatar">
							<router-link :to="{path:`/people/${detail_question.user._id}` }">
								<img :src="imageServer+detail_question.user.avatar" width="60" height="60">
							</router-link>
 						</div>
 						<div class="AnswerAuthor-user-content">
 							<div class="AnswerAuthor-user-name">
 								<router-link :to="{path:`/people/${detail_question.user._id}` }">
									{{detail_question.user.username}}
 								</router-link>
 							</div>
 							<div class="AnswerAuthor-user-headline" v-if="detail_question.user.info">
 								<div class="ztext">{{detail_question.user.info.intro}}</div>
 							</div>
 						</div>
 					</div>
 				</div>
 				<div class="Card-section">
 					<div class="AnswerAuthor-counts">
 						<div class="NumberBoard">
 							<a class="NumberBoared-item">
 								<span class="NumberBoard-itemInner">
 									<div class="NumberBoard-itemName">回答</div>
 									<span class="NumberBoard-itemValue">{{detail_question.user.answerSum}}</span>
 								</span>
 							</a>
 							<a class="NumberBoared-item">
 								<span class="NumberBoard-itemInner">
 									<div class="NumberBoard-itemName">提问</div>
 									<span class="NumberBoard-itemValue">{{detail_question.user.questionSum}}</span>
 								</span>
 							</a>
 							<a class="NumberBoared-item">
 								<span class="NumberBoard-itemInner">
 									<div class="NumberBoard-itemName">关注者</div>
 									<span class="NumberBoard-itemValue">{{detail_question.user.fansSum}}</span>
 								</span>
 							</a>
 						</div>
 					</div>
 					<div class="MemberButtonGroup" v-if="detail_question.user.info" v-show="detail_question.user._id!=user._id">
 						<button class="followButton" 
 						v-show="detail_question.user.followStatus==0"
 						@click.stop.prevent="followPeople(detail_question.user._id,1)"><span>
 						关注{{detail_question.user.info.gender==0?'他':detail_question.user.info.gender==1?'他':'她'}}</span></button>
 						<button class="followButton cancel" v-show="detail_question.user.followStatus==1"
 						@click.stop.prevent="followPeople(detail_question.user._id,0)"
 						@mouseenter="enter($event)" 
	 					@mouseleave="leave($event)"><span>取消关注</span></button>
 						<button class="privateButton"><span>发私信</span></button>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
import { mapMutations, mapGetters } from 'vuex';
import { copyObj } from 'common/js/util.js'
import axios from 'axios'
import { followTargetApi } from 'api/follow'
	export default {
		data() {
			return {
				imageServer: global.imgServer,
				// static: '../../../../../static/avatar/60/'
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
				followTargetApi({
 					target_id: target_id,
 					action: action
 				}, (res)=>{
 					if (res.data.status) {
 						alert(res.data.result.msg)
 					}
 					this.setDetailQuestionUserFollowStatus(action)
				})
 			},
 			...mapMutations({
				setDetailQuestionUserFollowStatus: 'SET_DETAIL_QUESTION_USER_FOLLOWSTATUS'
			})
		},
		computed: {
			...mapGetters([
				'detail_question',
				'user'
			])
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/author.less');
</style>
