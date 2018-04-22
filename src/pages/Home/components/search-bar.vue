<template>
 	<div class="search-bar-wrapper">
	 	<div class="search-wrapper">
	 		<form class="search-form">
	 			<div>
	 				<div class="Popover">
	 					<div class="search-inner">
	 						<input type="text"	@focus.stop.prevent="focus" @blur.stop.prevent="blur" class="search-input" maxlength="100" placeholder="搜索你感兴趣的内容...">
	 						<div class="search-after">
	 							<button class="search-btn" type="button"><svg viewBox="0 0 16 16" width="16" height="16"><title></title><g><path d="M12.054 10.864c.887-1.14 1.42-2.57 1.42-4.127C13.474 3.017 10.457 0 6.737 0S0 3.016 0 6.737c0 3.72 3.016 6.737 6.737 6.737 1.556 0 2.985-.533 4.127-1.42l3.103 3.104c.765.46 1.705-.37 1.19-1.19l-3.103-3.104zm-5.317.925c-2.786 0-5.053-2.267-5.053-5.053S3.95 1.684 6.737 1.684 11.79 3.95 11.79 6.737 9.522 11.79 6.736 11.79z"></path></g></svg></button>
	 						</div>
	 					</div>
	 				</div>
	 			</div>
	 		</form>
	 	</div>
	 	<button class="search-btn">提问</button>
 	</div>
</template>

<script type="text/ecmascript-7">
	export default {
		methods: {
			blur(event) {
				$('.search-inner').removeClass('extended');
			},
			focus(event) {
				$('.search-inner').addClass('extended');
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/search-bar.less');
</style>
