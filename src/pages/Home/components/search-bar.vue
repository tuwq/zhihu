<template>
 	<div class="search-wrapper">
 		<form action="">
	 		<div class="search-bar">
	 			<input type="search" @blur="blur" @focus="focus" placeholder="搜索你感兴趣的内容" class="search-input">
	 			<i class="icon-search"></i>
	 		</div>
	 		<transition name="disappear">
		 		<div class="search-btn">
		 			<button class="search-submit">提交</button>
		 		</div>
	 		</transition>
 		</form>
 	</div>
</template>

<script type="text/ecmascript-7">
	import { sleep } from 'common/js/common.js';
	export default {
		methods: {
			blur(event) {
				$('.search-btn').removeClass('Zoom');
				$('.search-bar').removeClass('extended');
			},
			focus(event) {
				$('.search-btn').addClass('Zoom');
				sleep(2000);
				$('.search-bar').addClass('extended');
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/search-bar.less');
</style>
