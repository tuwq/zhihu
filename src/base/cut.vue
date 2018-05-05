<template>
 	<div id="cut">
		<h1></h1>

		<img src="../../static/avatar/160/avatar.png" id="target" alt="[Jcrop Example]" />
		<div id="preview-pane">
		    <div class="preview-container">
		      <img src="../../static/avatar/160/avatar.png" class="jcrop-preview" alt="Preview" />
		    </div>
		</div>

	  	<input type="button" id='doCut' value="剪裁"/>
	</div>
</template>

<script type="text/ecmascript-7">
import axios from 'axios'
	export default {
		methods: {
			init() {
				$('#doCut').on('click',()=> {
				  var w = parseInt($(".jcrop-holder>div:first").css("width"));
		          var h = parseInt($(".jcrop-holder>div:first").css("height"));
		          var x = parseInt($(".jcrop-holder>div:first").css("left"));
		          var y = parseInt($(".jcrop-holder>div:first").css("top"));
		          axios.get('/user/doCut',{
		          	params: {
						"w" : w,
						"h" : h,
						"x" : x,
						"y" : y
		          	}
		          }).then((res)=> {
		          	console.log(res.data)
		          })
				})
			}
		},
		created() {
			this.init();
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
 

</style>
