<template>
  <span></span>
</template>

<script>

import moment from 'moment';

export default {
  props: {
    id: {
      type: String,
      default: null
    },
    date: {
      type: String,
      // default: new Date()
    },
    author: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    way: {
      type: String,
      default: 'all' //half
    },
    header: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    statusType: {
      type: String,
      default: null
    },
    files: {
      type: Array,
      default: () => []
    },
    important: {
      type: String,
      default: ''
    },
    status: {
      type: Object,
      default: () => ({})
    },
    actions: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: null
    },
    quote: {
      type: Object,
      default: () => null
    },
    theme: {
      type: String,
      default: null
    },
    buttons: {
      type: Array,
      default: () => []
    },
    accountId: {
      type: String,
      default: null
    },
    authorId: {
      type: String,
      default: null
    },
    state: {
      type: Object,
      default: () => ({ status: null })
    },
    thumb: {
      type: Object,
      default: () => (
        {
          URL: '',
          height: '',
          width: ''
        }
      )
    },
    callFrom: {
      type: String,
      default: null
    },
    callTo: {
      type: String,
      default: null
    },
    passcall: {
      type: Boolean,
      default: false
    },
    unread: {
      type: Boolean,
      default: false
    },
    table: {
      type: String,
      default: false
    },
    stamp: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getTitle() {

      const svgArrow = `<svg style="margin-right: 7px; margin-left: 7px;" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.562114 3.2447L0.546504 3.24799H7.23805L5.13447 1.21743C5.03146 1.11829 4.97496 0.983996 4.97496 0.843045C4.97496 0.702094 5.03146 0.568738 5.13447 0.469368L5.46179 0.15395C5.56471 0.0548143 5.70187 0 5.84813 0C5.99447 0 6.13171 0.0544229 6.23463 0.153559L9.84057 3.62636C9.9439 3.72589 10.0004 3.85846 10 3.99949C10.0004 4.1413 9.9439 4.27395 9.84057 4.37333L6.23463 7.84644C6.13171 7.9455 5.99455 8 5.84813 8C5.70187 8 5.56471 7.94542 5.46179 7.84644L5.13447 7.53102C5.03146 7.43204 4.97496 7.29986 4.97496 7.15891C4.97496 7.01804 5.03146 6.89283 5.13447 6.79377L7.26179 4.75186H0.554634C0.253252 4.75186 0 4.50167 0 4.21154V3.76543C0 3.47531 0.260732 3.2447 0.562114 3.2447Z" fill="${this.way === 'in' ? '#919191' : '#576F25'}"/>
      </svg>`;

      // const to = this.to ? svgArrow + this.to.replace(new RegExp('Кому: ', 'g'), ''): '';
      const to = this.to ? svgArrow + this.to: '';

      if (this.statusType === 'vk') {
        return `<span class="act__author">${this.author}${to}</span>` + 'ВКонтакте · ' + '&nbsp;' + `<time>${this.getDate()}</time>`; 
      } else if (this.statusType === 'viber') {
        return `<span class="act__author">${this.author}${to}</span>` + 'Viber · ' + '&nbsp;' + `<time>${this.getDate()}</time>`; 
      } else if (this.statusType === 'telegram') {
        return `<span class="act__author">${this.author}${to}</span>` + 'Telegram · ' + '&nbsp;' + `<time>${this.getDate()}</time>`; 
      } else if (this.statusType === 'cabinet') {
        return `<span class="act__author">${this.author}</span>` + 'Личный кабинет · ' + '&nbsp;' + `<time>${this.getDate()}</time>`;
      } else if (this.statusType === 'email') {
        return `<span class="act__author">${this.author}${to}</span>` + 'E-mail · ' + '&nbsp;' + `<time>${this.getDate()}</time>`; 
      }

      return this.author;
    },
    getQuoteTitle() {
      if (this.statusType === 'vk') {
        return this.author + ' · ' + 'ВКонтакте' + ' · '; 
      } else if (this.statusType === 'viber') {
        return this.author + ' · ' + 'Viber' + ' · '; 
      } else if (this.statusType === 'telegram') {
        return this.author + ' · ' + 'Telegram' + ' · '; 
      } else if (this.statusType === 'cabinet') {
        return this.author + ' · ' + 'Личный кабинет' + ' · '; 
      } else if (this.statusType === 'email') {
        return this.author + ' · ' + 'E-mail' + ' · '; 
      }

      return this.author;
    }
  },
  methods: {
    getDate() {
      // let date = moment(this.date).format('DD.MM.YYYY · HH:mm');

      if (moment(this.date).format('YYYY') === '0001') {
        return '';
      }

      let offset = new Date().getTimezoneOffset();
      let date = moment(this.date).utcOffset(offset / -30).format('DD.MM.YYYY  HH:mm');


      return date === 'Invalid date' ? '' : `${date}`;
    },
    getDateQuote() {
      // let date = moment(this.date).format('DD.MM.YYYY · HH:mm');
      
      if (moment(this.date).format('YYYY') === '0001') {
        return '';
      }
      
      let offset = new Date().getTimezoneOffset();
      let date = moment(this.date).utcOffset(offset / -30).format('DD.MM.YYYY · HH:mm');


      return date === 'Invalid date' ? '' : `${date}`;
    },
    enter: function (el, done) {
      if (!this.$isNew) {
        el.classList.add('animate-act');
      }

      done();
    },
    leave: function (el, done) {
      el.classList.remove('animate-act');
      done();
    }
  },
}
</script>


<style lang="scss">
</style>

