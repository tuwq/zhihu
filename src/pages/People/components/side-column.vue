<template>
	<div id="">
		<div class="side-column" v-show="detail_user_id">
			<div class="Card achievement-box">
				<div class="header-title"><div class="text">个人成就</div></div>
				<div class="side-items">
					<div class="side-item">
						<div class="approve"><div class="text"><svg fill="#8590a6" viewBox="0 0 20 18" width="16" height="16"><title></title><g><path d="M.718 7.024c-.718 0-.718.63-.718.63l.996 9.693c0 .703.718.65.718.65h1.45c.916 0 .847-.65.847-.65V7.793c-.09-.88-.853-.79-.846-.79l-2.446.02zm11.727-.05S13.2 5.396 13.6 2.89C13.765.03 11.55-.6 10.565.53c-1.014 1.232 0 2.056-4.45 5.83C5.336 6.965 5 8.01 5 8.997v6.998c-.016 1.104.49 2 1.99 2h7.586c2.097 0 2.86-1.416 2.86-1.416s2.178-5.402 2.346-5.91c1.047-3.516-1.95-3.704-1.95-3.704l-5.387.007z"></path></g></svg></div>获得{{approveCount}}次赞同</div>
						<div class="collection">获得0次感谢,0次收藏</div>
					</div>
				</div>
			</div>
			<div class="Card shipCard-box">
				<div class="shipCard-inner">
					<a href="javascript:void(0)" class="NumberBtn" @click.stop.prevent="openFollow">
						<div class="item-inner">
							<div class="itemName">关注了</div>
							<strong class="itemValue">{{followerCount}}</strong>
						</div>
					</a>
					<a href="javascript:void(0)" class="NumberBtn" @click.stop.prevent="openFans">
						<div class="item-inner">
							<div class="itemName">关注者</div>
							<strong class="itemValue">{{fansCount}}</strong>
						</div>
					</a>
				</div>
			</div>
			<div class="lightList">
				<a href="javascript:void(0)" class="lightItem" target="_blank">
					<span class="lightItemName">赞助的 Live ⚡️</span>
					<span class="lightItemValue">4</span>
				</a>
				<a href="javascript:void(0)" class="lightItem" target="_blank">
					<span class="lightItemName">关注的话题</span>
					<span class="lightItemValue">6</span>
				</a>
				<a href="javascript:void(0)" class="lightItem" target="_blank">
					<span class="lightItemName">关注的专栏</span>
					<span class="lightItemValue">0</span>
				</a>
				<a href="javascript:void(0)" class="lightItem" target="_blank">
					<span class="lightItemName">关注的问题</span>
					<span class="lightItemValue">2</span>
				</a>
				<a href="javascript:void(0)" class="lightItem" target="_blank">
					<span class="lightItemName">关注的收藏夹</span>
					<span class="lightItemValue">0</span>
				</a>
			</div>
			<div class="operations">
				个人主页被浏览110次
			</div>
			<footer class="footer">
				<a href="" class="footer-item">刘看山</a>
				<span class="footer-dot"></span>
				<a href="" class="footer-item">知乎指南</a>
				<span class="footer-dot"></span>
				<a href="" class="footer-item">知乎协议</a>
				<span class="footer-dot"></span>
				<a href="" class="footer-item">隐私政策</a>
				<br>
				<a href="" class="footer-item">应用</a>
				<span class="footer-dot"></span>
				<a href="" class="footer-item">工作</a>
				<span class="footer-dot"></span>
				<a href="" class="footer-item">申请开通知乎机构号</a>
				<br>
				<a href="" class="footer-item">侵权举报</a>
				<span class="footer-dot"></span>
				<a href="" class="footer-item">网上有害信息举报专区</a>
				<br>
				<a href="" class="footer-item">违法和不良信息举报: 010-82716601</a>
				<br>
				<a href="" class="footer-item">儿童色情信息举报专区</a>
				<br>
				<a href="" class="footer-item">联系我们</a>
				<span> © 2018 知乎</span>
			</footer>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import {communicationMixin} from 'common/js/mixin.js'
 	export default {
 		props: {
 			detail_user_id: {
 				type: String,
 				default: ''
 			},
 			fansCount: {
 				type: Number,
 				default: 0
 			},
 			followerCount: {
 				type: Number,
 				default: 0
 			},
 			approveCount: {
 				type: Number,
 				default: 0
 			}
 		},
 		methods: {
 			openFollow() {
 				communicationMixin.$emit('showFollwer')
 				communicationMixin.$emit('openFollw')
 			},
 			openFans() {
 				communicationMixin.$emit('showFollwer')
 				communicationMixin.$emit('openFans')
 			}
 		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/side-column.less');
</style>
