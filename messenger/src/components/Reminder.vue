<template>
  <div class="reminder" v-click-outside="clickOutside">
    <!-- reminder__btn--active -->
    <button class="reminder__btn"
            :class="{ 'reminder__btn--active': isOpen }"
    
            @click="openModal"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.07124 7.3851C6.0713 5.37738 7.32372 3.69051 9.01844 3.21293C9.01844 2.64631 9.31263 2 10.0003 2C10.6886 2 10.9822 2.64695 10.9822 3.21382C12.6753 3.69259 13.9262 5.37862 13.9262 7.3851V11.7165C14.5169 12.1236 15.2641 12.6694 15.8238 13.0787C16.1625 13.3263 15.9802 13.8455 15.5548 13.8455H13.9262V13.8465H6.07124V13.8455H4.44525C4.01975 13.8455 3.83754 13.3263 4.17615 13.0787C4.73728 12.6684 5.50035 12.1225 6.07124 11.7174V7.3851Z" fill="#848484"/>
        <path d="M10.0055 16C9.15045 16 8.42306 15.5505 8.15347 14.9231H11.8575C11.5879 15.5505 10.8605 16 10.0055 16Z" fill="#848484"/>
      </svg>
      &nbsp;
      {{ time.seconds !== -1 ? time.value : pickedDate + ' ' + pickedTime }}
    </button>
    <button v-if="isOpen && hasValue" class="reminder__close-btn" @click="removeTime">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="6" fill="#919191"/>
        <path d="M3.14509 8.15367C2.95164 8.34717 2.95164 8.6609 3.14509 8.8544C3.33855 9.04791 3.65221 9.04791 3.84566 8.8544L6.00033 6.69923L8.15546 8.85487C8.34892 9.04838 8.66257 9.04838 8.85603 8.85487C9.04949 8.66137 9.04949 8.34764 8.85603 8.15414L6.7009 5.9985L8.85303 3.84586C9.04649 3.65236 9.04649 3.33863 8.85303 3.14513C8.65957 2.95162 8.34592 2.95162 8.15246 3.14513L6.00033 5.29777L3.84866 3.14559C3.6552 2.95209 3.34155 2.95209 3.14809 3.14559C2.95464 3.3391 2.95464 3.65283 3.14809 3.84633L5.29976 5.9985L3.14509 8.15367Z" fill="white"/>
      </svg>
    </button>
    <div class="reminder__popup" v-if="isOpen" :style="{ width: pickedSeconds === -1 ? '453px' : '352px' }">
      Напомнить<Dropdown class="control--member"
                :items="times"
                type="arrow"

                @dropdown:set="setValue">
        {{ pickedValue }}
      </Dropdown>
      
      <template v-if="pickedSeconds !== -1">до начала события</template>

      <date-pick
                    v-model="reminderDate"
                    v-if="pickedSeconds === -1"
                    
                    nextMonthCaption="Следующий месяц"
                    prevMonthCaption="Предыдущий месяц"
                    style="margin-left: 0"
                    
                    :format="'DD.MM.YYYY'"
                    :weekdays="[ 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс' ]"
                    :months="[ 'Январь', 'Февраль', 'Март', 'Апрель',
                               'Май', 'Июнь', 'Июль', 'Август',
                               'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ]">
        
      </date-pick>

      <time-picker
                    v-model="reminderTime"
                    v-if="pickedSeconds === -1"

                    class="reminder__timepicker"

                    :start="isToday ? getMinutes(startTime) : 420"
                    :active="getMinutes(this.pickedTime)"
      >

      </time-picker>
      
      <button
              class="reminder__save-btn"
      
              @click="saveTime"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="19" height="19" rx="4.5" fill="white" stroke="#7FA630"/>
          <path d="M7.5241 12.8251L5 10.4753L6.26346 9.30046L8.78362 11.6439L13.736 7L15 8.17488L8.81406 14L8.38276 13.6071L8.37543 13.6138L7.67351 12.9613L7.5241 12.8251Z" fill="#7FA630"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>

import Dropdown from '@/src/components/dropdown/Dropdown.vue';
import TimePicker from '@/src/components/timepicker/TimePicker.vue';
import { roundTimeMinusHour } from '@/src/utils/round-time.js';

import moment from 'moment';
import DatePick from 'vue-date-pick';


export default {
  props: {
    pickedValue: {
      type: String,
      default: null
    },
    pickedSeconds: {
      type: Number,
      default: 0
    },
    time: {
      type: Object,
      default: () => ({
        seconds: null,
        value: null
      })
    }
  },
  data() {
    return {
      // pickedValue: 'за 1 час',
      // pickedSeconds: 3600,
      pickedDate: null,
      pickedTime: null,
      // time: {
      //   seconds: null,
      //   value: null
      // },
      isOpen: false,
      times: [
        { text: 'в указанное время', seconds: -1 },
        { text: 'за 10 минут', seconds: 10 * 60 },
        { text: 'за 15 минут', seconds: 15 * 60 },
        { text: 'за 30 минут', seconds: 30 * 60 },
        { text: 'за 1 час', seconds: 1 * 60 * 60 },
        { text: 'за 2 часа', seconds: 2 * 60 * 60 },
        { text: 'за 4 часа', seconds: 4 * 60 * 60 },
        { text: 'за 1 день', seconds: 24 * 60 * 60 },
      ],
      reminderDate: null,
      reminderTime: '',
      startTime: roundTimeMinusHour()
    }
  },
  created() {
    let now = moment();

    this.reminderDate = now.format('DD.MM.YYYY');
  },
  methods: {
    openModal() {
      this.isOpen = !this.isOpen;
    },
    setValue(value) {
      // this.pickedValue = value[0].text;
      // this.pickedSeconds = value[0].seconds;

      this.$emit('value:set', value[0].text, value[0].seconds);
    },
    saveTime() {
      this.time.value = this.pickedValue;
      this.time.seconds = this.pickedSeconds;

      this.pickedDate = this.reminderDate;
      this.pickedTime = this.reminderTime;

      this.isOpen = false;

      this.$emit('reminder:set', this.pickedSeconds, { date: this.pickedDate, time: this.pickedTime });
    },
    removeTime() {
      // this.pickedValue = 'за 1 час';
      // this.pickedSeconds = 3600;

      this.time.value = null;
      this.time.seconds = null;

      this.isOpen = false;

      this.$emit('reminder:set', 0);
      this.$emit('value:set', 'за 1 час', 3600);
    },
    clickOutside() {
      this.isOpen = false;

      // this.pickedSeconds = this.time.seconds ? this.time.seconds : 3600;
      // this.pickedValue = this.time.value ? this.time.value : 'за 1 час';
      this.reminderDate = this.pickedDate ? this.pickedDate : moment().format('DD.MM.YYYY');

      this.$emit('value:set', this.time.value ? this.time.value : 'за 1 час', this.time.seconds ? this.time.seconds : 3600);
    },
    getMinutes(value) {
      if (!value || value === null) {
        return -1;
      }

      const times = value.split(':');

      return Number(times[0]) * 60 + Number(times[1]);
    }
  },
  computed: {
    hasValue() {
      return this.time.value !== null;
    },
    isToday() {
      return this.reminderDate === moment().format('DD.MM.YYYY');
    }
  },
  components: {
    Dropdown,
    DatePick,
    TimePicker
  }
}
</script>

<style lang="scss">
  .reminder {
    position: relative;

    &__timepicker {
      margin-left: 15px;
    }

    &__save-btn {
      display: flex;

      min-width: 20px;
      

      margin-left: 18px;

      border-radius: 5px;
    
      background: transparent;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:hover {
        svg {
          rect {
            fill: #7FA630;
          }

          path {
            fill: #fff;
          }
        }
      }
    }

    &__close-btn {
      display: flex;

      margin-left: 4px;

      background: transparent;

      &:focus {
        outline: none;
      }
    }

    &__btn {
      display: flex;
      align-items: center;

      font-size: 14px;
      color: #BDBDBD;

      background: transparent;
      
      cursor: pointer;


      &:hover {
        color: #629100;

        svg {
          path {
            fill: #629100;
          }
        }
      }

      &:focus {
        outline: none;
      }

      &--active {
        color: #629100;
        
        svg {
          path {
            fill: #629100;
          }
        }
      }
    }

    &__popup {
      position: absolute;

      left: 0;
      bottom: calc(100% + 5px);

      display: flex;
      align-items: center;

      height: 37px;

      padding-right: 17px;
      padding-left: 17px;

      font-size: 12px;
      color: #646464;

      white-space: nowrap;

      background: #fff;

      box-sizing: border-box;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.12);

      border: 1px solid #DADADA;
      border-radius: 2px;

      .form__item {
        margin-right: 20px;
        margin-left: 20px;

        height: 100%;

        &:hover {
          .control__title {
            color: #629100;

            svg {
              path { 
                stroke: #629100;
              }
            }
          }
        }
      }
    }
  }
</style>
