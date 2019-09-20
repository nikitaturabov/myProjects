import Vue from 'Vue';
import App from './App.vue';
import Benchmarks from './Benchmarks.vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
Vue.use(Vuex);
// import Notifications from 'vue-notification';
// Vue.use(Notifications);


Vue.directive('gap-between-num',
  function(el, binding) {
    el.innerHTML = GapBetweenNum(binding.value.num)
  })

window.GapBetweenNum = function(value) {
  return value.toString().replace(/.+?(?=\D|$)/, function(f) {
    return f.replace(/(\d)(?=(?:\d\d\d)+$)/g, "$1 ")
  })
}

Vue.directive('inclined-word',
  function(el, binding) {
    el.innerHTML = InclinedWord(binding.value.number, binding.value.titles)
  })

window.InclinedWord = function(num, titles) {
  let cases = [2, 0, 1, 1, 1, 2];
  let moduleNum = Math.abs(num);
  return titles[(moduleNum % 100 > 4 && moduleNum % 100 < 20) ? 2 : cases[(moduleNum % 10 < 5) ? moduleNum % 10 : 5]];
}

window.store = new Vuex.Store({
  state: {
    data: window.dataJSON,
  },
  mutations: {
    setDataBanner(state, data) {
      Vue.set(state, 'data', data)
    },
  },
  getters: {
    getDataBanner: state => {
      return state.data;
    }
  }
})

if (document.querySelector('.banners')){
  window.app = new Vue({
    el: '.banners',
    store,
    render: h => h(App),
    components: {
      App
    }
  })
}

if (document.querySelector('.benchmarks')){
  window.benchmarks = new Vue({
    el: '.benchmarks',
    store,
    render: h => h(Benchmarks),
    components:{
      Benchmarks
    }
  })
}