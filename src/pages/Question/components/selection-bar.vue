<template>
	<div class="selection-wrapper">
		<div class="selection-bar">
	 		<button class="bar-item active" @click.stop.prevent="to_recommend($event)">为你推荐</button>
	 		<button class="bar-item" @click.stop.prevent="to_hot($event)">全站热门</button>
	 		<button class="bar-item" @click.stop.prevent="to_invite($event)">邀请回答</button>
	 	</div>
	 	<div class="main-content">
	 		<recommend v-show="content_type==0"></recommend>
	 		<hot v-show="content_type==1"></hot>
	 		<invite v-show="content_type==2"></invite>
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
			to_recommend(e) {
				this.content_type = 0;
				this.isActive(e);
			},
			to_hot(e) {
				this.content_type = 1;
				this.isActive(e);
			},
			to_invite(e) {
				this.content_type = 2;
				this.isActive(e);
			},
			isActive(e) {
				$(e.target).addClass('active').siblings('button').removeClass('active');
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/selection-bar.less');
</style>
