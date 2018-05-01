import * as types from './mutation-types'
import {shuffle} from 'common/js/util'
import { _saveToken } from 'common/js/cache'

function findIndex(list, target) {
  return list.findIndex((item) => {
    return item.id === target.id
  })
}

export const saveToken = function ({commit}, token) {
  commit(types.SET_TOKEN, _saveToken(token))
}



