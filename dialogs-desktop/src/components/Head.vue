<template>
  <div class="head" v-click-outside="handleClickOutside">
    <div class="head__search" :class="{ 'head__search--active': isShowSearch }">
      <input
            placeholder="Поиск"
            type="text"
            class="head__input"
            ref="headInput" 

            v-if="isShowSearch"
            v-model="searchStr"

            @input="setSearchStr"
          >
      
      <ul class="head__tags" v-if="!isShowSearch">
        <li   class="head__tag tag"
              v-for="(tag, index) in tags"
            
              :key="index"
            >

            
          <svg class="tag__icon" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2.6749V2.66763C8 2.37441 7.7623 2.13672 7.46909 2.13672L0.530909 2.13672C0.237696 2.13672 0 2.37441 0 2.66763V2.6749C0 2.96811 0.237696 3.20581 0.530909 3.20581L7.46909 3.20581C7.7623 3.20581 8 2.96811 8 2.6749Z" fill="#4D4D4D"/>
            <path d="M8 5.33896V5.33169C8 5.03848 7.7623 4.80078 7.46909 4.80078L0.530909 4.80078C0.237696 4.80078 0 5.03848 0 5.33169V5.33896C0 5.63218 0.237696 5.86987 0.530909 5.86987H7.46909C7.7623 5.86987 8 5.63218 8 5.33896Z" fill="#4D4D4D"/>
            <path d="M5.33145 8H5.33872C5.63193 8 5.86963 7.7623 5.86963 7.46909L5.86963 0.530909C5.86963 0.237696 5.63193 0 5.33872 0H5.33145C5.03823 0 4.80054 0.237696 4.80054 0.530909L4.80054 7.46909C4.80054 7.7623 5.03823 8 5.33145 8Z" fill="#4D4D4D"/>
            <path d="M2.66201 8H2.66929C2.9625 8 3.2002 7.7623 3.2002 7.46909L3.2002 0.530909C3.2002 0.237696 2.9625 0 2.66929 0H2.66201C2.3688 0 2.1311 0.237696 2.1311 0.530909L2.1311 7.46909C2.1311 7.7623 2.3688 8 2.66201 8Z" fill="#4D4D4D"/>
          </svg>

          <span class="tag__text tag__text--gray">
            {{ tag.presentation }}
          </span>
        </li>
      </ul>

      <div class="head__actions">
        <button class="head__btn head__btn--filters" @click="showFilters">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.949 0.304167C10.8604 0.101471 10.7072 0.000109255 10.4886 0H0.507055C0.288736 0 0.135314 0.101471 0.0469263 0.304167C-0.0414067 0.517242 -0.00505198 0.699316 0.156154 0.850034L4.00077 4.69454V8.48447C4.00077 8.61981 4.05018 8.73663 4.14892 8.83556L6.14515 10.8317C6.23881 10.9305 6.35574 10.98 6.49616 10.98C6.55849 10.98 6.62344 10.9669 6.69105 10.9409C6.89388 10.8525 6.99532 10.6992 6.99532 10.4808V4.69457L10.8398 0.850061C11.0011 0.699344 11.0373 0.517324 10.949 0.304167Z" fill="#4D4D4D"/>
          </svg>
        </button>

        <button class="head__btn head__btn--search" @click="showSearch">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.483 12.5417L11.0097 10.0884C11.9698 8.89135 12.4347 7.37194 12.3089 5.84261C12.1831 4.31327 11.4761 2.89026 10.3334 1.86617C9.19061 0.842077 7.69891 0.294746 6.16498 0.33672C4.63106 0.378694 3.17152 1.00678 2.08646 2.09183C1.00141 3.17689 0.373322 4.63643 0.331349 6.17035C0.289375 7.70428 0.836706 9.19599 1.8608 10.3388C2.88489 11.4815 4.3079 12.1885 5.83724 12.3143C7.36657 12.4401 8.88598 11.9751 10.083 11.0151L12.5364 13.4684C12.5983 13.5309 12.6721 13.5805 12.7533 13.6143C12.8346 13.6482 12.9217 13.6656 13.0097 13.6656C13.0977 13.6656 13.1848 13.6482 13.2661 13.6143C13.3473 13.5805 13.4211 13.5309 13.483 13.4684C13.6032 13.3441 13.6704 13.178 13.6704 13.0051C13.6704 12.8322 13.6032 12.6661 13.483 12.5417ZM6.34304 11.0151C5.42006 11.0151 4.5178 10.7414 3.75037 10.2286C2.98294 9.71582 2.38481 8.98699 2.0316 8.13426C1.67839 7.28154 1.58597 6.34323 1.76604 5.43799C1.9461 4.53274 2.39056 3.70122 3.0432 3.04857C3.69585 2.39593 4.52737 1.95147 5.43261 1.77141C6.33786 1.59134 7.27617 1.68376 8.12889 2.03697C8.98161 2.39018 9.71045 2.98832 10.2232 3.75575C10.736 4.52317 11.0097 5.42543 11.0097 6.34841C11.0097 7.58608 10.518 8.77307 9.64287 9.64824C8.7677 10.5234 7.58071 11.0151 6.34304 11.0151Z" fill="#4D4D4D"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="head__body">
      <Filters  v-if="isShowFilters"
                :acceptedFilters="filters"
                
                @filters:set="setFilters" 
              >
      </Filters>
    </div>
  </div>
</template>

<script>
 
import Filters from '@/src/components/filters/Filters.vue';
import Dropdown from '@/src/components/dropdown/Dropdown.vue';

import { setSearchStr } from '@/src/utils/globals.js';

export default {
  props: {
    messagesFilter: {
      type: Array,
      default: () => []
    },
    tags: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isShowSearch: false,
      isShowFilters: false,
      searchStr: ''
    }
  },
  methods: {
    showSearch() {
      this.isShowSearch = !this.isShowSearch;
      this.isShowFilters = false;

      this.$emit('disable:set', this.isShowSearch);

      if (this.isShowSearch) {
        this.$nextTick(() => {
          this.$refs.headInput.focus();
        });
      }
    },
    showFilters() {
      this.isShowFilters = !this.isShowFilters;
      this.isShowSearch = false;

      this.$emit('disable:set', this.isShowFilters);
    },
    handleClickOutside() {
      this.isShowSearch = false;
      this.isShowFilters = false;

      this.$emit('disable:set', this.isShowSearch);
    },
    setFilters(filters) {
      this.$emit('filters:set', filters);

      if (filters !== null) {
        this.isShowFilters = false;
        this.$emit('disable:set', this.isShowFilters);
      }
    },
    setSearchStr() {
      setSearchStr(this.searchStr);
    }
  },
  components: {
    Dropdown,
    Filters
  }
}
</script>

<style lang="scss">
  .head {
    position: relative;
    z-index: 2;

    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    
    &__search {
      display: flex;
      justify-content: space-between;
      align-items: center;

      min-height: 26px;

      background: #FEDD46;

      transition: .2s;

      &--active {
        background: #F0F0F0;
      }
    }

    &__input {
      flex: 1;
      align-self: stretch;

      border: 0;

      padding: 0px 15px;
    }

    &__tags {
      padding-left: 16px;
    }

    &__actions {
      display: flex;

      align-self: stretch;
    }

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 26px;

      background: transparent;

      transition: .2s;

      cursor: pointer;

      &--search {
        background: #FEDD46;

        &:hover {
          background: #D3B83F;
        }
      }
    }

    &__body {
      position: absolute;

      width: calc(100% - 26px);

      margin-top: 2px;
      margin-left: 2px;
      
      background: #ffffff;
    }
  }
</style>
