
import { _getToken,_get } from 'common/js/cookie'

// vuex的数据刷新页面后会丢失
const state = {
	put_question_mask: false,
	write_idea_mask: false,
	index_dropdown: false,
	form_type: 0,					//0: 注册 1:登录
	people_dropup: false,
	user: {},
	question_user: {},
	token: _getToken()||'',
	cut_avatar_mask: false,
	add_answer_status: false,
	conversation_mask: false,
	attention_question_modal: false
}

export default state;