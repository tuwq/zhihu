<template>
 	<div id="detail_right" v-if="question_user">
 		<div>
 			<div class="Card">
 				<div class="Card-header">
 					<div class="Card-headerText">关于提问者</div>
 				</div>
 				<div class="Card-section">
 					<div class="AuswerAuthor-user">
 						<div class="AnswerAuthor-user-avatar" v-if="question_user.avatar">
 							<a href="" 
 							@click.stop.prevent="toUser(question_user)"><img :src="base+question_user.avatar" width="60" height="60"></a>
 						</div>
 						<div class="AnswerAuthor-user-content">
 							<div class="AnswerAuthor-user-name">
 								<a href=""
 								@click.stop.prevent="toUser(question_user)">{{question_user.username}}</a>
 							</div>
 							<div class="AnswerAuthor-user-headline" v-if="question_user.info">
 								<div class="ztext">{{question_user.info.intro}}</div>
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
 									<span class="NumberBoard-itemValue">{{question_user.answerSum}}</span>
 								</span>
 							</a>
 							<a class="NumberBoared-item">
 								<span class="NumberBoard-itemInner">
 									<div class="NumberBoard-itemName">提问</div>
 									<span class="NumberBoard-itemValue">{{question_user.questionSum}}</span>
 								</span>
 							</a>
 							<a class="NumberBoared-item">
 								<span class="NumberBoard-itemInner">
 									<div class="NumberBoard-itemName">关注者</div>
 									<span class="NumberBoard-itemValue">{{question_user.fansSum}}</span>
 								</span>
 							</a>
 						</div>
 					</div>
 					<div class="MemberButtonGroup" v-if="question_user.info" v-show="question_user._id!=user._id">
 						<button class="followButton" 
 						v-show="question_user.status==0"
 						@click.stop.prevent="followPeople(question_user._id,1)"><span>
 						关注{{question_user.info.gender==0?'他':question_user.info.gender==1?'他':'她'}}</span></button>
 						<button class="followButton cancel" v-show="question_user.status==1"
 						@click.stop.prevent="followPeople(question_user._id,0)"
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
import {mapMutations,mapGetters} from 'vuex';
import {copyObj} from 'common/js/util.js'
import axios from 'axios'
import {communicationMixin,userMixin} from 'common/js/mixin.js'
	export default {
		mixins: [userMixin],
		data() {
			return {
				base: '../../../../static/avatar/60/'
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
 					let _question_user = copyObj(this.question_user)
 					action==1?_question_user.status=1:_question_user.status=0
 					this.setQuestionUser(_question_user)
 				})
 			},
 			...mapMutations({
				setQuestionUser: 'SET_QUESTION_USER'
			})
		},
		computed: {
			...mapGetters([
				'question_user',
				'user'
			])
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/author.less');
</style>
