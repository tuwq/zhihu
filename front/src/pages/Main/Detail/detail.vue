<template>
 	<div id="detail" @click.stop="clsModal">
	    <div>
	    	<loading v-show="total_loading"></loading>
	    	<d-header v-show="!total_loading"></d-header>
	    	<div class="main-content" v-show="!total_loading">
	 			<detail-main v-if="listLoading"></detail-main>
	 		</div>
	 		<div class="special">
				<view-conversation></view-conversation>
				<remind-list 
				:reminds="['suggest','toTop']"></remind-list>
				<z-drop></z-drop>
				<attention></attention>
		    </div>
	    </div>
 	</div>
</template>

<script type="text/ecmascript-6">
	import zDrop from 'z_components/zDrop.vue'
	import dHeader from 'detail_components/d-header.vue'
	import attention from 'detail_components/attention.vue'
	import detailMain from 'detail_components/detail-main.vue'
	import viewConversation from 'detail_components/view-conversation.vue'
	import remindList from 'base/remind-list.vue'
	import loading from 'base/loading.vue'
	import axios from 'axios'
	import { prepend, mergeData, extend } from 'common/js/common'
	import { mapMutations, mapGetters } from 'vuex'
	import { readBrowseCount } from 'socket/browse'
	import { questionDetailApi } from 'api/question'

	export default {
		data() {
			return {
				total_loading: true,
				listLoading: false
			}
		},
		methods: {
			clsModal() {
	          this.setIndexDropDown(false)
	        },
			getDetail() {
				questionDetailApi({
					question_id: this.question_id
				}, (res)=> {
					if (res.data.status) {
						// 转到404
					}
					let detail_question = res.data.result.detail_question
					this.setDetailQuestion(detail_question)
					// 刷新一次浏览数
					readBrowseCount(this.question_id)
					this.total_loading = false
				})
			},
			...mapMutations({
				setIndexDropDown: 'SET_INDEX_DROPDOWN',
				setDetailQuestion: 'SET_DETAIL_QUESTION'
			})
		},
		created() {
			this.listLoading = true
			this.getDetail()
		},
		computed: {
			question_id() {
				return this.$route.params.question_id
			}
		},
		watch: {
			$route: {
			    handler: function( to, from ){
			     	if ( to.path != from.path && to.name == 'question_detail' ) {
			     		this.total_loading = true
			     		this.listLoading = false
			     		this.$nextTick().then(()=>{
			     			this.listLoading = true
			     		})
			     		this.getDetail()
			     	}
			    },
			    // 深度观察监听
			    deep: true
			}
		},
		components: {
			dHeader,
			detailMain,
			viewConversation,
			remindList,
			zDrop,
			attention,
			loading
		},
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">

</style>
