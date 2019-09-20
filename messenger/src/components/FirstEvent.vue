<template>
  <div class="first-event" v-click-outside="clickOutside" v-if="firstEvent !== null">
    <div class="first-event__wrap" @click="show">
      <div class="first-event__head">
        <span class="first-event__label">
          {{ firstEvent.label }}
        </span>

        <div class="first-event__icon" :class="{ 'first-event__icon--open': isOpen }">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.6196 7.70094L12.9979 2.32247C13.3402 1.98033 13.3402 1.42562 12.9979 1.08365C12.6559 0.74165 12.1012 0.74165 11.7593 1.08365L7.00028 5.84277L2.24146 1.08379C1.89933 0.741787 1.34469 0.741787 1.0027 1.08378C0.66056 1.42578 0.66056 1.98047 1.0027 2.32261L6.38109 7.70108C6.55217 7.87208 6.77615 7.95748 7.00025 7.95748C7.22445 7.95748 7.4486 7.87191 7.6196 7.70094Z" fill="#7C7C7C"/>
          </svg>
        </div>
      </div>
      <div class="first-event__info">
        <span class="first-event__limit">
          {{ firstEvent.limit }}
        </span>

        <a class="first-event__link" v-if="firstEvent.paid" :href="firstEvent.paid">
          <svg width="32" height="15" viewBox="0 0 32 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.93046 14.9914H4.98367V1.99858H2.1383V0H6.93046V14.9914Z" fill="#EF5350"/>
            <path d="M13.1663 14.5844C13.0825 14.5557 12.9996 14.5256 12.9166 14.4943L12.7484 14.4286L12.6383 14.3835L12.5096 14.3283C12.3243 14.2475 12.1413 14.1599 11.9622 14.0661C9.68048 12.8033 8.12211 10.3308 8.12211 7.48807C8.12211 3.36579 11.3931 0.0114285 15.4115 0.0114285C19.4051 0.0114285 22.6576 3.32349 22.6986 7.41168H20.765C20.7239 4.41761 18.3391 1.99357 15.4115 1.99357C12.4576 1.99357 10.0573 4.45972 10.0573 7.48807C10.0573 9.69578 11.335 11.5991 13.1694 12.4705C13.274 12.5206 13.6818 12.6734 13.7795 12.7029C14.3075 12.8603 14.975 12.9631 15.5534 13.0038C15.7271 13.0146 16.5008 13.0225 16.6768 13.0225H32V15H16.6544L16.1946 14.995L15.945 14.991L15.6907 14.9856L15.4573 14.9781L15.3255 14.9709C14.6153 14.9148 13.8167 14.7835 13.1663 14.5844Z" fill="#EF5350"/>
            <path d="M4.00911 14.9914V2.99567H0V4.91806H2.1383V14.9904L4.00911 14.9914Z" fill="#EF5350"/>
            <path d="M32 11.8074V9.89948H16.6768C16.5365 9.89948 15.8007 9.89507 15.6658 9.88264C15.4038 9.86339 15.1433 9.8281 14.8859 9.77698C14.7556 9.74329 14.6277 9.70079 14.5037 9.65006C14.4393 9.624 14.3757 9.59552 14.3129 9.56505C13.9625 9.36435 13.6687 9.07222 13.4616 8.71754C13.3523 8.53067 13.2686 8.32977 13.2128 8.12085C13.1632 7.93358 13.136 7.7397 13.1314 7.54381C13.1228 7.12938 13.219 6.71975 13.4113 6.35605C13.6028 5.99214 13.8834 5.68678 14.2253 5.47024C14.5672 5.2537 14.9572 5.1338 15.358 5.12217C15.7589 5.11054 16.1551 5.20799 16.5078 5.40448C16.7048 5.51395 16.8839 5.65209 17.0405 5.8141C17.1653 5.94262 17.2754 6.08597 17.3692 6.24176C17.5801 6.59404 17.6987 6.99725 17.7119 7.41168H19.5711C19.5331 5.08728 17.6863 3.21542 15.4115 3.21542C13.1112 3.21542 11.2474 5.12959 11.2474 7.48807C11.2481 8.27924 11.4621 9.05438 11.8661 9.72645C12.2692 10.3985 12.8461 10.9409 13.5306 11.2928C13.7392 11.4191 14.1307 11.5504 14.2424 11.5799C14.6727 11.6855 15.1115 11.7541 15.5526 11.7846C15.6658 11.7942 16.1016 11.8 16.3884 11.8038L16.621 11.8074H32Z" fill="#EF5350"/>
          </svg>

          Как отработать платного лида
        </a>
      </div>
    </div>

    <!-- <transition name="fade"> -->

    <div class="first-event__body" v-show="isOpen">
      <div class="first-event__table">
        <div class="first-event__col">
          <div class="first-event__row">
            <span class="first-event__name">
              Представитель компании:
            </span>
            {{ firstEvent.agent }}
          </div>
          <div class="first-event__row">
            <span class="first-event__name">
              Наименование компании:
            </span>
            {{ firstEvent.name }}
          </div>
          <div class="first-event__row">
            <span class="first-event__name">
              Юридический адрес:
            </span>
            {{ firstEvent.address }}
          </div>
          <div class="first-event__row">
            <span class="first-event__name">
              Телефон:
            </span>
            {{ firstEvent.phone }}
          </div>
          <div class="first-event__row">
            <span class="first-event__name">
              Заявка отправлена из:
            </span>
            {{ firstEvent.city }}
          </div>
        </div>
        <div class="first-event__col">
          <div class="first-event__row">
            <span class="first-event__name">
              Дата поступления:
            </span>
            {{ firstEvent.date }}
          </div>
          <div class="first-event__row">
            <span class="first-event__name">
              Источник заявки:
            </span>
            {{ firstEvent.source }}
          </div>
          <div class="first-event__row">
            <span class="first-event__name">
              Выбран бонус–пакет:
            </span>
            {{ firstEvent.bonus }}
          </div>
          <div class="first-event__row">
            <span class="first-event__name">
              Примечания:
            </span>
            {{ firstEvent.comment }}
          </div>
          <div class="first-event__row">
            <span class="first-event__name">
              Код лида:
            </span>
            {{ firstEvent.code }}
          </div>
        </div>
      </div>
      <div class="first-event__controls">
        <input type="text" class="first-event__input" id="feed__first-event" placeholder="Введите результат...">
        <a :href="firstEvent.complete" class="first-event__btn first-event__btn--yellow">Завершить</a>
        <a :href="firstEvent.url" class="first-event__btn first-event__btn--default">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2182 14.2303H1.78182V1.78182H8V0H1.78182C1.30925 0 0.856038 0.187727 0.521882 0.521882C0.187727 0.856038 0 1.30925 0 1.78182L0 14.2303C0.00320051 14.7008 0.192339 15.1509 0.526149 15.4824C0.859958 15.8139 1.31134 16 1.78182 16H14.2182C14.6887 16 15.14 15.8139 15.4739 15.4824C15.8077 15.1509 15.9968 14.7008 16 14.2303V8H14.2182V14.2303ZM9.78182 0V1.78182H12.9818L4.26667 10.4848L5.47879 11.697L14.1818 2.98182V6.2303H16V0H9.78182Z" fill="#919191"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- </transition> -->
    
  </div>
</template>

<script>
export default {
  props: {
    firstEvent: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      isOpen: true
    }
  },
  methods: {
    show(e) {
      if (e.target.closest('.first-event__controls')) {
        return;
      }

      this.isOpen = !this.isOpen;
      this.$emit('open', this.isOpen);
    },
    clickOutside(e) {
      this.isOpen = false;
      this.$emit('open', this.isOpen);
    }
  }
}
</script>

<style lang="scss">
  .first-event {
    // padding-left: 30px;
    // padding-right: 22px;
    // padding-top: 25px;
    // padding-bottom: 25px;

    box-sizing: border-box;

    &__wrap {
      padding-top: 28px;
      padding-bottom: 28px;

      padding-left: 30px;
      padding-right: 22px;
    }

    &__head {
      display: flex;
      justify-content: space-between;
    }

    &__icon {
      transition: .2s;

      &--open {
        transform: rotate(180deg);
      }
    }

    &__info {
      display: flex;
      
      justify-content: flex-start;

      margin-top: 10px;
    }

    &__limit {
      display: flex;
      align-items: center;

      margin-right: 45px;

      padding-right: 11px;
      padding-left: 11px;

      min-height: 30px;

      font-weight: 700;
      font-size: 12px;
      color: #fff;

      background: #EF5350;

      border-radius: 19px;

    }

    &__link {
      display: flex;
      align-items: center;

      height: 28px;

      padding-right: 11px;
      padding-left: 11px;

      font-size: 12px;
      font-weight: 700;

      color: #EF5350;

      text-decoration: none;
      
      border: 1px solid #E8E8E8;
      border-radius: 7px;

      svg {
        margin-right: 7px;
      }
    }

    &__body {
      margin-top: 22px;
      
      padding-left: 30px;
      padding-right: 22px;

      padding-bottom: 18px;
    }
    
    &__table {
      display: flex;
    }

    &__row {
      font-size: 14px;
      color: #3A3A3A;

      &:not(:first-child) {
        margin-top: 7px;
      }
    }

    &__col {
      flex: 1;

      &:first-child {
        .first-event__name {
          min-width: 170px;
        }
      }
    }

    &__name {
      display: inline-block;
      min-width: 141px;

      margin-right: 20px;

      color: #959595;
    }

    &__controls {
      display: flex;
      align-items: center;

      margin-top: 50px;
    }

    &__input {
      height: 41px;

      flex: 1;

      padding-left: 13px;
      padding-right: 13px;

      font-family: Arial;
      font-size: 14px;

      color: #B2B2B2;

      border: none;
      background: #F0F0F0;
      border-radius: 8px;
    }

    &__btn {
      display: flex;
      align-items: center;

      height: 28px;

      text-decoration: none;

      &--yellow {

        margin-left: 12px;
        margin-right: 10px;

        padding-right: 13px;
        padding-left: 13px;

        font-size: 10px;
        font-weight: 700;

        color: #3a3a3a;

        text-transform: uppercase;

        background: #FEDD46;
        border-radius: 5px;
      }

      &--default {
        justify-content: center;

        width: 28px;

        background: transparent;
      }
    }
  }
</style>

