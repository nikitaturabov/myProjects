<template>
  <div class="wrap_main_content_clients">
    <div class="main_content_clients">
      <div class="green_numbers">
        <green-numbers></green-numbers>
        <div class="label_rating">
          <div class="label_rating__wrapper_text">
            <div class="text">
              На основе данных показателей формируется приоритет аукциона лидов.
              Подробнее в ежемесячной рассылке по рапределении лидов
            </div>
          </div>
        </div>
      </div>
      <div class="complex_sevice">
        <div class="left_block">
          <graph-clients
            :dataGraph="this.$store.getters.getClientsData.data_graph_clients"
            @set-val-on-board="SetValOnBoard"
          ></graph-clients>
        </div>
        <div class="field_for_chart">
          <information-table
            :data="getDataFirstPie"
            :start_franchise_link="setData.start_franchise_link"
          ></information-table>
        </div>
      </div>
      <div class="transfer_on_technology_chart" v-if="setData.transferOfTechnologyView">
        <transfer-on-technology-graph
          :dataGraph="this.$store.getters.getClientsData.data_graph_remain_technology"
          @set-val-on-table="SetValOnTable"
        ></transfer-on-technology-graph>
        <clients-list
          :data="getDataSecondPie"
          :switch-visability="switchVisibility"
          :classItem="selectedSlice"
        ></clients-list>
      </div>
    </div>
  </div>
</template>

<script>
import GreenNumbers from "./clients/GreenNumbers.vue";
import InformationTable from "./clients/InformationTable.vue";
import GraphClients from "./clients/GraphClients.vue";
import TransferOnTechnologyGraph from "./clients/TransferOnTechnologyGraph.vue";
import ClientsList from "./clients/ClientsList.vue";
export default {
  data() {
    return {
      board_clients: {},
      data_table_remain_transfer: {}
    };
  },
  components: {
    GreenNumbers,
    GraphClients,
    InformationTable,
    TransferOnTechnologyGraph,
    ClientsList
  },
  methods: {
    SetValOnBoard(selectedSlice) {
      this.board_clients.selectedSlice = selectedSlice;
      
    },
    SetValOnTable(selectedSlice) {
      this.data_table_remain_transfer.selectedSlice = selectedSlice;
    },
    switchVisibility(element) {
      return !element;
    },
    hidePopup(e) {
      this.popup_footer = false;
    }
  },
  computed: {
    setData() {
      this.board_clients = this.$store.getters.getClientsData.board_clients;
      this.data_table_remain_transfer = this.$store.getters.getClientsData.data_table_remain_transfer;
      return this.$store.getters.getClientsData;
    },
    getDataFirstPie() {
      this.setData;
      let slice = this.board_clients.selectedSlice;
      return this.board_clients[slice];
    },
    getDataSecondPie() {
      this.setData;
      let slice = this.data_table_remain_transfer.selectedSlice;
      return this.data_table_remain_transfer[slice];
    },
    selectedSlice() {
      return this.data_table_remain_transfer.selectedSlice;
    }
  },
  mounted() {
    document.addEventListener("click", e => {
      if (!e.target.matches(".help, .help *")) {
        this.hidePopup(e);
      }
    });
  }
};
</script>

<style lang="less">
.wrap_main_content_clients {
  position: relative;

  .main_content_clients {
    background: #ffffff;
    margin-top: -10px;
    z-index: 2;
    .green_numbers {
      padding: 25px 9px;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      justify-content: space-between;
      .label_rating {
        transition: all 0.3s;
        color: #a99f9f;
        width: 444px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        flex: 1;
        &__wrapper_text {
          flex: 1;
          .text {
            font-size: 14px;
            line-height: 23px;
            padding-left: 101px;
          }
        }
      }
    }
  }

  .complex_sevice {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    padding: 25px 0;
    .left_block {
      padding: 0 30px;
      flex: 1;
    }

    .field_for_chart {
      flex: 1;
      display: flex;
      justify-content: center;
      padding-top: 8px;
    }
  }
  .clients_no_technology {
    height: 150px;
    border-bottom: 1px solid #e5e5e5;
  }
  .transfer_on_technology_chart {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px dashed #e5e5e5;
    padding-top: 58px;
  }
}

@media screen and (min-width: 1500px) {
  .wrap_main_content_clients {
    .main_content_clients {
      .green_numbers {
        .label_rating {
          transition: all 0.3s;
          width: 590px;
          &__wrapper_text {
            .text {
              font-size: 16px;
              line-height: 23px;
              padding-left: 106px;
            }
          }
        }
      }
    }
  }
}
</style>