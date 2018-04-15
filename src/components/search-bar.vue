<template>
 	<div class="search-wrapper">
 		<div class="search-bar">
 			<input type="search" @blur="blur" @focus="focus" @placeholder="搜索你感兴趣的内容" class="search-input">
 			<i class="icon-search"></i>
 		</div>
 		<div class="search-btn">
 			<button class="search-submit">提交</button>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		methods: {
			blur(event) {
				$('.search-btn').css('display','inline-block');
			},
			focus(event) {
				$('.search-btn').css('display','none');
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/search-bar.less');
</style>
