<template>
  <div class="wrap_clients_charts">
    <div class="clients_charts">
      <div class="tabs_clients">
        <div
          v-bind:class="{active: currentComponent === 'Clients1cBo'}"
          @click="setComponent('Clients1cBo')"
          class="clients"
        >Клиенты 1С:БО</div>
        <div
          v-bind:class="{active: currentComponent === 'OnTransferTechnology'}"
          @click="setComponent('OnTransferTechnology')"
          class="on_technology"
          v-if="showTransferOnTechnology"
        >К переводу на технологию</div>
      </div>
    </div>

    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
    <div class="bottom_graph">
      <h2 class="headline_tariffs">Динамика обслуживания по тарифам</h2>
      <div class="wrap_chart_down">
        <div id="chartdiv" style="width: 100%; height: 273px; background-color: #FFFFFF;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Clients1cBo from "./components/Clients1cBo.vue";
import OnTransferTechnology from "./components/OnTransferTechnology.vue";
import hideTransferOfTechnology from "../../mixin/hideTransferOfTechnology.js";
export default {
  mixins: [hideTransferOfTechnology],
  data() {
    return {
      currentComponent: "Clients1cBo"
    };
  },
  components: {
    Clients1cBo,
    OnTransferTechnology
  },
  methods: {
    setComponent(component) {
      this.currentComponent = component;
    }
  },
  computed: {
    setData(){
      return this.$store.getters.getDynamicsData.clients.clients_1cbo.service_on_tariff_data
    }
  },
  mounted() {
    AmCharts.makeChart("chartdiv", {
      type: "serial",
      theme: "default",
      categoryField: "date",
      chartCursor: {
        enabled: true
      },
      //   chartScrollbar: {
      //     enabled: true
      //   },
      trendLines: [],
      graphs: this.setData.graphs,
      guides: [],
      valueAxes: [
        {
          id: "ValueAxis-1"
        }
      ],
      allLabels: [],
      legend: {
        autoMargins: false,
        marginLeft: 34,
        marginTop: -10,
        enabled: true,
        gradientRotation: 2,
        labelWidth: 0,
        position: "left",
        valueAlign: "left",
        verticalGap: 8,
        fontSize: 13,
        switchType: "v"
      },
      titles: [],
      dataProvider: this.setData.array_of_values,
    });
  }
};
</script>

<style lang="less">
.wrap_clients_charts {
  .clients_charts {
    padding: 0px 19px;
    .headline_clients {
      margin: 0;
      font-weight: normal;
      line-height: 28px;
      font-size: 20px;
      color: #979797;
    }
    .tabs_clients {
      display: flex;
      margin: 14px 0;
      cursor: pointer;
      color: #979797;
      .clients,
      .on_technology,
      .no_technology {
        background: #ffffff;
        border: 1px solid #ffffff;
        box-sizing: border-box;
        padding: 8px 12px;
      }
      .clients {
        border-radius: 4px 0px 0px 4px;
      }
      .on_technology {
        border-radius: 0px 4px 4px 0px;
        margin-left: -1px;
      }

      .active {
        color: #00aa45;
      }
    }
    .wrap_chart_down {
      padding: 0 34px;
    }
  }
  .bottom_graph {
    margin-top: 50px;
    border-top: 1px solid #b8b7b7;
    .headline_tariffs {
      font-style: normal;
      font-weight: normal;
      font-size: 22px;
      line-height: 30px;
      color: #3a3a3a;
      padding: 35px 22px;
    }
  }
}
</style>
