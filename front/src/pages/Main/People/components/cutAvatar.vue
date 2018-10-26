<template>
	<div id="cutAvatar">
		<div class="Modal-wrapper" v-show="cut_avatar_mask">
			<div class="Modal-backdrop" @click.stop="clsCut">
				
			</div>
			<div class="Modal-default">
				<div class="Modal-inner">
					<h3 class="Modal-title">编辑头像</h3>
					<div class="Modal-subtitle">调整头像尺寸和位置</div>
					<div class="Modal-content">
						<div>
							<div class="uploadImageModal-container">
								<canvas width="330" height="330" style="width: 240px;height: 240px"></canvas>
							</div>
							<div style="text-align: center;">
								<svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
									<path d="M16.296 7h.697A1.01 1.01 0 0 1 18 8.003v10.995c0 .554-.45 1.003-1.007 1.003H4.007A1.01 1.01 0 0 1 3 18.998V8.003C3 7.449 3.45 7 4.007 7h12.289zm-.892 11a.6.6 0 0 0 .597-.601V9.601A.597.597 0 0 0 15.405 9H5.596A.599.599 0 0 0 5 9.602v7.797c0 .335.267.601.596.601h9.808zM7 4h13a1 1 0 0 1 1 1v11a1 1 0 0 1-2 0V6.5c0-.5-.5-.5-.5-.5H7a1 1 0 0 1 0-2z" fill-rule="evenodd"></path>
								</svg>
								<input type="range" class="range" min="1" max="2" step="0.01" value="1">
								<svg fill="currentColor" viewBox="0 0 24 24" width="22" height="22">
									<path d="M16.296 7h.697A1.01 1.01 0 0 1 18 8.003v10.995c0 .554-.45 1.003-1.007 1.003H4.007A1.01 1.01 0 0 1 3 18.998V8.003C3 7.449 3.45 7 4.007 7h12.289zm-.892 11a.6.6 0 0 0 .597-.601V9.601A.597.597 0 0 0 15.405 9H5.596A.599.599 0 0 0 5 9.602v7.797c0 .335.267.601.596.601h9.808zM7 4h13a1 1 0 0 1 1 1v11a1 1 0 0 1-2 0V6.5c0-.5-.5-.5-.5-.5H7a1 1 0 0 1 0-2z" fill-rule="evenodd"></path>
								</svg>
							</div>
							<div class="buttonGroupModal">
								<button class="button-blue">保存</button>
							</div>
						</div>
					</div>
				</div>
				<button class="Modal-closeButton" @click.stop="clsCut"><svg fill="#fff" viewBox="0 0 24 24" width="24" height="24" style="vertical-align: top;">
					<path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z"></path>
				</svg></button>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations, mapActions } from 'vuex';
 	export default {
		methods: {
			clsCut() {
				this.setCutAvatarMask(false)
			},
			...mapMutations({
				setCutAvatarMask: 'SET_CUT_AVATAR_MASK'
			}),
		},
		computed: {
			...mapGetters([
				'cut_avatar_mask'
			]),
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/cutAvatar.less');
</style>
