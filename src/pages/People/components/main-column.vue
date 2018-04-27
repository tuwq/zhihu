<template>
	<div id="">
		<div class="main-column">
			<div class="Card main-box">
				<div class="main-header">
					<ul class="tabs">
						<li class="tab-item is-active"><a href="javascript:void(0)" class="tab-link">动态</a></li>
						<li class="tab-item"><a href="javascript:void(0)" class="tab-link">回答 <span>0</span></a></li>
						<li class="tab-item"><a href="javascript:void(0)" class="tab-link">提问 <span>0</span></a></li>
						<li class="tab-item"><a href="javascript:void(0)" class="tab-link">文章 <span>0</span></a></li>
						<li class="tab-item"><a href="javascript:void(0)" class="tab-link">专栏 <span>0</span></a></li>
						<li class="tab-item"><a href="javascript:void(0)" class="tab-link">想法 <span>0</span></a></li>
						<li class="tab-item" @click.stop.prevent="getMore"><a href="javascript:void(0)" class="tab-link"><button class="more">更多<svg viewBox="0 0 10 6" width="10" height="16"><title></title><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg></button></a></li>
					</ul>
				</div>
				<content-list v-show="showModule==0"></content-list>
				<answer-module v-show="showModule==1"></answer-module>
			</div>
		</div>
		<div class="content-arrow" v-show="people_dropup" id="content-arrow"> 
			<span class="arrow-top"></span>
			<div class="menu">
				<a href="javascript:void(0)" class="menu-item">收藏 <span>5</span></a>
				<a href="javascript:void(0)" class="menu-item">关注</a>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import contentList from 'p_components/content-list.vue';
import answerModule from 'p_components/answer-module.vue';
import {mapGetters,mapMutations} from 'vuex';
import {communicationMixin} from 'common/js/mixin.js';
 	export default {
 		data() {
 			return {
 				showModule: 0
 			}
 		},
 		methods: {
 			initLink() {
 				$('.tab-item').each( (index,el)=> {
 					var me = $(el);
 					if(index==$('.tab-item').length-1) {
 						return;
 					}else{
 						me.on('click',(e)=> {
	 						me.addClass('is-active').siblings('.tab-item').removeClass('is-active')
	 						console.log(index);
		 					this.showModule = index;
	 					});
 					}
 				});
 			},
 			getMore() {
 				$('#content-arrow').css('top',258)
 				$('#content-arrow').addClass('content-arrow').removeClass('content-arrow-top');
 				this.setPeopleDropUp(true);
 			},
 			listenHeaderModule() {
 				communicationMixin.$on('changeModule',(index) => {
 					this.showModule = index;
 					// 346
 					var targetY = $('.main-column')[0].offsetTop 
 					window.scrollTo(0,targetY)
 				})
 			},
 			...mapMutations({
				setPeopleDropUp: 'SET_PEOPLE_DROPUP'
			})
 		},
		mounted() {
			this.initLink();
			this.listenHeaderModule();
		},
		computed: {
			...mapGetters([
				'people_dropup'
			])
		},
		components: {
			'content-list': contentList,
			'answer-module': answerModule
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/main-column.less');
</style>
