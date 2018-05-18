<template>
	<div id="myProFile" v-show="user">
		<div class="Card">
			<div class="top-upload">
				<div class="upload-inner">
					<div class="upload-box"><button class="uploadBtn"><svg viewBox="0 0 20 16" width="14" height="16" fill="currentColor"><title></title><g><path d="M18.094 2H15s-1-2-2-2H7C6 0 5 2 5 2H2C0 2 0 3.967 0 3.967V14c0 2 2.036 2 2.036 2H17c3 0 3-1.983 3-1.983V4c0-2-1.906-2-1.906-2zM10 12c-1.933 0-3.5-1.567-3.5-3.5S8.067 5 10 5s3.5 1.567 3.5 3.5S11.933 12 10 12zm0 1.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm7.5-8c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"></path></g></svg>上传封面图片</button></div>
				</div>	
				<input type="file" accept="image/png,image/jpeg" style="display: none;">
			</div>
			<div class="bottom-userinfo">
				<div class="userinfo-box">
					<div v-show="user.avatar">
						<div class="avatar-box" @click.stop="selectFile">
							<div class="avatar-inner" v-if="user.avatar">
								<img :src="base+user.avatar" id="avatar-img" 
								width="160" height="160" class="avatar-img">
							</div>	
							<div class="avatar-edit-mask" >
								<div class="mask-inner"></div>
								<div class="mask-content"><svg viewBox="0 0 24 24"><path d="M20.094 6S22 6 22 8v10.017S22 20 19 20H4.036S2 20 2 18V7.967S2 6 4 6h3s1-2 2-2h6c1 0 2 2 2 2h3.094zM12 16a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0 1.5a5 5 0 1 0-.001-10.001A5 5 0 0 0 12 17.5zm7.5-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg><div class="modify">修改我的头像</div></div>
							</div>
							<input type="file" name="avatar" id="avatar-upload" accept="image/png,image/jpeg" style="display: none;">'
						</div>
					</div>
					<div class="info" v-if="user.info">
						<div class="info-header"><h1 class="header-title">
							<span class="name">{{user.username}}</span>
							<span class="intro">{{user.info.intro}}</span>
							</h1>
						</div>
						<div class="info-body">
							<div class="related-info" v-if="user.info"> 
								<div v-if="user.info.industry">
									<span class="related-icon"><svg viewBox="0 0 20 18" width="13" height="16"><title></title><g><path d="M15 3.998v-2C14.86.89 13.98 0 13 0H7C5.822 0 5.016.89 5 2v2l-3.02-.002c-1.098 0-1.97.89-1.97 2L0 16c0 1.11.882 2 1.98 2h16.033c1.1 0 1.98-.89 1.987-2V6c-.007-1.113-.884-2.002-1.982-2.002H15zM7 4V2.5s-.004-.5.5-.5h5c.5 0 .5.5.5.5V4H7z"></path></g></svg></span>
									<span>{{user.info.industry}}</span>
								</div>
							</div>
						</div>
						<div class="info-footer">
							<button class="getDetail"><svg viewBox="0 0 10 6" width="10" height="16"><title></title><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg>查看详细资料</button>
							<div class="buttons"><router-link to="/people/edit">编辑个人资料</router-link></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapMutations,mapActions} from 'vuex';
import {communicationMixin} from 'common/js/mixin'
import {copyObj} from 'common/js/util'
 	export default {
 		mixins: [communicationMixin],
 		props: {
 			user: {
 				type: Object,
 				default() {
 					return {
 						info:{}
 					}
 				}
 			}
 		},
 		data() {
 			return {
 				img_size: 0,
 				base: '../../../../static/avatar/160/',
 			}
 		},
 		methods: {
 			onChangUpload() {
				$('#avatar-upload').on('change',()=> {
 					this.ajaxUpload()
 				})
 			},
 			selectFile() {
 				$('#avatar-upload').click();
 			},
 			ajaxUpload() {
 				var me = this;
				$.ajaxFileUpload({  
				    type: "POST",  
				    url: "/user/setAvatar",  
				    //要传到后台的参数，没有可以不写  
				    data:{avatar_size: this.img_size,username: this.user.username,_id: this.user._id},
				    secureuri : false,//是否启用安全提交，默认为false  
				    fileElementId:'avatar-upload',//文件选择框的id属性  
				    dataType: 'json',//服务器返回的格式  
				    async : true,  
				    contentType: 'multipart/form-data',
				    success: function(data){  
				      if (data.status) {
				      	alert('头像设置失败')
				      }
				      // 已成功上传头像，去切图页面
				      // 路径 C:\zhihu\static\avatar\160\匿名用户5aec0.jpg
				      var path = data.result.path
				      // 修改路径 为 '../../static/avatar/160/匿名用户5aec0.jpg'
				      var newPath = path.replace(/\\/g, '/').replace('C:/zhihu/','../../');
				      me.$router.push({name: 'cut',params: {path: newPath,user_url: me.user.username+me.user._id.substr(0,5)}})
				    },  
				    error: function (data, status, e){  
				       
				   	},
				   	complete: ()=> {
				   		// 内部递归解决change只触发一次的bug
					 	$("#avatar-upload").replaceWith('<input type="file" name="avatar" id="avatar-upload" accept="image/png,image/jpeg" style="display: none;">') 
				   		$('#avatar-upload').on('change',(e)=> {
							this.ajaxUpload()
						}) 
					}
				});
 			},
 			initData() {	
 				this.img_size = $('#avatar-img').attr('width')
 			},
 			cutOver() {
 				communicationMixin.$on('cutOver',(newPath)=> {
						let _newUser = copyObj(this.user)
						_newUser.avatar = newPath
						this.setUser(_newUser)
				})
 			},
 			...mapMutations({
				setCutAvatarMask: 'SET_CUT_AVATAR_MASK',
				setUser: 'SET_USER'
			}),
			...mapActions([
				'changeAvatar'
			])
 		},
 		mounted() {
 			this.initData();
 			this.onChangUpload()
 			this.cutOver()
 		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/myProfile.less');
</style>
