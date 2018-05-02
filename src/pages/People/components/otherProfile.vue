<template>
	<div id="otherProfile">
		<div class="Card">
			<div class="top"></div>
			<div class="bottom">
				<div class="userInfo-box">
					<div class="avatar-box">
						<div class="avatar-inner">
							<img src="../../../common/image/index/avatar_160.jpg" width="160" height="160" class="avatar-img">
						</div>
					</div>
					<div class="info">
						<div class="info-header">
							<h1>
								<span class="name">李大德</span>
								<span class="signature">rockabilly lover</span>
							</h1>
						</div>
						<div class="info-body">
							<span class="intro-font">个人简介</span>
							<span class="intro">唯有花生威士忌</span>
						</div>
						<div class="info-footer"><button class="drop"><svg viewBox="0 0 10 6" width="10" height="16" fill="currentColor" style="margin: 0 16px 0 4px;transform: rotate(180deg);"><title></title><g><path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path></g></svg>收起详细资料</button></div>	
						<div class="buttons">
							<button class="attention"><span>&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em" style="margin-right: 8px;position: relative;top: 3px;"><path d="M13.491 10.488s-.012-5.387 0-5.998c-.037-1.987-3.035-1.987-2.997 0-.038 1.912 0 5.998 0 5.998H4.499c-1.999.01-1.999 3.009 0 3.009s5.995-.01 5.995-.01v5.999c0 2.019 3.006 2.019 2.997 0-.01-2.019 0-5.998 0-5.998s3.996.009 6.004.009c2.008 0 2.008-3-.01-3.009h-5.994z"></path></svg></span>关注他</button>
							<button class="private"><span>&#8203;<svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em" style="margin-right: 8px;"><path d="M11 2c5.571 0 9 4.335 9 8 0 6-6.475 9.764-11.481 8.022-.315-.07-.379-.124-.78.078-1.455.54-2.413.921-3.525 1.122-.483.087-.916-.25-.588-.581 0 0 .677-.417.842-1.904.064-.351-.14-.879-.454-1.171A8.833 8.833 0 0 1 2 10c0-3.87 3.394-8 9-8zm10.14 9.628c.758.988.86 2.009.86 3.15 0 1.195-.619 3.11-1.368 3.938-.209.23-.354.467-.308.722.12 1.073.614 1.501.614 1.501.237.239-.188.562-.537.5-.803-.146-1.495-.42-2.546-.811-.29-.146-.336-.106-.563-.057-2.043.711-4.398.475-6.083-.927 5.965-.524 8.727-3.03 9.93-8.016z"></path></svg></span>发私信</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
 	export default {
 		props: {
 			userInfo: {
 				type: Object,
 				default() {
 					return {}
 				}
 			}
 		},
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/otherProfile.less');
</style>
