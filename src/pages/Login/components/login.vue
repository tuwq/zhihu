<template>
	<div class="login-wrapper" v-show="form_type==0">
		<div class="login">
			<div class="content-wrapper">
				<div class="login-header">
					<form class="login-form">
						<mail-login  v-show="login_type==0" @toPhoneLogin="toPhoneLogin"></mail-login>
						<phone-login v-show="login_type==1" @toMailLogin="toMailLogin"></phone-login>
						<button class="login-btn" type="submit">登录</button>
					</form>
				</div>
				<div class="login-footer">
					<div class="login-info">
						<span>二维码登录</span>
						<span> · </span>
						<span>海外手机登录</span>
						<span> · </span>
						<span>社交账号登录</span>
					</div>
				</div>
			</div>
		</div>
		<div class="sign-container-switch">没有账号？ <span @click.stop.prevent="toRegist">注册</span></div>
		<div class="sign-flow-home-page"><div></div></div>
	</div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapMutations} from 'vuex';
import phoneLogin from 'login_components/phone-login.vue';
import mailLogin from 'login_components/mail-login.vue'; 
	export default {
		components: {
			'phone-login': phoneLogin,
			'mail-login': mailLogin
		},
		methods: {
			toRegist() {
				this.setFormType(1);
			},
			toPhoneLogin() {
				this.login_type = 1;
			},
			toMailLogin() {
				this.login_type = 0;
			},
			...mapMutations({
				setFormType: 'SET_FORM_TYPE'
			}),
		},
		data() {
			return {
				login_type: 0
			}
		},
		computed: {
			...mapGetters([
				'form_type'
			]),
			
		},
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/login.less');
</style>
