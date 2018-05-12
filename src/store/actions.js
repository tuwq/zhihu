import * as types from './mutation-types'
import {shuffle,copyArr} from 'common/js/util'


function findIndex(list, target) {
  return list.findIndex((item) => {
    return item.id === target.id
  })
}

export const incrCount = function ({commit, state}, {list, index}) {
  // 在指定的下标回答下增加一个评论数
  // vuex的值不允许直接更改，所以决定深拷贝一份重新放
  let _newList = copyArr(list)
  let item = _newList[index]
  item.cCount++; 
  commit(types.SET_ANSWERS, _newList)
}




