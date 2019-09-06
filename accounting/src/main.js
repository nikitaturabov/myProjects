ExceptionIE();

import Vue from 'Vue';
import App from './App.vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
Vue.use(Vuex);
import AmCharts from '../../../libs/amCharts/amcharts';
import AmSerial from '../../../libs/amCharts/serial';
import AmPieChart from '../../../libs/amCharts/pie';
import VAnimateCss from 'v-animate-css';
Vue.use(VAnimateCss);
// import Notifications from 'vue-notification';
// Vue.use(Notifications);

Vue.directive('scrollbar', {
  inserted(el, binding) {
    var scrollbar = el.children[1];
    var scroll = scrollbar.children[0];
    var list = el.children[0];
    setScroll(scrollbar, scroll, list)
  }
})

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

Vue.directive('scrollbar-update', {
  componentUpdated(el, binding) {
    var scrollbar = el.children[1];
    var scroll = scrollbar.children[0];
    var list = el.children[0];

    setScroll(scrollbar, scroll, list);

  }
})

function ExceptionIE() {
  if(!Element.prototype.closest) {
    Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.webkitMatchesSelector||function matches(selector) {
      var element=this;
      var elements=(element.document||element.ownerDocument).querySelectorAll(selector);
      var index=0;
      while(elements[index]&&elements[index]!==element) {
        ++index;
      }
      return Boolean(elements[index]);
    };
    Element.prototype.closest=function(css) {
      var node=this;
      while(node) {
        if(node.matches(css))
          return node;
        else
          node=node.parentElement;
      }
      return null;
    };
  }
}

function setScroll(scrollbar, scroll, list) {
  scroll.style.height =
    (scrollbar.clientHeight * list.clientHeight) / list.scrollHeight + "px";

  list.addEventListener("scroll", () => {
    scroll.style.top =
      (scrollbar.clientHeight * list.scrollTop) / list.scrollHeight + "px";
  });

  scroll.onmousedown = function(e) {
    var scrollCoords = getCoords(scroll);
    var conteinerCoords = getCoords(scrollbar);
    var shiftY = e.pageY - scrollCoords.top;

    document.onmousemove = function(e) {
      var newPositionTop = e.pageY - shiftY - conteinerCoords.top;
      list.scrollTop = list.scrollHeight * newPositionTop / scrollbar.clientHeight;
      if (newPositionTop < 0) {
        newPositionTop = 0;
      }
      var bottomEdge = scrollbar.offsetHeight - scroll.offsetHeight;

      if (newPositionTop > bottomEdge) {
        newPositionTop = bottomEdge;
      }

      scroll.style.top = newPositionTop + "px";
    };

    document.onmouseup = function() {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  };

  scroll.ondragstart = function() {
    return false;
  };

  function getCoords(elem) {
    // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  if (scroll.offsetHeight < 8){
    scroll.classList.add('small')
  }
  if (scrollbar.offsetHeight === scroll.offsetHeight) {
    scrollbar.style.opacity = 0;
  } else {
    scrollbar.style.opacity = 1;
  }
}

window.store = new Vuex.Store({
  state: {
    mainInfo: window.dataHead,
    clients_page: window.dataClients,
    royalty_page: window.dataRoyalty,
    dynamic_page: window.dataDynamics,
    iconInfo: `<svg
                 width="14"
                 height="15"
                 viewBox="0 0 14 15"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   d="M6.90968 12.0564C7.26322 12.0564 7.54982 11.7698 7.54982 11.4163C7.54982 11.0627 7.26322 10.7761 6.90968 10.7761C6.55614 10.7761 6.26954 11.0627 6.26954 11.4163C6.26954 11.7698 6.55614 12.0564 6.90968 12.0564Z"
                   fill="#B2B2B2"
                 ></path>
                 <path
                   d="M5.18513 6.49092C5.09069 6.57452 4.96768 6.61853 4.84165 6.61381C4.51742 6.61381 4.32621 6.4226 4.39272 6.16488C4.44094 5.72872 4.54719 5.30095 4.70863 4.89291C4.89116 4.46317 5.20502 4.10223 5.60525 3.8618C6.00547 3.62136 6.47153 3.51377 6.93665 3.55444C7.33048 3.53097 7.72448 3.59736 8.08887 3.74859C8.45326 3.89982 8.77849 4.13193 9.03997 4.42736C9.23478 4.69937 9.36457 5.01245 9.41934 5.34251C9.4741 5.67257 9.4524 6.0108 9.35589 6.33115C9.10344 7.01512 8.68996 7.62821 8.15043 8.11856C7.768 8.49267 7.38558 8.87509 7.38558 9.19931C7.38315 9.32865 7.3351 9.45297 7.24992 9.55032C7.16474 9.64768 7.04789 9.7118 6.92003 9.73138C6.78783 9.72199 6.66331 9.66577 6.56883 9.57282C6.47436 9.47987 6.41612 9.35628 6.40459 9.22425C6.40459 8.53285 6.89803 8.03246 7.44883 7.47389C7.46098 7.46157 7.47315 7.44922 7.48534 7.43685C7.88687 7.06507 8.19945 6.60758 8.39983 6.09837C8.43689 5.92374 8.43907 5.7435 8.40626 5.56801C8.37344 5.39253 8.30628 5.22526 8.20862 5.07581C8.03827 4.89808 7.83059 4.7604 7.60056 4.6727C7.37053 4.585 7.12389 4.54947 6.87846 4.56869C6.60424 4.54623 6.32964 4.60727 6.09075 4.74378C5.85186 4.88029 5.65986 5.08588 5.53998 5.33353C5.42465 5.5962 5.35979 5.87822 5.34877 6.16488C5.33817 6.29056 5.27957 6.40732 5.18513 6.49092Z"
                   fill="#B2B2B2"
                 ></path>
                 <path
                   fill-rule="evenodd"
                   clip-rule="evenodd"
                   d="M7.00002 14.8859C8.38449 14.8859 9.73786 14.4754 10.889 13.7062C12.0401 12.9371 12.9374 11.8438 13.4672 10.5647C13.997 9.28567 14.1356 7.8782 13.8655 6.52034C13.5954 5.16248 12.9287 3.9152 11.9498 2.93624C10.9708 1.95727 9.72351 1.29059 8.36565 1.02049C7.00779 0.750396 5.60033 0.889019 4.32125 1.41883C3.04217 1.94864 1.94892 2.84585 1.17975 3.99699C0.410586 5.14813 4.47541e-05 6.5015 4.47541e-05 7.88597C-0.00325142 8.80614 0.175558 9.71787 0.526173 10.5686C0.876787 11.4194 1.39228 12.1924 2.04294 12.8431C2.69361 13.4937 3.46659 14.0092 4.31735 14.3598C5.16812 14.7104 6.07985 14.8892 7.00002 14.8859ZM7.00002 1.90024C8.18389 1.90024 9.34117 2.2513 10.3255 2.90902C11.3099 3.56674 12.0771 4.50158 12.5301 5.59533C12.9832 6.68908 13.1017 7.89261 12.8707 9.05373C12.6398 10.2148 12.0697 11.2814 11.2326 12.1185C10.3955 12.9556 9.3289 13.5257 8.16778 13.7567C7.00666 13.9876 5.80313 13.8691 4.70938 13.4161C3.61563 12.963 2.68079 12.1958 2.02307 11.2115C1.36535 10.2271 1.01429 9.06984 1.01429 7.88597C1.0132 7.0996 1.16728 6.32075 1.4677 5.59403C1.76812 4.86732 2.20899 4.20702 2.76503 3.65098C3.32108 3.09493 3.98137 2.65407 4.70809 2.35365C5.43481 2.05322 6.21366 1.89914 7.00002 1.90024Z"
                   fill="#B2B2B2"
                 ></path>
               </svg>`
  },
  mutations: {
    setDataAll(state, data){
      Vue.set(state, data)
    },
    setDataHead(state, data) {
      Vue.set(state, 'mainInfo', data)
    },
    setDataClients(state, data) {
      Vue.set(state, 'clients_page', data)
    },
    setDataRoyalty(state, data) {
      Vue.set(state, 'royalty_page', data)
    },
    setDataDynamics(state, data) {
      Vue.set(state, 'dynamic_page', data)
    },
    showVideo(state, data) {
      state.mainInfo.firstStart = data;
    },
  },
  getters: {
    getMainInfo: state => {
      return state.mainInfo;
    },
    getClientsData: state => {
      return state.clients_page;
    },
    getRoyaltyData: state => {
      return state.royalty_page;
    },
    getDynamicsData: state => {
      return state.dynamic_page;
    }
  }
})

window.app = new Vue({
  el: '.app',
  store,
  render: h => h(App),
  components: {
    App
  }
})


