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

import Vue from 'vue';
import App from './App.vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
Vue.use(Vuex);

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

Vue.directive('scrollbar', {
  inserted(el, binding) {
    var scrollbar = el.children[1];
    var scroll = scrollbar.children[0];
    var list = el.children[0];
    console.log(scrollbar, scroll, list)
    setScroll(scrollbar, scroll, list)
  }
})

Vue.directive('scrollbar-update', {
  componentUpdated(el, binding) {
    var scrollbar = el.children[1];
    var scroll = scrollbar.children[0];
    var list = el.children[0];
    setScroll(scrollbar, scroll, list);

  }
})

window.setScroll = function(scrollbar, scroll, list) {
  console.log(list.clientHeight, list.scrollHeight, scrollbar.clientHeight)
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
  console.log(scrollbar.offsetHeight, scroll.offsetHeight)
  if (scrollbar.offsetHeight === (scroll.offsetHeight)) {
    scrollbar.style.opacity = 0;
  } else {
    scrollbar.style.opacity = 1;
  }
}

// window.addEventListener('resize', function(){
//   setScroll()
// })

console.log(window.dataDynamics)
window.store = new Vuex.Store({
  state: {
    data: window.data
  },
  mutations: {
    setData(state, data) {
      Vue.set(state, 'data', data)
    },
    addMessage(state, data) {
      state.data.messages.push(data);
    },
    updateMessages(state, data) {
      console.log(state.data.messages)
      state.data.messages.length = 0;
      state.data.messages = data;
    },
    setOptions(state, data) {
      state.data.options.length = 0;
      state.data.options = data;
    },
    setButtonBackView(state, data) {
      state.data.buttonBack.view = data;
    },
    setButtonForwardView(state, data) {
      state.data.buttonForward.view = data;
    },
    setButtonFinalView(state, data) {
      state.data.buttonFinal.view = data;
    },
    setButtonGoToCheckList(state, data) {
      state.data.goToCheckList.view = data;
    },
    nextStage(state, data) {
      state.data.stage = data.stage;
      state.data.headline = data.headline;
      state.data.iconHelp = data.iconHelp;
      state.data.helpText = data.helpText;
      state.data.benchmarks = data.benchmarks;
    },
    setNoClients(state, data) {
      state.data.nextCA.view = data;
    }
  },
  getters: {
    getData: state => {
      return state.data;
    },
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