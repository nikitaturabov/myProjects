<template>
  <div class="wrap_royalty">
    <a
      :href="setRoyaltyTab.link"
      @click="$emit('set-component')"
      v-bind:class="{ active: currentComponent === 'Royalty' }"
      class="tab_royalty"
    >
      <div class="column_content_left">
        <div class="wrapper">
          <div class="revenue">
            <div class="revenue_text">Выручка</div>
            <div class="wrap_sum">
              <div class="revenue_count" v-gap-between-num="{num: setRoyaltyTab.revenue.sum}"></div>
              <span class="rub">руб.</span>
            </div>
          </div>
          <div class="recalculation" v-if="showRecalculation(setRoyaltyTab.revenue.recalculation)">
            <div class="recalculation_text">Включая перерасчёт</div>
            <div class="recalculation_count green" v-if="recalculationRevenue">
            + <span class="num" v-gap-between-num="{num: setRoyaltyTab.revenue.recalculation}"></span> руб.
            </div>
            <div class="recalculation_count red" v-if="!recalculationRevenue">
              <span class="num" v-gap-between-num="{num: setRoyaltyTab.revenue.recalculation}"></span> руб.
            </div>
          </div>
        </div>
      </div>
      <div class="column_content_right">
        <div class="wrapper">
          <div class="royalty">
            <div class="royalty_text">Роялти</div>
            <div class="wrap_sum">
              <div class="royalty_count" v-gap-between-num="{num: setRoyaltyTab.royalty.sum}"></div>
              <span class="rub">руб.</span>
            </div>
          </div>
          <div class="recalculation" v-if="showRecalculation(setRoyaltyTab.royalty.recalculation)">
            <div class="recalculation_text">Включая перерасчёт</div>
            <div class="recalculation_count green" v-if="recalculationRoyalty">
             +<span class="num" v-gap-between-num="{num: setRoyaltyTab.royalty.recalculation}"></span> руб.
            </div>
            <div class="recalculation_count red" v-if="!recalculationRoyalty">
              <span class="num" v-gap-between-num="{num: setRoyaltyTab.royalty.recalculation}"></span> руб.
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["currentComponent"],
  data() {
    return {
      tab_royalty: {}
    };
  },
  methods: {
    showRecalculation(element) {
      if (element === 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  computed: {
    setRoyaltyTab() {
      return this.$store.getters.getMainInfo.tab_royalty;
    },
    recalculationRevenue(){
      return (this.setRoyaltyTab.revenue.recalculation > 0) ? true : false;
    },
    recalculationRoyalty(){
      return (this.setRoyaltyTab.royalty.recalculation > 0) ? true : false;
    }
  }
};
</script>

<style lang="less">
.tab_royalty {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 442px;
  height: 130px;
  background: #e6e6e6;
  border-radius: 20px 20px 0px 0px;
  &.active {
    background: #ffffff;
  }

  .column_content_left,
  .column_content_right {
    .wrapper {
      margin-top: -3px;
      height: 130px;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
    }
    padding-left: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 190px;
    .revenue,
    .royalty {
      .revenue_text {
        letter-spacing: 0.08em;
      }

      font-size: 10px;
      text-transform: uppercase;
      color: #7f7f7f;
    }
    .recalculation {
      margin-top: 3px;
      font-size: 10px;
      text-transform: uppercase;
      color: #7f7f7f;
      .recalculation_text {
        letter-spacing: 0.08em;
      }
    }
    .revenue_count,
    .royalty_count,
    .rub {
      margin-top: 9px;
      line-height: normal;
      font-size: 23px;
      color: #000000;
      text-transform: none;
    }

    .recalculation_count {
      margin-top: 5px;
      line-height: 19px;
      font-size: 14px;
      text-transform: none;
      &.green{
        color: #00aa45;
      }
      &.red{
        color: #ef5350;
      }
    }
  }
  .wrap_sum {
    display: flex;
    align-items: baseline;
    .rub {
      margin-left: 8px;
    }
  }
  .column_content_right {
    border-left: 1px dashed #bababa;
  }
}
@media screen and (min-width: 1500px) {
  .tab_royalty {
    width: 442px;

    .column_content_left,
    .column_content_right {
      .revenue,
      .royalty {
        font-size: 11px;
      }
      .recalculation {
        font-size: 11px;
      }

      .recalculation_count {
        font-size: 15px;
      }
    }
  }
}
</style>