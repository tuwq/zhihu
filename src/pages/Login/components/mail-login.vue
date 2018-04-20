<template>
	<div class="mail-login-wrapper">
		<div class="mail-login">
			<div class="form-group">
				<input type="text" placeholder="手机号或邮箱">
				<span class="error-msg"></span>
			</div>
			<div class="form-group">
				<input type="password" name="password" id="password" placeholder="密码">
				<span class="visible" @click.stop.prevent="switchVisible"><i><svg width="24" height="20"><title></title><g><path d="M17.007 11.504c0 .65-.13 1.26-.36 1.83l3 3.073S23 14.136 23 11.504C23 8.008 17.255 4 11.995 4c-1.4 0-2.741.25-3.982.701l2.161 2.16c.57-.23 1.18-.36 1.831-.36a5.004 5.004 0 0 1 5.002 5.003zM2.57 4.342l2.067 2.075C3.499 7.258 1 9.119 1 11.504c0 3.336 5.79 7.503 11.005 7.503 1.55 0 3.031-.3 4.382-.84l.42.42 2.125 2.118s.782.571 1.314 0-.074-1.305-.074-1.305L3.955 3.183s-.76-.742-1.385-.19c-.626.554 0 1.35 0 1.35zm4.963 4.96l1.55 1.552c-.05.21-.08.43-.08.65 0 1.66 1.341 3.001 3.002 3.001.22 0 .44-.03.65-.08l1.551 1.551c-.67.33-1.41.53-2.2.53a5.004 5.004 0 0 1-5.003-5.002c0-.79.2-1.53.53-2.201zm4.312-.78l3.151 3.152.02-.16c0-1.66-1.34-3.001-3.001-3.001l-.17.01z"></path></g></svg></i></span>
				<span class="error-msg"></span>
			</div>
			<div class="form-group Code">
				<input type="text" placeholder="验证码">
				<span class="verification-img"></span>
				<span class="error-msg"></span>
			</div>
			<div class="phone-verification-wrapper clearfix">
				<a @click.stop.prevent="toPhoneLogin">手机验证码登录</a>
				<a>忘记密码?</a>
			</div>	
		</div>
	</div>
</template>

<script type="text/ecmascript-6">	
	export default {
		methods: {
			toPhoneLogin() {
				this.$emit('toPhoneLogin');
			},
			switchVisible() { 
				$('#password').attr('type') == 'password'?$('#password').attr('type','text'):$('#password').attr('type','password');
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/mail-login.less');
</style>
