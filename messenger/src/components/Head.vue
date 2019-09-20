<template>
  <div class="head">
    <div class="head__search">
      <input id="feed__search" placeholder="Поиск" type="text" class="head__input">
      <button class="head__btn head__btn--gray"
              @click="openFilters"
              :style="{ background: isFilterShow ? '#C6C6C6' : '#F0F0F0'}">
        <img src="data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.949 0.304167C10.8604 0.101471 10.7072 0.000109255 10.4886 0H0.507055C0.288736 0 0.135314 0.101471 0.0469263 0.304167C-0.0414067 0.517242 -0.00505198 0.699316 0.156154 0.850034L4.00077 4.69454V8.48447C4.00077 8.61981 4.05018 8.73663 4.14892 8.83556L6.14515 10.8317C6.23881 10.9305 6.35574 10.98 6.49616 10.98C6.55849 10.98 6.62344 10.9669 6.69105 10.9409C6.89388 10.8525 6.99532 10.6992 6.99532 10.4808V4.69457L10.8398 0.850061C11.0011 0.699344 11.0373 0.517324 10.949 0.304167Z' fill='%234D4D4D'/%3E%3C/svg%3E" alt="">
      </button>
      <button class="head__btn head__btn--yellow" 
              @click="openTelephone"

              v-if="phoneList.length > 0"
              :style="{ background: isTelephoneShow ? '#CDB237' : '#FEDD46'}">
        <img src="data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.9945 9.48191C12.0074 9.57567 11.9976 9.67114 11.9659 9.7603C11.9342 9.84946 11.8816 9.92968 11.8125 9.99421L10.0793 11.67C9.99762 11.7626 9.89717 11.8366 9.78466 11.8871C9.67025 11.9443 9.54732 11.9824 9.42068 12H9.17803C8.91661 11.986 8.6562 11.957 8.39809 11.9132C7.94433 11.8303 7.5021 11.6933 7.08084 11.5051C6.46098 11.2345 5.86644 10.909 5.30429 10.5326C4.55882 10.0167 3.86774 9.42612 3.24177 8.7699C2.69583 8.24888 2.19164 7.68564 1.73387 7.08538C1.40811 6.61604 1.11841 6.12258 0.867258 5.60926C0.639774 5.20436 0.448379 4.78014 0.295297 4.34153C0.191533 4.04125 0.110421 3.73358 0.0526465 3.42113C0.0137309 3.21218 -0.00369241 2.99978 0.000650036 2.78726C0.000650036 2.60492 0.000650036 2.55282 0.000650036 2.53546C0.0236568 2.40755 0.0675776 2.28433 0.130641 2.17077C0.183319 2.05682 0.256799 1.95374 0.347293 1.86686L2.08051 0.182344C2.17328 0.0760988 2.30399 0.0106155 2.44449 0C2.54762 0 2.64796 0.0335148 2.73047 0.0955137C2.81755 0.158424 2.89121 0.238131 2.94712 0.329957L4.33369 2.91751C4.39103 3.05953 4.39103 3.21833 4.33369 3.36035C4.30766 3.5145 4.23507 3.65694 4.12571 3.76845L3.50175 4.39363C3.4955 4.41931 3.4955 4.44611 3.50175 4.47178C3.49587 4.50335 3.49587 4.53573 3.50175 4.56729C3.53653 4.79008 3.60368 5.00656 3.70107 5.20984C3.83917 5.4668 3.99556 5.71346 4.16904 5.9479C4.44023 6.30611 4.74178 6.6402 5.07031 6.94645C5.37998 7.26087 5.71315 7.55115 6.06691 7.81476C6.30442 7.99044 6.5534 8.14999 6.81219 8.29233C6.9594 8.36707 7.11315 8.42811 7.2715 8.47468H7.42748H7.51415C7.54364 8.46767 7.57063 8.45265 7.59214 8.43126L8.32009 7.6932C8.46564 7.5635 8.65394 7.49236 8.84872 7.49349C8.96923 7.48723 9.08915 7.51426 9.19537 7.57164L11.6479 9.02171C11.7291 9.06267 11.8 9.12139 11.8555 9.19353C11.911 9.26567 11.9497 9.34939 11.9685 9.43849L11.9945 9.48191Z' fill='%234D4D4D'/%3E%3C/svg%3E" alt="">
      </button>
      
      <div class="head__filters">
        <template v-if="allFilters.length < 4">
          <div class="head__filter" v-for="(filter, index) in allFilters" :key="index">
            {{ getTranslateFilters(filter) }}
            <a href="feed://update" class="head__remove-btn" @click="removeFilter(filter)">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.698519 6.91551C0.487212 6.7042 0.487212 6.3616 0.698519 6.15029L6.16791 0.680822C6.37922 0.469512 6.72182 0.469511 6.93312 0.680821C7.14443 0.892131 7.14443 1.23473 6.93312 1.44604L1.46373 6.91551C1.25242 7.12682 0.909826 7.12682 0.698519 6.91551Z" fill="#fff"/>
                <path d="M6.93406 6.91562C6.72275 7.12693 6.38016 7.12693 6.16885 6.91562L0.699458 1.44616C0.488151 1.23485 0.488151 0.892245 0.699458 0.680935C0.910765 0.469626 1.25336 0.469626 1.46467 0.680935L6.93406 6.1504C7.14537 6.36171 7.14537 6.70431 6.93406 6.91562Z" fill="#fff"/>
              </svg>
            </a>
          </div>
        </template>
        <template v-else>
          <!-- ???????????????????????????? -->
          <Dropdown class="control--filter"

                  :items="allFilters"
                  :down="true"
                  :right="true"
                  
                  mode="remove"

                  @dropdown:set="pickFilter"
                  @all:set="clearAllFilter">

              {{ allFilters.length }}
              <template v-if="allFilters.length < 5">фильтра</template>
              <template v-else>фильтров</template>
          </Dropdown>
          <a href="feed://update" class="head__remove-btn" @click="clearAllFilter">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.698519 6.91551C0.487212 6.7042 0.487212 6.3616 0.698519 6.15029L6.16791 0.680822C6.37922 0.469512 6.72182 0.469511 6.93312 0.680821C7.14443 0.892131 7.14443 1.23473 6.93312 1.44604L1.46373 6.91551C1.25242 7.12682 0.909826 7.12682 0.698519 6.91551Z" fill="#fff"/>
              <path d="M6.93406 6.91562C6.72275 7.12693 6.38016 7.12693 6.16885 6.91562L0.699458 1.44616C0.488151 1.23485 0.488151 0.892245 0.699458 0.680935C0.910765 0.469626 1.25336 0.469626 1.46467 0.680935L6.93406 6.1504C7.14537 6.36171 7.14537 6.70431 6.93406 6.91562Z" fill="#fff"/>
            </svg>

          </a>
        </template>
      </div>
    </div>
    <div class="head__body" :style="{ 'padding-right': isTelephoneShow ? '0px': '26px' }">
      <!-- {{ activeEvents }} -->
      <Calls :phoneList="phoneList" :isVisible="isTelephoneShow" @closePhone="handleClosePhone"></Calls>
      <Filters :messages="messagesFilter"
               :isVisible="isFilterShow"
               :searchMessages="searchMessages"
               :searchEvents="searchEvents"

               :activeFilters="activeFilters"
               :activeEvents="activeEvents"
               :activeMessages="activeMessages"

               @form:close="closeFilter"
               @form:clear="clearAllFilter"
               @setSearchMessages="handleSearchMessages"
               @setSearchEvents="handleSearchEvents"
               @closeFilters="handleCloseFilter"></Filters>
    </div>
  </div>
</template>

<script>
 
import Calls from '@/src/components/head-components/Calls.vue';
import Filters from '@/src/components/head-components/Filters.vue';

import Dropdown from '@/src/components/dropdown/Dropdown.vue';
import lodashClone from 'lodash/cloneDeep.js';

import { setFilter, translateFilters } from '@/src/utils/globals.js';

export default {
  props: {
    phoneList: {
      type: Array,
      defualt: () => []
    },
    messagesFilter: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isFilterShow: false,
      isTelephoneShow: false,
      allFilters: [],
      filters: [],
      eventsPick: [],
      messagesPick: [],

      activeFilters: {},
      activeEvents: [],
      activeMessages: [],
      
      searchEvents: '',
      searchMessages: ''
    }
  },
  methods: {
    handleCloseFilter(e) {
      this.isFilterShow = false;

      this.$emit('head:action', this.isFilterShow);
    },
    handleClosePhone(e) {
      this.isTelephoneShow = false;

      this.$emit('head:action', this.isTelephoneShow);
    },
    openFilters() {
      this.isTelephoneShow = false;
      this.isFilterShow = !this.isFilterShow;

      this.$emit('head:action', this.isFilterShow);
    },
    openTelephone() {
      this.isFilterShow = false;
      this.isTelephoneShow = !this.isTelephoneShow;

      this.$emit('head:action', this.isTelephoneShow)
    },
    closeFilter(allFilters, filters, eventsPick, messagesPick) {
      this.activeFilters = lodashClone(filters);
      this.activeEvents = lodashClone(eventsPick);
      this.activeMessages = lodashClone(messagesPick);

      this.allFilters = allFilters;

      this.filters = filters;
      this.eventsPick = eventsPick;
      this.messagesPick = messagesPick;

      this.isFilterShow = false;

      this.$emit('head:action', this.isFilterShow);
    },
    clearAllFilter() {
      this._removeEvents('event');
      this._removeMessages('message');
      
      this.activeFilters = {};

      this.searchEvents = '';
      this.searchMessages = '';

      Object.keys(this.filters).forEach(key => {
        this.filters[key] = false;
      })

      this.allFilters.splice(0, this.allFilters.length);
      setFilter('');
    },
    removeFilter(filter) {
      let index = this.allFilters.indexOf(filter);

      if (index >= 0) {
        
        if (this.filters[filter] !== undefined) {
          this.filters[filter] = false;
          this.activeFilters[filter] = false;
        }

        this._removeEvents(filter);
        this._removeMessages(filter);

        this.allFilters.splice(index, 1);
      }

      setFilter(this.allFilters.join(', '));
    },
    pickFilter(filter) {
    //  this.removeFilter(filter[0]);
      this.removeFilter(filter[0]);
    },
    getTranslateFilters(value) {
      return translateFilters(value);
    },
    handleSearchMessages(value) { this.searchMessages = value; },
    handleSearchEvents(value) { this.searchEvents = value; },
    _removeEvents(item) {
      if (item === 'event') {
        this.eventsPick.splice(0, this.eventsPick.length);
        this.activeEvents.splice(0, this.activeEvents.length);
        return;
      }

      for (let i = 0; i < this.eventsPick.length; i++) {
        if (this.eventsPick[i].id === item) {
          this.eventsPick.splice(i, 1);
          break;
        }
      } 

      for (let i = 0; i < this.activeEvents.length; i++) {
        if (this.activeEvents[i].id === item) {
          this.activeEvents.splice(i, 1);
          break;
        }
      }

    },
    _removeMessages(item) {
      if (item === 'message') {
        this.messagesPick.splice(0, this.messagesPick.length);
        this.activeMessages.splice(0, this.activeMessages.length);

        return;
      }

      for (let i = 0; i < this.messagesPick.length; i++) {
        if (this.messagesPick[i].id === item) {
          this.messagesPick.splice(i, 1);
          break;
        }
      } 

      for (let i = 0; i < this.activeMessages.length; i++) {
        if (this.activeMessages[i].id === item) {
          this.activeMessages.splice(i, 1);
          break;
        }
      } 
    }
  },
  components: {
    Calls,
    Filters,
    Dropdown
  }
}
</script>

<style lang="scss">
  .head {
    &__search {
      display: flex;
      align-items: stretch;

      height: 26px;

      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
    }

    &__body {
      display: flex;

      padding-right: 26px;
    }

    &__input {
      flex: 1;

      padding-left: 17px;

      font-size: 12px;
      color: #b2b2b2;

      border: none;
      background: #fff;

      &:focus {
        outline: none;
      }
    }

    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;

      min-width: 26px;

      border: none;
      cursor: pointer;

      transition: .2s;

      &--gray {
        background: #F0F0F0;

        &:hover {
          background: #C6C6C6 !important;
        }
      }

      &--yellow {
        background: #FEDD46;

        &:hover {
          background: #CDB237 !important;
        }
      }

      &:focus {
        outline: none;
      }
    }

    &__search {
      position: relative;
    }

    &__filters {
      display: flex;
      align-items: center;

      position: absolute;
      top: 50%;
      right: 66px;

      transform: translate(0%, -50%);

      display: flex;
    }

    &__filter {
      display: flex;
      align-items: center;

      padding-right: 10px;

      font-size: 11px;
      color: #7E7E7E;
    }

    &__remove-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      margin-left: 7px;

      width: 12px;
      height: 12px;

      background: #919191;
      border-radius: 12px;
    }
  }

  .dropdown .head__remove-btn {
    margin-left: 3px;
  }
</style>

