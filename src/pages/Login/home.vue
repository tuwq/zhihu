<template>
	<div id="login">
		<router-link to="/login">login</router-link>
		<router-link to="/login/regist">regist</router-link>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		methods: {
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./cpLess/home.less');
</style>
