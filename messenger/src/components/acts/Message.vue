<template>
  <transition 
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false">
    <div class="act" :class="way === 'out' ? 'act--message-out' : 'act--message-in'">
      <NewMessage v-if="unread"></NewMessage>

      <div class="act__info" :class="[{ 'act__info--opacity': !sent }, `act__info--${way}` ]" v-html="getTitle" :title="to">
        <!-- {{ getTitle }}&nbsp;<time>{{ getDate() }}</time> -->
      </div>
      <div class="act__body">
        <div class="act__inner" :class="{ 'act__inner--opacity': !sent }">
          <div v-if="content.length > 0 || (content.length === 0 && files.length === 0)" :class="[state !== undefined && state.status ?
                      `act__content act__content--${state.status}` : 
                      statusType === 'email' ? 'act__content act__content--email' : 'act__content',  { 'act__content--wait': !sent && !error },  { 'act__content--error': !sent && error } ]">
            
            <div class="act__angle" :class="[ `act__angle--${way}`, { 'act__angle--opacity': !sent } ]"></div>

            <div class="act__holder" :style="{ 'flex-direction': statusType === 'email' || (!!state.status && state.status !== '') ? 'column': 'row' }" :class="`act__holder--${statusType}`">          
            <!-- <div class="act__holder" :style="{ 'flex-direction': statusType === 'email' || (!!state.status && state.status !== '') ? 'column': 'row' }" :class="`act__holder--${statusType}`"> -->
              <div class="act__head" :class="`act__head--${statusType}`">
                <template v-if="state !== undefined && state.status">
                  <template v-if="getMessageIcon(`${statusType}-${state.status}`) !== undefined">
                    <div v-html="getMessageIcon(`${statusType}-${state.status}`)" class="act__icon"></div>
                    <span v-if="statusType === 'cabinet'" class="act__message-status">
                      {{ messageStatus }}
                    </span>
                    <span v-if="statusType === 'cabinet'" class="act__name">
                      <template v-if="state.author">{{ state.author }}&nbsp;</template>
                      {{ stateDate() === 'Invalid date' ? '' : stateDate() }}
                    </span>
                  </template>
                </template>
                <template v-else>
                  <!-- <div v-if="statusType !== 'message'" :style="statusType === 'cabinet' ? 'min-width: 0px' : 'auto'" v-html="getMessageIcon(statusType)" class="act__icon" :class="{ 'act__icon--cloud': state.status.length === 0 }"></div> -->
                  <div v-if="statusType !== 'message'" :style="statusType === 'cabinet' ? 'min-width: 0px' : 'auto'" v-html="getMessageIcon(statusType)" class="act__icon" :class="{ 'act__icon--cloud': state.status === '' }"></div>
                  <div v-if="statusType === 'email'" class="act__email-info" v-html="header"></div>

                  <!-- <div v-if="(statusType === 'vk' || statusType === 'telegram' || statusType === 'viber') && callTo" class="act__email-info">Кому: {{ callTo }}</div> -->
                </template>

                <div v-if="status.text" class="act__status act__status--email">
                  {{ status.text }}
                </div>
              </div>

              <div class="wrap">
                <!-- <p class="act__text" :class="{ 'act__text--cloud': state.status === '' }" :style="{ 'padding-left': (statusType === 'vk' || statusType === 'telegram' || statusType === 'viber') && callTo ? '28px': '0px' }" v-html="content" > -->
                <p class="act__text" :class="{ 'act__text--cloud': state.status === '' }" v-html="content" >
                  <!-- {{ content }} -->
                </p>
                <div class="act__more" v-if="statusType === 'email' && content.length > 0">
                  <a class="act__link" :href="url">Далее</a>
                </div>
              </div>
            </div>
            <div v-if="quote" class="act__quote">
              {{ quote.text }}
              <div class="quote-info">
                {{ quote.from }} · {{ quoteDate() }}
              </div>

            </div>
          </div>
          <ul class="act__files">
            <li v-for="(file, index) in files" :key="index">
              <a :href="file.link" class="act__file file" v-if="file.extension === 'pdf' || !file.thumb">
                <span class="file__name">{{ file.name }}</span>
                <div class="icon">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="#B1B1B1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2069 6.83624C11.131 6.66845 10.9641 6.56159 10.7804 6.56159H8.90563V0.468685C8.90563 0.209971 8.69566 0 8.43694 0H6.56219C6.30347 0 6.0935 0.209971 6.0935 0.468685V6.56159H4.21875C4.03502 6.56159 3.86817 6.66939 3.79224 6.83624C3.71537 7.00403 3.74537 7.19994 3.86629 7.33867L7.14711 11.0882C7.23616 11.1903 7.36458 11.2484 7.49957 11.2484C7.63455 11.2484 7.76297 11.1894 7.85202 11.0882L11.1328 7.33867C11.2547 7.20088 11.2828 7.00403 11.2069 6.83624Z" fill="white"/>
                    <path d="M12.9982 10.3107V12.5604H1.99972V10.3107H0V13.3103C0 13.7249 0.447938 14.0602 0.999862 14.0602H13.9981C14.551 14.0602 14.9979 13.7249 14.9979 13.3103V10.3107H12.9982Z" fill="white"/>
                  </svg>
                </div>
              </a>
              
              <div class="act__preview" v-if="file.thumb && file.extension !== 'pdf'">
                  <!-- <img v-if="file.thumb.URL && file.thumb.URL.length > 0" :src="file.thumb.URL" alt=""> -->

                  <a :href="file.link" class="act__image-bg" v-if="file.thumb.URL && file.thumb.URL.length > 0"
                      :style="{
                        'background-size': file.thumb.width > 312 ? 'cover': `${file.thumb.width}px ${file.thumb.height}px`,
                        'background-image': `url('${file.thumb.URL}')`,
                        'width': file.thumb.width + 'px',
                        'height': file.thumb.height + 'px', }">

                  </a>
                  <ul class="actions" v-if="sent" :class="`actions--${way}`">
                    <li class="actions__item actions__item--preview" :title="getActionTitle('download')">
                      <a class="actions__btn" :href="file.link" @click="reply" v-html="getActionIcon('download')">
                        
                      </a>
                    </li>
                  </ul>
              </div>

            </li>
          </ul>
        </div>
        <ul class="actions" :class="`actions--${way}`">
          <li class="actions__item" v-if="way === 'in' && sent" :title="getActionTitle('reply')">
            <button class="actions__btn" @click="reply" v-html="getActionIcon('reply')">
              
            </button>
          </li>
          <li class="actions__item" v-if="sent" :title="getActionTitle('quote')">
            <button class="actions__btn" @click="setQuote" v-html="getActionIcon('quote')">
            </button>
          </li>
          
          <li v-for="(action, index) in actions"
              :key="index"
              :title="getActionTitle(action.type)"
              class="actions__item">
                            
              <a :href="action.url" class="actions__btn" v-html="getActionIcon(action.type)">  
              </a>
          </li>

          <!-- type === email -->
          <li class="actions__item" v-if="statusType === 'email'">
                            
            <a :href="url" class="actions__btn" v-html="getActionIcon('open')" :title="getActionTitle('open')">  
            </a>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>

import Act from '@/src/mixin/Act.vue';
import ActWithFiles from '@/src/mixin/ActWithFiles.vue';
import ActWithButtons from '@/src/mixin/ActWithButtons.vue';

import NewMessage from '@/src/components/NewMessage.vue';

import moment from 'moment';

// "cabinet", "vk", "viber", "telegram", "email"
//getActionIcon

export default {
  props: {
    to: {
      type: String,
      default: null
    },
    newMessage: {
      type: Boolean,
      default: false
    },
    sent: {
      type: Boolean,
      default: true
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  mixins: [
    Act,
    ActWithFiles,
    ActWithButtons
  ],
  data() {
    return {
    }
  },
  computed: {
    messageStatus() {
      return this.state.status === 'approved' ? 'Согласовано' :
              this.state.status === 'decline' ? 'Отклонено' : 
              this.state.status === 'await' ? 'Ожидает согласования': '';
    },
  },
  methods: {
    stateDate() {
      if (this.state.date && this.state.date.length === 0) {
        return '';
      }

      if (moment(this.state.date).format('YYYY') === '0001') {
        return '';
      }
      
      let offset = new Date().getTimezoneOffset();

      return moment(this.state.date).utcOffset(offset / -30).format('DD.MM.YYYY HH:mm');
    },
    quoteDate() {
      let offset = new Date().getTimezoneOffset();

      return moment(this.quote.date).utcOffset(offset / -30).format('DD.MM.YYYY · HH:mm');
    },
    getMessageIcon(type) {
      const messageIcons = {
        vk: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.8141 0.872925H2.8617C1.74456 0.872925 0.837891 1.77959 0.837891 2.89673V15.8491C0.837891 16.9663 1.74456 17.8729 2.8617 17.8729H15.8141C16.9312 17.8729 17.8379 16.9663 17.8379 15.8491V2.89673C17.8379 1.77959 16.9312 0.872925 15.8141 0.872925ZM14.4865 12.611L12.9767 12.607C12.9767 12.607 12.9443 12.611 12.8917 12.611C12.7703 12.611 12.5193 12.5786 12.2238 12.3763C11.6936 12.0079 11.1877 11.0932 10.7869 11.0932C10.7586 11.0932 10.7343 11.0972 10.71 11.1053C10.3619 11.2146 10.2567 11.5627 10.2567 11.9877C10.2567 12.1374 10.1515 12.2063 9.86813 12.2063H9.08694C8.21265 12.2063 7.3667 12.186 6.41551 11.1458C5.01503 9.61173 3.70361 6.88364 3.70361 6.88364C3.70361 6.88364 3.63075 6.72578 3.70765 6.63269C3.78051 6.54769 3.95051 6.53959 4.01527 6.53959C4.03146 6.53959 4.03956 6.53959 4.03956 6.53959H5.65861C5.65861 6.53959 5.80837 6.56793 5.91765 6.64888C6.01075 6.71769 6.05932 6.84316 6.05932 6.84316C6.05932 6.84316 6.33456 7.37745 6.67861 7.98054C7.25741 8.97626 7.56908 9.30816 7.7917 9.30816C7.82813 9.30816 7.86456 9.30007 7.90099 9.27983C8.23289 9.09769 8.13575 7.62435 8.13575 7.62435C8.13575 7.62435 8.1398 7.09007 7.96575 6.85531C7.83218 6.66912 7.57718 6.6165 7.46384 6.60031C7.3748 6.58816 7.52051 6.37769 7.7148 6.28054C7.96575 6.15912 8.38265 6.13483 8.88456 6.13483H9.12741C9.60099 6.14293 9.61313 6.1915 9.79932 6.23602C10.3579 6.36959 10.1677 6.89173 10.1677 8.14245C10.1677 8.54316 10.0948 9.10578 10.3822 9.29602C10.4024 9.30816 10.4307 9.31626 10.4672 9.31626C10.6534 9.31626 11.0541 9.07745 11.6936 7.99673C12.0498 7.3815 12.325 6.77031 12.325 6.77031C12.325 6.77031 12.3857 6.66102 12.4788 6.60435C12.5679 6.55173 12.5679 6.55173 12.6853 6.55173H12.6974C12.8269 6.55173 14.1141 6.53959 14.3974 6.53959H14.4298C14.701 6.53959 14.9479 6.54364 14.9924 6.70959C15.0572 6.96054 14.7941 7.40983 14.1019 8.34078C12.9605 9.86674 12.831 9.7534 13.7781 10.6358C14.6848 11.4777 14.871 11.8865 14.9034 11.9391C15.2798 12.5624 14.4865 12.611 14.4865 12.611Z" fill="#B1B1B1"/>
        </svg>`,
        telegram: `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.14077 8.06684L5.09196 9.54155L6.62132 14.4599C6.71917 14.7749 7.10437 14.8914 7.36004 14.6823L9.5625 12.8869C9.79337 12.6987 10.1222 12.6894 10.3635 12.8645L14.3359 15.7486C14.6094 15.9474 14.9969 15.7975 15.0655 15.467L17.9755 1.46923C18.0504 1.10821 17.6957 0.807042 17.3519 0.939995L1.13614 7.19556C0.735969 7.34989 0.739456 7.91645 1.14077 8.06684ZM6.37485 8.75652L14.0969 4.00047C14.2357 3.91525 14.3785 4.1029 14.2593 4.21345L7.88636 10.1374C7.66236 10.346 7.51786 10.625 7.47693 10.9279L7.25984 12.5367C7.23109 12.7515 6.92935 12.7728 6.87007 12.5649L6.03515 9.63123C5.93952 9.29662 6.07887 8.9392 6.37485 8.75652Z" fill="#779733"/>
        </svg>`,
        viber: `<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.8137 4.56575C16.498 3.41504 15.8726 2.50471 14.9554 1.86038C13.7977 1.04629 12.4664 0.757991 11.3168 0.582864C9.72564 0.340826 8.28463 0.306544 6.91203 0.477954C5.62443 0.639037 4.6558 0.895531 3.77096 1.31063C2.03811 2.12307 0.997829 3.43776 0.679674 5.21835C0.525454 6.08242 0.421427 6.86429 0.361115 7.60899C0.222276 9.33217 0.348162 10.8567 0.746463 12.2701C1.13464 13.648 1.81305 14.6322 2.82014 15.2786C3.07717 15.4434 3.40544 15.5628 3.72319 15.6776C3.90373 15.7429 4.07899 15.8061 4.22309 15.8742C4.35586 15.937 4.35586 15.949 4.35465 16.0622C4.34331 17.0419 4.35465 18.9612 4.35465 18.9612V20.3749L5.07879 19.371L5.19658 19.2553C5.27268 19.1806 7.06058 17.4186 7.69689 16.7094L7.78352 16.6098C7.89321 16.4818 7.89321 16.4818 8.00614 16.4797C8.86589 16.4624 9.74466 16.4285 10.6178 16.3802C11.6759 16.3211 12.9015 16.217 14.0555 15.7255C15.112 15.2753 15.8827 14.5612 16.3462 13.6025C16.8295 12.6026 17.1165 11.5196 17.2241 10.2917C17.4128 8.13355 17.2788 6.26044 16.8137 4.56575ZM13.0096 12.9603C12.7449 13.4018 12.3486 13.7074 11.8819 13.9065C11.5411 14.0519 11.193 14.0213 10.857 13.876C8.0365 12.6583 5.82561 10.739 4.36355 7.98031C4.0624 7.41239 3.85272 6.79325 3.61269 6.1927C3.56331 6.0692 3.56655 5.92422 3.54509 5.78958C3.56574 4.81894 4.29515 4.27333 5.03184 4.1077C5.31356 4.04409 5.5625 4.1457 5.77177 4.34932C6.34979 4.91229 6.80679 5.56489 7.15125 6.29719C7.30224 6.61812 7.23423 6.9027 6.9772 7.14144C6.92417 7.191 6.86831 7.23726 6.81084 7.28146C6.22553 7.73084 6.13931 8.07035 6.45139 8.74649C6.98287 9.8972 7.86407 10.6696 9.00473 11.1487C9.30548 11.2751 9.58842 11.2127 9.81793 10.9641C9.84869 10.9306 9.8835 10.8988 9.90617 10.8604C10.3559 10.095 11.008 10.171 11.6099 10.6076C12.0053 10.8947 12.3899 11.1966 12.7809 11.4894C13.3771 11.9359 13.3719 12.3556 13.0096 12.9603ZM9.26986 5.3278C9.1375 5.3278 9.00432 5.33896 8.87358 5.36126C8.65257 5.39926 8.44452 5.24685 8.40768 5.02174C8.37085 4.79664 8.5198 4.58393 8.74041 4.54634C8.91487 4.51702 9.09297 4.50173 9.26986 4.50173C11.0238 4.50173 12.4502 5.95768 12.4502 7.74695C12.4502 7.92868 12.4352 8.11042 12.4065 8.28761C12.3729 8.48917 12.2017 8.63208 12.0074 8.63208C11.9851 8.63208 11.9624 8.63043 11.9398 8.6263C11.7196 8.5883 11.5706 8.37558 11.6079 8.15048C11.6297 8.01872 11.6406 7.88325 11.6406 7.74695C11.6406 6.41284 10.5773 5.3278 9.26986 5.3278ZM11.2359 7.80601C11.2359 8.034 11.0545 8.21904 10.8311 8.21904C10.6076 8.21904 10.4263 8.034 10.4263 7.80601C10.4263 7.12285 9.88148 6.56691 9.21197 6.56691C8.98854 6.56691 8.8072 6.38187 8.8072 6.15387C8.8072 5.92588 8.98854 5.74084 9.21197 5.74084C10.3279 5.74084 11.2359 6.66727 11.2359 7.80601ZM13.5467 8.72336C13.5042 8.91542 13.3375 9.04511 13.1525 9.04511C13.1229 9.04511 13.0926 9.04181 13.0626 9.03479C12.8444 8.9844 12.708 8.76301 12.7574 8.5408C12.8161 8.27687 12.8457 8.00468 12.8457 7.73084C12.8457 5.72266 11.2444 4.0887 9.27633 4.0887C9.00797 4.0887 8.74122 4.11885 8.48257 4.17874C8.26561 4.22996 8.04783 4.08994 7.99845 3.86731C7.94907 3.64469 8.08548 3.42371 8.30365 3.37332C8.621 3.2998 8.94846 3.26263 9.27674 3.26263C11.6912 3.26263 13.6556 5.26709 13.6556 7.73084C13.6556 8.06581 13.6188 8.39995 13.5467 8.72336Z" fill="#B1B1B1"/>
        </svg>`,
        email: `<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4568 0H2.08166C0.933844 0 0 0.807878 0 1.80087V10.1991C0 11.1921 0.933844 12 2.08166 12H15.4568C16.6047 12 17.5385 11.1921 17.5385 10.1991V1.80087C17.5385 0.807878 16.6047 0 15.4568 0ZM15.4568 10.4101H2.08166C1.91294 10.4101 1.76497 10.3116 1.76497 10.1991V2.9114L7.81421 7.51208C7.93822 7.60643 8.09593 7.65837 8.25832 7.65837L9.27996 7.65841C9.44226 7.65841 9.60006 7.60643 9.72412 7.51208L15.7736 2.91124V10.1992C15.7735 10.3116 15.6255 10.4101 15.4568 10.4101ZM8.76925 6.07974L2.88562 1.58987H14.6529L8.76925 6.07974Z" fill="#779733"/>
        </svg>`,
        'cabinet-approved': `<svg class="approved" width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.36014 11.7018L5.35742 11.7046L5.6221 11.9638L6.83221 13.1739L6.84479 13.1614L7.5921 13.8933L18.3062 3.04141L16.1175 0.852661L7.53958 9.50378L3.1741 5.13831L0.985352 7.32706L5.36014 11.7018Z" fill="#607F20"/>
          </svg>`,
        'cabinet-await': `<svg class="await" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.12487 14.5314C9.55417 14.5314 9.90219 14.1834 9.90219 13.7541C9.90219 13.3248 9.55417 12.9768 9.12487 12.9768C8.69557 12.9768 8.34756 13.3248 8.34756 13.7541C8.34756 14.1834 8.69557 14.5314 9.12487 14.5314Z" fill="#3E3E3E"/>
          <path d="M9.12502 17.8729C10.8062 17.8729 12.4495 17.3744 13.8474 16.4404C15.2452 15.5064 16.3346 14.1789 16.978 12.6257C17.6213 11.0725 17.7896 9.36347 17.4617 7.71464C17.1337 6.0658 16.3242 4.55125 15.1354 3.36251C13.9467 2.17377 12.4321 1.36423 10.7833 1.03625C9.13445 0.70828 7.42539 0.876608 5.87223 1.51995C4.31906 2.16329 2.99155 3.25276 2.05756 4.65057C1.12357 6.04838 0.625054 7.69176 0.625054 9.3729C0.621052 10.4903 0.838178 11.5974 1.26392 12.6304C1.68967 13.6635 2.31562 14.6021 3.10571 15.3922C3.89581 16.1823 4.83443 16.8083 5.8675 17.234C6.90057 17.6597 8.00767 17.8769 9.12502 17.8729ZM9.12502 2.10452C10.5626 2.10452 11.9678 2.5308 13.1631 3.32946C14.3584 4.12812 15.29 5.26329 15.8401 6.59141C16.3903 7.91953 16.5342 9.38096 16.2537 10.7909C15.9733 12.2008 15.281 13.4959 14.2645 14.5124C13.248 15.5289 11.9529 16.2212 10.543 16.5016C9.13309 16.7821 7.67166 16.6381 6.34354 16.088C5.01541 15.5379 3.88025 14.6063 3.08159 13.411C2.28292 12.2157 1.85664 10.8104 1.85664 9.3729C1.85531 8.41803 2.04241 7.47228 2.40721 6.58984C2.77201 5.7074 3.30734 4.90561 3.98254 4.23041C4.65773 3.55522 5.45952 3.01988 6.34196 2.65508C7.2244 2.29028 8.17015 2.10319 9.12502 2.10452Z" fill="#3E3E3E"/>
          <path d="M6.50026 7.82837C6.6533 7.8341 6.80267 7.78066 6.91735 7.67914C7.03202 7.57763 7.10318 7.43585 7.11605 7.28324C7.12943 6.93515 7.20819 6.59269 7.34824 6.27374C7.4938 5.97302 7.72694 5.72337 8.01702 5.55761C8.3071 5.39185 8.64054 5.31774 8.97353 5.345C9.27155 5.32167 9.57104 5.36481 9.85036 5.4713C10.1297 5.57779 10.3819 5.74498 10.5887 5.96079C10.7073 6.14227 10.7889 6.34538 10.8287 6.55847C10.8686 6.77156 10.8659 6.99042 10.8209 7.20248C10.5776 7.8208 10.198 8.37633 9.71046 8.82777C9.024 9.52432 8.39811 10.1401 8.39811 10.9982C8.41212 11.1585 8.48284 11.3086 8.59755 11.4215C8.71227 11.5343 8.86347 11.6026 9.024 11.614C9.17927 11.5902 9.32115 11.5123 9.42459 11.3941C9.52803 11.2759 9.58637 11.125 9.58932 10.9679C9.58932 10.5742 10.0537 10.1098 10.5181 9.65556C11.1732 9.06013 11.6753 8.31566 11.9818 7.48514C12.099 7.09614 12.1254 6.68544 12.0589 6.28465C11.9924 5.88386 11.8348 5.50368 11.5982 5.17339C11.2807 4.81465 10.8858 4.53281 10.4433 4.34917C10.0008 4.16554 9.52241 4.08492 9.04419 4.11341C8.4794 4.06403 7.91348 4.19468 7.42748 4.48664C6.94149 4.77859 6.56038 5.21688 6.33874 5.73871C6.1427 6.23418 6.01369 6.75361 5.95513 7.28324C5.87437 7.59618 6.10656 7.82837 6.50026 7.82837Z" fill="#3E3E3E"/>
        </svg>`,
        'cabinet-decline': `<svg class="decline" width="16" height="16" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23619 7.63416L0 12.915L2.65952 15.5199L7.84625 10.2665L13.0553 15.52L15.6602 12.9151L10.4457 7.63362L15.4106 2.60487L12.8058 0L7.84678 5.00129L2.90906 8.47632e-05L0.249546 2.60495L5.23619 7.63416Z" fill="#FF423E"/>
        </svg>`
      };
      
      return messageIcons[type];
    },
  },
  components: {
    NewMessage
  }
}
</script>

<style lang="scss">
  .act {
    &--message-out, &--message-in {
      .act__inner {
        width: 84%;
      }

      .act__text {
        font-size: 14px;
        white-space: pre-line;
        color: #3E3E3E;
      }

      .wrap {
        margin-left: 0;
      }

      .act__content {
        flex-direction: column;
      }


      .act__icon {
        svg.approved {
          path {
            fill: #607F20;
          }
        }

        svg.decline {
          path {
            fill: #FF423E;
          }
        }

        svg.await {
          path {
            fill: #3E3E3E;
          }
        }
      }
    }

    &--message-out {
      .act__link {
        color: #779733;
        border-color: #779733;
      }

      .act__content {
        border-radius: 10px 10px 0 10px;
      }

      .act__icon {
        svg {
          path {
            fill: #779733;
          }
        }
      }

      .act__content {

        background: #DAF2A9;
      }

      .act__info {
        color: #75962F;
      }

      .act__files {
        align-items: flex-end;
      }

      .act__content--email .act__head {
        color: #779733;
      }

      .act__file {
        color: #779733;
        background: #DAF2A9;

        .icon {
          background: #779733;
        }
      }
      
      .actions__item {
        &:hover {
          background: #BED391;
        }
      }

      .act__email-info {
        color: #779733;
      }
    }

    &--message-in {
      
      .act__content {
        border-radius: 10px 10px 10px 0;

        &--wait::before {
          left: auto;
          right: -24px;
        }

        &--error::before {
          left: auto;
          right: -24px;
        }
      }

      .act__icon {
        svg {
          path {
            fill: #919191;
          }
        }
      }

      .act__info {
        justify-content: flex-start;
        color: #AEAEAE;
      }

      .act__email-info {
        color: #9D9D9D;
      }

      .act__content--email .act__head {
        color: #9D9D9D;
      }

      .act__content {
        background: #F0F0F0;
      }

      .act__files {
        align-items: flex-start;
      }

      .actions__item {
        &:hover {
          background: #D1D0D0;
        }
      }
    }

    &__message-status {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    &__content {
      &--approved, &--decline, &--await {
        flex-direction: column;

        .act__head {
          margin-bottom: 13px;
        }

        .act__message-status {
          margin-right: 10px;
        }
      }

      &--approved {
        .act__message-status {
          color: #55711B;
        }
      }

      &--decline {
        .act__message-status {
          color: #FF423E;
        }
      }

      &--await {
        .act__message-status {
          color: #3E3E3E;
        }
      }

      &--email {
        .act__holder {
          flex-direction: column;
        }

        .wrap {
          padding-left: 30px;
        }

        .act__head {
          margin-bottom: 8px;
        }

        .act__head {
          font-size: 12px;
          font-style: italic;
        }
      }
    }

    &__email-info {
      display: flex;
      flex-direction: column;

      width: 100%;

      font-size: 12px;
      font-style: italic;
      line-height: 1.5;

      white-space: pre-line;
      
      word-break: break-word;
      word-wrap: break-word;
    }
      
    .quote-info {
      margin-top: 8px;

      font-size: 11px;
      font-weight: 700;

      color: #576F25;
    }

    &__preview {
      display: flex;

      padding-top: 5px;

      .actions {
        &--in {
          margin-left: 5px;
        }
        
        &--out {
          margin-right: 5px;
        }
      }

      &:hover {
        .actions__item--preview {
          opacity: 1;
        }
      }
    }

    &__image-bg {
      position: relative;

      max-width: 500px;
      height: 180px;

      background-repeat: no-repeat;
      background-position: center center;

      border-radius: 10px;

      &:before {
        content: '';

        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background: rgba(196, 196, 196, 0.1);
        border-radius: 10px;
      }
    }
  }

  .file {
    &__name {
      max-width: 253px;
      overflow: hidden;
      white-space: nowrap;
    }
  }
</style>
