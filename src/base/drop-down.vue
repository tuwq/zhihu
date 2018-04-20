<template>
	<ul class="dropdown">
		<li><a href="javascript:void(0)"><i class="drop-icon"><img src="../common/image/index/User.svg" width="20" height="20"></i><p>我的主页<i></i></p></a></li>
		<li><a href="javascript:void(0)"><i class="drop-icon"><img src="../common/image/index/e-mail.svg" width="20" height="20"></i><p>私信<i class="num">8</i></p></a></li>
		<li><a href="javascript:void(0)"><i class="drop-icon"><img src="../common/image/index/setting.svg" width="20" height="20"></i><p>设置<i></i></p></a></li>
		<li><a @click.stop.prevent="quit" href="javascript:void(0)"><i class="drop-icon"><img src="../common/image/index/hk_quit.svg" width="20" height="20"></i><p>退出<i></i></p></a></li>
	</ul>
</template>
<script type="text/ecmascript-6">
	export default {
		methods: {
			quit() {
				this.$router.push({path: '/login'});
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./baseLess/drop-down.less');
</style>
