<template>
  <div class="timepicker" @click="open" v-click-outside="() => isOpen = false">
    <svg class="timepicker__icon" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5.5" cy="5.5" r="5.075" stroke="#BDBDBD" stroke-width="0.85"/>
      <path d="M5.5 2.0625V5.75L7.5625 7.5625" stroke="#BDBDBD" stroke-width="0.85"/>
    </svg>
    <input v-model="pickedTime" type="text" class="timepicker__input">

    <div class="timepicker__select" v-if="isOpen">
      <span class="timepicker__title">Время</span>
      <ul class="timepicker__list">
        <li class="timepicker__item"
            v-for="(item, index) in getValues"

            :class="{ 'timepicker__item--active': pickedTime === item }"
            :key="index"

            ref="btn"
        >
          <button class="timepicker__btn"
                  @click="pickTime(item)"
          >
            {{ item }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    start: {
      type: Number,
      default: 0
    },
    active: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      pickedTime: null,
      isOpen: false
    }
  },
  created() {
    this.pickedTime = this.active !== -1 ? this._convertToMinsHrs(this.active) : this.getValues[0];
    this.$emit('input', this.pickedTime);
  },
  methods: {
    pickTime(value) {
      this.pickedTime = value;

      this.$nextTick(() => {
        this.isOpen = false;
      })

      this.$emit('input', this.pickedTime);
    },
    open() {
      this.isOpen = true;
    },
    _convertToMinsHrs(minutes) {
        let h = Math.floor(minutes / 60);
        let m = minutes % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;

        return `${h}:${m}`;
    }
  },
  computed: {
    getValues() {
      let values = [];

      for (let i = this.start; i <= 1410; i += 30) {
        values.push(this._convertToMinsHrs(i));
      }

      return values;
    }
  }
}
</script>

<style lang="scss">
  .timepicker {
    position: relative;
  
    display: flex;
    align-items: center;

    &__icon {
      margin-right: 6px;

      min-width: 11px;
    }

    &__input {
      max-width: 40px;
      width: 100%;

      font-family: Arial, Helvetica;
      font-size: 14px;
      color: #4D4D4D;

      border: none;

      cursor: pointer;

      &:focus {
        outline: none;
      }
    }

    &__select {
      position: absolute;

      bottom: calc(100% + 17px);

      padding: 18px 13px 18px 15px;


      background: #FFFFFF;

      box-sizing: border-box;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.12);

      border: 1px solid #DADADA;
      border-radius: 2px;
    }

    &__list {
      display: flex;
      flex-direction: column;

      min-width: 96px;
      max-height: 112px;

      overflow-y: auto;

      border-radius: 2px;
      border: 1px solid #DADADA;
      
      background: #FFFFFF;
      box-sizing: border-box;
      
      &::-webkit-scrollbar {
        width: 10px;
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        border: 1px solid #fff;
        background-color: #D6D6D6;
      }
    }

    &__item {
      &--active {
        .timepicker__btn {
          font-weight: 700;
          color: #629100;
        }
      }
    }

    &__btn {
      width: 100%;
      height: 22px;

      font-size: 14px;
      color: #4D4D4D;

      background: #fff;

      transition: .2s;
      cursor: pointer;

      &:hover {
        background: #F3F3F3;
      }

      &:focus {
        outline: none;
      }
    }
    
    &__title {
      display: inline-block;

      margin-bottom: 7px;

      text-align: center;
      width: 84px;
    }
  }
</style>
