<template>
  <div class="filters" v-show="isVisible" v-click-outside="closeFilters">
    <div class="filters__head">
      <Checkbox v-model="filters.unread" class="filters__check" label="Непрочитанные"></Checkbox>
      <Checkbox v-model="filters.attachment" class="filters__check filters__check--left" label="Есть приложенные файлы"></Checkbox>
    </div>

    <div class="filters__body">
      <div class="filters__column">
        <triple-box v-model="isMessages" :isFill="messagesPick.length !== 0 && messagesPick.length !== messages.length" text="Сообщения"></triple-box>

        <Multiselect class="filters__select"
                    v-model="messagesPick"
                    type="Messages"

                    placeholder="Все виды сообщений"

                    :search="searchMessages"
                    :isAllItems="isMessages"
                    :options="messages"

                    :active="activeMessages"
                    
                    @inputText="handleInputMessages">
        </Multiselect>

        <Checkbox v-model="filters.email" class="filters__check filters__check--top"  label="E-mail"></Checkbox>
        <Checkbox v-model="filters.call" class="filters__check filters__check--top" label="Звонки телефонии"></Checkbox>
      </div>
      <div class="filters__column">
        <triple-box v-model="isEvents" :isFill="eventsPick.length !== 0 && eventsPick.length !== events.length" text="События"></triple-box>
        
        <Multiselect class="filters__select"
                    v-model="eventsPick"
                    type="Events"

                    placeholder="Все виды событий"
                    :search="searchEvents"
                    :isAllItems="isEvents"
                    :options="events"

                    :active="activeEvents"
                    
                    @inputText="handleInputEvents">
        </Multiselect>

        <Checkbox v-model="filters.task" class="filters__check filters__check--top"  label="Задачи"></Checkbox>
        <Checkbox v-model="filters.document" class="filters__check filters__check--top" label="Документы"></Checkbox>
        <Checkbox v-model="filters.comment" class="filters__check filters__check--top" label="Комментарии"></Checkbox>
      </div>
    </div>

    <div class="filters__controls">
      <a @click="acceptFilter" class="filters__btn filters__btn--yellow" href="feed://update">
        Применить
      </a>
      <a @click="clearFilter" class="filters__btn filters__btn--gray" href="feed://update">
        Сбросить
      </a>
    </div>
  </div>
</template>

<script>

import Checkbox from '@/src/components/checkbox/Checkbox.vue';
import Multiselect from '@/src/components/multiselect/Multiselect.vue';
import TripleBox from '@/src/components/triple-box/Triplebox.vue';

import { setFilter } from '@/src/utils/globals.js';

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    messages: {
      type: Array,
      default: () => []
    },
    searchEvents: {
      type: String,
      default: null
    },
    searchMessages: {
      type: String,
      default: null
    },
    activeFilters: {
      type: Object,
      default: () => ({})
    },
    activeEvents: {
      type: Array,
      default: () => []
    },
    activeMessages: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      checkboxes: [
        {
          text: 'E-mail',
          type: 'email'
        },
        {
          text: 'Звонки телефонии',
          type: 'call'
        },
        {
          text: 'Непрочитанные',
          type: 'unread'
        },
        {
          text: 'Есть приложенные файлы',
          type: 'attachment'
        },
        {
          text: 'Задачи',
          type: 'task'
        },
        {
          text: 'Документы',
          type: 'document'
        },
        {
          text: 'Комментарии',
          type: 'comment'
        }
      ],
      events: [
        {
          id: 'event-outgoing-call',
          text: 'Исходящий звонок'
        },
        {
          id: 'event-incoming-call',
          text: 'Входящий звонок'
        },
        {
          id: 'event-outgoing-message',
          text: 'Исходящее сообщение'
        },
        {
          id: 'event-incoming-message',
          text: 'Входящее сообщение'
        },
        {
          id: 'event-meeting',
          text: 'Встреча'
        },
        {
          id: 'event-other',
          text: 'Событие'
        }
      ],
      eventsPick: [],
      messagesPick: [],
      selectedItems: [],
      isEvents: false,
      isMessages: false,
      filters: {
        unread: false,
        attachment: false,
        email: false,
        call: false,
        task: false,
        comment: false,
        document: false
      },
    }
  },
  methods: {
    acceptFilter() {
      let actualFilters = [];

      Object.keys(this.filters).forEach(key => {
        if (this.filters[key]) {
          actualFilters.push(key);
        }
      })

      actualFilters = actualFilters.concat(this._getEventFilters()).concat(this._getMessageFilters());

      setFilter(actualFilters.join(', '));

      this.$emit('form:close', actualFilters, this.filters, this.eventsPick, this.messagesPick);
      this.$emit('setSearchMessages', '');
      this.$emit('setSearchEvents', '');
    },
    clearFilter() {
      this.eventsPick.splice(0, this.eventsPick.length);
      this.messagesPick.splice(0, this.messagesPick.length);

      this.isMessages = false;
      this.isEvents = false;


      Object.keys(this.filters).forEach(key => {
        this.filters[key] = false;
      })
      
      setFilter('');

      this.$emit('form:clear');
      this.$emit('setSearchMessages', '');
      this.$emit('setSearchEvents', '');
    },
    handleInputMessages(value) {
      this.$emit('setSearchMessages', value);
    },
    handleInputEvents(value) {
      this.$emit('setSearchEvents', value);
    },
    closeFilters() {
      if (this.isVisible) {
        this.$emit('closeFilters');
      }
    },
    _getEventFilters() {
      if (this.eventsPick.length === this.events.length) {
        return [ 'event' ];
      }

      return this.eventsPick.map(item => item.id);

    },
    _getMessageFilters() {
      if (this.messagesPick.length === this.messages.length && this.messages.length !== 0) {
        return [ 'message' ];
      }

      return this.messagesPick.map(item => item.id);
    }
  },
  watch: {
    eventsPick: function() {
      if (this.eventsPick.length === this.events.length && this.events.length !== 0) {
        this.isEvents = true;
      }

      if (this.eventsPick.length === 0) {
        this.isEvents = false;
      }
    },
    messagesPick: function() {
      if (this.messagesPick.length === this.messages.length) {
        this.isMessages = true;
      }

      if (this.messagesPick.length === 0) {
        this.isMessages = false;
      }
    },
    isVisible: function(isActive) {
      if (isActive) {
        Object.keys(this.filters).forEach(key => {
          this.filters[key] = this.activeFilters[key];
        })

        this.eventsPick.splice(0, this.eventsPick.length);
        this.activeEvents.forEach(event => {
          this.eventsPick.push(event);
        })

        this.messagesPick.splice(0, this.messagesPick.length);
        this.activeMessages.forEach(message => {
          this.messagesPick.push(message);
        })
      }
    }
  },
  components: {
    Checkbox,
    Multiselect,
    TripleBox
  }
}
</script>

<style lang="scss">
  .filters {

    margin-top: 3px;
    margin-left: 3px;
    padding-bottom: 21px;

    width: 100%;

    background: #fff;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);

    &__controls {
      text-align: right;

      padding-right: 36px;
    }

    &__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      padding-right: 13px;
      padding-left: 13px;
      
      height: 30px;

      font-family: Arial, Helvetica;
      font-size: 10px;
      font-weight: 700;
      color: #909090;

      text-transform: uppercase;
      text-decoration: none;

      background: transparent;
      border-radius: 5px;

      transition: background .2s;

      &--yellow {
        background: #FEDD46;
        color: #4D4D4D;

        &:hover {
          background: #D3B83F;
        }
      }

      &--gray {
        border: 1px solid transparent;

        &:hover {
          border-color: #B3B3B3;
        }
      }

    }

    &__head {
      display: flex;
      align-items: center;

      height: 72px;

      padding-left: 36px;
      padding-right: 36px;

      border-bottom: 1px solid #DEDEDE;
    }

    &__body {
      display: flex;


      padding-top: 23px;
      padding-bottom: 21px;
      padding-left: 36px;
      padding-right: 36px;
    }

    &__column {
      width: 50%;
    }
    
    &__select {
      margin-top: 12px;
      margin-bottom: 12px;
      margin-left: 23px;
    }

    &__check {
      &--top {
        margin-top: 10px;
      }

      &--left {
        margin-left: 30px;
      }
    }
  }
</style>

