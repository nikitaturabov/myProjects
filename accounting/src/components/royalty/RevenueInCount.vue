<template>
  <div class="wrap_revenue">
    <div class="revenue">
      <div class="service">
        <a :href="setData.service.link" class="money green_block">
          <div class="count" v-gap-between-num="{num: setData.service.count}"></div>руб.
        </a>
        <div class="text">регулярное обслуживание</div>
      </div>

      <div class="one_time">
        <a :href="setData.onetimeServices.link" class="money green_block">
          <div class="count" v-gap-between-num="{num: setData.onetimeServices.count}"></div>руб.
        </a>
        <div class="text">оказание разовых услуг</div>
      </div>

      <div class="on_technology" v-if="showTransferOnTechnology">
        <a :href="setData.onTechnology1c.link" class="money green_block">
          <div class="count" v-gap-between-num="{num: setData.onTechnology1c.count}"></div>руб.
        </a>
        <div class="text">к переводу на технологию 1С:БО</div>
      </div>

      <div class="recovery">
        <a :href="setData.recovery.link" class="money green_block">
          <div class="count" v-gap-between-num="{num: setData.recovery.count}"></div>руб.
        </a>
        <div class="text">восстановление учёта</div>
      </div>
    </div>
  </div>
</template>

<script>
import hideTransferOfTechnology from "../../mixin/hideTransferOfTechnology.js";
export default {
  mixins: [hideTransferOfTechnology],
  computed:{
    setData(){
      return this.$store.getters.getRoyaltyData.revenue;
    }
  },
};
</script>

<style lang="less">
.wrap_revenue {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  .revenue {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 23px 35px 23px 25px;

    .service,
    .one_time,
    .on_technology,
    .recovery {
      display: flex;
      justify-content: space-between;
      align-items: center;
      white-space: nowrap;
      .count {
        margin-right: 8px;
      }
      .text {
        font-size: 15px;
        color: #00963d;
      }
    }
    // .service {
    //   width: 276px;
    // }
    // .one_time {
    //   width: 310px;
    // }
    // .on_technology {
    //   width: 339px;
    // }
    // .recovery {
    //   width: 347px;
    // }
    .green_block {
      display: flex;
      justify-content: center;
      margin: 10px;
      min-width: 135px;
      padding: 10px 25px;
      background: rgba(0, 170, 69, 0.1);
      border-radius: 5px;
      font-weight: bold;
      font-size: 21px;
      text-align: center;
      color: #00963d;
    }
  }
}
</style>
 