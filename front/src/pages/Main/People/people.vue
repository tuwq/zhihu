<template>
	<div id="people" @click.stop="clsDrop">
		<p-header></p-header>	
		<div class="main">	
			<router-view></router-view>
		</div>
		<remind-list :reminds="['suggest','toTop']"></remind-list>
		<z-drop></z-drop>
		<cutAvatar></cutAvatar>	
	</div>
</template>

<script type="text/ecmascript-6">
	import remind from 'base/remind.vue';
	import remindList from 'base/remind-list.vue';
	import {mapMutations} from 'vuex';
	import PHeader from 'p_components/p-header.vue'
	import zDrop from 'z_components/zDrop.vue';
	import cutAvatar from 'p_components/cutAvatar.vue'
	import axios from 'axios'
 	export default {
		components: {
			remind,
			remindList,
			PHeader,
			zDrop,
			cutAvatar
		},
		methods: {
			clsDrop() {
				this.setPeopleDropUp(false)
				this.setIndexDropDown(false)
			},
			...mapMutations({
				setPeopleDropUp: 'SET_PEOPLE_DROPUP',
				setIndexDropDown: 'SET_INDEX_DROPDOWN',
			}),
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('./cpLess/people.less');
</style>
