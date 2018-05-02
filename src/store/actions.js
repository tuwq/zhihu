import * as types from './mutation-types'
import {shuffle} from 'common/js/util'


function findIndex(list, target) {
  return list.findIndex((item) => {
    return item.id === target.id
  })
}




