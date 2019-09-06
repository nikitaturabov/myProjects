<template>
  <div class="wrap_revenue_charts">
    <div class="revenue_charts">
      <div class="tabs_revenue">
        <div
          @click="whatData('total_revenues')"
          v-bind:class="{active_parent: setActive === 'total_revenues'}"
          class="total_revenues"
        >Общая выручка</div>
        <div
          @click="showMenu()"
          class="on_technology"
          v-bind:class="{active_parent: activityListener}"
        >
          По технологии
          <svg
            width="9"
            height="5"
            viewBox="0 0 9 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1L4.5 4L1 1"
              stroke="#BDBDBD"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>

          <div class="menu_technology" v-show="show_menu">
            <div
              class="field_menu"
              v-bind:class="{active: setActive === 'together_on_technology'}"
              @click="whatData('together_on_technology')"
            >Сводно по технологии</div>
            <div
              class="field_menu"
              v-bind:class="{active: setActive === 'regular_service'}"
              @click="whatData('regular_service')"
            >Регулярное обслуживание</div>
            <div
              class="field_menu"
              v-bind:class="{active: setActive === 'one_time_services'}"
              @click="whatData('one_time_services')"
            >Разовые услуги</div>
            <div
              class="field_menu"
              v-bind:class="{active: setActive === 'recovery_accounting'}"
              @click="whatData('recovery_accounting')"
            >Восстановление учета</div>
          </div>
        </div>
        <div
          v-if="showTransferOnTechnology"
          @click="whatData('transfer_on_technology')"
          v-bind:class="{active_parent: setActive === 'transfer_on_technology'}"
          class="no_technology"
        >К переводу на технологию</div>
      </div>
    </div>
    <total-revenues :data="currentData"></total-revenues>
  </div>
</template>

<script>
import TotalRevenues from "./components/TotalRevenues.vue";
import hideTransferOfTechnology from "../../mixin/hideTransferOfTechnology.js";
export default {
  mixins: [hideTransferOfTechnology],
  data() {
    return {
      currentComponent: "total-revenues",
      show_menu: false,
      total_revenues: {},
      together_on_technology: {},
      regular_service: {},
      one_time_services: {},
      recovery_accounting: {},
      transfer_on_technology: {},
      currentData: {},
      setActive: ""
    };
  },
  components: {
    TotalRevenues
  },
  methods: {
    setComponent(component) {
      this.currentComponent = component;
    },
    showMenu() {
      this.show_menu = !this.show_menu;
    },
    whatData(nameSource) {
      if (nameSource === "total_revenues") {
        this.currentData = this.total_revenues;
        this.setActive = nameSource;
      }
      if (nameSource === "together_on_technology") {
        this.currentData = this.together_on_technology;
        this.setActive = nameSource;
      }
      if (nameSource === "regular_service") {
        this.currentData = this.regular_service;
        this.setActive = nameSource;
      }
      if (nameSource === "one_time_services") {
        this.currentData = this.one_time_services;
        this.setActive = nameSource;
      }
      if (nameSource === "recovery_accounting") {
        this.currentData = this.recovery_accounting;
        this.setActive = nameSource;
      }
      if (nameSource === "transfer_on_technology") {
        this.currentData = this.transfer_on_technology;
        this.setActive = nameSource;
      }
    }
  },
  computed: {
    activityListener() {
      if (this.setActive.indexOf("together_on_technology")>= 0) return true;
      if (this.setActive.indexOf("recovery_accounting")>= 0) return true;
      if (this.setActive.indexOf("regular_service")>= 0) return true;
      if (this.setActive.indexOf("one_time_services")>= 0) return true;
    }
  },
  created() {
    this.total_revenues = this.$store.getters.getDynamicsData.revenues.total_revenues;
    this.together_on_technology = this.$store.getters.getDynamicsData.revenues.together_on_technology;
    this.regular_service = this.$store.getters.getDynamicsData.revenues.regular_service;
    this.one_time_services = this.$store.getters.getDynamicsData.revenues.one_time_services;
    this.recovery_accounting = this.$store.getters.getDynamicsData.revenues.recovery_accounting;
    this.transfer_on_technology = this.$store.getters.getDynamicsData.revenues.transfer_on_technology;
    this.whatData("total_revenues");
  },
  mounted() {
    document.addEventListener("click", e => {
      if (!e.target.matches(".on_technology, .on_technology *")) {
        this.show_menu = false;
      }
    });
  }
};
</script>

<style lang="less">
.revenue_charts {
  padding: 0px 19px;
  .headline_clients {
    margin: 0;
    font-weight: normal;
    line-height: 28px;
    font-size: 20px;
    color: #4d4d4d;
  }
  .tabs_revenue {
    display: flex;
    margin: 14px 0;
    cursor: pointer;
    .total_revenues,
    .on_technology,
    .no_technology {
      color: #979797;
      background: #ffffff;
      border: 1px solid #ffffff;
      box-sizing: border-box;
      padding: 8px 12px;
      &.active_parent {
        color: #00aa45;
      }
    }
    .total_revenues {
      border-radius: 4px 0px 0px 4px;
    }
    .on_technology {
      position: relative;
      margin-left: -1px;
      display: flex;
      align-items: center;
      justify-content: center;
      .menu_technology {
        position: absolute;
        top: 34px;
        left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background: #ffffff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.12);
        border-radius: 5px;
        z-index: 10;

        .field_menu {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          white-space: nowrap;
          cursor: pointer;
          text-decoration: none;
          color: #979797;
          &:first-child {
            padding-top: 15px;
            border-radius: 5px 5px 0 0;
          }
          &:last-child {
            padding-bottom: 15px;
            border-radius: 0 0 5px 5px;
          }
          &:hover {
            background: #f7f7f7;
          }
          &.active {
            color: #00aa45;
          }
        }
      }
      svg {
        margin-left: 5px;
      }
    }
    .no_technology {
      border-radius: 0px 4px 4px 0px;
      margin-left: -1px;
    }
  }
}
</style>
