import Vue from 'vue';
import App from '@/src/App.vue';
import EventBus from '@/src/utils/event-bus.js';


import { clearGlobalState } from '@/src/utils/globals.js';


const EVENT = 'click-outside'; 

function bind(el, binding, vnode) {
  unbind(el);
  
  let vm = vnode.context;
  let callback = binding.value;
  let initialMacrotaskEnded = false;
  
  setTimeout(function() {
    initialMacrotaskEnded = true;
  }, 0);

  el[EVENT] = function(ev) {
    let path = ev.path || (ev.composedPath ? ev.composedPath() : undefined);
    if (initialMacrotaskEnded && (path ? path.indexOf(el) < 0 : !el.contains(ev.target))) {
      return callback.call(vm, ev);
    }
  };
  
  document.documentElement.addEventListener('click', el[EVENT], false);
}

function unbind(el) {
  document.documentElement.removeEventListener('click', el[EVENT], false);
  delete el[EVENT];
}

Vue.directive('click-outside', {
  bind: bind,
  unbind: unbind,
})


window.app = new Vue({
  el: '.app',
  methods: {
    addMessages(messages) {
      EventBus.$emit('messages:add', messages);
    },
    renderTags(tags) {
      EventBus.$emit('tags:render', tags);
    },
    renderTemplates(templates) {
      EventBus.$emit('templates:render', templates);
    },
    setFormText(text) {
      EventBus.$emit('formText:set', text);
    },
    clearForm() {
      EventBus.$emit('form:clear');
    },
    addFile(file) {
      EventBus.$emit('file:add', file);
    },
    deleteMessage(messageId) {
      EventBus.$emit('message:delete', messageId);
    },
    clearState() {
      clearGlobalState();
    }
  },
  render: h => h(App)
});
