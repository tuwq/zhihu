<template>
	<div id="">
		<div class="main-column">
			<div class="Card main-box">
				<div class="main-header">
					<ul class="tabs">
						<li class="tab-item is-active" @click.stop.prevent="changeItem($event,0)"><a href="javascript:void(0)" class="tab-link">动态</a></li>
						<li class="tab-item" @click.stop.prevent="changeItem($event,1)"><a href="javascript:void(0)" class="tab-link">回答 <span>{{people_detail_user.answerSum}}</span></a></li>
						<li class="tab-item" @click.stop.prevent="changeItem($event,2)"><a href="javascript:void(0)" class="tab-link">提问 <span>{{people_detail_user.questionSum}}</span></a></li>
						<li class="tab-item" @click.stop.prevent="changeItem($event,3)"><a href="javascript:void(0)" class="tab-link">文章 <span>0</span></a></li>
						<li class="tab-item" @click.stop.prevent="changeItem($event,4)"><a href="javascript:void(0)" class="tab-link">专栏 <span>0</span></a></li>
						<li class="tab-item" @click.stop.prevent="changeItem($event,5)"><a href="javascript:void(0)" class="tab-link">想法 <span>0</span></a></li>
						<li class="tab-item" ref="more" @click.stop.prevent="getMore"><a href="javascript:void(0)" class="tab-link"><button class="more">更多<svg viewBox="0 0 10 6" width="10" height="16"><title></title><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg></button></a></li>
					</ul>
				</div>
				<dynamic-list v-if="showModule==0"></dynamic-list>
				<answer-module v-if="showModule==1"></answer-module>
				<question-module v-if="showModule==2"></question-module>
				<following-module 
				v-if="showModule==7"
				@changeFollowCount="changeFollowCount"></following-module>
			</div>
		</div>
		<div class="content-arrow" v-show="people_dropup" id="content-arrow" ref="content_arrow"> 
			<span class="arrow-top"></span>
			<div class="menu">
				<a href="javascript:void(0)" class="menu-item">收藏 <span>5</span></a>
				<a href="javascript:void(0)" class="menu-item" @click.stop.prevent="openFollowingModule">关注</a>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import dynamicList from 'p_components/dynamic-list.vue'
import answerModule from 'p_components/answer-module.vue'
import questionModule from 'p_components/question-module.vue'
import followingModule from 'p_components/following-module.vue' 
import {mapGetters,mapMutations} from 'vuex'
import {copyObj} from 'common/js/util.js'
import {communicationMixin} from 'common/js/mixin.js'
import axios from 'axios'
 	export default {
 		data() {
 			return {
 				showModule: 0
 			}
 		},
 		methods: {
 			getMore() {
 				// 打开更多导航栏
 				$(this.$refs.content_arrow).css('top',258)
 				$(this.$refs.content_arrow).addClass('content-arrow').removeClass('content-arrow-top');
 				this.setPeopleDropUp(true);
 			},
 			openFollowingModule() {
 				// 打开关注列表
 				this.setPeopleDropUp(false);
 				this.showModule = 7
 				$(this.$refs.more).addClass('is-active').siblings('.tab-item').removeClass('is-active')
 				communicationMixin.$emit('openFollow')
 			},
 			changeItem(e,index) {
 				// 改变显示状态
 				$(e.target).addClass('is-active').siblings().removeClass('is-active')
 				$(e.target).parent('li').addClass('is-active').siblings().removeClass('is-active')
 				this.showModule = index;
 				communicationMixin.$emit('changeScrollIndex',index)
 			},
 			Listenter() {
 				// 监听scrollHeader的点击显示状态
 				communicationMixin.$on('changeMainIndex',(index) => {
 					$('.tab-item').eq(index).addClass('is-active').siblings().removeClass('is-active')
 					this.showModule = index;
 					var targetY = $('.main-column')[0].offsetTop 	// 346
 					window.scrollTo(0,targetY)
 				})
 				// 监听scrollHeader打开关注列表
 				communicationMixin.$on('showFollwer',()=> {
 					this.showModule = 7
 					$(this.$refs.more).addClass('is-active').siblings('.tab-item').removeClass('is-active')
 					communicationMixin.$emit('openFollow')
 				})
 			},
 			changeFollowCount( from , action ) {
 				// 改变关注列表数量和粉丝列表数量
 				// from， 	0:关注列表  1:粉丝列表
 				// action, 	0:关注增加  1；关注减少 				
				this.setPeopleDetailUserFollowSum({from,action})
 			},
 			...mapMutations({
				setPeopleDropUp: 'SET_PEOPLE_DROPUP',
				setPeopleDetailUserFollowSum: 'SET_PEOPLE_DETAIL_USER_FOLLOWSUM'
			})
 		},
		created() {
			this.Listenter()
		},
		computed: {
			...mapGetters([
				'people_dropup',
				'people_detail_user'
			])
		},
		components: {
			dynamicList,
			answerModule,
			questionModule,
			followingModule
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/main-column.less');
</style>
