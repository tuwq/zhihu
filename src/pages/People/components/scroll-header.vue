<template>
	<div id="ScrollHeader">
		<div class="scroll-header-box scroll-header-wrapper">
			<div class="scroll-header-inner" v-if="avatar">
				<div class="user-avatar" v-if="avatar"><img :src="base+avatar" width="38" height="38" class="Avatar"></div>
				<ul class="tabList">
					<li class="top-tab-item is-active" @click.stop.prevent="changeItem($event,0)"><a href="javascript:void(0)" class="tab-link is-active">动态</a></li>
					<li class="top-tab-item" @click.stop.prevent="changeItem($event,1)"><a href="javascript:void(0)" class="tab-link">回答<span class="tab-meta">{{answerSum}}</span></a></li>
					<li class="top-tab-item" @click.stop.prevent="changeItem($event,2)"><a href="javascript:void(0)" class="tab-link">提问<span class="tab-meta">{{questionSum}}</span></a></li>
					<li class="top-tab-item" @click.stop.prevent="changeItem($event,3)"><a href="javascript:void(0)" class="tab-link">文章<span class="tab-meta">0</span></a></li>
					<li class="top-tab-item" @click.stop.prevent="changeItem($event,4)"><a href="javascript:void(0)" class="tab-link">专栏<span class="tab-meta">0</span></a></li>
					<li class="top-tab-item" @click.stop.prevent="changeItem($event,5)"><a href="javascript:void(0)" class="tab-link">想法<span class="tab-meta">0</span></a></li>
					<li class="top-tab-item" ref="more"  @click.stop.prevent="getMore"><a href="javascript:void(0)" class="tab-link">更多<svg fill="currentColor" viewBox="0 0 10 6" width="10" height="16" style="margin-left: 4px;"><title></title><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg></a></li>
				</ul>
				<div class="buttonGroup">
					<router-link to="/people/edit">编辑个人资料</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapMutations} from 'vuex';
import {scroll} from 'common/js/common.js';
import {communicationMixin} from 'common/js/mixin.js'
import axios from 'axios'
 	export default {
 		data() {
 			return {
 				base: '../../../../static/avatar/38/',
 				avatar: '',
 				questionSum: 0,
 				answerSum: 0
 			}
 		},
 		methods: {
 			getMore() {
 				$('.content-arrow-top').css('top',scroll().top+80)
 				$('#content-arrow').addClass('content-arrow-top').removeClass('content-arrow');
 				this.setPeopleDropUp(true);
 			},
 			...mapMutations({
				setPeopleDropUp: 'SET_PEOPLE_DROPUP'
			}),
			changeItem(e,index) {
				$(e.target).parent().addClass('is-active').siblings().removeClass('is-active')
				communicationMixin.$emit('changeMainIndex',index)
			},
			getInfo() {
				axios.post('/user/getInfoById',{
					_id: this.detail_user_id
				}).then((res)=> {
					this.avatar = res.data.result.userInfo.avatar
				})
			}
 		},	
 		computed: {
 			detail_user_id() {
				return this.$route.params.user_url
			},
			...mapGetters([
				'people_dropup',
			])
		},
		created() {
			communicationMixin.$on('changeScrollIndex',(index)=> {
				$('.top-tab-item').eq(index).addClass('is-active').siblings('.top-tab-item').removeClass('is-active')
			})
			communicationMixin.$on('openFollow',()=> {
				$(this.$refs.more).addClass('is-active').siblings().removeClass('is-active')
			})
			communicationMixin.$on('ChangeScrollCount',({questionSum,answerSum})=> {
				this.questionSum = questionSum
				this.answerSum = answerSum
			})
			this.getInfo()
		},
		watch: {
			detail_user_id(newval,oldval) {
				if ( newval != oldval && newval != undefined ) {
					this.getInfo()
				}
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/scroll-header.less');
</style>
