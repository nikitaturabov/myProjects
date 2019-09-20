import Vue from 'vue'
import App from './App.vue'
import 'es6-promise/auto';
import Vuex from 'vuex';
import axios from 'axios';
import Router from 'vue-router'

import Login from './components/Login.vue';

Vue.use(Vuex);
Vue.use(Router)

Vue.config.productionTip = false

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

var store = new Vuex.Store({

  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
  },

  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },

  mutations: {
    ['AUTH_REQUEST']: (state) => {
      state.status = 'loading'
    },
    ['AUTH_SUCCESS']: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    ['AUTH_ERROR']: (state) => {
      state.status = 'error'
    },
  },


  actions: {
    ['AUTH_REQUEST']: ({commit, dispatch}, user) => {

      
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line 
      console.log(resolve, reject)
          commit('AUTH_REQUEST')
          axios({
            url: 'https://tech.uff4u.com:8443/TS4/amanager/hs/auth/token',
             data: user, 
             method: 'GET' })


          .then(resp => {
              const token = resp.data.token
              
              localStorage.setItem('user-token', token)
              // Add the following line:
              axios.defaults.headers.common['Acces-Control-Allow-Origin'] = '*';
              commit('AUTH_SUCCESS', resp)
              dispatch('USER_REQUEST')
              resolve(resp)
          })


          .catch(err => {
              commit('AUTH_ERROR', err)
              localStorage.removeItem('user-token')
              reject(err)
          })
      })
    },
  },
})

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { 
          guest: true
      }
    }
  ]
})

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
