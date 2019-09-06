<template>
  <div class="wrap_transfer_on_technology">
    <div class="inscription">
      <h2 class="headline_transfer">К переводу на технологию 1С:БО</h2>
    </div>
    <div class="chart">
      <div
        id="chart_technology_bo"
        style=" width: 650px; height: 610px; background-color: #FFFFFF;"
      ></div>
    </div>
  </div>
</template>

<script>
import updateGraph from "../../mixin/updateGraphics.js";
export default {
  mixins: [updateGraph],
  mounted() {
    this.chart = new AmCharts.makeChart("chart_technology_bo", {
      type: "pie",
      balloonText: "",
      maxLabelWidth: 110,
      thousandsSeparator: " ",
      innerRadius: "40%",
      colors: ["#FF7043", "#FACC1F", "#DFDFDF"],
      titleField: false,
      autoMargin: true,
      autoResize: true,
      labelRadius: 50,
      labelText: "[[category]]<br>[[value]]",
      fontSize: 14,
      minRadius: 154,
      valueField: "clients",
      labelRadiusField: "categoty",
      pullOutOnlyOne: true,
      allLabels: [],
      balloon: {},
      titles: [],
      dataProvider: [],
      listeners: [
        {
          event: "pullOutSlice",
          method: event => {
            this.$store.state.clients_page.data_table_remain_transfer.selectedSlice =
              event.dataItem.dataContext.id;
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
.wrap_transfer_on_technology {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 35px;

  .inscription {
    position: absolute;
    top: 0;
    left: 40px;
    .headline_transfer {
      font-style: normal;
      font-weight: normal;
      font-size: 22px;
      line-height: 30px;
      color: #3a3a3a;
      margin: 0;
      padding: 10px 0;
      font-style: normal;
      font-weight: normal;
    }
  }
  .chart {
  }
}
</style>