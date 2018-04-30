<template>
	<div class="login-wrapper" v-show="form_type==1">
		<div class="login">
			<div class="content-wrapper">
				<div class="login-header">
					<form class="login-form">
						<mail-login :tipMsg="tipMsg" @changeTip="tipMsg=''" @changeData="changeData" v-show="login_type==0" @toPhoneLogin="login_type = 1" ></mail-login>
						<phone-login @changeData="changeData" v-show="login_type==1" @toMailLogin="login_type = 0" 
						ref="phoneForm"></phone-login>
						<button class="login-btn" type="submit" @click.stop.prevent="toLogin">登录</button>
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
		<div class="sign-container-switch">没有账号？ <span @click.stop.prevent="toRegistForm">注册</span></div>
		<div class="sign-flow-home-page"><div></div></div>
	</div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapMutations} from 'vuex';
import phoneLogin from 'login_components/phone-login.vue';
import mailLogin from 'login_components/mail-login.vue';
import axios from 'axios'
	export default {
		components: {
			'phone-login': phoneLogin,
			'mail-login': mailLogin,
		},
		data() {
			return {
				login_type: 0,
				formData: {},
				tipMsg: ''
			}
		},
		methods: {
			toRegistForm() {
				this.setFormType(0);
			},
			toLogin() {
				if(this.login_type==0){
					if(this.formData.userCode.toLowerCase() == this.formData.validateCode.toLowerCase()) {
						axios.post('/user/pwLogin',this.formData).then((res)=> {
							if(res.data.status) {
								this.tipMsg = res.data.result.msg;
								return
							}
							alert('登录成功')
							return
						})
					}else{
						this.tipMsg = '验证码有误'
						this.formData.userCode=''
						return
					}	
				}else{
					if ( this.formData.telphone.length===0||this.formData.vCode.length===0) {
						this.$refs.phoneForm.placeholderText =  '请输入正确的手机格式'
						this.$refs.phoneForm.placeholderVcode = '请输入短信验证码'
						return false
					}
					console.log(this.formData)
					axios.post('/user/phoneLogin',this.formData).then( (res) => {
						if(res.data.status){
							this.$refs.phoneForm.tipMsg = res.data.result.msg
							return;
						}
						alert('登录成功')
					})
				}
			},
			changeData(formData) {
				this.formData = formData
			},
			...mapMutations({
				setFormType: 'SET_FORM_TYPE'
			}),
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
