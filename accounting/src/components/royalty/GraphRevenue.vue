<template>
  <div class="wrap_block_chart_client">
    <h2 class="headline_clients">Выручка 1С:БухОбслуживание</h2>
    <div class="chart">
      <div id="chart_clients_bo" style="width: 750px; height: 600px; background-color: #FFFFFF;"></div>
    </div>
  </div>
</template>

<script>
import updateGraph from "../../mixin/updateGraphics.js";
export default {
  mixins: [updateGraph],
  mounted() {
    this.chart = new AmCharts.makeChart("chart_clients_bo", {
      type: "pie",
      balloonText: "",
      thousandsSeparator: " ",
      colors: [
        "#EF5F50",
        "#FFC700",
        "#FFA726",
        "#9ACC00",
        "#25B8B6",
        "#4483CC",
        "#9173D0",
        "#ED89B7"
      ],
      innerRadius: "40%",
      titleField: false,
      autoMargin: true,
      autoResize: false,
      maxLabelWidth: 100,
      labelRadius: 28,
      labelText: "",
      valueField: "clients",
      labelText: "[[category]]:<br>[[value]] руб.",
      fontSize: 14,
      minRadius: 148,
      innerRadius: "50%",
      pullOutOnlyOne: true,
      allLabels: [],
      balloon: {},
      titles: [],
      dataProvider: [],
      listeners: [
        {
          event: "pullOutSlice",
          method: event => {
            this.$store.getters.getRoyaltyData.board_revenue.selectedSlice =
              event.dataItem.dataContext.id;
          }
        },
        {
          event: "pullInSlice",
          method: event => {
            this.$store.getters.getRoyaltyData.board_revenue.selectedSlice =
              "free_data";
          }
        }
      ]
    });
    this.chart.dataProvider = this.setData;
    this.updateGraph;
  }
};
</script>

<style lang="less">
.wrap_block_chart_client {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .headline_clients {
    position: absolute;
    top: 0;
    left: 0;
    font-style: normal;
    font-weight: normal;
    line-height: 28px;
    font-size: 20px;
    color: #4d4d4d;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    color: #3a3a3a;
  }
}
</style>
