<template>
  <transition 
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false">
    <div class="act act--system">
      <span class="act__time">
        {{ getSystemDate() }}
      </span>
      <div v-if="statusType === 'bonus'" class="bonus-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#EFD503"/>
          <path d="M11.1817 5.52888L10.4746 4.82178L4.81776 10.4786L5.52486 11.1857L11.1817 5.52888Z" fill="#464D56"/>
          <path d="M5 7C5.55228 7 6 6.55228 6 6C6 5.44772 5.55228 5 5 5C4.44772 5 4 5.44772 4 6C4 6.55228 4.44772 7 5 7Z" fill="#464D56"/>
          <path d="M11 11C11.5523 11 12 10.5523 12 10C12 9.44772 11.5523 9 11 9C10.4477 9 10 9.44772 10 10C10 10.5523 10.4477 11 11 11Z" fill="#464D56"/>
        </svg>
      </div>

      <div v-if="statusType === 'app'" class="bonus-icon"><svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.764648 3.03882C0.764648 1.38196 2.10779 0.0388184 3.76465 0.0388184H13.783C15.4399 0.0388184 16.783 1.38196 16.783 3.03882V10.46C16.783 12.1168 15.4399 13.46 13.783 13.46H11.5251V13.4598H5.76846V13.46H3.76465C2.10779 13.46 0.764648 12.1168 0.764648 10.46V3.03882ZM5.74963 11.8522V11.852H11.9219V11.8522H13.2536C14.3581 11.8522 15.2536 10.9567 15.2536 9.85217V4.27567H2.30058V9.85217C2.30058 10.9567 3.19601 11.8522 4.30058 11.8522H5.74963ZM2.30717 1.51539H11.7734V2.8849H2.30717V1.51539ZM13.693 2.20015C13.693 2.57833 13.4128 2.8849 13.0672 2.8849C12.7217 2.8849 12.4415 2.57833 12.4415 2.20015C12.4415 1.82197 12.7217 1.51539 13.0672 1.51539C13.4128 1.51539 13.693 1.82197 13.693 2.20015ZM14.7018 2.8849C15.0474 2.8849 15.3276 2.57833 15.3276 2.20015C15.3276 1.82197 15.0474 1.51539 14.7018 1.51539C14.3563 1.51539 14.0761 1.82197 14.0761 2.20015C14.0761 2.57833 14.3563 2.8849 14.7018 2.8849Z" fill="#838383"/>
        </svg>
      </div>
      <!-- <span class="act__badge">{{ badgeStatus }}</span> -->
      <template v-if="statusType === 'stage' && options.from !== undefined">
        &nbsp;Переход на этап&nbsp;<span class="act__badge" :class="`stage${options.to.color}`">{{ options.to.caption }}</span>&nbsp;из этап {{ options.from.caption }}
      </template>
      <!-- <template v-if="statusType === 'stage'"> -->
      <template v-else-if="statusType === 'stage' && !options.from">
        &nbsp;Переход на этап&nbsp;<span class="act__badge" :class="`stage${options.to.color}`">{{ options.to.caption }}</span>
      </template>
      
      <template v-if="statusType === 'bonus'">
        <div class="act__bonus" v-html="getSystemBonus">
        </div> 
      </template>
      <template v-if="statusType === 'responsible'" >
        <span class="bonus-bold">&nbsp;{{ author }}&nbsp;</span> назначен ответственным за карточку
      </template>
      <template v-if="statusType === 'app'">
        <!-- <span class="bonus-bold">&nbsp;{{ author }}&nbsp;</span> назначен ответственным за карточку -->
        {{ getAppActions(options.action) }} {{ getAppTypes(options.type) ? getAppTypes(options.type) : 'приложение' }} {{ options.num !== 0 ? `№${options.num}` : '' }}
        <span v-if="options.conf" class="bonus-bold">&nbsp;({{ options.conf }})</span>
      </template>

      <template v-if="statusType === 'messenger'">
        &nbsp;{{ state.agent }} подключился к общению через {{ translateMessenger(state.messenger) }}
      </template>
    </div>
  </transition>
</template>

<script>

import Act from '@/src/mixin/Act.vue';
import moment from 'moment';

export default {
  mixins: [
    Act
  ],
  props: {
    options: {
      // type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    getSystemDate() {
      let isCurrentDate = moment(this.date).isSame(new Date(), "day");
      let offset = new Date().getTimezoneOffset();

      if (isCurrentDate) { return `Сегодня ${ moment(this.date).utcOffset(offset / -30).format('HH:mm') }`; }

      return moment(this.date).utcOffset(offset / -30).format('DD.MM HH:mm');
    },
    getAppTypes(type) {
      const types = {
        promo: 'рекламное приложение',
        subscription: 'рекламное приложение',
        work: 'рабочее приложение',
        consultation: 'приложение для программы и консультации',
        eaudit: 'приложение для экспресс-аудита'
      };

      return types[type];
    },
    getAppActions(action) {
      const actions = {
        deleted: 'Удалено',
        created: 'Создано',
        creating: 'Создается'
      };

      return actions[action];
    },
    translateMessenger(messenger) {
      const template = {
        telegram: 'Telegram',
        vk: 'ВКонтакте',
        viber: 'Viber'
      }

      return template[messenger];
    }
  },
  computed: {
    getSystemBonus() {
      
      const typeBonus = {
        add: 'Добавлены бонусы',
        reject: 'Отменены бонусы',
        left: 'Оставшиеся бонусы',
        shipped: 'Отгружены бонусы'
      };

      let result = '';

      Object.keys(this.options).forEach(type => {
        if (this.options[type]) {
          result += `${typeBonus[type]} <span class="bonus-bold">${this.options[type]}.</span> `;
        }
      })
      
      return result;
    }
  }
}
</script>

<style lang="scss">
  .act {

    .bonus-bold {
      display: inline;

      font-weight: 700;
    }

    .bonus-icon {
      display: flex;
      align-items: center;

      margin-right: 5px;
      margin-left: 5px;
    }

    &--system {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-top: 15px;

      text-align: center;
      font-size: 14px;
    
      color: #919191;
    }

    &__badge {
      display: inline-block;

      padding: 4px 9px;

      color: #fff;

      border-radius: 17px;
      background: #00B1B5;
    }

    &__bonus {
      display: inline-block;
      
      font-size: 14px;
      color: #919191;

      text-align: left;
    }
  }

  .stage0 { background: #00B1B5; }
  .stage1 { background: #FF8F00; }
  .stage2 { background: #e8bb00; }
  .stage3 { background: #EF5F50; }
  .stage4 { background: #EA80BE; }
  .stage5 { background: #AC68BC; }
  .stage6 { background: #4682B4; }
  .stage7 { background: #9fb500; }
  .stage8 { background: #09aa78; }
  .stage9 { background: #AEABAB; }
</style>

