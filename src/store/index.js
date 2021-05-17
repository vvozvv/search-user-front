import { createStore } from 'vuex'
import env from '../config/env'
import axios from 'axios'

export default createStore({
  state: {
    users: [],
    findUser: [],
    textType: null,
    text: null,
  },
  mutations: {
    SET_USERS: (state, payload) => {
      state.users = payload
    },
    SET_USER_FOUND: (state, payload) => {
      const { userList, text, textType } = payload
      state.findUser = userList
      state.textType = textType
      state.text = text
    },
  },
  actions: {
    async getUser({ commit }) {
      let response = await axios.get(`${env.API_URL}/people`)
      commit('SET_USERS', response.data)
    },
    async seachUser({ commit }, response) {
      const { type, text, textType } = response
      let userList = await axios.get(`${env.API_URL}/people`).then((res) => res.data)
      userList = userList.filter((item) => {
        let clearText = (type == 'name' || type == 'username') ? text.replace(/[^A-Za-zА-Яа-яЁё]/g, '').toLowerCase() : text
        return item[type].toLowerCase().indexOf(clearText) != -1
      })
      commit('SET_USER_FOUND', { userList, text, textType })
    }
  },
  getters: {
    users: (state) => state.users,
    findUsers: (state) => state.findUser,
    textType: (state) => state.textType,
    text: (state) => state.text,
  },
});
