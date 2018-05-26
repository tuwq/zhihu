<template>
	<div id="PHeader">
		<scroll-header></scroll-header>	
	</div>
</template>

<script type="text/ecmascript-6">
	import scrollHeader from 'p_components/scroll-header.vue';
	import {scroll} from 'common/js/common.js';
 	export default {
		components: {
			scrollHeader
		},
		methods: {
			switchHeader() {
				window.addEventListener('scroll',()=>{
					// 浏览器被卷去的部分
					// 元素的距离等于元素距可见顶部的距离 + 浏览器被卷去的距离
					if (this.$router.history.current.name === 'people_url') {
						if( scroll().top > 300 ) {
							$('.main-header-wrapper').hide()
							$('.scroll-header-box').css('position','fixed')
							$('.scroll-header-box').css('z-index','150')
							$('.scroll-header-box').show()
						}else{
							$('.main-header-wrapper').show()
							$('.scroll-header-box').css('position','absolute')
							$('.scroll-header-box').css('z-index','0')
							$('.scroll-header-box').hide()
						}
					}
				})
			}
		},
		mounted () {
			this.switchHeader();
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/p-header.less');
</style>
