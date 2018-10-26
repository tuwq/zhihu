<template>
	<div class="login-wrapper" v-show="form_type==1">
		<div class="login">
			<div class="content-wrapper">
				<div class="login-header">
					<form class="login-form">
						<mail-login 
						v-show="login_type==0" 
						@changeTip="tipMsg=''" 
						@changeData="changeData"
						@toPhoneLogin="login_type = 1"  
						:tipMsg="tipMsg" 
						ref="mailForm"></mail-login>
						<phone-login 
						v-show="login_type==1" 
						@changeData="changeData" 
						@toMailLogin="login_type = 0" 
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
import phoneLogin from 'login_components/phone-login.vue';
import mailLogin from 'login_components/mail-login.vue';
import { communicationMixin } from 'common/js/mixin'
import { pwLoginApi, phoneLoginApi } from 'api/login'
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
				// 清除登录数据
				this.$refs.mailForm.clearData()
				this.$refs.phoneForm.clearData()
			},
			toLogin() {
				if(this.login_type==0){
					if(this.formData.userCode.toLowerCase() == this.formData.validateCode.toLowerCase()) {
						pwLoginApi(this.formData, (res)=> {
							if(res.data.status) {
								this.tipMsg = res.data.result.msg;
								return
							}
							this.toIndex(res)
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
						return
					}
					phoneLoginApi(this.formData, (res)=> {
						if(res.data.status){
							this.$refs.phoneForm.tipMsg = res.data.result.msg
							return;
						}
						this.toIndex(res)
					})
				}
			},
			toIndex(res) {
				// 去首页之前，存储token放入本地
				this.setToken(res.data.result.token,{ expires: 365 })
				// 去之前的页面或者去首页
				// this.$route.query.redirect
				this.$router.push('/')
				// 清除登录数据
				this.$refs.mailForm.clearData()
				this.$refs.phoneForm.clearData()
			},
			changeData(formData) {
				this.formData = formData
			},
			...mapMutations({
				setFormType: 'SET_FORM_TYPE',
				setToken: 'SET_TOKEN',
			}),
		},
		computed: {
			...mapGetters([
				'form_type'
			]),
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/login.less');
</style>
