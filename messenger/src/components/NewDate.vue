
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

import moment from 'moment';

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
      todayDate: moment().format('DD.MM.YYYY'),
      yesterdayDate: moment().subtract(1, 'days').format('DD.MM.YYYY'),
    }
  },
  computed: {
    checkDate() {
      const currentDate = moment(this.date).format('DD-MM-YYYY');
      const formatLastDate = moment(this.lastDate).format('DD-MM-YYYY');

      if (currentDate !== formatLastDate) {
        return true;
      }

      return false;
    },
    getDate() {
      let offset = new Date().getTimezoneOffset();

      return moment(this.date).utcOffset(offset / -30).format('DD.MM.YYYY');
    }
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

