<template>
	<div class="phone-login-wrapper">
		<div class="phone-login">
			<div class="phone-input-wrapper">
				<button class="select-country">
					中国 +86
					<span>&#8203;<svg class="select-arrow">
						<path d="M12 16.183l2.716-2.966a.757.757 0 0 1 1.064.001.738.738 0 0 1 0 1.052l-3.247 3.512a.758.758 0 0 1-1.064 0L8.22 14.27a.738.738 0 0 1 0-1.052.758.758 0 0 1 1.063 0L12 16.183zm0-9.365L9.284 9.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l3.248-3.512a.758.758 0 0 1 1.065 0L15.78 8.73a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063.001L12 6.818z"></path>
					</svg></span>
				</button>
				<span>&nbsp;</span>
				<input type="tel" class="input-phone" :placeholder="placeholderText" @focus="tipMsg=''" 
				@blur="placeholderText='请输入正确的手机格式'" v-model="telphone">
				<span class="error-msg" v-show="tipMsg!=''">{{tipMsg}}</span>
			</div>
			<div class="phone-verification-wrapper">
				<span class="verification-input-wrapper">
					<input type="number" 
					@focus="tipMsg=''"
					class="input-verification" :placeholder="placeholderVcode" v-model="vCode">
				</span>
				<a class="getCode" @click.stop.prevent="getCode">获取短信验证码</a>
			</div>
		</div>
		<div class="phone-verification-wrapper">
			<a @click.stop.prevent="toMailLogin">密码登录 (手机号或邮箱)</a>
			<a>接收语音验证码</a>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">	
import axios from 'axios'
	export default {
		data() {
			return {
				telphone: '',
				vCode: '',
				tipMsg: '',
				placeholderText: '手机号',
				placeholderVcode: '输入6位短信验证码'
			}
		},
		computed: {
			formData: {
				get() {
					return {
						telphone: this.telphone,
						vCode: this.vCode
					};
				},
				set({telphone,vCode}) {
					this.telphone = telphone,
					this.vCode = vCode
				}
			}
		},
		watch: {
			formData(newval) {
				this.$emit('changeData',newval)
			}
		},
		methods: {
			getCode() {
				axios.post('/user/getCode',{
					telphone: this.telphone,
					action: 'login'
				}).then((res)=> {
					if(res.data.status) {
						this.tipMsg = res.data.result.msg
						return;
					}else{
						this.vCode = res.data.result.phoneCode
					}
				});
			},
			toMailLogin() {
				this.$emit('toMailLogin');
				this.clearData()
			},
			clearData() {
				this.telphone = ''
				this.vCode = ''
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/phone-login.less');
</style>
