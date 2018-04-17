<template>
 	<div class="search-wrapper">
 		<div class="search-bar">
 			<form action="">
	 			<input type="search" @blur="blur" @focus="focus" placeholder="搜索你感兴趣的内容..." class="search-input">
		 		<button class="search-submit"><i><img src="../../../common/image/header/search.svg" width="15" height="15"></i></button>
	 		</form>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		methods: {
			blur() {
				$('.search-input').removeClass('bcWhite');
			},
			focus() {
				$('.search-input').addClass('bcWhite');
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/search-bar.less');
</style>
