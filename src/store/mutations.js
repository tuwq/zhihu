import * as types from './mutation-types'
import { _setToken,_removeToken,_set } from 'common/js/cookie'

const mutations = {
	[types.SET_PUT_QUESTION_MASK](state,isDispaly) {
		state.put_question_mask = isDispaly;
	},
	[types.SET_WRITE_IDEA_MASK](state,isDispaly) {
		state.write_idea_mask = isDispaly;
	},
	[types.SET_INDEX_DROPDOWN](state,isDispaly) {
		state.index_dropdown = isDispaly;
	},
	[types.SET_FORM_TYPE](state,type) {
		state.form_type = type;
	},
	[types.SET_PEOPLE_DROPUP](state,isDispaly) {
		state.people_dropup = isDispaly
	},
	[types.SET_TOKEN](state,token) {
		state.token = _setToken(token)
	},
	[types.REMOVE_TOKEN](state) {
		state.token = _removeToken()
	},
	[types.SET_USER](state,user) {
		state.user = user
	},
	[types.SET_CUT_AVATAR_MASK](state,isDispaly) {
		state.cut_avatar_mask = isDispaly
	},
	[types.SET_QUESTION](state,question) {
		state.question = question
	},
	[types.SET_ADD_ANSWER_STATUS](state,isDispaly) {
		state.add_answer_status = isDispaly
	},
	[types.SET_ANSWERS](state,answers) {
		state.answers = answers
	},
	[types.SET_CONVERSATION_MASK](state,isDispaly) {
		state.conversation_mask = isDispaly
	},
	[types.SET_ATTENTION_QUESTION_MODAL] (state,isDispaly) {
		state.attention_question_modal = isDispaly
	}
}
export default mutations