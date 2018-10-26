<template>
	<div class="invite-wrapper">
		<div class="invite-title">
			<div class="title-right">
				<a class="active" @click.stop="clickType($event,0)">所有人 (12)</a>
				<span class="bull">|</span>
				<a href="javascript:void(0)" class="litblue" @click.stop="clickType($event,1)">我关注的人 (0)</a>
			</div>
			<h4>邀请我回答的问题</h4>
		</div>
		<div class="invite-list">
			<div class="invite-item">
				<a href="javascript:void(0)" class="item-btn" name="ignore">忽略</a>
				<div class="item-info">
					<h3>
						<a href="javascript:void(0)" class="question-link" target="_blank">			
							你所从事职业的日常工作、闲暇状态是怎样的？收入怎样？
						</a>
					</h3>
					<div class="item-meta">
						邀请你来回答
						<span class="bull">•</span>
						367 人关注
						<span class="bull">•</span>
					</div>
				</div>
			</div>
			<div class="invite-item">
				<a href="javascript:void(0)" class="item-btn" name="ignore">忽略</a>
				<div class="item-info">
					<h3>
						<a href="javascript:void(0)" class="question-link" target="_blank">			
							你所从事职业的日常工作、闲暇状态是怎样的？收入怎样？
						</a>
					</h3>
					<div class="item-meta">
						邀请你来回答
						<span class="bull">•</span>
						367 人关注
						<span class="bull">•</span>
					</div>
				</div>
			</div>
		</div>
		<div class="attention-list">
			<h2>暂时没有邀请</h2>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		methods: {
			clickType(e,type) {
				$(e.target).addClass('active').siblings('a').removeClass('active');
				if (type) {
					$('.invite-list').hide().siblings('.attention-list').show();
				}else{
					$('.attention-list').hide().siblings('.invite-list').show();
				}
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/invite.less');
</style>
