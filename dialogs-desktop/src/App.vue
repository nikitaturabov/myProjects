<template>
  <div class="dialogs" :class="{ 'dialogs--disable': isDialogDisable }">
    <head-component
                    class="dialogs__head"

                    :tags="tags"
                    :filters="filters" 

                    @disable:set="setDisable"
                    @filters:set="setFilters"
                  >

    </head-component>

    <div class="dialogs__body" ref="dialogsBody">
      <div class="dialogs__message"
           v-for="(message, index) in messages"
           :key="message.id">

        <date-line :date="getDate(message.unix, 'DD.MM.YYYY')" :last-date="messages[index - 1] ? getDate(messages[index - 1].unix, 'DD.MM.YYYY') : ''"></date-line>
          
        <component
                  :is="message.type"

                  :message="message"
                  
                  :id="message.id"
                  :way="message.way"
                  :text="message.messageText"
                  :author="message.author"
                  :service="message.service"
                  :unix="message.unix"
                  :stage="message.stage"
                  :feedback="message.feedback"
                  :tags="message.tags"
                  :files="message.files"
                  :quotes="message.quotes"
                  :setResolved="message.setResolved"

                  :movedTo="message.movedTo"
                  
                  :isSupportMode="isSupportMode"
                  :isPickedMessage="pickedMessages.indexOf(message.id) > -1"
                  
                  @message:edit="editMessage"
                  @message:pick="pickMessage"
                  @message:quote="quoteMessage"  
                >

        </component>
      </div>
      <div style="height: 20px;" class="dialog-box">

      </div>
    </div>

    <Form class="dialogs__form"
          :quote="quote"
          :isSupportMode="isSupportMode"
          :isPrivateMessage="isPrivateMessage"
          :isEditMode="isEditMode"

          :pickedMessageCount="pickedMessages.length"

          :templates="templates"

          :formText="formText"
          :files="files"

          @formText:set="setFormText"
          @supportMode:set="setSupportMode"
          @quote:close="closeQuote"
          @editMode:cancel="cancelEditMode"
          @file:add="addFile"

          @form:send="sendForm"
          @privateMode:set="setPrivateMode"
        >

    </Form>
  </div>
</template>

<script>
import Default from '@/src/components/messages/Default.vue';
import Tech from '@/src/components/messages/Tech.vue';
import DateLine from '@/src/components/DateLine.vue';
import Head from '@/src/components/Head.vue';

import Form from '@/src/components/Form.vue';

import EventBus from '@/src/utils/event-bus.js';

import lodashClone from 'lodash/cloneDeep.js';

import { getDate } from '@/src/utils/date.js';
import { setStateText, setStateFiles, setStateQuotes, setStatePickedMessages, setStateInnerMessage, setFilters, setIdEditedMessage } from '@/src/utils/globals.js';

export default {
  mounted() {
    EventBus.$on('messages:add', (messages, isNew) => {
      if (isNew) {
        this.messages = [];
        this.messagePosition = {};
      }

      if (this.messages.length === 0) {
        for (let i = 0; i < messages.length; i++) {
          this.messages.push(lodashClone(messages[i]));
          this.$set(this.messagePosition, messages[i].id, i);
        }
      } else {
        this._mergeActs(messages);
      }

      if (isNew || this.$refs.dialogsBody.scrollTop + this.$refs.dialogsBody.clientHeight === this.$refs.dialogsBody.scrollHeight) {
        this.$nextTick(() => {
          this._scrollToBottom();
        })
      }
    })

    EventBus.$on('tags:render', tags => {
      this.tags = JSON.parse(JSON.stringify(tags)); //convert to unique array with unique object without reference to source array 
    })

    
    EventBus.$on('templates:render', templates => {
      this.templates = templates;
    })


    EventBus.$on('formText:set', text => {
      this.formText = text;
    })

    EventBus.$on('form:clear', () => {
      this.quote = {};
      this.formText = '';
      this.isSupportMode = false;
      this.isEditMode = false;

      this._clearFiles();
    })

    EventBus.$on('file:add', file => {
      this.files.push(file);
    })

    EventBus.$on('message:delete', messageId => {
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i].id === messageId) {
          this.messages.splice(i, 1);
        }
      }
    })
  },
  data() {
    return {
      messages: [],
      pickedMessages: [],
      quote: {
        // id, author, unix, service, text
      },
      isSupportMode: false,
      isPrivateMessage: false,
      templates: [],
      formText: '',
      isEditMode: false,
      tags: [],
      isDialogDisable: false,
      filters: {
        attachments: {
          picture: false,
          word: false,
          excel: false,
          pdf: false,
          other: false
        },
        tech: false
      },
      files: [
        // { name: 'as' }
      ],
      messagePosition: {},
    }
  },
  methods: {
    closeQuote() {
      this.quote = {};
    },
    setSupportMode(value) {
      this.isSupportMode = value;

      if (!value) {
        this.pickedMessages = [];
      }
    },
    setPrivateMode(value) {
      this.isPrivateMessage = value;
    },
    pickMessage(id, isPicked) {
      
      //if message was not picked
      if (isPicked) {
        this.pickedMessages.push(id);

        return;
      }

      let position = this.pickedMessages.indexOf(id);

      if (position !== -1) {
        this.pickedMessages.splice(position, 1);
      }

    },
    editMessage(text) {
      if (this.quote && this.quote.id) {
        return;
      }

      this.formText = text;
      this.isEditMode = true;
    },
    getDate(date, format) {
      return getDate(date, format);
    },
    setFormText(text) {
      this.formText = text;
    },
    cancelEditMode() {
      this.isEditMode = false;
      this.formText = '';

      setIdEditedMessage(null);
    },
    quoteMessage({ id, author, unix, service, text }) {
      if (this.isEditMode) {
        return;
      }

      this.$set(this.quote, 'id', id);
      this.$set(this.quote, 'author', author);
      this.$set(this.quote, 'unix', unix);
      this.$set(this.quote, 'service', service);
      this.$set(this.quote, 'text', text);
    },
    setDisable(value) {
      this.isDialogDisable = value;
    },
    setFilters(filters) {

      if (filters === null) {
        this.filters.attachments.picture = false;
        this.filters.attachments.word = false;
        this.filters.attachments.excel = false;
        this.filters.attachments.pdf = false;
        this.filters.attachments.other = false;

        this.filters.tech = false;

        setFilters(null);

        return;
      }

      this.filters.attachments.picture = filters.attachments.picture;
      this.filters.attachments.word = filters.attachments.word;
      this.filters.attachments.excel = filters.attachments.excel;
      this.filters.attachments.pdf = filters.attachments.pdf;
      this.filters.attachments.other = filters.attachments.other;

      this.filters.tech = filters.tech;

      setFilters(this.filters);
    },
    addFile(file) {
      this.files.push(file);
    },
    sendForm() {
      this.isSupportMode = false;

      setStateText(this.formText);
      setStateFiles(this.files);

      if (this.quote && this.quote.id) {
        setStateQuotes([ this.quote ]);
      }

      setStatePickedMessages(this.pickedMessages);
      setStateInnerMessage(this.isPrivateMessage);
    },
    _clearFiles() {
      while(this.files.length > 0) {
        this.files.pop();
      }
    },
    _mergeActs(messages) {
      for (let i = 0; i < messages.length; i++) {
        let pos = this.messagePosition[messages[i].id];

        if (pos !== undefined) {
          this.$set(this.messages, pos, messages[i]);

          messages.splice(i, 1);
          continue;
        }
      }

      if (messages.length > 0 && messages[messages.length - 1].unix <= this.messages[0].unix) {
        for (let i = messages.length - 1; i >= 0; i--) {
          
          Object.keys(this.messagePosition).forEach(key => {
            this.messagePosition[key] = this.messagePosition[key] + 1;
          })


          this.messages.unshift(messages[i]);
          this.messagePosition[messages[i].id] = 0;
        }

        return;
      }
      

      if (messages.length > 0 && messages[0].unix >= this.messages[this.messages.length - 1].unix) {
        for (let i = 0; i < messages.length; i++) {
          this.messages.push(messages[i]);
          this.messagePosition[messages[i].id] = Object.keys(this.messagePosition).length;
        }

        return;
      }

      for (let i = 0; i < messages.length; i++) {
        let newPosition = 0;

        for (let j = 0; j < this.messages.length; j++) {
          if (messages[i].unix > this.messages[j].unix) {
            newPosition = j;
          }
        }


        Object.keys(this.messagePosition).forEach(key => {
          this.messagePosition[key] = this.messagePosition[key] + 1;
        })

        
        this.messagePosition[messages[i].id] = newPosition;

        this.messages.splice(newPosition, 0, messages[i]);
      }
    },
    _scrollToBottom() {
      this.$refs.dialogsBody.scrollTop = this.$refs.dialogsBody.scrollHeight;
    },
  },
  components: {
    tech: Tech,
    message: Default,
    Form,
    DateLine,
    'head-component': Head
  }
}
</script>

<style lang="scss">
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  
  ul {
    list-style: none;
  }


  .dialogs {
    position: relative;

    display: flex;
    flex-direction: column;

    font-family: Arial, Helvetica;

    height: 100vh;

    &--disable {
      &:before {
        content: '';

        position: absolute;

        z-index: 1;

        height: 100%;
        width: 100%;

        background: rgba(145, 145, 145, 0.5);
      }
    }

    &__body {
      overflow-y: auto;

      &::-webkit-scrollbar
      {
        width: 10px;
      }

      &::-webkit-scrollbar-thumb
      {
        border-radius: 4px;
        border: 1px solid #fff;
        background-color: #D6D6D6;
      }
    }

    &__form {
      position: relative;
    }
  }

  .quote {
    display: flex;

    &__content {
      margin-left: 10px;

      padding-top: 3px;
      padding-bottom: 3px;
    }

    &__text {
      position: relative;

      font-size: 11px;
      color: #3E3E3E;

      white-space: pre-line;

      &--feed {
        max-width: 65%;
      }
    }

    &__close {
      position: absolute;

      right: -45px;
      top: 50%;

      display: flex;

      transform: translate(0, -50%);
      background: transparent;

      cursor: pointer;

      &:focus {
        outline: none;
      }
      
      &:hover {
        svg {
          path {
            fill: #4F416E;
          }
        }
      }
    } 

    &__title {
      margin-top: 10px;

      font-size: 11px;
      font-weight: 700;
      color: #765FA7;
    }

    &:before {
      content: '';

      align-self: stretch;

      width: 6px;

      background: #765FA7;
      border-radius: 4px 0px 0px 4px;

    }
  }

  .tag {

    display: inline-flex;
    align-items: center;

    &:not(:first-child) {
      margin-left: 10px;
    }

    &__icon {
      &--feedback { path { fill: #00640B; } }
      &--other { path { fill: #765FA7; } }
    }

    &__text {
      margin-left: 3px;

      font-size: 8px;
      font-weight: 700;

      text-transform: uppercase;

      &--feedback { color: #00640B; }
      &--other { color: #765FA7; }
      &--gray { color: #4d4d4d; }
    }
  }
  
  .hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

</style>

