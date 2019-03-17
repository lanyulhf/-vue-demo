import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex)
const state = {
  userInfo: '',
  login: '',
  geohash: '',
  latitude: '',
  longitude: ''
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
