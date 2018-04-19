<template>
 	<div class="questions">
 		<div class="question">
 			<div class="question-inner">
	 			<div class="question-type">
	 				热门内容,来自:美食
	 			</div>
	 			<cls-bubble class="cls-bubble"></cls-bubble>
	 			<div class="userinfo">
	 				<span class="avatar" width="33" height="33"><img src="../../../common/image/index/avatar-mini.png"></span>
	 				<span class="username">兔小淘,</span>
	 				<span class="info">正负能量中和场</span>
	 			</div>
	 			<div class="title">一个人去吃海底捞最合算的吃法是什么样的?</div>
	 			<div class="content-inner">
		 			<span class="content">我有一个好玩的吃法，并不是为了省钱，但这个吃法屡次让同行的人赞不绝口。
		 				这个吃法就是：我会在等待上菜的时候先调一碗五香牛肉粒当零食吃，具体做法:五香牛肉
		 			</span>
		 			<span class="readQuestion"><a href="">阅读全文 v</a></span>
	 			</div>	
	 			<div class="msg">
	 				<div class="vote">
	 					<button class="up"><i class="icon-double-angle-up"></i>5.3K</button>
	 					<button class="down"><i class="icon-double-angle-down"></i></button>
	 				</div>
	 				<div class="comment">
	 					<span class="comment-inner">
	 						<i class="icon-comment"></i>
	 						260条评论
	 					</span>
	 				</div>
	 				<div class="other">
	 					<span><i class="icon-star"></i>分享</span>
	 					<span><i class="icon-star"></i>收藏</span>
	 					<span><i class="icon-heart"></i>感谢</span>
	 				</div>
	 				<div class="more">
	 					<button><i class="icon-ellipsis">~</i></button>
	 				</div>
	 			</div>
	 		</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import clsBubble from 'base/cls-bubble.vue';
	export default {
		components: {
			'cls-bubble': clsBubble
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/questions.less');
</style>
