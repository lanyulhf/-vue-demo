import {
  RECORD_USERINFO,
  GET_USERINFO,
  SAVE_GEOHASH,
  RECORD_ADDRESS
} from './mutations-type'
import {
  setStorage,
  getStorage,
  removeStorage
} from '../config/comutils'
// 记录用户信息
export default{
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    setStorage('user_id', info.user_id)
  },
  // 获取用户信息存入vuex
  [GET_USERINFO] (state, info) {
    // if (state.userInfo && (state.userInfo.username !== info.username)) {
    //   return
    // };
    // if (!state.login) {
    //   return
    // }
    // if (!info.message) {
    //   state.userInfo = { ...info
    //   }
    // } else {
    //   state.userInfo = null
    // }
  },
  [SAVE_GEOHASH] (state, geohash) {
    state.geohash = geohash
  },
  // 记录当前经度纬度
  [RECORD_ADDRESS] (state, {
    latitude,
    longitude
  }) {
    state.latitude = latitude
    state.longitude = longitude
  }
}
