<template>
 <transition name="fade">
   <div class="alert-wrap"
        v-show="state.isAlertVisible">
      
    <div class="alert">
      <span class="alert__title">
        Настройки отправки
      </span>
      <fieldset>
        <radio-button name="feed__radio-enter" groupName="keys" :checked="state.isSendByEnter" :top="10" @changeState="handleIsEnter(true)">
          <div style="display: flex; flex-direction: column; font-size: 13px">
            <div><b>Enter</b> — отправка сообщения</div>
            <div><b>Shift+Enter</b> — перенос строки</div>
          </div>
        </radio-button>
        <radio-button name="feed__radio-shift" groupName="keys" :checked="!state.isSendByEnter" :top="20" @changeState="handleIsEnter(false)">
            <div style="display: flex; flex-direction: column; font-size: 13px">
              <div><b>Shift+Enter</b> — отправка сообщения<br></div>
              <div><b>Enter</b> — перенос строки</div>
            </div>
        </radio-button>
      </fieldset>
    </div>
  </div>
 </transition>
</template>

<script>

import Radio from '@/src/components/radio-button/Radio.vue';
import EventBus from '@/src/utils/event-bus.js';

import { setEnter } from '@/src/utils/globals.js';

export default {
  props: {
    state: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  methods: {
    show() {
      this.state.isAlertVisible = true;
    },
    handleIsEnter(value) {
      this.state.isSendByEnter = value;
      setEnter(value)
    }
  },
  components: {
    'radio-button': Radio
  },
}
</script>

<style lang="scss">
  .alert {
    width: 280px;

    padding: 15px 17px;
  
    background: #fff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    box-sizing: border-box;

    &__title {
      font-size: 12px;
      font-weight: 700;
      color: #B4B4B4;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
