<template>
  <div class="wrap_charts_bo1c">
    <div class="wrap_chart_up">
      <div
        id="chart_clients_and_dumps"
        style="width: 100%; height: 370px; background-color: #FFFFFF;"
      ></div>
    </div>

    <div class="wrap_chart_down_regular_service" v-if="data.by_year.length">
      <h2 class="headline">Выручка по регулярным услугам</h2>
      <div id="chartdiv-check" style="width: 100%; height: 400px; background-color: #FFFFFF;"></div>
      <div class="title_legend">{{data.by_year[selectedDate].title}}</div>
      <div class="legend_and_chart">
        <div class="wrap_value_table">
          <div class="value_table">
            <div class="field">
              <div class="name">
                Индивидуальная стоимость
                <br>выше стоимости по тарифам
              </div>
              <div class="right_block">
                <a
                  :href="data.by_year[selectedDate].data.profit.link"
                  class="color_count"
                  :class="data.by_year[selectedDate].data.profit.index"
                >
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.profit.index === 'neutral'"
                  ></div>
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.profit.index === 'plus'"
                  >+</div>
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.profit.index === 'minus'"
                  >-</div>
                  <div
                    class="count"
                    v-gap-between-num="{num: data.by_year[selectedDate].data.profit.count}"
                  ></div>
                  <div class="rub">руб.</div>
                </a>
                <div class="help">
                  <div class="icon" v-html="iconInfo"></div>
                  <div class="information_block">
                    <p>Данное значение показывает положительную разницу между индивидуально стоимостью и тарификацией 1С:БО. Пример: индивидульная стоимость 15000 руб., а по тарифу 10000 руб., данный показатель отражает данную разницу в +5000 руб.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="field" v-if="data.by_year[selectedDate].data.losses">
              <div class="name">Добавлены дополнительные услуги</div>
              <div class="right_block">
                <a
                  :href="data.by_year[selectedDate].data.losses.link"
                  class="color_count"
                  :class="data.by_year[selectedDate].data.losses.index"
                >
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.losses.index === 'neutral'"
                  ></div>
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.losses.index === 'plus'"
                  >+</div>
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.losses.index === 'minus'"
                  >-</div>
                  <div
                    class="count"
                    v-gap-between-num="{num: data.by_year[selectedDate].data.losses.count}"
                  ></div>
                  <div class="rub">руб.</div>
                </a>
                <div class="help">
                  <div class="icon" v-html="iconInfo"></div>
                  <div class="information_block">
                    <p>Данное значение показывает положительную разницу между суммами автоматически сформированных доп.услуг и суммами доп.услуг на момент формирования отчёта.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="line"></div>
            </div>

            <div class="field" v-if="data.by_year[selectedDate].data.added_services">
              <div class="name">
                Индивидуальная стоимость ниже
                <br>стоимости по тарифу
              </div>
              <div class="right_block">
                <a
                  :href="data.by_year[selectedDate].data.added_services.link"
                  class="color_count"
                  :class="data.by_year[selectedDate].data.added_services.index"
                >
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.added_services.index === 'neutral'"
                  ></div>
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.added_services.index === 'plus'"
                  >+</div>
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.added_services.index === 'minus'"
                  >-</div>
                  <div
                    class="count"
                    v-gap-between-num="{num: data.by_year[selectedDate].data.added_services.count}"
                  ></div>
                  <div class="rub">руб.</div>
                </a>
                <div class="help">
                  <div class="icon" v-html="iconInfo"></div>
                  <div class="information_block">
                    <p>Данное значение показывает отрицательную разницу между индивидуально стоимостью и тарификацией 1С:БО. Пример: индивидульная стоимость 10000 руб., а по тарифу 15000 руб., данный показатель отражает данную разницу в -5000 руб.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="name">Удалены дополнительные услуги</div>
              <div class="right_block">
                <a
                  :href="data.by_year[selectedDate].data.remove_services.link"
                  class="color_count"
                  :class="data.by_year[selectedDate].data.remove_services.index"
                >
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.remove_services.index === 'neutral'"
                  ></div>
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.remove_services.index === 'plus'"
                  >+</div>
                  <div
                    class="index"
                    v-if="data.by_year[selectedDate].data.remove_services.index === 'minus'"
                  >-</div>
                  <div
                    class="count"
                    v-gap-between-num="{num: data.by_year[selectedDate].data.remove_services.count}"
                  ></div>
                  <div class="rub">руб.</div>
                </a>
                <div class="help">
                  <div class="icon" v-html="iconInfo"></div>
                  <div class="information_block">
                    <p>Данное значение показывает отрицательную разницу между суммами автоматически сформированных доп.услуг и суммами доп.услуг на момент формирования отчёта.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right_block">
          <table>
            <tr>
              <td>Комплексный</td>
              <td>
                <span class="num" v-gap-between-num="{num: data.by_year[selectedDate].complex}"></span> руб.
              </td>
            </tr>
            <tr>
              <td>Отчётность</td>
              <td>
                <span class="num" v-gap-between-num="{num: data.by_year[selectedDate].reports}"></span> руб.
              </td>
            </tr>
            <tr>
              <td>ИП без работников</td>
              <td>
                <span
                  class="num"
                  v-gap-between-num="{num: data.by_year[selectedDate].without_workers}"
                ></span> руб.
              </td>
            </tr>
            <tr>
              <td>Зарплата</td>
              <td>
                <span class="num" v-gap-between-num="{num: data.by_year[selectedDate].salary}"></span> руб.
              </td>
            </tr>
            <tr>
              <td>Зарплата и КУ</td>
              <td>
                <span
                  class="num"
                  v-gap-between-num="{num: data.by_year[selectedDate].salary_and_ku}"
                ></span> руб.
              </td>
            </tr>
            <tr>
              <td>ПО и консульт.</td>
              <td>
                <span
                  class="num"
                  v-gap-between-num="{num: data.by_year[selectedDate].po_and_consult}"
                ></span> руб.
              </td>
            </tr>
          </table>
          <div class="chart_revenue">
            <div id="chartdiv" style="width: 600px; height: 300px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      iconInfo: "",
      selectedDate: 0
    };
  },
  updates: {},
  methods: {
    renderChartUp() {
      var chartTotalRevenues = AmCharts.makeChart("chart_clients_and_dumps", {
        type: "serial",
        categoryField: "month",
        startDuration: 1,
        colors: ["#FFB74D"],
        categoryAxis: {
          axisColor: "#e5e5e5",
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
            balloonText: "[[value]] руб.",
            fillAlphas: 1,
            id: "AmGraph-1",
            title: "Выручка",
            type: "column",
            valueField: "revenue"
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
            axisAlpha: 0,
            axisColor: "#b8b7b7",
            axisThickness: 0,
            boldPeriodBeginning: false,
            centerLabelOnFullPeriod: false,

            fontSize: 0,

            gridThickness: 1,
            zeroGridAlpha: 1
          }
        ],
        allLabels: [],
        balloon: {
          fadeOutDuration: 0.06,
          animationDuration: 0,
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
        //   legend: {
        //     enabled: true,
        //     useGraphSettings: true,
        //     fontSize: 13,
        //     markerType: "circle",
        //     position: "top",
        //     useGraphSettings: false
        //   },

        dataProvider: this.data.total_revenues_data
      });
    },
    renderChartsDown() {
      var chartCheck = new AmCharts.makeChart("chartdiv-check", {
        theme: "light",
        type: "serial",
        marginTop: 60,
        sequencedAnimation: false,
        fontFamily: "Arial",
        startDuration: 0,

        categoryField: "category",
        selectedColor: "#5EB7DE",
        useDataSetColors: false,
        dataProvider: this.data.service_on_tariff_data,
        graphs: [
          {
            id: "formed_graph",
            balloonText: "",
            fillAlphas: 0.6,
            lineAlpha: 0,
            title: "Сформированный журнал",
            type: "column",
            valueField: "formed",
            columnWidth: 0.7,
            classNameField: "formed_journal",
            border: false,
            fillColors: "#E8E8E8"
          },
          {
            id: "published_graph",
            balloonText: "",
            fillAlphas: 0.8,
            lineAlpha: 0,
            title: "Опубликованный журнал",
            type: "column",
            clustered: false,
            columnWidth: 0.4,
            valueField: "published",
            classNameField: "published_journal",
            fillColors: "#D7D7D7"
          }
        ],

        plotAreaFillAlphas: 0.1,
        categoryAxis: {
          axisColor: "#e5e5e5",
          boldPeriodBeginning: false,
          centerLabelOnFullPeriod: false,
          gridColor: "#FFFFFF",
          gridThickness: 0,
          markPeriodChange: false,
          minHorizontalGap: 67,
          titleBold: false,

          equalSpacing: true
        },

        valueAxes: [
          {
            axisFrequency: 0,
            id: "ValueAxis-1",
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
            fontSize: 0,
            gridColor: "#9f9f9f",
            gridThickness: 0,
            zeroGridAlpha: 1,
            axisTitleOffset: 0,
            gridCount: 0,
            labelFrequency: 0,
            labelsEnabled: false,
            tickLength: 0,
            titleFontSize: 0
          }
        ],
        export: {
          enabled: true
        },
        listeners: [
          {
            event: "clickGraphItem",
            method: e => {
              this.selectedDate = e.index;
              serialChart.dataProvider[0].complex = this.data.by_year[
                this.selectedDate
              ].complex;
              serialChart.dataProvider[0].report = this.data.by_year[
                this.selectedDate
              ].reports;
              serialChart.dataProvider[0].without_workers = this.data.by_year[
                this.selectedDate
              ].without_workers;
              serialChart.dataProvider[0].salary = this.data.by_year[
                this.selectedDate
              ].salary;
              serialChart.dataProvider[0].salary_and_KU = this.data.by_year[
                this.selectedDate
              ].salary_and_ku;
              serialChart.dataProvider[0].po_and_consult = this.data.by_year[
                this.selectedDate
              ].po_and_consult;
              // chartCheck.returnInitialColor( event.target.fillColorsR );
              var indexElement = e.item.index;
              e.item.columnGraphics.node.children[0].setAttribute(
                "fill",
                "#000000"
              );
              e.item.columnGraphics.node.children[0].setAttribute(
                "stroke",
                "#000000"
              );
              serialChart.validateNow(true);
            }
          }
        ]
      });

      var serialChart = new AmCharts.makeChart("chartdiv", {
        type: "serial",
        categoryField: "category",
        rotate: true,
        marginBottom: 0,
        marginTop: 0,
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
        startDuration: 1,
        theme: "default",
        categoryAxis: {
          gridPosition: "start",
          autoGridCount: false,
          axisAlpha: 0,
          axisThickness: 0,
          fontSize: 0,
          gridCount: 0,
          gridThickness: 0,
          labelOffset: -1,
          minorGridAlpha: 0,
          tickLength: 0,
          title: "",
          titleBold: false,
          titleFontSize: 0
        },
        trendLines: [],
        graphs: [
          {
            columnWidth: 0.84,
            balloonText: "[[title]] of [[category]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-1",
            showBalloon: false,
            title: "graph 1",
            type: "column",
            valueField: "complex"
          },
          {
            columnWidth: 0.84,
            balloonText: "[[title]] of [[category]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-2",
            showBalloon: false,
            title: "graph 2",
            type: "column",
            valueField: "report"
          },
          {
            columnWidth: 0.84,
            fillAlphas: 1,
            id: "AmGraph-3",
            showBalloon: false,
            title: "graph 3",
            type: "column",
            valueField: "without_workers"
          },
          {
            columnWidth: 0.84,
            fillAlphas: 1,
            id: "AmGraph-4",
            showBalloon: false,
            title: "graph 4",
            type: "column",
            valueField: "salary"
          },
          {
            columnWidth: 0.84,
            fillAlphas: 1,
            id: "AmGraph-5",
            showBalloon: false,
            title: "graph 5",
            type: "column",
            valueField: "salary_and_KU"
          },
          {
            columnWidth: 0.84,
            fillAlphas: 1,
            id: "AmGraph-6",
            showBalloon: false,
            title: "graph 6",
            type: "column",
            valueField: "po_and_consult"
          }
        ],
        guides: [],
        valueAxes: [
          {
            id: "ValueAxis-1",
            autoGridCount: false,
            axisThickness: 0,
            gridCount: 0,
            gridThickness: 0,
            labelsEnabled: false,
            showFirstLabel: false,
            showLastLabel: false,
            tickLength: 0,
            title: ""
          }
        ],
        allLabels: [],
        balloon: {
          fadeOutDuration: 0.06
        },
        dataProvider: [
          {
            complex: this.data.by_year[this.selectedDate].complex,
            report: this.data.by_year[this.selectedDate].reports,
            without_workers: this.data.by_year[this.selectedDate]
              .without_workers,
            salary: this.data.by_year[this.selectedDate].salary,
            salary_and_KU: this.data.by_year[this.selectedDate].salary_and_ku,
            po_and_consult: this.data.by_year[this.selectedDate].po_and_consult
          }
        ]
      });
    }
  },
  mounted() {
    this.renderChartUp();
    if (this.data.by_year.length) {
      this.renderChartsDown();
    }
    this.iconInfo = this.$store.state.iconInfo;
  },
  beforeUpdate() {
    this.renderChartUp();
    if (this.data.by_year.length) {
      this.renderChartsDown();
    }
  }
};
</script>

<style lang="less">
.wrap_charts_bo1c {
  .headline {
    font-style: normal;
    font-weight: normal;
    line-height: 28px;
    font-size: 20px;
    color: #4d4d4d;
    margin: 34px;
  }

  .wrap_chart_down_regular_service {
    margin-top: 50px;
    border-top: 1px solid #b8b7b7;
    .active {
      fill: #00aa45;
    }
  }
  .title_legend {
    font-weight: normal;
    line-height: 28px;
    font-size: 20px;
    color: #4d4d4d;
    margin-left: 34px;
  }
  .legend_and_chart {
    display: flex;
    justify-content: space-between;
    margin-left: 34px;
    .dynamic_legend {
      position: relative;
      border-right: #8d8787;
      margin-top: 26px;
      .item {
        display: flex;
        flex-direction: column;
        margin: 8px 0;
        .label {
          line-height: 18px;
          font-size: 13px;
          color: #8d8787;
        }
        .wrap_dot_and_money,
        .wrap_triangle_and_money {
          display: flex;
          align-items: center;

          .dot {
            width: 15px;
            height: 15px;
            border-radius: 50px;
            margin-right: 5px;
            &.green {
              background: #00aa45;
            }
            &.light_green {
              background: #85c3b8;
            }
          }
          .money {
            line-height: 28px;
            font-size: 20px;
            color: #4d4d4d;
          }

          .red {
            color: #ef5350;
            &.triangle {
              background: #ef5350;
              border-radius: 10px;
              width: 20px;
              margin-right: 5px;
              position: relative;
              &:after {
                content: "";
                position: absolute; /* Абсолютное позиционирование */
                left: 0px;
                bottom: -12px; /* Положение треугольника */
                border: 7px solid transparent;
                border-top: 9px solid #ef5350;
                border-radius: 2px;
              }
            }
          }
          .green {
            color: #00aa45;
            &.triangle {
              background: #00aa45;
              border-radius: 10px;
              width: 20px;
              margin-right: 5px;
              position: relative;
              &:after {
                content: "";
                position: absolute; /* Абсолютное позиционирование */
                left: 0px;
                top: -12px; /* Положение треугольника */
                border: 7px solid transparent;
                border-bottom: 9px solid #00aa45;
                border-radius: 2px;
              }
            }
          }
        }
      }
    }
    .wrap_value_table {
      flex: 1;
      display: flex;
      justify-content: center;
      .value_table {
        min-width: 354px;
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 34px 107px 34px 0;

        .field {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          .line {
            flex: 1;
            height: 1px;
            background: #f4f4f4;
          }
          .name {
            font-size: 14px;
            line-height: 21px;
            color: #8d8787;
          }
          .right_block {
            display: flex;
            justify-content: flex-end;
            .color_count {
              display: flex;
              justify-content: flex-end;
              white-space: nowrap;
              margin-right: 7px;
              &.neutral {
                color: #8d8787;
              }
              &.plus {
                color: #00aa45;
              }
              &.minus {
                color: #ef5350;
              }
            }
            .rub {
              margin-left: 7px;
            }
          }
        }
        .help {
          position: relative;
          cursor: pointer;
          &:hover {
            .information_block {
              visibility: visible;
              opacity: 1;
              transition-delay: 0.2s;
              z-index: 4;
            }
          }
          .information_block {
            cursor: default;
            position: absolute;
            visibility: hidden;
            top: 40px;
            right: 0px;
            background: #ffffff;
            line-height: 18px;
            font-size: 13px;
            color: #4d4d4d;
            width: 282px;
            padding: 5px 15px;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transition: opacity 500ms linear, top 100ms linear,
              bottom 100ms linear, visibility 100ms linear;
            z-index: 4;
            transition-delay: 0.2s;
            a {
              color: #4187a8;
            }
          }
        }
      }
    }

    .right_block {
      flex: 1;
      display: flex;
      table {
        min-width: 300px;
        font-size: 14px;
        color: #4d4d4d;
        padding: 18px 5px;
        td {
          padding: 12px 5px;
        }
      }
    }
  }
}
</style>
