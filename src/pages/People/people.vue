<template>
	<div id="people" @click.stop.prevent="clsDrop">
		<p-header></p-header>
		<div class="main">
			<p-index></p-index>
		</div>
		<remind-list :reminds="['suggest','toTop']"></remind-list>
	</div>
</template>

<script type="text/ecmascript-6">
	import remind from 'base/remind.vue';
	import PIndex from 'p_components/p-index.vue';
	import remindList from 'base/remind-list.vue';
	import {mapMutations} from 'vuex'; 
	import PHeader from 'p_components/p-header.vue'
 	export default {
		components: {
			'remind': remind,
			'p-index': PIndex,
			'remind-list' : remindList,
			'p-header': PHeader
		},
		methods: {
			clsDrop() {
				this.setPeopleDropUp(false)
			},
			...mapMutations({
				setPeopleDropUp: 'SET_PEOPLE_DROPUP'
			})
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('./cpLess/people.less');
</style>
