<template>
	<div class="regist-wrapper" v-show="form_type==0">
		<div class="register">
			<div class="content-wrapper">
				<div class="register-header">
						<form class="register-form" @onsubmit="toRegist">
							<div class="phone-input-wrapper">
								<button class="select-country">
									中国 +86
									<span>&#8203;<svg class="select-arrow">
										<path d="M12 16.183l2.716-2.966a.757.757 0 0 1 1.064.001.738.738 0 0 1 0 1.052l-3.247 3.512a.758.758 0 0 1-1.064 0L8.22 14.27a.738.738 0 0 1 0-1.052.758.758 0 0 1 1.063 0L12 16.183zm0-9.365L9.284 9.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l3.248-3.512a.758.758 0 0 1 1.065 0L15.78 8.73a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063.001L12 6.818z"></path>
									</svg></span>
								</button>
								<span>&nbsp;</span>
								<input  type="number" class="input-phone" 
								v-model="telphone"
								@blur="placeholderText='请输入正确的手机格式'"  
								:placeholder="placeholderText" 
								@focus="tipMsg=''"
								:id="telphone">
								<span class="tip-msg" id="tip-msg" v-show="tipMsg!=''">{{tipMsg}}</span>
							</div>
							<div class="phone-verification-wrapper">
								<span class="verification-input-wrapper">
									<input type="number" v-model="vCode" class="input-verification" 
									:placeholder="placeholderVcode"
									@blur="placeholderVcode='请输入短信验证码'">
								</span>
								<a class="getCode" @click.stop.prevent="getCode">获取短信验证码</a>
							</div>
							<div class="phone-verification-wrapper" style="border: none;">
								<span class="verification-input-wrapper">
									<input type="text" v-model="password" 
									class="input-password" 
									placeholder="请设置您的密码">
								</span>
								<a class="getCode" @click.stop.prevent="testClick">获取语音验证码</a>
							</div>
							<div class="registBtn-wrapper">
								<button class="register-btn" @click.stop.prevent="toRegist">注册</button>
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
import axios from 'axios'
	export default {
		data() {
			return {
				telphone: '',
				vCode: '',
				placeholderVcode: '请输入6位短信验证码',
				placeholderText: '手机号',
				tipMsg: '',
				password: ''
			}
		},
		methods: {
			toLogin() {
				this.setFormType(1);
			},
			toRegist() {
				if ( this.telphone.length===0||this.vCode.length===0) {
					this.placeholderText =  '请输入正确的手机格式'
					this.placeholderVcode = '请输入短信验证码'
					return false
				}
				axios.post('/user/regist',{
					telphone: this.telphone,
					vCode: this.vCode,
					password: this.password,
					action: 'regist'
				}).then((res) => {
					if(res.data.status){
						this.tipMsg = res.data.result.msg
						return;
					}
					this.toLogin();
				})
			},
			getCode() {
				axios.post('/user/getCode',{
					telphone: this.telphone
				}).then((res)=> {
					if(res.data.status) {
						this.tipMsg = res.data.result.msg
						return;
					}else{
						this.vCode = res.data.result.phoneCode
					}
				});
			},	
			testClick() {
				axios.get('/user/test').then((res)=> {
					
				})
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
