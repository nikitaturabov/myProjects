<template>
  <transition
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false">
    <div class="act act--task">
      <NewMessage v-if="unread"></NewMessage>
      <div class="act__info">
        <span class="act__author">{{ author }}</span><time>{{ getDate() }}</time>
      </div>
      <div class="act__content">
        <svg class="act__icon" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.125 0H5.625C5.00368 0 4.5 0.50368 4.5 1.125H0V4.5V18H15.75V4.5V1.125H11.25C11.25 0.50368 10.7463 0 10.125 0ZM14.625 4.5V16.875H1.125V4.5H14.625ZM3.375 7.875H12.375V9H3.375V7.875ZM12.375 10.125H3.375V11.25H12.375V10.125ZM3.375 12.375H12.375V13.5H3.375V12.375Z" fill="#999999"/>
        </svg>

        <div class="wrap">
          <span class="act__title">
            {{ header }}
          </span><br>
          <span  class="act__status act__status--task">
            {{ important }}
          </span>
          <p class="act__text" v-html="content">
          </p>
        </div>
        <ul class="actions" :class="`actions--task`">
          <li class="actions__item">
            <a :href="url" class="actions__btn" v-html="getActionIcon('open')"  :title="getActionTitle('open')">  
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
    &--task {
      .act__title {
        color: #3e3e3e;
      }

      .act__info {
        color: #919191;
      }

      .act__content {
        border: 1px solid #9F9F9F;
      }

      .act__text {
        margin-top: 5px;

        white-space: pre-line;

        font-style: italic;
        color: #999;
      }

      .act__file {
        background: #F0F0F0;
        color: #7E7E7E;

        .icon {
          background: #B1B1B1;
        }
      }
      
      //change svg fill
      .act__preview .actions__item {
        background: #F0F0F0;

        svg {
          path {
            fill: #919191;
          }
        }
      }
    }

    &__status {
      &--task {
        margin-top: 4px;

        font-size: 12px;
        color: #FF423E;
      }
    }
  }
</style>
