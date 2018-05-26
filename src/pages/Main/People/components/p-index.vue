<template>
	<div>
		<loading v-show="total_loading"></loading>
		<div v-show="!total_loading">
			<div class="header">
				<my-profile 
				v-if="people_type == 1"></my-profile>
				<other-profile 
				v-if="people_type == 2" 
				></other-profile>
			</div>
			<div class="main-content">
				<main-column v-if="listLoading"></main-column>
				<side-column></side-column>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import mainColumn from 'p_components/main-column.vue';
import sideColumn from 'p_components/side-column.vue';
import myProfile from 'p_components/myProfile.vue';
import otherProfile from 'p_components/otherProfile.vue';
import loading from 'base/loading.vue'
import {mapMutations,mapGetters} from 'vuex';
import { set, get } from 'common/js/cookie.js'
import axios from 'axios'
import {communicationMixin} from 'common/js/mixin'
  	export default {
  		data() {
  			return {
  				people_type: 0,
  				total_loading: true,
  				listLoading: true
  			}
  		},
  		components: {
  			mainColumn,
  			sideColumn,
  			myProfile,
  			otherProfile,
  			loading
  		},
		methods: {
			init() {
				axios.post('/user/detail',{
					detail_id: this.detail_user_id
				}).then((res)=>{
					this.people_type = res.data.result.people_type
					let people_detail_user = res.data.result.people_detail_user
					this.setPeopleDetailUser(people_detail_user)
					this.total_loading = false
				})
			},
 			...mapMutations({
				setPeopleDetailUser: 'SET_PEOPLE_DETAIL_USER',
			})
		},
		created() {
			this.init()
		},
		computed: {
			detail_user_id() {
				return this.$route.params.user_url
			}
		},
		watch: {
			$route: {
			    handler: function( to, from ){
			     	 if ( to.path != from.path && to.name == 'people_url' ) {
			     	 	this.people_type = 0
			     	 	this.total_loading = true
			     	 	this.listLoading = false
			     	 	this.$nextTick().then(()=>{
			     	 		this.listLoading = true
			     	 	})
			     	 	this.init()
			     	 }
			    },
			    // 深度观察监听
			    deep: true
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/p-index.less');
</style>
