import Vue from "vue";
import Vuex from "vuex";
import 'babel-polyfill'
Vue.use(Vuex)
import actions from './module.js/actions'
import state from './module.js/state'
import mutations from './module.js/mutations';
import getters from './module.js/getters'
Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  state,
  mutations,
  getters
});
