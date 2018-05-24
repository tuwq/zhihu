<template>
 	<div id="detail" @click.stop="clsModal">
	    <div>
    		<d-header></d-header>
	 		<div class="main-content">
	 			<detail-main></detail-main>
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
	import {prepend,mergeData,extend} from 'common/js/common'
	import {mapMutations,mapGetters} from 'vuex'
	import {readBrowseCount} from 'socket/browse'

	export default {
		methods: {
			clsModal() {
	          this.setIndexDropDown(false)
	        },
			getDetail() {
				// 获得问题详情的相关信息
				axios.post('/question/detail',{
					question_id: this.question_id
				}).then((res)=> {
					if (res.data.status) {
						// 转到404
					}
					let detail_question = res.data.result.detail_question
					this.setDetailQuestion(detail_question)
					// 刷新一次浏览数
					readBrowseCount(this.question_id)
				})
			},
			...mapMutations({
				setIndexDropDown: 'SET_INDEX_DROPDOWN',
				setDetailQuestion: 'SET_DETAIL_QUESTION'
			})
		},
		created() {
			this.getDetail()
		},
		computed: {
			question_id() {
				return this.$route.params.question_id
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
  @import url('./cpLess/detail.less');
</style>
