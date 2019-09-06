<template>
  <div class="wrap_charts_bo1c">
    <div class="wrap_chart_up">
      <div
        id="chart_clients_and_dumps"
        style="width: 100%; height: 400px; background-color: #FFFFFF;"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    AmCharts.makeChart("chart_clients_and_dumps", {
      type: "serial",
      categoryField: "month",
      startDuration: 1,
      colors: ["#FFB74D", "#FF7043"],
      categoryAxis: {
        axisColor: "#ffffff",
        boldPeriodBeginning: false,
        centerLabelOnFullPeriod: false,
        gridColor: "#FFFFFF",
        gridThickness: 0,
        markPeriodChange: false,
        minHorizontalGap: 67,
        titleBold: false
      },
      trendLines: [],
      graphs: [
        {
          balloonText: "[[value]] клиентов",
          fillAlphas: 1,
          id: "AmGraph-1",
          title: "Клиенты на тарифах",
          type: "column",
          valueField: "clients",
          columnWidth: 0.7
        },
        {
          balloonText: "[[value]] отвалов",
          fillAlphas: 1,
          id: "AmGraph-2",
          title: "Отвалы",
          type: "column",
          valueField: "dumps",
          columnWidth: 0.7
        }
      ],
      guides: [],
      valueAxes: [
        {
          axisFrequency: 0,
          id: "ValueAxis-1",
          stackType: "regular",
          minMaxMultiplier: 0,
          precision: 0,
          radarCategoriesEnabled: false,
          synchronizationMultiplier: 0,
          zeroGridAlpha: 0,
          autoGridCount: false,
          autoRotateAngle: 0,
          autoRotateCount: 0,
          axisAlpha: 122,
          axisColor: "#9f9f9f",
          axisThickness: 0,
          boldPeriodBeginning: false,
          centerLabelOnFullPeriod: false,
          dateFormats: [],
          fontSize: 0,
          gridColor: "#9f9f9f",
          gridThickness: 0,
          zeroGridAlpha: 1
        }
      ],
      allLabels: [],
      balloon: {
        animationDuration: 0.1,
        borderColor: "#DADADA",
        borderThickness: 1,
        color: " #4D4D4D",
        cornerRadius: 2,
        disableMouseEvents: false,
        fillAlpha: 1,
        fixedPosition: false,
        fontSize: 16,
        horizontalPadding: 5,
        shadowAlpha: 0.13,
        textAlign: " middle",
        verticalPadding: 8
      },
      legend: {
        enabled: true,
        useGraphSettings: true,
        fontSize: 13,
        markerType: "circle",
        position: "top",
        align: "right",
        useGraphSettings: false,
        spacing: 0,
        autoMargins: false,
        horizontalGap: 135,
        switchType: ""
      },
      dataProvider: this.$store.getters.getDynamicsData.clients.clients_1cbo.dynamic_clients_data
    });
  }
};
</script>

<style lang="less">

</style>
