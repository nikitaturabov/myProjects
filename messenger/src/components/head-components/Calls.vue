<template>
  <div class="telephone" v-if="isVisible" v-click-outside="closePhone">
    <ul class="telephone__list">
      <li class="telephone__item"
          :class="{ 'telephone__item--empty': !user.phone }"
          v-for="(user, index) in phoneList"
          :key="index">
        <a  class="telephone__name"
            :title="user.phone ? 'Позвонить' : ''"
            :href="user.call">

            {{ user.name }}

            <span class="telephone__value" v-if="user.phone">{{ user.phone }}</span>
            <span class="telephone__value telephone__value--empty" 
            :class="{ 'disabled': !user.phone }" v-else>Нет номера</span>
        </a>
        <a  href=""
            class="telephone__btn telephone__btn--copy"
            :class="{ 'disabled': !user.phone }"
            
            @click="copyText($event, user.phone)">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.77412 0.583496H1.68202C1.03191 0.583496 0.5 1.1085 0.5 1.75016V9.91683H1.68202V1.75016H8.77412V0.583496ZM10.5471 2.91683H4.04605C3.39594 2.91683 2.86403 3.44183 2.86403 4.0835V12.2502C2.86403 12.8918 3.39594 13.4168 4.04605 13.4168H10.5471C11.1973 13.4168 11.7292 12.8918 11.7292 12.2502V4.0835C11.7292 3.44183 11.1973 2.91683 10.5471 2.91683ZM10.5471 12.2502H4.04605V4.0835H10.5471V12.2502Z" fill="#919191"/>
          </svg>
        </a>
        <a :href="user.url" class="telephone__btn telephone__btn--edit">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5524 0.602637L10.5716 0.583496H10.5332L10.5524 0.602637Z" fill="#919191"/>
            <path d="M10.5524 0.602637L8.90985 2.24034L11.7915 5.11347L13.4149 3.45663L10.5524 0.602637Z" fill="#919191"/>
            <path d="M2.888 8.24512L7.69081 3.45656L10.5726 6.32969L5.76969 11.1182L2.888 8.24512Z" fill="#919191"/>
            <path d="M1.54259 9.58598L0.582031 13.4168L4.42427 12.4591L1.54259 9.58598Z" fill="#919191"/>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

const copyToClipboard = str => {
  const el = document.createElement('textarea');

  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';

  document.body.appendChild(el);

  el.select();
  
  document.execCommand('copy');
  document.body.removeChild(el);
};

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    phoneList: {
      type: Array,
      defualt: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    copyText(e, value) {
      e.preventDefault();

      copyToClipboard(value);
    },
    closePhone() {
      if (this.isVisible) {
        this.$emit('closePhone');
      }
    }
  }
}
</script>

<style lang="scss">
  .telephone {
    margin-top: 2px;
    margin-right: 2px;
    margin-left: auto;

    border: 1px solid #DADADA;

    &__list {
      padding-top: 10px;
      padding-bottom: 10px;

      background: #fff;
    }

    &__item {
      position: relative;

      &:hover:not(.telephone__item--empty) {
        color: #4C4C4C;
        background: #FEDD46;

        .telephone__value {
          color: #4C4C4C;
        }

        .telephone__btn {
          svg {
            path { fill: #4C4C4C; }
          }
        }
      }

      &--empty {
        .telephone__btn--edit:hover {
          background: #c6c6c6;
        }
      }

      &--empty:hover {
        .telephone__name {
          cursor: auto;
        }

        
      }
    }

    &__name {
      position: relative;

      display: flex;
      justify-content: space-between;
      align-items: center;

      padding-left: 24px;
      padding-right: 77px;

      height: 31px;
      transition: .2s;

      font-size: 14px;
      color: #4D4D4D;

      cursor: pointer;
      
      text-decoration: none;
    }

    &__value {
      margin-left: 30px;

      &--empty {
        color: #C6C6C6;
      }
    }

    &__btn {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);

      display: flex;
      align-items: center;
      justify-content: center;

      height: 22px;
      width: 22px;

      border-radius: 6px;

      transition: .2s;

      cursor: pointer;

      &:hover {
        background: #D3B83F;

        svg {
          path {
            fill: #4d4d4d !important;
          }
        }
      }

      &--copy {
        right: 50px;
      }

      &--edit {
        right: 23px;
      }
    }
  }

  .disabled {
    pointer-events: none;
    cursor: auto;

    color: #D5D5D5;

    svg {
      path {
        fill: #D5D5D5;
      }
    }
  }
</style>

