<template>
 	<div id="attention">
 		<div class="Modal-wrapper" v-show="attention_question_modal">
 			<div class="Modal-backdrop" @click.stop.prevent="clsModal"></div>
			<div class="Modal Modal-fullPage">
				<div class="Modal-inner">
					<div class="Modal-content">
						<div class="VoteList">
							<div class="topbar">
								<div class="topbar-title"><span>25 人关注了</span></div>
							</div>
							<div class="content">
								<div class="list-item">
									<div class="contentItem-image">
										<div class="user-link">
											<img src="https://pic2.zhimg.com/v2-c7e5015d736588ce06f93fb2f4521f51_im.jpg" alt="">
										</div>
									</div>
									<div class="contentItem-head">
										<div class="contentItem-title"><a href="">楚天</a></div>
										<div class="contentItem-meta">
											<div class="contentItem-status">
												<span>11 回答</span>
												<span>41 关注者</span>
											</div>
										</div>
									</div>
									<div class="contentItem-extra">
										<button class="follwButton">
											<span style="display: inline-flex; align-items: center;">​&#8203;<svg 
												fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em">
													<path d="M13.491 10.488s-.012-5.387 0-5.998c-.037-1.987-3.035-1.987-2.997 0-.038 1.912 0 5.998 0 5.998H4.499c-1.999.01-1.999 3.009 0 3.009s5.995-.01 5.995-.01v5.999c0 2.019 3.006 2.019 2.997 0-.01-2.019 0-5.998 0-5.998s3.996.009 6.004.009c2.008 0 2.008-3-.01-3.009h-5.994z"></path>
												</svg></span>
											关注他
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button class="Modal-closeButton" @click.stop="clsModal">
					<svg fill="#fff" style="vertical-align: top;" viewBox="0 0 24 24" width="24" height="24">
						<path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z"></path>
					</svg>
				</button>
			</div>
 		</div>
 	</div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapMutations,mapActions} from 'vuex';
	export default {
		methods: {
			clsModal() {
				this.setAttentionQuestionModal(false)
			},
			...mapMutations({
				setAttentionQuestionModal: 'SET_ATTENTION_QUESTION_MODAL',
			})
		},
		computed: {
			...mapGetters([
				'attention_question_modal'
			])
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/attention.less');
</style>
