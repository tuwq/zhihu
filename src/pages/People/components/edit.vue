<template>
	<div id="edit">
		<div class="Edit-wrapper">
			<div class="Card">
				<div class="edit-header">
					<div class="editor">
						<div>
							<div class="Guide">
								<div class="guide-inner">
									<div class="buttonContainer">
										<button class="uploadBtn">
											<svg viewBox="0 0 20 16" width="14" height="16'">
												<title></title>
												<g><path d="M18.094 2H15s-1-2-2-2H7C6 0 5 2 5 2H2C0 2 0 3.967 0 3.967V14c0 2 2.036 2 2.036 2H17c3 0 3-1.983 3-1.983V4c0-2-1.906-2-1.906-2zM10 12c-1.933 0-3.5-1.567-3.5-3.5S8.067 5 10 5s3.5 1.567 3.5 3.5S11.933 12 10 12zm0 1.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm7.5-8c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"></path></g>
											</svg>
											上传封面图片
										</button>
									</div>
									<div class="dialog"></div>
								</div>		
							</div>
						</div>
						<input type="file" accept="image/png;image/jpeg" style="display: none;">
					</div>
				</div>
				<div class="edit-main"></div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	
 	export default {
		
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/edit.less');
</style>
