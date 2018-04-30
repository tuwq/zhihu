<template>
 	<div class="verificationCode">
		<canvas id="mycanvas" width='90' height='40' @click.stop.prevent="changeImage">
		    您的浏览器不支持canvas，请换个浏览器试试~
		</canvas>
	</div>
</template>

<script type="text/ecmascript-7">

	export default {
		data(){
			return {
				validateCode: ''
			}
		},
		mounted() {
			 this.clickChange();
		},
		methods: {
			changeImage() {
				this.clickChange();
			},
			// 生成4位随机数
			rand() {
				var str="abcdefghijklmnpqrstuvwxyz0123456789";
		        var arr=str.split("");
		        var validate="";
		        var ranNum;
		        for(var i=0;i<4;i++){
		            ranNum=Math.floor(Math.random()*35);   //随机数在[0,35]之间
		            validate+=arr[ranNum];
		        }
		        this.validateCode = validate
		        return validate;
			},
			// 干扰线的随机x坐标值
			lineX(){
		        var ranLineX=Math.floor(Math.random()*90);
		        return ranLineX;
		    },
		    // 干扰线的随机y坐标值
		    lineY(){
		        var ranLineY=Math.floor(Math.random()*40);
		        return ranLineY;
		    },
		  	clickChange(){
		        var mycanvas=document.getElementById('mycanvas');
		        var cxt=mycanvas.getContext('2d');
		        cxt.fillStyle='#000';
		        cxt.fillRect(0,0,90,40);
		        /*生成干扰线20条*/
		        for(var j=0;j<20;j++){
		            cxt.strokeStyle='#fff';
		            cxt.beginPath();    //若省略beginPath，则每点击一次验证码会累积干扰线的条数
		            cxt.moveTo(this.lineX(),this.lineY());
		            cxt.lineTo(this.lineX(),this.lineY());
		            cxt.lineWidth=0.5;
		            cxt.closePath();
		            cxt.stroke();
		        }
		        cxt.fillStyle='red';
		        cxt.font='bold 20px Arial';
		        cxt.fillText(this.rand(),25,25);   //把rand()生成的随机数文本填充到canvas中      
		    }
		},
		watch: {
			validateCode(newval) {
				this.$emit('validate',newval)
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
 
</style>
