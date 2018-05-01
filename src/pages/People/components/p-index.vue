<template>
	<div>
		<div class="header">
			<my-profile v-if="type == 1 "></my-profile>
			<other-profile v-if="type == 2"></other-profile>
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
import {mapMutations,mapGetters} from 'vuex';
  	export default {
  		data() {
  			return {
  				type: 0
  			}	
  		},
  		components: {
  			'main-column': mainColumn,
  			'side-column': sideColumn,
  			'my-profile': myproFile,
  			'other-profile': otherProfile
  		},
  		computed: {
			...mapGetters([
				'token'
			])
		},
		created() {
			
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/p-index.less');
</style>
