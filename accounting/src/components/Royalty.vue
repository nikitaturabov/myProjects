<template>
  <div class="wrap_main_content_royalty">
    <div class="main_content_royalty"></div>
    <revenue-in-count></revenue-in-count>

    <div class="revenue_bo">
      <div class="left_block">
        <graph-revenue :dataGraph="this.$store.getters.getRoyaltyData.data_graph_revenue"></graph-revenue>
      </div>
      <div class="field_for_chart">
        <information-desc :data="dataSet[dataSet.selectedSlice]"></information-desc>
      </div>
    </div>
    <recalculation></recalculation>
    <regular-service :dataGraph="this.$store.getters.getRoyaltyData.dataProvider_graph"></regular-service>
  </div>
</template>

<script>
import RevenueInCount from "./royalty/RevenueInCount.vue";
import InformationDesc from "./royalty/InformationDesc.vue";
import GraphRevenue from "./royalty/GraphRevenue.vue";
import Recalculation from "./royalty/Recalculation.vue";
import RegularService from "./royalty/RegularService.vue";
export default {
  components: {
    RevenueInCount,
    Recalculation,
    RegularService,
    InformationDesc,
    GraphRevenue
  },
  methods: {},
  computed: {
    getDataFirstPie() {
      let slice = this.dataSet.selectedSlice;
      console.log(slice)
      return this.dataSet[slice];
    },
    dataSet(){
      return this.$store.getters.getRoyaltyData.board_revenue;
    }
  },
};
</script>

<style lang="less">
.wrap_main_content_royalty {
  background: #ffffff;
  position: relative;
  .main_content_royalty {
    margin-top: -10px;
    z-index: 2;
  }
  .revenue_bo {
    padding: 35px 36px 0;
    display: flex;
    justify-content: space-between;
    .left_block {
      flex: 1;
    }
    .field_for_chart {
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
