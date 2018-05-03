<template>
	<div id="edit" class="Edit-wrapper">
		<div class="Edit-center">
			<div class="Card">
				<div class="edit-header">
					<div class="right-box">
						<div class="upload-inner">
							<button class="upload-btn"><svg viewBox="0 0 20 16" width="14" height="16"><title></title><g><path d="M18.094 2H15s-1-2-2-2H7C6 0 5 2 5 2H2C0 2 0 3.967 0 3.967V14c0 2 2.036 2 2.036 2H17c3 0 3-1.983 3-1.983V4c0-2-1.906-2-1.906-2zM10 12c-1.933 0-3.5-1.567-3.5-3.5S8.067 5 10 5s3.5 1.567 3.5 3.5S11.933 12 10 12zm0 1.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm7.5-8c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"></path></g></svg>上传封面图片</button>
						</div>
						<input type="file" accept="image/png;image/jpeg" style="display: none;">
					</div>
				</div>
				<div class="edit-main">
					<div>
						<div class="userAvatarEditor">
							<div class="userAvatar"><img src="../../../../static/avatar/160/avatar.png" width="160" height="160"></div>
							<div class="userAvatarMask"><div class="Mask-mask"></div><div class="Mask-content">
								<svg fill="#fff" viewBox="0 0 24 24" width="36" height="36" style="margin-bottom: 14px;"><path d="M20.094 6S22 6 22 8v10.017S22 20 19 20H4.036S2 20 2 18V7.967S2 6 4 6h3s1-2 2-2h6c1 0 2 2 2 2h3.094zM12 16a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0 1.5a5 5 0 1 0-.001-10.001A5 5 0 0 0 12 17.5zm7.5-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg><div style="white-space: nowrap;">修改我的头像</div>
							</div></div>
							<input type="file" accept="image/png,image/jpeg" style="display: none;">
						</div>
					</div>
					<div class="header-content">
						<div class="contentHeader">
							<h1 class="title"><span class="header-name">炮塔向后转</span></h1>
							<div class="actions"><a class="headerBtn">返回我的主页<svg viewBox="0 0 10 6" width="10" height="16" style="margin: 0 4px 0 8px transform: rotate(-90deg); vertical-align: text-bottom;" fill="currentColor"></svg></a></div>
						</div>
						<div class="fields">
							<form class="Field">
								<h3 class="Field-label">性别</h3>
								<div class="Field-content">
									<div>
										<span class="Field-text">未知</span>
										<button class="Field-modify">
											<svg viewBox="0 0 12 12" width="12" height="16" 
											style="margin-right: 4px;" fill="currentColor">
												<title></title><g><path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"></path></g>
											</svg>修改</button>
									</div>
								</div>
							</form>
							<form class="Field">
								<h3 class="Field-label">一句话介绍自己</h3>
								<div class="Field-content">
									<div>
										<span class="Field-text">回翻旧账的欠债人</span>
										<button class="Field-modify">
											<svg viewBox="0 0 12 12" width="12" height="16" 
											style="margin-right: 4px;" fill="currentColor">
												<title></title><g><path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"></path></g>
											</svg>修改</button>
									</div>
									<div>
										<input type="radio" id="one" name="one" value="One" v-model="gender">男
										<input type="radio" id="two" name="two" value="Two" v-model="gender">女
										<div class="ButtonGroup">
											<button type="submit" class="button-blue">保存</button>
											<button type="button" class="button-grey" style="margin-left: 16px;'">取消</button>
										</div>
									</div>
								</div>
							</form>
							<form class="Field"></form>
							<form class="Field">
								<h3 class="Field-label">所在行业</h3>
								<div class="Field-content">
									<div>
										<span class="Field-text">计算机软件</span>
										<button class="Field-modify">
											<svg viewBox="0 0 12 12" width="12" height="16" 
											style="margin-right: 4px;" fill="currentColor">
												<title></title><g><path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"></path></g>
											</svg>修改</button>
									</div>

								</div>
							</form>
							<form class="Field"></form>
							<form class="Field"></form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
 	export default {
		data() {
			return {
				gender: ''
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/edit.less');
</style>
