<template>
	<div id="test">
            <div class="form-group">
                <label for="exampleInputEmail1">选择图片</label>
                <input type="file" class="form-control" id="avatar" name="avatar">
            </div>
            <div>
            	<button id="btn" @click.stop.prevent="open">open</button>
            </div>
            <button type="submit" class="btn btn-default" id="uploadBtn">上传</button>
	</div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
	export default {
		data() {
			return {
				size: 0
			}
		},
		methods: {
			init() {
				$('#avatar').on('change',(e)=> {
					 this.ajaxSend();
				}) 
			},
			ajaxSend(callback) {
				$.ajaxFileUpload({  
				    type: "POST",  
				    url: "/user/setAvatar",  
				    data:{avatar_size: 160},//要传到后台的参数，没有可以不写  
				    secureuri : false,//是否启用安全提交，默认为false  
				    fileElementId:'avatar',//文件选择框的id属性  
				    dataType: 'json',//服务器返回的格式  
				    async : true,  
				    contentType: 'multipart/form-data',
				    success: function(data){  
				       console.log(data)
				    },  
				    error: function (data, status, e){  
				       
				   	},
				   	complete: ()=> {
				   		// 内部递归解决change只触发一次的bug
					 	$("#avatar").replaceWith('<input type="file" class="form-control" id="avatar" name="avatar">') 
				   		$('#avatar').on('change',(e)=> {
							this.ajaxSend()
						}) 
					}
				});
			},
			open() {
				$('#avatar').click();
			}
		},
		mounted() {
			this.init();
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('./baseLess/test.less');
</style>
