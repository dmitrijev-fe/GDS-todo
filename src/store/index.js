import { createStore } from 'vuex'

export default createStore({
  state: {
    list: JSON.parse(localStorage.getItem('dataBase')) ?? []
  },
  getters: {
    list: state => state.list,
  },
  mutations: {
    SET_LIST: (state, data) => {
      state.list.push(data)
    },
    SET_RM_ITEM: (state, index) => {
      state.list.splice(index, 1)
    },
    SET_LOCALSTORAGE: (state) => {
      localStorage.setItem('dataBase', JSON.stringify(state.list))
    },
    SET_CHECK: (state, index) => {
      state.list[index].done = !state.list[index].done
    },
    SET_CLEAR_COMPLEATE: (state) => {
      const array = state.list.filter(item => !item.done)
      state.list = array ?? []
    }
  },
  actions: {
    addToList({ commit }, payload) {
      commit('SET_LIST', payload)
      commit('SET_LOCALSTORAGE')
    },
    removeItem({ commit }, payload) {
      commit('SET_RM_ITEM', payload)
      commit('SET_LOCALSTORAGE')
    },
    checkItem({ commit }, payload) {
      commit('SET_CHECK', payload)
      commit('SET_LOCALSTORAGE')
    },
    clearCompleate({commit}) {
      commit('SET_CLEAR_COMPLEATE')
      commit('SET_LOCALSTORAGE')
    }
  }
})
