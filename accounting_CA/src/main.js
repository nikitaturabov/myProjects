if (!Element.prototype.closest) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || function matches(selector) {
    var element = this;
    var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
    var index = 0;

    while (elements[index] && elements[index] !== element) {
      ++index;
    }

    return Boolean(elements[index]);
  };

  Element.prototype.closest = function(css) {
    var node = this;

    while (node) {
      if (node.matches(css)) return node;
      else node = node.parentElement;
    }
    return null;
  };
}

import Vue from 'Vue';
import App from './App.vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
Vue.use(Vuex);
import AmCharts from '../../../libs/amCharts/amcharts';
import AmSerial from '../../../libs/amCharts/serial';
import AmPieChart from '../../../libs/amCharts/pie';
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
  return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
}

window.store = new Vuex.Store({
  state: {
    data: window.dataJSON,
  },
  mutations: {
    setData(state, data) {
      Vue.set(state, 'data', data)
    },
  },
  getters: {
    getData: state => {
      return state.data;
    }
  }
})

window.app = new Vue({
  el: '.accounting',
  store,
  render: h => h(App),
  components: {
    App
  }
})