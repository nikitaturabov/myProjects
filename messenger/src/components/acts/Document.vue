<template>
  <transition
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false">
    <div class="act act--document">
      <NewMessage v-if="unread"></NewMessage>
      <div class="act__info">
        <span class="act__author">{{ author }}</span><time>{{ getDate() }}</time>
      </div>
      <div class="act__body">
        <div class="act__inner">
          <div class="act__content act__content--document">
            <div class="act__icon"
                :class="`icon--${statusType}`">

            </div>

            <div class="wrap">
              <div class="act__title act__title--document">
                {{ header }}

                <span v-if="status.class" class="act__status-doc" :class="`act__status-doc--${status.class}`">
                  {{ status.text }}
                </span>      
              </div>
              <p class="act__text act__text--document">{{ content }}</p>
            </div>
          </div>
        </div>
        
        <ul class="actions" :class="`actions--in`">
          <li v-for="(action, index) in actions"
              :key="index"
              class="actions__item">
                            
              <a :href="action.url" class="actions__btn" v-html="getActionIcon(action.type)" :title="getActionTitle(action.type)">  
              </a>
          </li>
          <li class="actions__item">
                            
            <a :href="url" class="actions__btn" v-html="getActionIcon('open')" :title="getActionTitle('open')">  
            </a>
          </li>
        </ul>
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
    status: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      
    }
  },
  components: {
    NewMessage
  }
}
</script>

<style lang="scss">

  .act {
    &--document {
      .act__body {
        justify-content: flex-end;
      }

      .act__inner {
        width: 55%;
      }

      .actions {
        order: -1;
        margin-right: 8px;
        max-width: 48px;
      }

      .actions__item {
        background: transparent;

        svg {
          path {
            fill: #919191;
          }
        }
        &:hover {
          background: #F0F0F0;
        }
      }


    }

    &__content {
      &--document {
        padding-bottom: 25px;

        border: 1px solid #d7d6d6;
      }
    }

    &__status-doc {
      width: auto;

      margin-left: 12px;
      padding: 4px 10px;

      min-height: 20px;

      font-size: 11px;
      font-weight: 700;

      border-radius: 20px;

      &--red {
        color: #FF423E;
        border: 1px solid #FF423E;
      }

      // &--cyan {
      //   color: #5C839E;
      //   border: 1px solid #5C839E;
      // }

      &--gray {
        color: #5C839E;
        border: 1px solid #5C839E;
      }

      &--green {
        color: #00AA45;
        border: 1px solid #00AA45;
      }
    }

    &__text {
      &--document {
        margin-top: 10px;

        font-style: italic;
        color: #999999;

        white-space: pre-line;
      }
    }
  }
</style>

