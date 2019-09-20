<template>
  <div class="form__item control" v-click-outside="() => this.isVisible = false">
    <div class="control__alert" v-if="items.length === 0 && mode !== 'template'">
      Не заполнены контактные данные
    </div>

    <div class="control__title" :class="{ 'control__title--empty': items.length === 0 }" @click="handleClick">

      <svg v-if="items.length === 0 && mode !== 'template'" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.40374 1.6C8.09583 1.06667 7.32602 1.06667 7.0181 1.6L1.31016 11.4864C1.00224 12.0198 1.38714 12.6864 2.00299 12.6864H13.4189C14.0347 12.6864 14.4196 12.0198 14.1117 11.4864L8.40374 1.6ZM9.44298 0.999998C8.67317 -0.333335 6.74867 -0.333332 5.97887 1L0.270932 10.8864C-0.498868 12.2198 0.463386 13.8864 2.00299 13.8864H13.4189C14.9585 13.8864 15.9207 12.2198 15.1509 10.8864L9.44298 0.999998ZM6.88668 10.8225C6.88668 10.3806 7.24486 10.0225 7.68668 10.0225H7.80414C8.24597 10.0225 8.60414 10.3806 8.60414 10.8225V10.9399C8.60414 11.3818 8.24597 11.7399 7.80414 11.7399H7.68668C7.24486 11.7399 6.88668 11.3818 6.88668 10.9399V10.8225ZM7.68668 3.72503C7.24486 3.72503 6.88668 4.0832 6.88668 4.52503V8.36363C6.88668 8.80546 7.24486 9.16363 7.68668 9.16363H7.80414C8.24597 9.16363 8.60414 8.80546 8.60414 8.36363V4.52503C8.60414 4.0832 8.24597 3.72503 7.80414 3.72503H7.68668Z" fill="#A93634"/>
      </svg>

      <slot></slot>

      <svg v-if="type === 'arrow'" :style="{ 'transform': !isVisible ? 'rotate(180deg)': 'rotate(0deg)' }" style="margin-left: 6px" width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 3L3.5 1L6 3" stroke="#B1B1B1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>
    <!-- <transition name="fade"> -->
      <!-- :style="{ right: right ? '0px' : 'auto', left: right ? 'auto' : '0px' }" -->
      <div  class="dropdown"
            :class="{ 'filters--right': right, 'filters--left': !right, 'filters--down': down }"
            v-if="isVisible">

          <ul class="dropdown__list" :class="{ 'dropdown__list--empty': items.length === 0 }" v-if="items.length > 0 || (type !== 'member' && mode !== 'remove')" :style="{ 'padding-bottom': type === 'member' || type === 'arrow' ? '8px' : '0px' }">
            <li v-for="item in items"
                class="dropdown__item dropdown__item--btn"
                :class="{ 'indent': type === 'member' || type === 'arrow', 'item-active': itemPosition(item) >= 0 && mode === 'check', 'item-check': mode === 'check', 'item-remove': mode === 'remove' }"
                :style="{ 'padding-right': mode === 'check' ? '32px': '12px' }"
                @click="pickItem($event, item)"
                :key="item.id">

                <span class="dropdown__link" v-if="item.html">
                  {{ item.text }}
                </span>
                <a class="dropdown__link" href="feed://update" v-else-if="mode === 'remove'">
                  {{ getTranslateFilters(item) }}
                  <!-- <span class="head__remove-btn" @click="removeFilter(filter)">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.698519 6.91551C0.487212 6.7042 0.487212 6.3616 0.698519 6.15029L6.16791 0.680822C6.37922 0.469512 6.72182 0.469511 6.93312 0.680821C7.14443 0.892131 7.14443 1.23473 6.93312 1.44604L1.46373 6.91551C1.25242 7.12682 0.909826 7.12682 0.698519 6.91551Z" fill="#fff"/>
                      <path d="M6.93406 6.91562C6.72275 7.12693 6.38016 7.12693 6.16885 6.91562L0.699458 1.44616C0.488151 1.23485 0.488151 0.892245 0.699458 0.680935C0.910765 0.469626 1.25336 0.469626 1.46467 0.680935L6.93406 6.1504C7.14537 6.36171 7.14537 6.70431 6.93406 6.91562Z" fill="#fff"/>
                    </svg>
                  </span> -->

                  <span class="head__remove-btn" @click="removeFilter(filter)">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.85232 0.147681C5.65541 -0.0492271 5.33615 -0.0492271 5.13924 0.147681L3 2.28692L0.860761 0.147681C0.663852 -0.0492271 0.34459 -0.0492271 0.147681 0.147681C-0.0492271 0.34459 -0.0492271 0.663852 0.147681 0.860761L2.28692 3L0.147681 5.13924C-0.0492271 5.33615 -0.0492271 5.65541 0.147681 5.85232C0.34459 6.04923 0.663852 6.04923 0.860761 5.85232L3 3.71308L5.13924 5.85232C5.33615 6.04923 5.65541 6.04923 5.85232 5.85232C6.04923 5.65541 6.04923 5.33615 5.85232 5.13924L3.71308 3L5.85232 0.860761C6.04923 0.663852 6.04923 0.34459 5.85232 0.147681Z" fill="#fff"/>
                    </svg>
                  </span>
                </a>
                <a v-else-if="type !== 'member' && type !== 'arrow'" class="dropdown__link" :href="`feed://form/template/${type}/${item.id}`">
                  {{ item.text }}
                </a>
                <span v-else>
                  {{ item.text }}
                </span>
            </li>
            <li v-if="type !== 'member' && type !== 'arrow' && mode !== 'remove'" class="dropdown__item dropdown__item--ref">
              <a :href="`feed://form/template/${type}`">
                Список шаблонов
              </a>
            </li>
            <li v-if="mode === 'remove'" class="dropdown__item dropdown__item--ref">
              <a href="feed://update" @click="clearAll">
                Очистить всё
              </a>
            </li>
          </ul>
      </div>
    <!-- </transition> -->
  </div>
</template>

<script>

import { setFilter, translateFilters } from '@/src/utils/globals.js';

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    right: {
      type: Boolean,
      default: false
    },
    down: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: null
    },
    activeItem: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isVisible: false,
      picked: []
    }
  },
  mounted() {
    if (this.activeItem !== null && this.activeItem.length !== 0) {
      this.picked.push({ id: this.activeItem.id, text: this.activeItem.name });
    }
  },
  methods: {
    pickItem(e, item) {
      if (this.mode === 'remove') {
        this.$emit('dropdown:set', [ item ]);
        return;
      }

      if (this.mode !== 'check')
      {
        this.isVisible = false;
        this.picked[0] = item;

        this.$emit('dropdown:set', this.picked);

        return;
      }

      let existItemIndex = this.itemPosition(item);

      if (existItemIndex === -1) {
        this.picked.push(item);
      } else {
        if (this.picked.length > 1) {
          this.picked.splice(existItemIndex, 1);
        }
      }

      this.$emit('dropdown:set', this.picked);
    },
    handleClick() {
      this.isVisible = !this.isVisible;
    },
    getTranslateFilters(value) {
      return translateFilters(value);
    },
    hide() {
      this.isVisible = false;
    },
    itemPosition(item) {
      for (let i = 0; i < this.picked.length; i++) {
        if (this.picked[i].id === item.id) {
          return i;
        }
      }

      return -1;
    },
    clearAll() {
      this.$emit('all:set');
    }
  }
}
</script>


<style lang="scss">
  .dropdown {
    position: absolute;
    bottom: 100%;
    left: 0;

    z-index: 5;

    padding-bottom: 4px;

    font-family: Arial, Helvetica;
    // background: #fff;

    &__list { 
      display: flex;
      flex-direction: column;

      padding-top: 8px;

      border: 1px solid #DADADA;
      background: #fff;

      &--empty {
        padding-top: 0;
        border-top: 0;
      }
    }

    &__link {
      display: block;

      width: 100%;

      padding-right: 12px;
      padding-left: 16px;

      color: #4D4D4D;
      text-decoration: none;
      white-space: nowrap;

      box-sizing: border-box;
    }

    & .indent {
      padding-right: 12px;
      padding-left: 16px;
    }

    &__item {
      display: flex;
      align-items: center;

      min-width: 148px;

      // max-width: 220px;
      height: 28px;

      font-size: 14px;
      color: #4C4C4C;

      border: none;
      background: transparent;

      transition: .2s;
      background: #fff;

      // box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.12);
      border-radius: 2px;

      box-sizing: border-box;

      cursor: pointer;

      span {

        // flex: 1;

        white-space: nowrap;
      }

      &--ref {
        
        display: inline-block;
          

        height: 41px;

        padding: 0;

        border-top: 1px solid #DADADA;
        background: #F9F9F9;

        a {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex: 1;

          height: 41px;

          padding-left: 16px;
          padding-right: 16px;

          color: #4D4D4D;
          text-decoration: none;

          transition: .2s;
          
          &:hover {
            color: #fff;
            background: #759337;
          }
        }
      }

      &--btn {
        &:hover {
          color: #4C4C4C;
          background: #FEDD46;
        }
      }
    }
  }

  .item-remove {
    &:hover {
      background: #fff;
      
      a { 
        color: #527A00;
      }

      span {
        background: #629100;
      }
    }
  }

  .filters {
    // :style="{ right: right ? '0px' : 'auto', left: right ? 'auto' : '0px' }"
    &--right {
      right: 0px;
      left: auto;
    }

    &--left {
      left: 0px;
      right: auto;
    }

    &--down {
      top: 24px;
      left: auto;
      right: -14px;
    }
  }

  .item-active {
    position: relative;
    font-weight: 700;
    color: #629100;

    &::after {
      content: '';

      position: absolute;
      top: calc(50% - 4px);
      right: 9px;

      width: 12px;
      height: 8px;

      background: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.8418 6.55328L0 3.90991L1.42114 2.58813L4.2572 5.22571L9.82849 0L11.2498 1.32172L4.29285 7.875L3.80615 7.4317L3.79651 7.44067L2.86768 6.57678L2.8418 6.55328Z' fill='%23629100'/%3E%3C/svg%3E%0A") no-repeat center center;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>


