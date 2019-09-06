<template>
  <div class="wrap_regular_service" v-if="setTable.length">
    <div class="regular_service">
      <div class="top_block">
        <h2 class="headline">Регулярное обслуживание</h2>
        <div class="wrap_chart">
          <div id="chartdiv" style="width: 100%; height: 200px; "></div>
          <label
            for="chart"
            class="label_under_charts"
          >Обратите внимание, роялти берётся из журналов регулярного обслуживания не зависимо от статуса журнала.</label>
        </div>
      </div>
      <div class="footer_block">
        <div class="wrap_table">
          <div class="table_recalculation">
            <div class="wrap_headline">
              <div class="element_left empty">-</div>
              <div class="element_left client">Клиент</div>
              <div class="element_left status">Статус</div>
              <div class="element_left tariff">Тариф</div>
              <div class="element_left responsible dotted_border">ответственный МРК</div>
              <div class="element_right cost">стоимость</div>
              <div class="element_right royalty">роялти</div>
            </div>
          </div>
          <div class="container" v-scrollbar v-scrollbar-update>
            <div class="scroll_body">
              <div class="table_body">
                <a
                  :href="field.client_link"
                  class="field"
                  v-for="(field, index) in setTable"
                  :key="index"
                >
                  <div class="element_left empty">{{++index}}</div>
                  <div class="element_left client">{{field.client}}</div>
                  <div class="element_left status" :class="field.status.color">{{field.status.name}}</div>
                  <div class="element_left tariff">{{field.tariff}}</div>
                  <div class="element_left responsible dotted_border">{{field.responsible}}</div>
                  <div class="element_right cost">
                    <span class="num" v-gap-between-num="{num: field.cost}"></span> руб.
                  </div>
                  <div class="element_right royalty">
                    <span class="num" v-gap-between-num="{num: field.royalty}"></span> руб.
                  </div>
                </a>
              </div>
            </div>
            <div class="scrollbar" draggable="true">
              <div class="scroll"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "../../utils/util.js";
export default {
  props: ["dataGraph"],
  computed: {
    setBalloonTextPublic() {
      return (
        "<div class='wrap_table'><table class='tb_green'>" +
        this.fieldsBalloonPublic +
        "</table></div>"
      );
    },
    fieldsBalloonPublic() {
      var array;
      if (this.$store.getters.getRoyaltyData.balloon.public.length) {
        return (array = this.$store.getters.getRoyaltyData.balloon.public
          .map(field => {
            return (
              "<tr><td class='green_text'>" +
              field.title +
              "</td><td class='num'>" +
              window.GapBetweenNum(field.countJournal) +
              "</td><td class='num'>" +
              window.GapBetweenNum(field.sum) +
              " руб</td></tr>"
            );
          })
          .join(""));
      } else {
        return "";
      }
    },
    setBalloonTextNotPublic() {
      return (
        '<div class="wrap_table"><div class="balloon_red"><table class="tb_red">' +
        this.fieldsBalloonNotPublic +
        "</table></div>"
      );
    },
    fieldsBalloonNotPublic() {
      var array;
      if (this.$store.getters.getRoyaltyData.balloon.not_public.length) {
        return (array = this.$store.getters.getRoyaltyData.balloon.not_public
          .map(field => {
            return (
              "<tr>" +
              '<td class="text ' +
              field.class +
              '">' +
              field.title +
              "</td>" +
              '<td class="num">' +
              window.GapBetweenNum(field.countJournal) +
              "</td>" +
              '<td class="num">' +
              window.GapBetweenNum(field.sum) +
              " руб.</td>" +
              "</tr>"
            );
          })
          .join(""));
      } else {
        return "";
      }
    },
    updateGraph() {
      this.chart.validateNow(true);
    },
    setDataGraph() {
      return this.dataGraph;
    },
    setTable(){
      return this.$store.getters.getRoyaltyData.regular_service_table;
    },
  },
  watch: {
    dataGraph: function(newVal, oldVal) {
      this.chart.dataProvider = this.setDataGraph;
      this.updateGraph;
    }
  },
  mounted() {
    this.chart = AmCharts.makeChart("chartdiv", {
      colors: ["#00AA45", "#EF5350"],
      type: "serial",
      thousandsSeparator: " ",
      maxLabelWidth: 110,
      columnSpacing: 0,
      columnWidth: 1,
      rotate: true,
      autoMarginOffset: 0,
      autoMargins: false,
      marginTop: 130,
      sequencedAnimation: false,
      accessible: false,
      fontFamily: "Arial",
      thousandsSeparator: "",
      categoryAxis: {
        autoRotateAngle: 0,
        gridPosition: "start",
        axisThickness: 0,
        fontSize: 0,
        gridCount: 0,
        gridThickness: 0,
        minorGridAlpha: 0,
        minVerticalGap: 32,
        showFirstLabel: false,
        showLastLabel: false,
        tickLength: 0,
        titleFontSize: 0
      },
      trendLines: [],
      graphs: [
        {
          fillAlphas: 1,
          id: "AmGraph-1",
          title:
            window.InclinedWord(this.$store.getters.getRoyaltyData.legend.public.journals, [
              "опубликован",
              "опубликовано",
              "опубликовано"
            ]) +
            " " +
            window.GapBetweenNum(this.$store.getters.getRoyaltyData.legend.public.journals) +
            " " +
            window.InclinedWord(this.$store.getters.getRoyaltyData.legend.public.journals, [
              "журнал",
              "журнала",
              "журналов"
            ]) +
            " на " +
            window.GapBetweenNum(this.$store.getters.getRoyaltyData.legend.public.sum) +
            " руб.",
          type: "column",
          valueField: "public",
          balloonText: this.setBalloonTextPublic,
          fixedColumnWidth: 20
        },
        {
          fillAlphas: 1,
          id: "AmGraph-2",
          title:
            window.InclinedWord(this.$store.getters.getRoyaltyData.legend.not_public.journals, [
              "не опубликован",
              "не опубликовано",
              "не опубликовано"
            ]) +
            " " +
            window.GapBetweenNum(this.$store.getters.getRoyaltyData.legend.not_public.journals) +
            " " +
            window.InclinedWord(this.$store.getters.getRoyaltyData.legend.not_public.journals, [
              "журнал",
              "журнала",
              "журналов"
            ]) +
            " на " +
            window.GapBetweenNum(this.$store.getters.getRoyaltyData.legend.not_public.sum) +
            " руб.",
          type: "column",
          valueField: "not_public",
          balloonText: this.setBalloonTextNotPublic,
          fixedColumnWidth: 20
          // fixedColumnWidth: 20
        }
      ],
      balloon: {
        background: "#ffffff",
        fillColor: "#FFFFFF",
        borderThickness: 0,
        fillAlpha: 0,
        offsetY: -100,
        maxWidth: 400
      },
      guides: [],
      valueAxes: [
        {
          id: "ValueAxis-1",
          maximum: 0,
          stackType: "100%",
          autoGridCount: false,
          axisThickness: 0,
          gridCount: 0,
          gridThickness: 0,
          labelsEnabled: false,
          tickLength: 0,
          title: ""
        }
      ],
      allLabels: [],
      dataProvider: [],

      legend: {
        enabled: true,
        useGraphSettings: true,
        fontSize: 10,
        markerSize: 13,
        markerType: "circle",
        position: "absolute",
        top: 65,
        useGraphSettings: false,
        maxColumns: 2,
        valueText: "[[value]]"
      }
    });
    this.chart.dataProvider = this.setDataGraph;
    this.updateGraph;
  }
};
</script>

<style lang="less">
.wrap_regular_service {
  border-top: 1px solid #e5e5e5;
  .regular_service {
    // padding: 30px;
    .top_block {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 161px;
      .headline {
        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        line-height: 31px;
        margin: 0 30px;
        color: #3a3a3a;
      }
      .label_under_charts {
        line-height: 19px;
        font-size: 14px;

        color: #a99f9f;
      }
    }
    .footer_block {
      .table_recalculation,
      .scroll_body > .table_body {
        width: 100%;
        font-size: 14px;
        border-collapse: collapse;
        .wrap_headline {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .element_right,
          .element_left {
            font-size: 10px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #7f7f7f;
            font-weight: normal;

            border-bottom: 1px solid #e5e5e5;
            border-top: 1px solid #e5e5e5;
          }
          .empty {
            user-select: none;
            color: #ffffff;
          }
          .element_right {
            padding: 10px 30px 10px 0px;
            text-align: right;
          }
          .element_left {
            padding: 10px 0px 10px 30px;
            text-align: left;
          }
        }

        .field {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .element_right,
          .element_left {
            font-size: 14px;
          }
          &:hover {
            background: #e5e5e5;
            transition: all 0.3s;
          }
          .element_right {
            padding: 10px 30px 10px 0px;
            text-align: right;
          }
          .element_left {
            padding: 10px 0px 10px 30px;
            text-align: left;
          }

          .status {
            font-weight: bold;
            font-size: 9px;
            letter-spacing: 0.07em;
            text-transform: uppercase;
          }

          .green {
            color: #00963d;
          }
          .blue {
            color: #0972ec;
          }
          .gray {
            color: #a99f9f;
          }
          .red {
            color: #fb2626;
          }
        }

        .element_left {
          color: #4d4d4d;
          width: calc(65% / 4);
        }
        .element_right {
          color: #4d4d4d;
          width: calc(30% / 2);
        }
        .empty {
          width: 2%;
          color: #7f7f7f;
        }
        .dotted_border {
          border-right: 1px dashed #e5e5e5;
        }
      }
      .container {
        position: relative;
        .scroll_body {
          width: 100%;
          max-height: 260px;
          overflow-y: auto;
          -ms-overflow-style: none;

          .table_body {
            tr:hover {
              background: #e5e5e5;
              opacity: 1;
              transition: all 0.3s;
              // border-bottom: 1px solid #e5e5e5;
              // border-top: 1px solid #e5e5e5;
            }
          }
        }
      }
      ::-webkit-scrollbar {
        display: none;
      }
    }
    .top_block {
      position: relative;
      .wrap_chart {
        position: absolute;
        top: 0;
        right: 0;
        left: 447px;
        label {
          position: absolute;
          top: 126px;
          left: 20px;
        }
        .amcharts-chart-div {
          position: absolute;
          height: 400px !important;
          top: -110px;
          //background: #ffffff;
          z-index: 4;
          .wrap_table {
            margin-top: 120px;
            background: #ffffff;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
            padding: 10px;
            .tb_green {
              width: 311px;
              z-index: 43333;
              .green_text {
                font-weight: bold;
                line-height: normal;
                font-size: 9px;
                letter-spacing: 0.07em;
                text-transform: uppercase;
                color: #00963d;
                text-align: left;
              }
              .num {
                line-height: 21px;
                font-size: 13px;
                text-align: right;
                color: #4d4d4d;
              }
            }
            .tb_red {
              width: 311px;
              z-index: 43333;

              .text {
                font-weight: bold;
                line-height: normal;
                font-size: 9px;
                letter-spacing: 0.07em;
                text-transform: uppercase;
                text-align: left;
              }
              .gray_text {
                color: #a99f9f;
              }
              .blue_text {
                color: #0972ec;
              }
              .red_text {
                color: #fb2626;
              }
              .num {
                line-height: 21px;
                font-size: 13px;
                text-align: right;
                color: #4d4d4d;
              }
            }
          }
        }
        .amcharts-legend-div {
          position: absolute;
          z-index: 1;
          text-transform: uppercase;
          font-weight: bold;
          line-height: normal;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #4e4867;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
