<template>
	<div class="selection-wrapper">
		<div class="selection-bar">
	 		<button class="bar-item is-active" @click.stop.prevent="changeItem($event,0)">为你推荐</button>
	 		<button class="bar-item" @click.stop.prevent="changeItem($event,1)">全站热门</button>
	 		<button class="bar-item" @click.stop.prevent="changeItem($event,2)">邀请回答</button>
	 	</div>
	 	<div class="main-content">
	 		<recommend v-if="content_type==0"></recommend>
	 		<hot v-if="content_type==1"></hot>
	 		<invite v-if="content_type==2"></invite>
	 	</div>
	</div>
</template>

<script type="text/ecmascript-6">
import recommend from 'question_components/recommend.vue';
import hot from 'question_components/hot.vue';
import invite from 'question_components/invite.vue';
	export default {
		data() {
			return {
				content_type: 0
			}
		},
		components: {
			recommend,
			hot,
			invite
		},
		methods: {
			changeItem(e,index) {
				$(e.target).addClass('is-active').siblings().removeClass('is-active')
				this.content_type = index;
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/selection-bar.less');
</style>
