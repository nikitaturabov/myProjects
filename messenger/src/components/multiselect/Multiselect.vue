<template>
  <div class="multiselect" v-click-outside="() => this.isOpen = false">
    <div
      class="multiselect__head"
      :class="{ 'multiselect__head--active': isOpen }"
      ref="head" 
      
      :style="{ 'border-color': isOpen ? '#797979': '#DEDEDE' }"
      
      @click="openSelect">
      <span 
        class="multiselect__pick"
        v-for="(item, index) in picks"
        
        :key="item.id">
        
        {{ item.text }}&nbsp;
        
        <button class="multiselect__btn" @click="handleRemove($event, index)">
          <img src="data:image/svg+xml,%3Csvg width='5' height='5' viewBox='0 0 5 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.121755 4.29125C-0.0403337 4.45334 -0.0403395 4.71615 0.121755 4.87824C0.283849 5.04034 0.546661 5.04033 0.70875 4.87824L2.49993 3.08706L4.29125 4.87838C4.45334 5.04048 4.71615 5.04048 4.87824 4.87838C5.04034 4.71629 5.04034 4.45348 4.87824 4.29139L3.08693 2.50007L4.87843 0.708565C5.04052 0.546471 5.04052 0.283665 4.87843 0.121571C4.71633 -0.0405236 4.45353 -0.0405236 4.29143 0.121571L2.49993 1.91307L0.708566 0.121709C0.546471 -0.0403855 0.283665 -0.0403855 0.121571 0.121709C-0.0405236 0.283803 -0.0405236 0.546609 0.121571 0.708704L1.91294 2.50007L0.121755 4.29125Z' fill='%23fff'/%3E%3C/svg%3E" alt="" aria-hidden="true">
        </button>
      </span>
      <!-- <div ref="wrapper" class="multiselect__input-wrap" :style="{ 'width': picks.length === 0 ? '100%': width + 'px' }"> -->
      <div ref="wrapper" class="multiselect__input-wrap" :style="{ 'width': width + 'px' }">
        <input ref="input" class="multiselect__input"
               type="text"

               :value="search"
               @input="handleInput"
               
               :placeholder="picks.length === 0 ? placeholder : ''">
      </div>
      <div class="multiselect__close-btn" @click="handleClick"></div>
    </div>
    <div class="wrapper">
      <div class="multiselect__body" v-if="filteredList.length !== 0" v-show="isOpen">
        <ul class="multiselect__list">
          <item
                v-for="(item, index) in filteredList"
                
                :key="index"
                
                :item="item"
                :isPicked="hasPick(item)"
                
                @item:pick="addToPicks">
          </item>
        </ul>
      </div>
    </div>
  </div>  
</template>

<script>

import MultiselectItem from '@/src/components/multiselect/MultiselectItem.vue';

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    isAllItems: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    search: {
      type: String,
      default: ''
    },
    active: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.$emit('input', this.picks);
  },
  data() {
    return {
      picks: [],
      isOpen: false,
      width: 135
    }
  },
  methods: {
    handleRemove(e, index) {
      e.stopPropagation();

      this._removePick(index);
    },
    handleClick(e) {
      e.stopPropagation();

      this.isOpen = !this.isOpen;
    },
    openSelect() {
      this.isOpen = true;
    },
    addToPicks(item) {
      this.$refs.input.focus();
      this.width = 135;

      if (this.hasInPicks(item) === -1) {
        this.picks.push(item);

        this.$refs.wrapper.style.width = '30px';
      } else {
        this._removePick(this.hasInPicks(item));
      }

      this.$emit('inputText', '');
    },
    hasPick(item) {
      return !!this.picks.filter(value => value.id === item.id).length;
    },
    hasInPicks(item) {

      for (let i = 0; i < this.picks.length; i++) {
        if (this.picks[i].id === item.id) {
          return i;
        }
      }

      return -1;

    },
    handleInput(e) {
      this.width = this.search.length * 8;

      this.$emit('inputText', e.target.value);
    },
    _removePick(index) {
      this.picks.splice(index, 1);
    },
  },
  computed: {
    filteredList() {
      let search = this.search;

      if (search.length === 0) {
        return this.options;
      }

      return this.options.filter(item => item.text.toLowerCase().indexOf(search.toLowerCase()) >= 0);
    }
  },
  watch: {
    isAllItems: function() {
      if (this.isAllItems) {

        this.options.forEach(option => {
          if (this.hasInPicks(option) === -1) {
            this.picks.push(option);
          }
        })
      } else {
        this.picks.splice(0, this.picks.length);
      }
    }
  },
  components: {
    item: MultiselectItem
  }
}
</script>

<style lang="scss">
  .multiselect {

    max-width: 300px;

    & .wrapper {
      position: relative;
    }

    &__close-btn {
      position: absolute;

      top: 50%;
      right: 16px;

      width: 10px;
      height: 9px;

      background: url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.45 1.6C9.78137 1.35147 9.84853 0.881371 9.6 0.55C9.35147 0.218629 8.88137 0.151472 8.55 0.4L9.45 1.6ZM5 4L4.55 4.6C4.81667 4.8 5.18333 4.8 5.45 4.6L5 4ZM1.45 0.4C1.11863 0.151472 0.648528 0.218629 0.4 0.55C0.151472 0.881371 0.218629 1.35147 0.55 1.6L1.45 0.4ZM8.55 0.4L4.55 3.4L5.45 4.6L9.45 1.6L8.55 0.4ZM5.45 3.4L1.45 0.4L0.55 1.6L4.55 4.6L5.45 3.4Z' fill='%23909090'/%3E%3C/svg%3E%0A") no-repeat center center;

      transform: translate(0, -50%);
      transform-origin: center center;
      transition: .2s;
    }

    &__head {
      position: relative;

      display: flex;
      flex-wrap: wrap;

      // padding-right: 15px;
      // padding-left: 15px;

      padding-top: 1px;
      padding-bottom: 4px;
      padding-right: 30px;
      padding-left: 4px;
      width: 100%;

      min-height: 36px;

      border: 1px solid #DEDEDE;
      border-radius: 7px;

      box-sizing: border-box;

      cursor: pointer;

      &--active {
        .multiselect__close-btn {
          transform: translate(0, -50%) rotate(180deg);
        }
      }
    }

    &__input-wrap {
      display: inline;     
      max-width: 100%;
      min-width: 135px;
    }

    &__input {

      margin-top: 4px;
      margin-left: 4px;
      
      // width: 110px;
      width: 100%;
      height: 26px;

      border: none;
      box-sizing: border-box;

      &:focus {
        outline: none;
      }
    }

    &__pick {
      display: flex;
      align-items: center;

      padding-left: 6px;
      padding-right: 6px;

      margin-left: 4px;
      margin-top: 4px;

      height: 24px;

      font-family: Arial, Helvetica;
      font-size: 12px;

      color: #333;

      background: #F1F1F1;
      border-radius: 5px;
    }

    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 11px;
      height: 11px;

      margin-left: 5px;

      background: #919191;
      border-radius: 10px;

      cursor: pointer;

      &:hover {
        background: #333333;
      }

      &:focus {
        outline: none;
      }
    }

    &__body {
      position: absolute;
      top: 5px;

      width: 100%;

      padding: 20px 0px;

      background: #fff;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
      border-radius: 7px;

      box-sizing: border-box;
    }


    &__item {
      display: flex;
      align-items: center;

      padding-right: 16px;
      padding-left: 16px;

      height: 26px;

      font-family: Arial, Helvetica;
      font-size: 14px;
      color: #797979;

      user-select: none;

      transition: .2s;

      &--active {
        color: #333333;
      }

      &:hover {
        cursor: pointer;
        background: #F3F3F3;
      }
    }
  }
</style>

