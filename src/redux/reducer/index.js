/**
 * Reducer数据处理
 * */

import { type } from '../action'

const initialState = {
  menuName: '首页'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case type.SWITCH_MENU:
      // 这里他会做自动覆盖key
      return {
        ...state,
        menuName: action.menuName
      }
    default:
      return { ...state };
  }
}