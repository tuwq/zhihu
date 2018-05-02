<template>
	<div>
		<div class="header">
			<my-profile v-if="index_type == 1 " :user="user"></my-profile>
			<other-profile v-if="index_type == 2" :user="user"></other-profile>
		</div>
		<div class="main-content">
			<main-column></main-column>
			<side-column></side-column>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import mainColumn from 'p_components/main-column.vue';
import sideColumn from 'p_components/side-column.vue';
import myproFile from 'p_components/myProfile.vue';
import otherProfile from 'p_components/otherProfile.vue';
import {mapMutations,mapGetters} from 'vuex';
import { set, get } from '../../../common/js/cookie.js'
import { userMixin } from '../../../common/js/mixin'
import axios from 'axios'
  	export default {
  		mixins: [userMixin],
  		data() {
  			return {
  				index_type: 0,
  				user: {}
  			}	
  		},
  		components: {
  			'main-column': mainColumn,
  			'side-column': sideColumn,
  			'my-profile': myproFile,
  			'other-profile': otherProfile
  		},
		methods: {
			init(callback) {
				// 由主页router.push()传值而来,内容为用户名加5位用户id
				var user_url = this.$route.params.user_url
				var _id = user_url.substr(-5)
				var username = user_url.substr(0,user_url.length-5)
				// 查询用户完整id
				axios.post('/user/getIdByToken').then( (res)=> {
					// 比对是否是本人主页
					if (user_url === username+res.data.result._id.substr(0,5)) {
						this.index_type = 1;
						callback(res.data.result._id)
					}else{
						//不是本人主页，需要他人id	
						this.index_type = 2;
						// this.$route.params.uid;
						callback(res.data.result._id)
					}
				})
			},
			getUserInfo(id) {
				axios.post('/user/getInfoById',{_id: id})
				.then((res)=> {
					this.user = res.data.result
				})
			}
		},
		created() {
			this.init(this.getUserInfo)
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/p-index.less');
</style>
