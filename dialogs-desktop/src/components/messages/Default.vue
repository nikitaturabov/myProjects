<template>
  <div class="message" :class="{ 'message--picked': canPicked }" @click="pickMessage">
    <div class="message__body" :class="[ `message__body--${way}`, { 'message__body--picked': isSupportMode } ]">
      <div class="message__title" :class="[ `message__title--${way}`, { 'opacity-message': isMovedMessage } ]">
        {{ getMessageTitle() }}
      </div>
      <div class="message__content" :class="{ 'opacity-message': isMovedMessage }">
        <div class="message__inner" :class="`message__inner--${way}`">
          <ul class="message__tags" v-if="tags.length > 0">
            <li class="message__tag tag" v-for="(tag, index) in tags" :key="index">
              <svg class="tag__icon" :class="`tag__icon--${tag.type}`" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.26367 2.68906V2.68179C8.26367 2.38858 8.02598 2.15088 7.73276 2.15088L0.794581 2.15088C0.501368 2.15088 0.263672 2.38858 0.263672 2.68179V2.68906C0.263672 2.98227 0.501368 3.21997 0.794581 3.21997L7.73276 3.21997C8.02598 3.21997 8.26367 2.98227 8.26367 2.68906Z" fill="#765FA7"/>
                <path d="M8.26367 5.35312V5.34585C8.26367 5.05264 8.02598 4.81494 7.73276 4.81494L0.79458 4.81494C0.501368 4.81494 0.263672 5.05264 0.263672 5.34585V5.35312C0.263672 5.64634 0.501368 5.88403 0.79458 5.88403H7.73276C8.02598 5.88403 8.26367 5.64634 8.26367 5.35312Z" fill="#765FA7"/>
                <path d="M5.59512 8.01367H5.60239C5.8956 8.01367 6.1333 7.77598 6.1333 7.48276L6.1333 0.54458C6.1333 0.251368 5.8956 0.0136719 5.60239 0.0136719H5.59512C5.30191 0.0136719 5.06421 0.251368 5.06421 0.54458L5.06421 7.48276C5.06421 7.77598 5.30191 8.01367 5.59512 8.01367Z" fill="#765FA7"/>
                <path d="M2.92569 8.01367H2.93296C3.22617 8.01367 3.46387 7.77598 3.46387 7.48276L3.46387 0.54458C3.46387 0.251368 3.22617 0.0136719 2.93296 0.0136719H2.92569C2.63247 0.0136719 2.39478 0.251368 2.39478 0.54458L2.39478 7.48276C2.39478 7.77598 2.63247 8.01367 2.92569 8.01367Z" fill="#765FA7"/>
              </svg>

              <span class="tag__text" :class="`tag__text--${tag.type}`">
                {{ tag.presentation }}
              </span>
            </li>
          </ul>
          <p class="message__text" :class="`message__text--${way}`" v-html="text">
            <!-- {{ text }} -->
          </p>

          <div 
              v-for="quote in quotes"
              class="message__quote quote"
      
              :key="quote.id">


            <div class="quote__content">
              <p class="quote__text quote__text--feed" v-html="quote.text">
              
              </p>
              <div class="quote__title">
                {{ quote.author }} · {{ quote.service }} · {{ getDate(quote.unix) }}
              </div>
            </div>
          </div>
        </div>
        <ul v-if="!isSupportMode && !isMovedMessage" class="message__actions" :class="`message__actions--${way}`">
          <li>
            <button class="message__action"
                    :class="`message__action--${way}`"

                    @click="quoteMessage"

                    v-html="getActionIcon('quote')"
                  >

            </button>
          </li>
          <li>
            <button class="message__action"
                    :class="`message__action--${way}`"
                    v-html="getActionIcon('edit')"

                    @click="editMessage"
                  >
            </button>
          </li>
          <li>
            <a class="message__action"
               :class="`message__action--${way}`"
               :href="`dialogs://delete/${id}`"

               v-html="getActionIcon('delete')"
              >
            </a>
          </li>
          <!-- <li v-for="(action, index) in actions" :key="index">
            <button class="message__action" :class="`message__action--${way}`">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.40246 0.75H2.4034C1.87346 0.75 1.36523 0.957092 0.99051 1.32572C0.615789 1.69434 0.405273 2.19431 0.405273 2.71563V3.69844C0.405273 4.21975 0.615789 4.71972 0.99051 5.08834C1.36523 5.45697 1.87346 5.66406 2.4034 5.66406H3.48128L5.40185 9.25004V5.12014H5.40058V2.71563C5.40058 2.19431 5.19007 1.69434 4.81535 1.32572C4.44063 0.957092 3.93239 0.75 3.40246 0.75ZM8.59665 0.75H9.59572C10.1257 0.75 10.6339 0.957092 11.0086 1.32572C11.3833 1.69434 11.5938 2.19431 11.5938 2.71563V5.12014H11.5951V9.25004L9.67453 5.66406H8.59665C8.06672 5.66406 7.55849 5.45697 7.18377 5.08834C6.80905 4.71972 6.59853 4.21975 6.59853 3.69844V2.71563C6.59853 2.19431 6.80905 1.69434 7.18377 1.32572C7.55849 0.957092 8.06672 0.75 8.59665 0.75Z" fill="#765FA7"/>
              </svg>
            </button>
          </li> -->
        </ul>
      </div>
      <ul class="message__files" :class="[ `message__files--${way}`, { 'opacity-message': isMovedMessage } ]">
        <li class="message__file" :class="`message__file--${way}`" v-for="(file, index) in files" :key="index">
          <a class="message__link" :class="`message__link--${way}`" :href="`dialogs://file/${file.id}`">
            {{ file.name }}
            <div class="message__link-icon" :class="`message__link-icon--${way}`">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2069 6.83673C11.131 6.66894 10.9641 6.56208 10.7804 6.56208H8.90563V0.469174C8.90563 0.210459 8.69566 0.000488281 8.43694 0.000488281H6.56219C6.30347 0.000488281 6.0935 0.210459 6.0935 0.469174V6.56208H4.21875C4.03502 6.56208 3.86817 6.66988 3.79224 6.83673C3.71537 7.00452 3.74537 7.20043 3.86629 7.33916L7.14711 11.0886C7.23616 11.1908 7.36458 11.2489 7.49957 11.2489C7.63455 11.2489 7.76297 11.1899 7.85202 11.0886L11.1328 7.33916C11.2547 7.20137 11.2828 7.00452 11.2069 6.83673Z" fill="white"/>
                <path d="M12.9982 10.3105V12.5602H1.99972V10.3105H0V13.3101C0 13.7248 0.447938 14.06 0.999862 14.06H13.9981C14.551 14.06 14.9979 13.7248 14.9979 13.3101V10.3105H12.9982Z" fill="white"/>
              </svg>
            </div>
          </a>
        </li>
      </ul>
      <div class="message__title message__title--moved" :class="`message__title--${way}`" v-if="isMovedMessage">
        <div class="message__tag tag">
          Перенесено в&nbsp;
        
          <svg class="tag__icon" :class="`tag__icon--${movedTo.type}`" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2.6749V2.66763C8 2.37441 7.7623 2.13672 7.46909 2.13672L0.530909 2.13672C0.237696 2.13672 0 2.37441 0 2.66763V2.6749C0 2.96811 0.237696 3.20581 0.530909 3.20581L7.46909 3.20581C7.7623 3.20581 8 2.96811 8 2.6749Z" fill="#765FA7"/>
            <path d="M8 5.33896V5.33169C8 5.03848 7.7623 4.80078 7.46909 4.80078L0.530909 4.80078C0.237696 4.80078 0 5.03848 0 5.33169V5.33896C0 5.63218 0.237696 5.86987 0.530909 5.86987H7.46909C7.7623 5.86987 8 5.63218 8 5.33896Z" fill="#765FA7"/>
            <path d="M5.33145 8H5.33872C5.63193 8 5.86963 7.7623 5.86963 7.46909L5.86963 0.530909C5.86963 0.237696 5.63193 0 5.33872 0H5.33145C5.03823 0 4.80054 0.237696 4.80054 0.530909L4.80054 7.46909C4.80054 7.7623 5.03823 8 5.33145 8Z" fill="#765FA7"/>
            <path d="M2.66201 8H2.66929C2.9625 8 3.2002 7.7623 3.2002 7.46909L3.2002 0.530909C3.2002 0.237696 2.9625 0 2.66929 0H2.66201C2.3688 0 2.1311 0.237696 2.1311 0.530909L2.1311 7.46909C2.1311 7.7623 2.3688 8 2.66201 8Z" fill="#765FA7"/>
          </svg>

          <span class="tag__text" :class="`tag__text--${movedTo.type}`">
            {{ movedTo.presentation }}
          </span>
        </div>
      </div>
    </div>
    <span v-if="canPicked" class="message-circle" :class="{ 'message-circle--picked': isPickedMessage }">
      <svg v-if="isPickedMessage" width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.81232 6.72314L11.5356 0L12.573 1.03735L4.81561 8.79468L4.80988 8.78906L4.80658 8.79224L0 3.9856L1.03741 2.94824L4.81232 6.72314Z" fill="white"/>
      </svg>
    </span>
  </div>
</template>

<script>

import Message from '@/src/mixins/Message.vue';
import { setIdEditedMessage } from '@/src/utils/globals.js';

export default {
  mixins: [ Message ],
  data() {
    return {
      actions: [ '', '', '' ]
    }
  },
  methods: {
    pickMessage() {
      if (!this.canPicked) {
        return;
      }
      this.$emit('message:pick', this.id, !this.isPickedMessage);
    },
    getActionIcon(name) {
      const icons = {
        'quote': `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.40246 0.75H2.4034C1.87346 0.75 1.36523 0.957092 0.99051 1.32572C0.615789 1.69434 0.405273 2.19431 0.405273 2.71563V3.69844C0.405273 4.21975 0.615789 4.71972 0.99051 5.08834C1.36523 5.45697 1.87346 5.66406 2.4034 5.66406H3.48128L5.40185 9.25004V5.12014H5.40058V2.71563C5.40058 2.19431 5.19007 1.69434 4.81535 1.32572C4.44063 0.957092 3.93239 0.75 3.40246 0.75ZM8.59665 0.75H9.59572C10.1257 0.75 10.6339 0.957092 11.0086 1.32572C11.3833 1.69434 11.5938 2.19431 11.5938 2.71563V5.12014H11.5951V9.25004L9.67453 5.66406H8.59665C8.06672 5.66406 7.55849 5.45697 7.18377 5.08834C6.80905 4.71972 6.59853 4.21975 6.59853 3.69844V2.71563C6.59853 2.19431 6.80905 1.69434 7.18377 1.32572C7.55849 0.957092 8.06672 0.75 8.59665 0.75Z" fill="#765FA7"/>
                  </svg>`,
        'edit':  `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.32373 0.0175781L9.34131 0H9.30566L9.32373 0.0175781Z" fill="#919191"/>
                    <path d="M9.32373 0.0175781L7.7876 1.54932L10.4824 4.23584L12 2.68652L9.32373 0.0175781Z" fill="#919191"/>
                    <path d="M2.15527 7.16406L6.64648 2.68652L9.34082 5.37305L4.8501 9.85059L2.15527 7.16406Z" fill="#919191"/>
                    <path d="M0.898438 8.41797L0 12L3.59277 11.1045L0.898438 8.41797Z" fill="#919191"/>
                  </svg>`,
        'delete': `<svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.714286 9.77778C0.714286 10.45 1.35714 11 2.14286 11H7.85714C8.64286 11 9.28571 10.45 9.28571 9.77778L9.26562 3H0.714286V9.77778ZM10 0.611111H7.5L6.78571 0H3.21429L2.5 0.611111H0V1.83333H10V0.611111Z" fill="#765FA7"/>
                  </svg>`
      }

      return icons[name];
    },
    editMessage() {
      this.$emit('message:edit', this.text);

      setIdEditedMessage(this.id);
    },
    quoteMessage() {
      this.$emit('message:quote', {
        id: this.id,
        author: this.author,
        unix: this.unix,
        service: this.service,
        text: this.text
      });
    }
  },
  computed: {
    canPicked() {
      return this.isSupportMode;
    },
    isMovedMessage() {
      return this.movedTo && this.movedTo.type;
    }
  }
}
</script>

