import { createStore } from 'vuex'
import  createPersistedState  from  'vuex-persistedstate'

export default createStore({
  state: {
    username: null,
    auth: null,
    reload: 0
  },
  getters: {
  },
  mutations: {
    doLogin(state, username) {
        state.auth = true;
        state.username = username;
      },
      doLogout(state) {
        state.auth = false;
        state.username = null;
      },
      reload(state){
        state.reload = 1
      },
      unreload(state){
        state.reload = 0
      }
  },
  actions: {
    doLogin({ commit }, username) {
        commit("doLogin", username);
    },
    doLogout({ commit }) {
        commit("doLogout");
    },
    reload({ commit }) {
      commit("reload");
    },
    unreload({ commit }) {
      commit("unreload");
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})