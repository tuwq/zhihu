<template>
	<div id="people" @click.stop.prevent="clsDrop">
		<p-header></p-header>
		<div class="main">
			<p-index></p-index>
		</div>
		<remind-list :reminds="['suggest','toTop']"></remind-list>
		 <z-drop></z-drop>
	</div>
</template>

<script type="text/ecmascript-6">
	import remind from 'base/remind.vue';
	import PIndex from 'p_components/p-index.vue';
	import remindList from 'base/remind-list.vue';
	import {mapMutations} from 'vuex'; 
	import PHeader from 'p_components/p-header.vue'
	import zDrop from 'z_components/zDrop.vue';
	import axios from 'axios'
 	export default {
		components: {
			'remind': remind,
			'p-index': PIndex,
			'remind-list' : remindList,
			'p-header': PHeader,
			'z-drop': zDrop
		},
		methods: {
			clsDrop() {
				this.setPeopleDropUp(false)
				this.setIndexDropDown(false)
			},
			...mapMutations({
				setPeopleDropUp: 'SET_PEOPLE_DROPUP',
				setIndexDropDown: 'SET_INDEX_DROPDOWN',
			})
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('./cpLess/people.less');
</style>
