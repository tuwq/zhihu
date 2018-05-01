import * as types from './mutation-types'

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
		state.token = token
	}
}
export default mutations