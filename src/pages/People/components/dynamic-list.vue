<template>
	<div id="">
		<div class="content-list-box">
			<div class="list-header">
				<h4 class="list-header-text">
					<span>我的动态</span>
				</h4>
				<div class=""></div>
			</div>
			<div class="list">
				<dynamicItem v-for="( item , index ) in dynamicList" :key="item._id"
				:item="item"
				:index="index"
				@changeVoteStatus="changeVoteStatus"></dynamicItem>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import comments from 'base/comments.vue'
import {periodWrap} from 'common/js/common.js'
import dynamicItem from 'base/dynamicItem.vue'
import axios from 'axios'
 	export default {
		components: {
			'comments': comments,
			dynamicItem
		},
		data(){
			return {
				overflowStatus: false,
				commentsStatus: false,
				dynamicList: []
			}	
		},
		methods: {
			init(){
				axios.post('/dynamic/readSend',{
					detail_id: this.detail_user_id
				}).then((res)=>{
					this.dynamicList = res.data.result.dynamics
					console.log(this.dynamicList)
				})
			},
			changeVoteStatus( type , index , vote ) {
				// 改变vote状态
				// type  1: 新建 2:取消 	3:改变
				if ( type == 1) {
					if ( vote == 1) {
						this.dynamicList[index].good++
						this.dynamicList[index].voteStatus=1
					}else {
						this.dynamicList[index].bad++
						this.dynamicList[index].voteStatus=2
					}
				}else if ( type == 2 ) {
					this.dynamicList[index].voteStatus = 0
					if ( vote == 1 ) {
						this.dynamicList[index].good--
					}else {
						this.dynamicList[index].bad--
					}
				}else if ( type == 3 ) {
					if ( vote == 1 ) {
						this.dynamicList[index].bad--
						this.dynamicList[index].good++
						this.dynamicList[index].voteStatus=1
					}else {
						this.dynamicList[index].good--
						this.dynamicList[index].bad++
						this.dynamicList[index].voteStatus=2
					}
					this.dynamicList[index].bad<0?0:this.dynamicList[index].bad
					this.dynamicList[index].good<0?0:this.dynamicList[index].good
				}
			}
		},
		created() {
			this.init()
		},
		computed: {
			detail_user_id() {
				return this.$route.params.user_url
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/dynamic-list.less');
</style>
