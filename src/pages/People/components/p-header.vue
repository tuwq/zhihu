<template>
	<div id="PHeader">
		<z-header></z-header>
		<scroll-header></scroll-header>	
	</div>
</template>

<script type="text/ecmascript-6">
	import ZHeader from 'z_components/z-header.vue';
	import ScrollHeader from 'p_components/scroll-header.vue';
	import {scroll} from 'common/js/common.js';
 	export default {
		components: {
			'z-header': ZHeader,
			'scroll-header': ScrollHeader
		},
		methods: {
			switchHeader() {
				window.addEventListener('scroll',()=>{
					// 浏览器被卷去的部分
					// 元素的距离等于元素距可见顶部的距离 + 浏览器被卷去的距离
					if (this.$router.history.current.name === 'people_url') {
						if(scroll().top>200){
							$('.header-wrapper').hide();
							$('.scroll-header-box').css('position','fixed');
							$('.scroll-header-box').css('z-index','100');

						}else{
							$('.header-wrapper').show();
							$('.scroll-header-box').css('position','absolute');
							$('.scroll-header-box').css('z-index','0');
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
