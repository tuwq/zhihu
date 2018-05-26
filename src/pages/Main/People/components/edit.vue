<template>
	<div id="edit" class="Edit-wrapper" v-cloak>
		<div class="Edit-center">
			<div class="Card">
				<div class="edit-header">
					<div class="right-box">
						<div class="upload-inner">
							<button class="upload-btn"><svg viewBox="0 0 20 16" width="14" height="16"><title></title><g><path d="M18.094 2H15s-1-2-2-2H7C6 0 5 2 5 2H2C0 2 0 3.967 0 3.967V14c0 2 2.036 2 2.036 2H17c3 0 3-1.983 3-1.983V4c0-2-1.906-2-1.906-2zM10 12c-1.933 0-3.5-1.567-3.5-3.5S8.067 5 10 5s3.5 1.567 3.5 3.5S11.933 12 10 12zm0 1.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm7.5-8c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"></path></g></svg>上传封面图片</button>
						</div>
						<input type="file" id="cover-upload" accept="image/png;image/jpeg" style="display: none;">
					</div>
				</div>
				<div class="edit-main" v-show="user">
					<div v-show="user">
						<div class="userAvatarEditor" @click="selectFile">
							<div class="userAvatar" v-if="user.avatar"><img :src="base+user.avatar" id="avatar-img" width="160" height="160"></div>
							<div class="userAvatarMask"><div class="Mask-mask"></div><div class="Mask-content">
								<svg fill="#fff" viewBox="0 0 24 24" width="36" height="36" style="margin-bottom: 14px;"><path d="M20.094 6S22 6 22 8v10.017S22 20 19 20H4.036S2 20 2 18V7.967S2 6 4 6h3s1-2 2-2h6c1 0 2 2 2 2h3.094zM12 16a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0 1.5a5 5 0 1 0-.001-10.001A5 5 0 0 0 12 17.5zm7.5-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg><div style="white-space: nowrap;">修改我的头像</div>
							</div></div>
							<input type="file" name="avatar" id="avatar-upload" accept="image/png,image/jpeg" style="display: none;">
						</div>
					</div>
					<div class="header-content">
						<div class="contentHeader">
							<h1 class="title" v-show="!modifyUsername"><span class="header-name">{{temp.username}}</span>
								<button class="modify-username" @click.stop="modifyUsername=!modifyUsername">
							<svg viewBox="0 0 12 12" width="12" height="16" 
							style="margin-right: 4px;" fill="currentColor">
								<title></title><g><path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"></path></g>
							</svg>修改</button>
							</h1>
							<div class="modify-username-wrapper" v-show="modifyUsername">
								<div class="Field-input-wrapper">
										<input type="text" placeholder="新的用户名" v-model="temp.username">
									</div>
									<div class="ButtonGroup" style="display: inline-block; margin-left: 24px; margin-top: 0;">
										<button type="submit" class="button-blue save" 
										@click.stop="saveName">保存</button>
										<button type="button" class="button-grey" style="margin-left: 16px;" 
										@click.stop="temp.username=user.username">取消</button>
									</div>
								</div>
								
								<div class="actions"><a class="headerBtn" @click.stop.prevent="toMyDetail">返回我的主页<svg viewBox="0 0 10 6" width="10" height="16" style="margin: 0 4px 0 8px transform: rotate(-90deg); vertical-align: text-bottom;" fill="currentColor"></svg></a></div>
							</div>
						<div class="fields" v-if="user.info">
							<form class="Field">
								<h3 class="Field-label">性别</h3>
								<div class="Field-content" >
									<div>
										<span class="Field-text">{{temp.info.gender==0?'未知':temp.info.gender==1?'男':'女'}}</span>
										<button class="Field-modify">
											<svg viewBox="0 0 12 12" width="12" height="16" 
											style="margin-right: 4px;" fill="currentColor">
												<title></title><g><path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"></path></g>
											</svg>修改</button>
									</div>
									<div style="display: none;">
										<div>
											<input type="radio" id="male" value="1" v-model="temp.info.gender" >男
											<input type="radio" id="famale" value="2" name="gender" v-model="temp.info.gender" style="margin-left: 30px;">女
										</div>
										<div class="ButtonGroup">
											<button type="submit" class="button-blue save" @click.stop="user.info.gender=temp.info.gender">保存</button>
											<button type="button" class="button-grey" style="margin-left: 16px;'" @click.stop="temp.info.gender=user.info.gender">取消</button>
										</div>
									</div>
								</div>
							</form>
							<form class="Field">
								<h3 class="Field-label">一句话介绍自己</h3>
								<div class="Field-content">
									<div>
										<span class="Field-text">{{temp.info.intro}}</span>
										<button class="Field-modify">
											<svg viewBox="0 0 12 12" width="12" height="16" 
											style="margin-right: 4px;" fill="currentColor">
												<title></title><g><path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"></path></g>
											</svg>修改</button>
									</div>
									<div style="display: none;">
										<div class="Field-input-wrapper">
											<input type="text" v-model="temp.info.intro">
										</div>
										<div class="ButtonGroup" style="display: inline-block; margin-left: 24px; margin-top: 0;">
											<button type="submit" class="button-blue save" 
											@click.stop="user.info.intro=temp.info.intro">保存</button>
											<button type="button" class="button-grey" style="margin-left: 16px;'" 
											@click.stop="temp.info.intro=user.info.intro">取消</button>
										</div>
									</div>
								</div>
							</form>
							<form class="Field">
								<h3 class="Field-label">居住地</h3>
								<div class="Field-content">	
									<span class="Field-text">{{temp.info.place}}</span>
									<div>
										<div class="AddButton">
											<button type="button" class="button-link"><svg viewBox="0 0 18 18" width="20" height="20" fill="#0084ff" style="vertical-align: -4px;margin-right: 6px;"><title></title><g><g><path d="M6.035 16.433c-.875-.35-1.678-.848-2.383-1.482-.205-.184-.52-.167-.707.04-.185.204-.167.52.038.705.794.714 1.696 1.274 2.682 1.668.06.023.123.035.185.035.198 0 .386-.12.464-.314.103-.258-.022-.55-.28-.65zM1.097 10.247C1.054 9.975.8 9.79.525 9.83c-.273.043-.46.3-.417.57.154.98.467 1.925.93 2.803.09.17.264.267.443.267.08 0 .16-.02.234-.058.244-.13.338-.432.208-.676-.41-.78-.69-1.618-.825-2.49zM9.106 1c.95.014 1.878.19 2.76.528.058.022.118.033.178.033.2 0 .39-.12.467-.32.1-.258-.03-.547-.287-.646C11.233.214 10.19.014 9.12 0h-.007c-.273 0-.496.22-.5.493-.003.278.218.504.493.508zM3.73 2.83c.108 0 .218-.034.31-.107.693-.55 1.465-.976 2.295-1.27.26-.09.397-.377.305-.637C6.548.556 6.263.42 6.002.51 5.068.84 4.2 1.323 3.42 1.94c-.217.17-.254.485-.083.702.1.124.245.19.393.19zM2.01 4.136c-.236-.144-.544-.07-.688.165-.557.91-.945 1.9-1.15 2.944-.055.27.12.534.392.587.033.008.065.01.098.01.234 0 .443-.164.49-.402.184-.927.528-1.807 1.023-2.614.144-.236.07-.543-.165-.688zM14.927 2.228c-.207-.183-.523-.162-.705.047-.182.208-.16.523.047.706.664.583 1.224 1.265 1.665 2.028.092.16.26.25.433.25.085 0 .17-.02.25-.067.24-.137.32-.443.183-.682-.495-.86-1.125-1.626-1.873-2.28zM17.294 7.07c-.27.047-.454.306-.408.578.076.44.114.896.114 1.35 0 .493-.046.984-.133 1.46-.05.27.13.532.402.582.03.005.06.008.09.008.236 0 .446-.17.49-.41.1-.534.148-1.085.15-1.638 0-.513-.044-1.025-.13-1.52-.045-.273-.303-.457-.576-.41zM16.566 12.91c-.235-.14-.544-.065-.686.174-.452.76-1.02 1.434-1.692 2.005-.21.18-.235.494-.057.704.1.116.24.176.382.176.115 0 .23-.04.324-.12.754-.643 1.395-1.4 1.903-2.254.142-.238.064-.544-.174-.686zM11.766 16.51c-.884.325-1.814.49-2.772.49l-.208-.002c-.283-.02-.505.21-.513.487-.007.275.21.506.487.513L9 18c1.07 0 2.116-.186 3.11-.553.26-.095.393-.383.297-.642-.095-.26-.385-.392-.64-.295zM9.8 8.2V6.3c0-.442-.358-.8-.8-.8-.442 0-.8.358-.8.8v1.9H6.3c-.442 0-.8.358-.8.8 0 .442.358.8.8.8h1.9v1.9c0 .442.358.8.8.8.442 0 .8-.358.8-.8V9.8h1.9c.442 0 .8-.358.8-.8 0-.442-.358-.8-.8-.8H9.8z"></path></g></g></svg>添加居住地</button>
										</div>
									</div>
									<div style="display: none;">
										<div class="Field-autoComplete" style="display: inline-block; position: relative;">
											<div class="Field-input-wrapper">
												<input type="text" placeholder="添加居住地" v-model="temp.info.place">
											</div>
										</div>
										<div class="ButtonGroup" style="display: inline-block; margin-left: 24px; margin-top: 0;"><button type="submit" class="button-blue save" @click.stop="user.info.place=temp.info.place">保存</button>
											<button type="button" class="button-grey" style="margin-left: 16px;'"
											@click.stop="temp.info.place=user.info.place">取消</button>
										</div>
									</div>	
								</div>
							</form>
							<form class="Field">
								<h3 class="Field-label">所在行业</h3>
								<div class="Field-content">
									<div>
										<span class="Field-text industry">{{temp.info.industry?temp.info.industry:'暂无'}}</span>
										<button class="Field-modify">
											<svg viewBox="0 0 12 12" width="12" height="16" 
											style="margin-right: 4px;" fill="currentColor">
												<title></title><g><path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"></path></g>
											</svg>修改</button>
									</div>
									<div style="display: none;">
										<div class="Popover">
											<button class="button-select" @click.stop.prevent="selectIndustry">{{temp.info.industry?temp.info.industry:'请选择'}}<span style="display: inline-block; align-items: center;"><svg viewBox="0 0 24 24" width="24" height="24" style="margin-left: 8px; position: relative; top: 6px; right: 0px;" fill="currentColor">&8203;<path d="M12 16.183l2.716-2.966a.757.757 0 0 1 1.064.001.738.738 0 0 1 0 1.052l-3.247 3.512a.758.758 0 0 1-1.064 0L8.22 14.27a.738.738 0 0 1 0-1.052.758.758 0 0 1 1.063 0L12 16.183zm0-9.365L9.284 9.782a.758.758 0 0 1-1.064 0 .738.738 0 0 1 0-1.052l3.248-3.512a.758.758 0 0 1 1.065 0L15.78 8.73a.738.738 0 0 1 0 1.052.757.757 0 0 1-1.063.001L12 6.818z"></path></svg></span></button>
										</div>
										<div class="ButtonGroup">
											<button type="submit" class="button-blue save" 
											@click.stop="user.info.industry=temp.info.industry">保存</button>
											<button type="button" class="button-grey" style="margin-left: 16px;'"
											@click.stop="temp.info.industry=user.info.industry">取消</button>
										</div>
									</div>
								</div>
							</form>
							<form class="Field">
								<h3 class="Field-label">职业经历</h3>
								<div class="Field-content">
									<div class="Field-text">{{temp.info.c_experience}}</div>
									<div>
										<div class="AddButton">
										<button type="button" class="button-link"><svg viewBox="0 0 18 18" width="20" height="20" fill="#0084ff" style="vertical-align: -4px;margin-right: 6px;"><title></title><g><g><path d="M6.035 16.433c-.875-.35-1.678-.848-2.383-1.482-.205-.184-.52-.167-.707.04-.185.204-.167.52.038.705.794.714 1.696 1.274 2.682 1.668.06.023.123.035.185.035.198 0 .386-.12.464-.314.103-.258-.022-.55-.28-.65zM1.097 10.247C1.054 9.975.8 9.79.525 9.83c-.273.043-.46.3-.417.57.154.98.467 1.925.93 2.803.09.17.264.267.443.267.08 0 .16-.02.234-.058.244-.13.338-.432.208-.676-.41-.78-.69-1.618-.825-2.49zM9.106 1c.95.014 1.878.19 2.76.528.058.022.118.033.178.033.2 0 .39-.12.467-.32.1-.258-.03-.547-.287-.646C11.233.214 10.19.014 9.12 0h-.007c-.273 0-.496.22-.5.493-.003.278.218.504.493.508zM3.73 2.83c.108 0 .218-.034.31-.107.693-.55 1.465-.976 2.295-1.27.26-.09.397-.377.305-.637C6.548.556 6.263.42 6.002.51 5.068.84 4.2 1.323 3.42 1.94c-.217.17-.254.485-.083.702.1.124.245.19.393.19zM2.01 4.136c-.236-.144-.544-.07-.688.165-.557.91-.945 1.9-1.15 2.944-.055.27.12.534.392.587.033.008.065.01.098.01.234 0 .443-.164.49-.402.184-.927.528-1.807 1.023-2.614.144-.236.07-.543-.165-.688zM14.927 2.228c-.207-.183-.523-.162-.705.047-.182.208-.16.523.047.706.664.583 1.224 1.265 1.665 2.028.092.16.26.25.433.25.085 0 .17-.02.25-.067.24-.137.32-.443.183-.682-.495-.86-1.125-1.626-1.873-2.28zM17.294 7.07c-.27.047-.454.306-.408.578.076.44.114.896.114 1.35 0 .493-.046.984-.133 1.46-.05.27.13.532.402.582.03.005.06.008.09.008.236 0 .446-.17.49-.41.1-.534.148-1.085.15-1.638 0-.513-.044-1.025-.13-1.52-.045-.273-.303-.457-.576-.41zM16.566 12.91c-.235-.14-.544-.065-.686.174-.452.76-1.02 1.434-1.692 2.005-.21.18-.235.494-.057.704.1.116.24.176.382.176.115 0 .23-.04.324-.12.754-.643 1.395-1.4 1.903-2.254.142-.238.064-.544-.174-.686zM11.766 16.51c-.884.325-1.814.49-2.772.49l-.208-.002c-.283-.02-.505.21-.513.487-.007.275.21.506.487.513L9 18c1.07 0 2.116-.186 3.11-.553.26-.095.393-.383.297-.642-.095-.26-.385-.392-.64-.295zM9.8 8.2V6.3c0-.442-.358-.8-.8-.8-.442 0-.8.358-.8.8v1.9H6.3c-.442 0-.8.358-.8.8 0 .442.358.8.8.8h1.9v1.9c0 .442.358.8.8.8.442 0 .8-.358.8-.8V9.8h1.9c.442 0 .8-.358.8-.8 0-.442-.358-.8-.8-.8H9.8z"></path></g></g></svg>添加职业经历</button>
										</div>
									</div>
									<div style="display: none;">
										<div class="Field-autoComplete" style="display: inline-block; position: relative;">
											<div class="Field-input-wrapper">
												<input type="text" placeholder="公司或组织名称" v-model="temp.info.c_experience">
											</div>
										</div>
										<!-- <div class="Field-autoComplete" style="display: inline-block; position: relative; margin-left: 16px;">
											<div class="Field-input-wrapper">
												<input type="text" placeholder="你的职位(选填)" v-model="c_experience_last">
											</div>
										</div> -->
										<div class="ButtonGroup" style="display: inline-block; margin-left: 24px; margin-top: 0;">
											<button type="submit" class="button-blue save" 
											@click.stop="user.info.c_experience=temp.info.c_experience">保存</button>
											<button type="button" class="button-grey" style="margin-left: 16px;'"
											@click.stop="temp.info.c_experience=user.info.c_experience">取消</button>
										</div>
									</div>
								</div>
							</form>
							<form class="Field">
								<h3 class="Field-label">教育经历</h3>
								<div class="Field-content">
									<div class="Field-text">{{temp.info.e_experience}}</div>
									<div>
										<div class="AddButton">
										<button type="button" class="button-link"><svg viewBox="0 0 18 18" width="20" height="20" fill="#0084ff" style="vertical-align: -4px;margin-right: 6px;"><title></title><g><g><path d="M6.035 16.433c-.875-.35-1.678-.848-2.383-1.482-.205-.184-.52-.167-.707.04-.185.204-.167.52.038.705.794.714 1.696 1.274 2.682 1.668.06.023.123.035.185.035.198 0 .386-.12.464-.314.103-.258-.022-.55-.28-.65zM1.097 10.247C1.054 9.975.8 9.79.525 9.83c-.273.043-.46.3-.417.57.154.98.467 1.925.93 2.803.09.17.264.267.443.267.08 0 .16-.02.234-.058.244-.13.338-.432.208-.676-.41-.78-.69-1.618-.825-2.49zM9.106 1c.95.014 1.878.19 2.76.528.058.022.118.033.178.033.2 0 .39-.12.467-.32.1-.258-.03-.547-.287-.646C11.233.214 10.19.014 9.12 0h-.007c-.273 0-.496.22-.5.493-.003.278.218.504.493.508zM3.73 2.83c.108 0 .218-.034.31-.107.693-.55 1.465-.976 2.295-1.27.26-.09.397-.377.305-.637C6.548.556 6.263.42 6.002.51 5.068.84 4.2 1.323 3.42 1.94c-.217.17-.254.485-.083.702.1.124.245.19.393.19zM2.01 4.136c-.236-.144-.544-.07-.688.165-.557.91-.945 1.9-1.15 2.944-.055.27.12.534.392.587.033.008.065.01.098.01.234 0 .443-.164.49-.402.184-.927.528-1.807 1.023-2.614.144-.236.07-.543-.165-.688zM14.927 2.228c-.207-.183-.523-.162-.705.047-.182.208-.16.523.047.706.664.583 1.224 1.265 1.665 2.028.092.16.26.25.433.25.085 0 .17-.02.25-.067.24-.137.32-.443.183-.682-.495-.86-1.125-1.626-1.873-2.28zM17.294 7.07c-.27.047-.454.306-.408.578.076.44.114.896.114 1.35 0 .493-.046.984-.133 1.46-.05.27.13.532.402.582.03.005.06.008.09.008.236 0 .446-.17.49-.41.1-.534.148-1.085.15-1.638 0-.513-.044-1.025-.13-1.52-.045-.273-.303-.457-.576-.41zM16.566 12.91c-.235-.14-.544-.065-.686.174-.452.76-1.02 1.434-1.692 2.005-.21.18-.235.494-.057.704.1.116.24.176.382.176.115 0 .23-.04.324-.12.754-.643 1.395-1.4 1.903-2.254.142-.238.064-.544-.174-.686zM11.766 16.51c-.884.325-1.814.49-2.772.49l-.208-.002c-.283-.02-.505.21-.513.487-.007.275.21.506.487.513L9 18c1.07 0 2.116-.186 3.11-.553.26-.095.393-.383.297-.642-.095-.26-.385-.392-.64-.295zM9.8 8.2V6.3c0-.442-.358-.8-.8-.8-.442 0-.8.358-.8.8v1.9H6.3c-.442 0-.8.358-.8.8 0 .442.358.8.8.8h1.9v1.9c0 .442.358.8.8.8.442 0 .8-.358.8-.8V9.8h1.9c.442 0 .8-.358.8-.8 0-.442-.358-.8-.8-.8H9.8z"></path></g></g></svg>添加教育经历</button>
									</div>
									</div>
									<div style="display: none;">
										<div class="Field-autoComplete" style="display: inline-block; position: relative;">
											<div class="Field-input-wrapper">
												<input type="text" placeholder="学校或机构名称" v-model="temp.info.e_experience">
											</div>
										</div>
										<!-- <div class="Field-autoComplete" style="display: inline-block; position: relative; margin-left: 16px;">
											<div class="Field-input-wrapper">
												<input type="text" placeholder="专业方向(选填)" v-model="e_experience_last">
											</div>
										</div> -->
										<div class="ButtonGroup" style="display: inline-block; margin-left: 24px; margin-top: 0;">
											<button type="submit" class="button-blue save" 
											@click.stop="user.info.e_experience=temp.info.e_experience">保存</button>
											<button type="button" class="button-grey" style="margin-left: 16px;"
											@click.stop="temp.info.e_experience=user.info.e_experience">取消</button>
										</div>
									</div>
								</div>
							</form>
							<form class="Field">
								<h3 class="Field-label">个人简介</h3>
								<div class="Field-content">
									<div class="Field-text"></div>
									<div>
										<textarea class="textArea" ref="introduction" v-model="temp.info.introduction"></textarea>
										<div class="ButtonGroup">
											<button type="submit" class="button-blue submit save" 
											@click.stop.prevent="user.info.introduction=temp.info.introduction">保存</button>
											<button type="button" class="button-grey" style="margin-left: 16px;" 
											@click.stop.prevent="temp.info.introduction=user.info.introduction">取消</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div>
					<div class="select-content">
						<div class="select-list">
							<div class="select-option">高新科技</div>
							<div class="select-option">互联网</div>
							<div class="select-option">信息传媒</div>
							<div class="select-option">金融</div>
							<div class="select-option">服务业</div>
							<div class="select-option">教育</div>
							<div class="select-option">医疗服务</div>
							<div class="select-option">艺术娱乐</div>
							<div class="select-option">地产建筑</div>
							<div class="select-option">贸易零售</div>
							<div class="select-option">公共服务</div>
							<div class="select-option">开采治金</div>
							<div class="select-option">交通仓储</div>
							<div class="select-option">农林牧渔</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapMutations,mapActions} from 'vuex';
import {makeExpandingArea} from 'common/js/common.js';
import {communicationMixin} from 'common/js/mixin'
import {copyObj} from 'common/js/util'
import axios from 'axios'
 	export default {
 		mixins: [communicationMixin],
		data() {
			return {
				temp : {
					info: {
						gender: 0
					}
				},
				user : {
					info: {
						gender: 0
					}
				},
				modifyUsername: false,
				img_size: 0,
				base: '../../../../../static/avatar/160/',
			}
		},
		methods: {
			selectIndustry() {
				$('.select-content').show();
			},
			initClick() {
				$('.Field-modify').each((index,el)=> {
					var me = $(el)
					me.on('click',(e)=> {
						// 阻止默认行为
						this.stopPrevent(e)
						me.parent().hide();
						me.parent().siblings().show();
						me.siblings('.Field-text').hide();
					})
				})
				$('.ButtonGroup:not(:last)').children('button').each((index,el)=> {
					var me = $(el)
					me.on('click',(e) => {
						this.stopPrevent(e)
						me.parent().parent().hide();
						me.parent().parent().siblings().show();
						me.parent().parent().siblings('div').children('.Field-text').show();
						me.parent().parent().siblings('.Field-text').show();
					})
				})
				$('.AddButton').each((index,el)=> {
					var me = $(el)
					me.on('click',(e) => {
						this.stopPrevent(e)
						me.parent().siblings('div').show()
						me.parent().siblings('.Field-text').hide()
					})
				})
				$('.select-option').each((index,el) => {
					var me = $(el)
					me.on('click',(e)=> {
						this.stopPrevent(e)
						$('.select-content').hide();
						$('.industry').show();
						this.temp.info.industry = $(e.target).text()
					})
				})
				$('.save').each((index,el)=> {
					let me = $(el)
					me.on('click',(e)=> {
						this.saveInfo()
					})
				})
				this.img_size = $('#avatar-img').attr('width')
				// 刷新浏览器和关闭浏览器时的钩子
				window.onbeforeunload = function(e){
			     	
			    };
				
			},
			saveName() {
				this.modifyUsername=!this.modifyUsername
				this.user.username=this.temp.username
			},	
			saveInfo() {
				axios.post('/user/saveInfo',{
					user: this.user
				})
			},
			stopPrevent(e) {
				// 阻止冒泡和默认行为
				e.stopPropagation();
				e.preventDefault()
			},
			initData() {
				// 获取用户信息
				axios.post('/user/getNowUserInfo')
					 .then((res) => {
						this.user = res.data.result
						this.temp = copyObj(res.data.result)
					 })
			},
			toMyDetail() {
				var params = {
					user_url: this.user._id
				}
				this.setUse(this.user)
				this.$router.push({name: 'people_url',params:params}) 
			},
			selectFile() {
				$('#avatar-upload').click();
			},
			onchangeUpload() {
				$('#avatar-upload').on('change',()=> {
					// 选择文件后上传
					this.ajaxUpload()
				})
			},
			ajaxUpload() {
				var me = this;
				$.ajaxFileUpload({  
				    type: "POST",  
				    url: "/user/setAvatar",  
				    //要传到后台的参数，没有可以不写  
				    data:{avatar_size: this.img_size,username: this.user.username,_id: this.user._id},
				    secureuri : false,//是否启用安全提交，默认为false  
				    fileElementId:'avatar-upload',//文件选择框的id属性  
				    dataType: 'json',//服务器返回的格式  
				    async : true,  
				    contentType: 'multipart/form-data',
				    success: function(data){  
				      if (data.status) {
				      	alert('头像设置失败')
				      }
				      // 已成功上传头像，去切图页面
				      // 路径 C:\zhihu\static\avatar\160\匿名用户5aec0.jpg
				      var path = data.result.path
				      // 修改路径 为 '../../static/avatar/160/匿名用户5aec0.jpg'
				      var newPath = path.replace(/\\/g, '/').replace('C:/zhihu/','../../');
				      me.$router.push({name: 'cut',params: {path: newPath,user_url: me.user._id}})
				    },  
				    error: function (data, status, e){  
				       
				   	},
				   	complete: ()=> {
				   		// 内部递归解决change只触发一次的bug
					 	$("#avatar-upload").replaceWith('<input type="file" name="avatar" id="avatar-upload" accept="image/png,image/jpeg" style="display: none;">') 
				   		$('#avatar-upload').on('change',(e)=> {
							this.ajaxUpload()
						}) 
					}
				});
			},
			cutOver() {
				communicationMixin.$on('cutOver',(newPath)=> {
					this.user.avatar = newPath
					this.setUserAttributes([{key: 'avatar',value: newPath}])
				})
			},
			...mapMutations({
				setCutAvatarMask: 'SET_CUT_AVATAR_MASK',
				setUse: 'SET_USER',
				setUserAttributes: 'SET_USER_ATTRIBUTES'
			}),
		},
		created() {
			this.initData();
			this.cutOver()
		},
		mounted() {
			this.initClick()
			this.onchangeUpload()
			this.$nextTick().then(()=> {
				makeExpandingArea(this.$refs.introduction);
			})
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	[v-cloak] {
	    display: none !important;
	}
	@import url('../cpLess/edit.less');
</style>
