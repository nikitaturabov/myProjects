<template>
  <div class="day" v-if="checkDate && getDate !== 'Invalid date'">
    <div class="day__date">
      {{ 
          getDate === todayDate ? 'Сегодня':
            getDate === yesterdayDate ? 'Вчера': getDate
      }}
    </div>
  </div>
</template>

<script>

import dateFns from 'date-fns';

export default {
  props: {
    date: {
      type: String,
      default: ''
    },
    lastDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      todayDate: dateFns.format(Date.now(), 'DD.MM.YYYY'),
      yesterdayDate: dateFns.format(dateFns.addDays(Date.now(), -1), 'DD.MM.YYYY'),
    }
  },
  computed: {
    checkDate() {
      if (this.date !== this.lastDate) {
        return true;
      }

      return false;
    },
    getDate() {
      return this.date;
    },
  }
}
</script>

<style lang="scss">
  .day {    
    position: relative;

    height: 1px;

    margin-top: 22px;
  
    background: #D7D6D6;

    margin-bottom: 22px;

    &__date {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      padding-right: 10px;
      padding-left: 10px;

      font-size: 12px;
      color: #7F7F7F;
      
      background: #ffffff;
    }
  }
</style>

