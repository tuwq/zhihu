<template>
 	<div class="answers-wrapper">
		<loading v-show="loading"></loading>
 		<div class="card">
 			<div class="list">
 				<div class="list-header">
 					<h4 class="list-headerText"><span>{{sum}}个回答</span></h4>
 					<div class="list-headerOptions">
 						<div class="popover">
 							<button class="Sorting">默认排序<span>&#8203;<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 16.183l2.716-2.966a.757.757 0 0 1 1.064.001.738.738 0 0 1 0 1.052l-3.247 3.512a.758.758 0 0 1-1.064 0L8.22 14.27a.738.738 0 0 1 0-1.052.758.758 0 0 1 1.063 0L12 16.183zm0-9.365L9.284 9.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l3.248-3.512a.758.758 0 0 1 1.065 0L15.78 8.73a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063.001L12 6.818z"></path></svg></span></button>
 						</div>
 					</div>
 				</div>
 				<div>
 					<div class="">									
						<answer v-for="(item,index) in answers" :item="item" :index="index" :key="item._id"></answer>
 					</div>
 				</div>
 			</div>
 		</div>
 		<div style="text-align: center;" v-show="no_more_data"><h1>没有更多数据了</h1></div>
 	</div>
</template>

<script type="text/ecmascript-6">
import loading from 'base/loading.vue'
import answer from 'detail_components/answer.vue'
import {mapMutations,mapGetters} from 'vuex';
import axios from 'axios'
	export default {
		props: {
			sum: {
				type: Number,
				default: 0
			},
			no_more_data: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: true
			}
		},
		components: {
			answer,
			loading
		},
		computed: {
			...mapGetters([
				'answers'
			])
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/answers-list.less');
</style>
