<template>
  <transition 
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false">
    <div class="act" :class="way === 'out' ? 'act--phone-out' : 'act--phone-in'">
      <NewMessage v-if="unread"></NewMessage>
      <div class="act__info">
        <span class="act__author">{{ author }}</span><time>{{ getDate() }}</time>
      </div>
      <div class="act__body">
        <div class="act__content">
        
          <div class="act__angle" :class="`act__angle--${way}`"></div>
          <div class="act__call">
            
            <div v-html="getCallIcon(way)" class="act__icon">

            </div>

            <!-- <div class="act__subs" v-html="header"> -->
            <div class="act__subs">
              <template v-if="passcall">Пропущенный звонок</template>
              <template v-else>{{ callFrom }} → {{ callTo }}</template>
            </div>

            <!-- <span class="act__duration" :class="`act__duration--${status.class}`"> -->
            <span v-if="status.text" class="act__duration">
              {{ status.text }}
            </span>
          </div>

          <div class="act__call-content">
            {{ content }}
          </div>

          <a  
            v-for="(button, index) in buttons"
            class="act__btn" 
            :key="index"
            :class="`act__btn--${button.type}`"
            :href="button.url">
          
            {{ button.type === 'record' ?  'Запись разговора' : 
                button.type === 'callback' ? 'Перезвонить' : ''}}

          </a>
        </div>
        <ul class="actions" :class="`actions--${way}`">
          <li class="actions__item">
                              
            <a :href="url" class="actions__btn" v-html="getActionIcon('open')"  :title="getActionTitle('open')">  
            </a>
          </li>
        </ul>
      </div>
      <ul class="act__files" :class="`act__files--${way}`">
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
            <ul class="actions" :class="`actions--${way}`">
              <li class="actions__item actions__item--preview" :title="getActionTitle('download')">
                <a class="actions__btn" :href="file.link" @click="reply" v-html="getActionIcon('download')">
                  
                </a>
              </li>
            </ul>
          </div>

        </li>
      </ul>
    </div>
  </transition>
</template>

<script>

import Act from '@/src/mixin/Act.vue';
import ActWithButtons from '@/src/mixin/ActWithButtons.vue';
import ActWithFiles from '@/src/mixin/ActWithFiles.vue';

import NewMessage from '@/src/components/NewMessage.vue';
  
export default {
  mixins: [
    Act,
    ActWithButtons,
    ActWithFiles
  ],
  props: {
    way: {
      type: String,
      default: 'all' //half
    },
    buttons: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    getCallIcon(way) {
      const phoneIcons = {
        in: `<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0255 13.4327C17.0438 13.5655 17.0298 13.7008 16.9849 13.8271C16.9399 13.9534 16.8653 14.0671 16.7672 14.1585L14.307 16.5326C14.1911 16.6637 14.0485 16.7685 13.8888 16.8401C13.7264 16.9211 13.5519 16.9751 13.3721 17H13.0277C12.6566 16.9801 12.287 16.9391 11.9206 16.877C11.2765 16.7596 10.6488 16.5655 10.0509 16.2988C9.17099 15.9155 8.32707 15.4544 7.52914 14.9211C6.47098 14.1904 5.49004 13.3537 4.6015 12.424C3.82657 11.6859 3.11091 10.888 2.46113 10.0376C1.99873 9.37272 1.58751 8.67366 1.23102 7.94645C0.908123 7.37284 0.636448 6.77186 0.419157 6.15051C0.27187 5.72511 0.156737 5.28924 0.0747288 4.8466C0.0194903 4.55059 -0.00524117 4.24969 0.00092269 3.94863V3.5919C0.0335794 3.4107 0.0959226 3.23614 0.185438 3.07525C0.260211 2.91383 0.364512 2.7678 0.492963 2.64472L2.95317 0.258321C3.08485 0.107807 3.27039 0.0150386 3.46981 0C3.61619 0 3.75863 0.0474792 3.87574 0.135311C3.99935 0.224433 4.1039 0.337352 4.18327 0.467439L6.15143 4.13314C6.23282 4.33434 6.23282 4.55929 6.15143 4.76049C6.11448 4.97887 6.01144 5.18066 5.8562 5.33864L4.97053 6.22431C4.96167 6.26068 4.96167 6.29865 4.97053 6.33502C4.96219 6.37974 4.96219 6.42562 4.97053 6.47033C5.0199 6.78594 5.11522 7.09262 5.25346 7.38061C5.44948 7.74463 5.67148 8.09406 5.91771 8.42619C6.30266 8.93366 6.73068 9.40695 7.19701 9.84081C7.63658 10.2862 8.10949 10.6975 8.61163 11.0709C8.94876 11.3198 9.30218 11.5458 9.66952 11.7475C9.87847 11.8534 10.0967 11.9398 10.3215 12.0058H10.5429H10.6659C10.7078 11.9959 10.7461 11.9746 10.7766 11.9443L11.8099 10.8987C12.0165 10.715 12.2838 10.6142 12.5603 10.6158C12.7313 10.6069 12.9015 10.6452 13.0523 10.7265L16.5335 12.7808C16.6487 12.8388 16.7495 12.922 16.8283 13.0242C16.907 13.1264 16.9618 13.245 16.9886 13.3712L17.0255 13.4327ZM16.3514 7.06093L11.1603 6.48278L10.5822 1.29175L11.8123 1.15644L12.1825 4.57856L16.3119 0.449145L17.1817 1.31896L13.0505 5.45015L16.4867 5.83083L16.3514 7.06093Z" fill="#919191"/>
        </svg>`,
        out: `<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9538 1.58945L9.82335 5.70435L10.6914 6.56915L14.8185 2.45762L15.1977 5.85817L16.4131 5.72364L15.8484 0.57481L10.6678 0L10.5328 1.21077L13.9538 1.58945ZM16.9912 13.4534C17.0104 13.5855 16.997 13.7203 16.9521 13.8461C16.9072 13.9718 16.8321 14.0847 16.7334 14.175L14.2781 16.5354C14.1624 16.6657 14.0201 16.77 13.8607 16.8411C13.6987 16.9216 13.5245 16.9753 13.3451 17.0001H13.0014C12.6306 16.9867 12.2613 16.9458 11.8965 16.8778C11.2538 16.7611 10.6273 16.5681 10.0306 16.303C9.15248 15.9219 8.31027 15.4635 7.51394 14.9332C6.43536 14.2024 5.43566 13.3622 4.53083 12.4261C3.77905 11.6939 3.08541 10.9048 2.45616 10.0657C1.99705 9.39888 1.58678 8.69996 1.22854 7.97437C0.90833 7.42003 0.637228 6.83895 0.418311 6.23771C0.270753 5.79829 0.155864 5.34864 0.0745779 4.89241C0.0194509 4.5981 -0.00523059 4.29894 0.000920827 3.99962V3.66941C0.0258013 3.4907 0.0797022 3.31721 0.160511 3.15575C0.235986 2.98581 0.349341 2.83523 0.491968 2.71547L2.9472 0.330615C3.07862 0.180969 3.26378 0.0887365 3.4628 0.0737847C3.6089 0.0737847 3.75105 0.12099 3.86792 0.208315C3.98859 0.299903 4.09243 0.411625 4.17482 0.538525L6.13901 4.18307C6.21897 4.38335 6.21897 4.60652 6.13901 4.8068C6.10214 5.02392 5.99931 5.22455 5.84438 5.38161L4.9605 6.26217C4.95165 6.29833 4.95165 6.33608 4.9605 6.37224C4.95218 6.4167 4.95218 6.46231 4.9605 6.50677C5.01646 6.79542 5.11145 7.07518 5.24285 7.33841C5.43848 7.70033 5.66003 8.04775 5.90576 8.37796C6.27321 8.88898 6.68391 9.3677 7.13338 9.80887C7.58398 10.2875 8.07251 10.7292 8.59425 11.1297C8.9307 11.3772 9.2834 11.6019 9.65 11.8024C9.85606 11.913 10.0744 11.9992 10.3006 12.0592H10.5216H10.6444C10.6807 12.068 10.7186 12.068 10.7549 12.0592L11.8106 11.0074C12.0168 10.8247 12.2835 10.7245 12.5595 10.7261C12.7302 10.7173 12.9 10.7554 13.0505 10.8362L16.5247 12.8786C16.6387 12.9377 16.7383 13.0208 16.8168 13.1222C16.8952 13.2236 16.9506 13.3408 16.9789 13.4656L16.9912 13.4534Z" fill="#779733"/>
        </svg>`
      };

      return phoneIcons[way];
    }
  },
  components: {
    NewMessage
  }
}
</script>

<style lang="scss">
  .act {
    &--phone-out, &--phone-in {
      .act__content {
        flex-direction: column;
        width: 84%;
      }
    }

    &--phone-in {
      .act__info {
        justify-content: flex-start;
      }

      .act__content {
        background: #F0F0F0;
        border-radius: 10px 10px 10px 0;
      }

      .actions__item {
        &:hover {
          background: #D1D0D0;
        }
      }
    }

    &--phone-out {
      .act__info {
        color: #576F25;
      }

      .act__content {
        // margin-right: 0;
        // margin-left: auto;

        background: #DAF2A9;
        
        border-radius: 10px 10px 0 10px;
      }

      .act__btn--record {
        background: #779733;

        &:hover {
          background: #526C1D;
        }
      }

      .actions__item {
        &:hover {
          background: #BED391;
        }
      }
    }

    &__content {
      &--phonecall {
        flex-direction: column;
        background: #F0F0F0;
      }
    }

    &__call {
      display: flex;
      align-items: center;
    }

    &__btn {
      display: block;

      align-self: flex-start;
      
      margin-left: 35px;
      margin-top: 7px;

      padding: 5px 8px;

      font-size: 14px;
      color: #fff;

      transition: .2s;

      text-decoration: none;

      border-radius: 3px;

      &--record {
        background: #00A5B2;

        &:hover {
          background: #007D87;
        }
      }

      &--callback {
        background: #FF423E;
        
        &:hover {
          background: #C63836;
        }
      }

      &--green {
        background: #779733;
      }
    }

    &__subs {
      margin-left: 6px;

      font-size: 14px;
      color: #3e3e3e;
    }

    &__duration {
      padding: 4px 9px;
      margin-left: 7px;

      border: 1px solid #919191;
      border-radius: 20px;

      font-size: 11px;
      font-weight: 700;
      color: #919191;
    }
  }
</style>

