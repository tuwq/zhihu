<template>
	<div class="login-wrapper">
		<div class="loading"></div>
		<main class="app-main">
			<div class="homePage">
				<div class="home-content">
					<div class="container-content">
						<div class="sign-header">
							<svg viewBox="0 0 200 91" class="header-logo">
								<title></title>
								<g><path d="M53.29 80.035l7.32.002 2.41 8.24 13.128-8.24h15.477v-67.98H53.29v67.978zm7.79-60.598h22.756v53.22h-8.73l-8.718 5.473-1.587-5.46-3.72-.012v-53.22zM46.818 43.162h-16.35c.545-8.467.687-16.12.687-22.955h15.987s.615-7.05-2.68-6.97H16.807c1.09-4.1 2.46-8.332 4.1-12.708 0 0-7.523 0-10.085 6.74-1.06 2.78-4.128 13.48-9.592 24.41 1.84-.2 7.927-.37 11.512-6.94.66-1.84.785-2.08 1.605-4.54h9.02c0 3.28-.374 20.9-.526 22.95H6.51c-3.67 0-4.863 7.38-4.863 7.38H22.14C20.765 66.11 13.385 79.24 0 89.62c6.403 1.828 12.784-.29 15.937-3.094 0 0 7.182-6.53 11.12-21.64L43.92 85.18s2.473-8.402-.388-12.496c-2.37-2.788-8.768-10.33-11.496-13.064l-4.57 3.627c1.363-4.368 2.183-8.61 2.46-12.71H49.19s-.027-7.38-2.372-7.38zm128.752-.502c6.51-8.013 14.054-18.302 14.054-18.302s-5.827-4.625-8.556-1.27c-1.874 2.548-11.51 15.063-11.51 15.063l6.012 4.51zm-46.903-18.462c-2.814-2.577-8.096.667-8.096.667s12.35 17.2 12.85 17.953l6.08-4.29s-8.02-11.752-10.83-14.33zM199.99 46.5c-6.18 0-40.908.292-40.953.292v-31.56c1.503 0 3.882-.124 7.14-.376 12.773-.753 21.914-1.25 27.427-1.504 0 0 3.817-8.496-.185-10.45-.96-.37-7.24 1.43-7.24 1.43s-51.63 5.153-72.61 5.64c.5 2.756 2.38 5.336 4.93 6.11 4.16 1.087 7.09.53 15.36.277 7.76-.5 13.65-.76 17.66-.76v31.19h-41.71s.88 6.97 7.97 7.14h33.73v22.16c0 4.364-3.498 6.87-7.65 6.6-4.4.034-8.15-.36-13.027-.566.623 1.24 1.977 4.496 6.035 6.824 3.087 1.502 5.054 2.053 8.13 2.053 9.237 0 14.27-5.4 14.027-14.16V53.93h38.235c3.026 0 2.72-7.432 2.72-7.432z" 
									fill-rule="evenodd"></path></g>
							</svg>
							<div class="header-slogen">
								注册知乎，发现更大的世界
							</div>
						</div>
						<div class="sign-container-inner">
							<div class="register">
							</div>
							<div class="sign-container-switch">已有帐号？<span>登录</span></div>
							<div class="sign-flow-home-page"><div></div></div>
						</div>
					</div>
					<button class="downloadBtn">下载知乎 App</button>
				</div>
				<div class="home-footer">
					<div class="zhihu-links">
						<a href="javascript:void(0)" target="_blank">知乎专栏</a>
						<a href="javascript:void(0)" target="_blank">圆桌</a>
						<a href="javascript:void(0)" target="_blank">发现</a>
						<a href="javascript:void(0)" target="_blank">移动应用</a>
						<a href="javascript:void(0)" target="_blank">联系我们</a>
						<a href="javascript:void(0)" target="_blank">来知乎工作</a>
						<a href="javascript:void(0)" target="_blank">注册机构号</a>
					</div>
					<div class="zhihu-rights">
						<span>© 2018 知乎</span>
						<a href="javascript:void(0)">京 ICP 证 110745 号</a>
						<span>京公网安备 11010802010035 号<a href="javascript:void(0)" class="license" target="_blank">
							出版物经营许可证
						</a></span>
					</div>
					<div class="zhihu-reports">
						<a href="javascript:void(0)">侵权举报</a>
						<a href="javascript:void(0)">网上有害信息举报专区</a>
						<a href="javascript:void(0)">侵权举报</a>
						<a href="javascript:void(0)">儿童色情信息举报专区</a>
						<span>违法和不良信息举报：010-82716601</span>
					</div>
					<div class="zhiu-integrity">
						<div>
							<img src="https://static.zhihu.com/static/revved/img/index/chengxing_logo@2x.65dc76e8.png" alt="诚信网站示范企业">
							<a href="javascript:void(0)">诚信网站示范企业</a>
						</div>
					</div>
				</div>
			</div>
		</main>
		<div class="buttons">
			<div class="CornerAnimayed">
				<button class="Button--plain" type="button">建议反馈</button>
			</div>
			<div class="CornerAnimayed CornerAnimayed--hide">
				<svg class="feedback" viewbox="0 0 24 24" width="24" height="24">
					<path d="M19.99 6.99L18 5s-1-1-2-1H8C7 4 6 5 6 5L4 7S3 8 3 9v9s0 2 2.002 2H19c2 0 2-2 2-2V9c0-1-1.01-2.01-1.01-2.01zM16.5 5.5L19 8H5l2.5-2.5h9zm-2 5.5s.5 0 .5.5-.5.5-.5.5h-5s-.5 0-.5-.5.5-.5.5-.5h5z"></path>
				</svg>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/login.less');
</style>
