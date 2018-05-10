<template>
 	<div id="d-header-wrapper">
 		<slot name="z-header" class="z-header"></slot>
 		<slot name="detail-header" class="detail-header"></slot>
 		<slot name="scroll-header" class="scroll-header"></slot>
 	</div>
</template>

<script type="text/ecmascript-6">
import {scroll} from 'common/js/common.js';
	export default {
		methods: {
			switchHeader() {
				// 当页面滚动时
				this.sumHeight = 0;
				// 元素的总高度，包括边框和内边距
				var h =$('.detail-header-wrapper')[0].offsetHeight;
				// 元素距body顶部的距离，不包括被卷去的部分
				var h2 = $('.detail-header-wrapper')[0].offsetTop;
				const sumHeight = h + h2;
				window.addEventListener('scroll',()=>{
					// 浏览器被卷去的部分
					// 元素的距离等于元素距可见顶部的距离 + 浏览器被卷去的距离
					if (this.$router.history.current.name === 'question_detail') {
						if(scroll().top>sumHeight){
							$('.header-wrapper').hide();
							$('.scroll-header-wrapper').css('position','fixed');
							$('.scroll-header-wrapper').css('z-index','100');
						}else{
							$('.header-wrapper').show();
							$('.scroll-header-wrapper').css('position','absolute');
							$('.scroll-header-wrapper').css('z-index','0');
						}
					}
				})
			}
		},
		mounted () {
			$('#content-arrow').addClass('content-arrow').removeClass('content-arrow-top');
			this.switchHeader();
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/d-header.less');
</style>
