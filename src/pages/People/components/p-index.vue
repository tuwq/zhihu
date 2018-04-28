<template>
	<div>
		<div class="header">
			<my-profile v-show="false"></my-profile>
			<other-profile></other-profile>
		</div>
		<div class="main-content">
			<main-column></main-column>
			<side-column></side-column>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import mainColumn from 'p_components/main-column.vue';
import sideColumn from 'p_components/side-column.vue';
import myproFile from 'p_components/myProfile.vue';
import otherProfile from 'p_components/otherProfile.vue';
  	export default {
  		components: {
  			'main-column': mainColumn,
  			'side-column': sideColumn,
  			'my-profile': myproFile,
  			'other-profile': otherProfile
  		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/p-index.less');
</style>
