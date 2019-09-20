<template>
  <transition
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  
  >
    <div class="act act--comment">
      <NewMessage v-if="unread"></NewMessage>
      <div class="act__info">
        <span class="act__author">{{ author }}</span><time>{{ getDate() }}</time>
      </div>
      <div class="act__content act__content--comment">
        <div class="act__head">
          <svg class="act__icon" width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3468 15C16.195 15 16.0457 14.9445 15.9261 14.8392L12.3018 12.1118H0.622688C0.279373 12.1118 0 11.8208 0 11.4631V0.648655C0 0.291023 0.279373 0 0.622688 0H16.3773C16.7206 0 17 0.291023 17 0.648655V14.3197C17 14.5949 16.8424 14.8412 16.5986 14.9472C16.517 14.9827 16.4315 15 16.3468 15ZM12.8242 11.2248L16.0039 13.6177V1.03763H0.996094V11.0742H12.425C12.5726 11.0742 12.7124 11.1273 12.8242 11.2248Z" fill="#B9B7B7"/>
            <path d="M13.0555 4.11059H3.94515C3.66878 4.11059 3.44479 3.87635 3.44479 3.58733C3.44479 3.29831 3.66878 3.06408 3.94515 3.06408H13.0555C13.3319 3.06408 13.5559 3.29831 13.5559 3.58733C13.5559 3.87635 13.3319 4.11059 13.0555 4.11059Z" fill="#B9B7B7"/>
            <path d="M13.0555 6.56981H3.94515C3.66878 6.56981 3.44479 6.33557 3.44479 6.04655C3.44479 5.75753 3.66878 5.52329 3.94515 5.52329H13.0555C13.3319 5.52329 13.5559 5.75753 13.5559 6.04655C13.5559 6.33557 13.3319 6.56981 13.0555 6.56981Z" fill="#B9B7B7"/>
            <path d="M7.99698 9.09719H3.94781C3.6701 9.09719 3.44479 8.86295 3.44479 8.57393C3.44479 8.28491 3.6701 8.05067 3.94781 8.05067H7.99698C8.27469 8.05067 8.5 8.28491 8.5 8.57393C8.5 8.86295 8.27469 9.09719 7.99698 9.09719Z" fill="#B9B7B7"/>
          </svg>
          <!-- <p class="act__text act__text--comment">{{ content }}</p> -->
          <p class="act__text act__text--comment" v-html="content"></p>
        </div>
        
        <ul class="actions" :class="`actions--in`">
          <li v-for="(action, index) in actions"
              :key="index"
              class="actions__item">
                            
              <a :href="action.url" class="actions__btn" v-html="getActionIcon(action.type)" :title="getActionTitle(action.type)">  
              </a>
          </li>
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
import ActWithFiles from '@/src/mixin/ActWithFiles.vue';
import ActWithButtons from '@/src/mixin/ActWithButtons.vue';

import NewMessage from '@/src/components/NewMessage.vue';

export default {
  mixins: [
    Act,
    ActWithButtons,
    ActWithFiles
  ],
  components: {
    NewMessage
  }
}
</script>

<style lang="scss">
  .act {
    &--comment {
      .actions {
        margin-right: 0;
        margin-left: auto;

        flex-shrink: 0;
      }
      
      .actions__item {
        background: transparent;
      }
    }
    &__content {
      &--comment {
        border: 1px dashed #B9B7B7;
      }
    }

    &__text {
      &--comment {
        margin-right: 16px;

        white-space: pre-line;
      }
    }
  }
</style>

