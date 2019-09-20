<template>
  <div class="graphics_area">
    <div class="left_block">
      <h3 class="head_text">Системы налогообложения</h3>
      <div id="contribution"></div>
    </div>
    <div class="right_block">
      <h3 class="head_text">Сегменты выручки за период проведения проверки</h3>
      <div id="revenue"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    setDataGraphics() {
      return this.$store.getters.getData;
    }
  },
  mounted() {
    let chart = new AmCharts.makeChart("contribution", {
      type: "pie",
      balloonText: "[[title]] - [[value]]",
      colors: [
        "#EE5F50",
        "#FEC616",
        "#FEA62A",
        "#98CB16",
        "#25B8B6",
        "#4483CC",
        "#9173D0",
        "#ED89B7",
        "#6D8D0D"
      ],
      hideLabelsPercent: 10,
      innerRadius: "40%",
      titleField: "category",
      marginLeft: 0,
       marginTop: 40,
      autoResize: false,
      labelRadius: 35,
      labelText: "[[percents]]%",
      valueField: "clients",
      fontSize: 16,
      minRadius: 90,
      innerRadius: "40%",
      pullOutOnlyOne: true,
      allLabels: [],
      balloon: {},
      titles: [],
      dataProvider: this.setDataGraphics.diagrammSNO,
      legend: {
        enabled: true,
       marginTop: 40,
       align: "center",
        textClickEnabled: true,
        labelText: "[[title]]",
        minConumns: 2,
        maxColumns: 4,
        verticalGap: 15,
        valueText: "([[value]])",
        valueWidth: 50
      }
    });

    let secondChart = new AmCharts.makeChart("revenue", {
      type: "pie",
      balloonText: "[[title]] - [[value]]",
      colors: [
        "#EE5F50",
        "#FEC616",
        "#FEA62A",
        "#98CB16",
        "#25B8B6",
        "#4483CC",
        "#9173D0",
        "#ED89B7",
        "#6D8D0D"
      ],
      hideLabelsPercent: 10,
      labelText: "[[percents]]%",
      innerRadius: "40%",
      titleField: "category",
      marginLeft: 0,
      marginTop: 40,
      autoResize: false,
      labelRadius: 35,
      valueField: "clients",
      fontSize: 16,
      minRadius: 90,
      innerRadius: "40%",
      pullOutOnlyOne: true,
      allLabels: [],
      balloon: {},
      titles: [],
      dataProvider: this.setDataGraphics.diagrammRevenue,
      legend: {
        enabled: true,
        align: "center",
        textClickEnabled: true,
        marginTop: 0,
        labelText: "[[title]]",
        minConumns: 2,
        maxColumns: 4,
        verticalGap: 15,
        valueText: "([[value]])",
        valueWidth: 50
      }
    });
  }
};
</script>

<style lang="less">
.graphics_area {
  display: flex;
  justify-content: space-between;
  min-width: 1452px;

  .left_block,
  .right_block {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 749px;
    flex: 1;
    height: 480px;
    background: #ffffff;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    padding-bottom: 87px;
    .head_text {
      font-weight: bold;
      font-size: 13px;
      line-height: normal;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: #676767;
      margin: 0;
      padding: 17px 30px;
      align-self: flex-start;
    }

    #contribution,
    #revenue {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 600px;
      height: 595px;
      .amcharts-chart-div {
        height: 320px !important;
      }
      .amcharts-legend-div{
        height: 177px !important;
      }
    }
  }
  .left_block {
    margin-right: 15px;
  }

  // @media screen and (max-width: 1570px) {
  //   .left_block,
  //   .right_block {
  //     width: 637px;
  //   }
  // }
}
</style>