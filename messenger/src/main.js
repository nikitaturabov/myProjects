if (!Element.prototype.closest) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || function matches(selector) {
    let element = this;
    let elements = (element.document || element.ownerDocument).querySelectorAll(selector);
    let index = 0;

    while (elements[index] && elements[index] !== element) {
      ++index;
    }

    return Boolean(elements[index]);
  };

  Element.prototype.closest = function(css) {
    let node = this;

    while (node) {
      if (node.matches(css)) return node;
      else node = node.parentElement;
    }
    return null;
  };
};

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  document.body.addEventListener(eventName, function(e) {
    e.preventDefault();
    e.stopPropagation();
  }, false);
})


import Vue from 'vue';
import App from '@/src/App.vue';

import EventBus from '@/src/utils/event-bus.js';

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
  
  document.documentElement.addEventListener('mousedown', el[EVENT], false);
}

function unbind(el) {
  document.documentElement.removeEventListener('mousedown', el[EVENT], false);
  delete el[EVENT];
}

Vue.directive('click-outside', {
  bind: bind,
  unbind: unbind,
})

window.app = new Vue({
  el: '.app',
  methods: {
    renderActs(acts, isNew) {
      EventBus.$emit('acts:render', acts, isNew);
      Vue.prototype.$isNew = isNew;
    },
    setFormData(formData) {
      EventBus.$emit('formdata:render', formData);
    },
    setAgendaState(state) {
      EventBus.$emit('agenda:setState', state);
    },
    setAgenda(agenda) {
      EventBus.$emit('agenda:set', agenda);
    },
    setFormText(value) {
      EventBus.$emit('form-text:set', value);
    },
    setFormSubject(value) {
      EventBus.$emit('form-subject:set', value);
    },
    setAssignee(assignee) {
      EventBus.$emit('assignee:set', assignee);
    },
    setTaskType(task) {
      EventBus.$emit('task:set', task);
    },
    addAttachments(attachments) {
      EventBus.$emit('attachments:add', attachments);
    },
    setPhoneList(phoneList) {
      EventBus.$emit('phone-list:set', phoneList);
    },
    setPageButtons(buttons) {
      EventBus.$emit('page-buttons:set', buttons);
    },
    clearAttachments() {
      EventBus.$emit('attachments:clear');
    },
    clearQuote() {
      EventBus.$emit('quote:clear');
    },
    //??????????????????
    setUnread(id, count) {
      EventBus.$emit('new-message:set', id, count);
    },
    setSendByEnter(isEnter) {
      EventBus.$emit('send-enter:set', isEnter);
    },
    setNextEventPlanning(agendaId) {
      EventBus.$emit('agenda-id:set', agendaId);
    },
    scrollToBottom() {
      
    },
    showBanner() {
      EventBus.$emit('banner:show');
    },
    showHint() {
      EventBus.$emit('hint:show');
    },
    showLoader() {
      EventBus.$emit('loader:show');
    },
    setFirstEvent(firstEvent) {
      EventBus.$emit('firstEvent:set', firstEvent);
    },
    clearTemplate() {
      EventBus.$emit('template:clear');
      
      state.reminder = { date: '', seconds: 0 };
    },
    clearReminder() {
      EventBus.$emit('reminder:clear');

      state.reminder = { date: '', seconds: 0 };
    },
    setScrollTo(id) {
      
    },
    setHtmlTemplate(template) {
      EventBus.$emit('template:set', template);
    }
  },
  render: h => h(App)
});
