<template>
 	<div id="notFund">
 		<div class="page">
 			<div class="error">
				<h1 class="header">
					<router-link to="/" class="logo"><img src="../../static/default/logo_black_trans.png"></router-link>
					404
				</h1>
				<div class="content">
					<p><strong>你似乎来到了没有知识存在的荒原</strong></p>
					<p>来源链接是否正确?用户、话题或问题是否存在?</p>
					<hr>
					<p>
						<router-link to="/">返回首页</router-link>
						<span>或者</span>
						<a href="" @click.stop="back">返回上页</a>
					</p>
				</div>
			</div>
 		</div>
	</div>
</template>

<script type="text/ecmascript-7">
	export default {
		methods: {
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./baseLess/notFound.less');
</style>
