<template>
	<div class="regist-wrapper" v-show="form_type==1">
		<div class="register">
			<div class="content-wrapper">
				<div class="register-header">
					<form action="" class="register-form">
						<div class="phone-input-wrapper">
							<button class="select-country">
								中国 +86
								<span>&#8203;<svg class="select-arrow">
									<path d="M12 16.183l2.716-2.966a.757.757 0 0 1 1.064.001.738.738 0 0 1 0 1.052l-3.247 3.512a.758.758 0 0 1-1.064 0L8.22 14.27a.738.738 0 0 1 0-1.052.758.758 0 0 1 1.063 0L12 16.183zm0-9.365L9.284 9.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l3.248-3.512a.758.758 0 0 1 1.065 0L15.78 8.73a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063.001L12 6.818z"></path>
								</svg></span>
							</button>
							<span>&nbsp;</span>
							<input type="tel" class="input-phone" placeholder="手机号">
							<span class="error-msg">手机格式错误</span>
						</div>
						<div class="phone-verification-wrapper">
							<span class="verification-input-wrapper">
								<input type="number" class="input-verification" placeholder="输入6位短信验证码">
							</span>
							<a class="getCode">获取短信验证码</a>
						</div>
						<div class="phone-verification-wrapper">
							<span class="verification-input-wrapper">
								<input type="eamil" class="input-verification" placeholder="输入正确的邮箱格式">
							</span>
							<a class="getCode">获取邮箱验证码</a>
						</div>
						<div class="registBtn-wrapper">
							<button class="register-btn">注册</button>
						</div>
					</form>
				</div>
				<div class="resgister-footer">
					<h2>注册即代表你同意<a href="javascript:void(0)">《知乎协议》</a></h2>
					<span><a href="javascript:void(0)">注册机构号</a></span>
				</div>
			</div>
		</div>
		<div class="sign-container-switch">已有帐号？<span @click.stop.prevent="toLogin">登录</span></div>
		<div class="sign-flow-home-page"><div></div></div>
	</div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapMutations} from 'vuex';
	export default {
		methods: {
			toLogin() {
				this.setFormType(0);
			},
			...mapMutations({
				setFormType: 'SET_FORM_TYPE'
			}),
		},
		computed: {
			...mapGetters([
				'form_type'
			])
		},
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/regist.less');
</style>
