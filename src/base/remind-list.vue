<template>
	<div id="remind-list">
		<remind msg="建议反馈" v-show="reminds.indexOf('suggest')!=-1">
			<button class="suggestBtn" type="button" @click.stop.prevent; slot="suggest">
				<svg class="feedback" viewbox="0 0 24 24" width="24" height="24">
				<path d="M19.99 6.99L18 5s-1-1-2-1H8C7 4 6 5 6 5L4 7S3 8 3 9v9s0 2 2.002 2H19c2 0 2-2 2-2V9c0-1-1.01-2.01-1.01-2.01zM16.5 5.5L19 8H5l2.5-2.5h9zm-2 5.5s.5 0 .5.5-.5.5-.5.5h-5s-.5 0-.5-.5.5-.5.5-.5h5z"></path>
				</svg>
			</button>	
		</remind>
		<remind msg="返回顶部" v-show="reminds.indexOf('toTop')!=-1">
			<button class="toTopBtn" type="button" @click.stop.prevent; slot="toTopBtn">
				<svg class="feedback" viewbox="0 0 24 24" width="24" height="24">
				<path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path>
				</svg>
			</button>
		</remind>
	</div>
</template>

<script type="text/ecmascript-6">
	import remind from 'base/remind.vue';
	export default {
		props: {
			 reminds: {
		        type: Array,
		        default: []
		      }
		},
		components: {
			'remind': remind
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	
</style>
