<template>
	<div id="">
		<div class="content-list-box" v-if="dynamicList.length>0">
			<div class="list-header" v-if="people_detail_user.info">
				<h4 class="list-header-text">
					<span>
					{{people_detail_user._id==user._id?'我'
					:people_detail_user.info.gender==0?'他'
					:people_detail_user.info.gender==1?'他':'她'}}的动态
				</span>
				</h4>
				<div class=""></div>
			</div>
			<div class="list">
				<dynamicItem v-for="( item , index ) in dynamicList" 
				:key="item._id"
				:item="item"
				:index="index"></dynamicItem>
			</div>
			<div style="text-align: center; margin-top: 10px;" v-show="true"><h1>没有更多数据了</h1></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import comments from 'base/comments.vue'
import {periodWrap} from 'common/js/common.js'
import dynamicItem from 'base/dynamicItem.vue'
import {mapGetters,mapMutations} from 'vuex'
import axios from 'axios'
 	export default {
		components: {
			comments,
			dynamicItem
		},
		data(){
			return {
				dynamicList: []
			}	
		},
		methods: {
			init(){
				axios.post('/dynamic/readSend',{
					detail_id: this.detail_user_id
				}).then((res)=>{
					this.dynamicList = res.data.result.dynamics
				})
			}
		},
		created() {
			this.init()
		},
		computed: {
			detail_user_id() {
				return this.$route.params.user_url
			},
			...mapGetters([
				'user',
				'people_detail_user'
			])
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/dynamic-list.less');
</style>
