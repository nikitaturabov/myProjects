<template>
  <div class="wrap_main_content_dynamics">
    <div class="main_content_dynamics">
      <div class="tabs_dynamics">
        <div class="tabs_wrap">
          <div class="buttons_dynamics">
            <div
              @click="setComponent('ClientsCharts')"
              v-bind:class="{active: currentComponent === 'ClientsCharts'}"
              class="tab_clients"
            >Клиенты</div>
            <div
              @click="setComponent('RevenueCharts')"
              v-bind:class="{active: currentComponent === 'RevenueCharts'}"
              class="tab_revenue"
            >Выручка</div>
          </div>
        </div>

        <div class="info_message" v-if="setData.info_message_view">
          <div class="wrap_icon_wrong">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.0004 17.3336C14.0504 17.3336 17.3336 14.0504 17.3336 10.0003C17.3336 5.95023 14.0504 2.66699 10.0004 2.66699C5.9502 2.66699 2.66699 5.95023 2.66699 10.0003C2.66699 14.0504 5.9502 17.3336 10.0004 17.3336ZM10.0004 19.3336C15.155 19.3336 19.3336 15.155 19.3336 10.0003C19.3336 4.84567 15.155 0.666992 10.0004 0.666992C4.8457 0.666992 0.666992 4.84567 0.666992 10.0003C0.666992 15.155 4.8457 19.3336 10.0004 19.3336ZM10 5.5C10.5522 5.5 11 5.94772 11 6.5V10C11 10.5523 10.5522 11 10 11C9.44775 11 9 10.5523 9 10V6.5C9 5.94772 9.44775 5.5 10 5.5ZM9.99963 14.6664C10.644 14.6664 11.1664 14.144 11.1664 13.4997C11.1664 12.8553 10.644 12.333 9.99963 12.333C9.35535 12.333 8.83301 12.8553 8.83301 13.4997C8.83301 14.144 9.35535 14.6664 9.99963 14.6664Z"
                fill="#EF5350"
              ></path>
            </svg>
          </div>
          <div class="wrap_text">
            Данные могут отличаться от монитора руководителя, если после отправки отчета вносились изменения в прошлые месяцы.
            <div class="help">
              <div class="icon" v-html="iconInfo"></div>
              <div class="information_block">
                <p>Графики на вкладке Динамика строятся по данным отчетов, отправленных в УК. А график в мониторе руководителя по актуальным данным приложения УФА.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <keep-alive>
        <component :is="currentComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import ClientsCharts from "./dynamics/ClientsCharts.vue";
import RevenueCharts from "./dynamics/RevenueCharts.vue";
export default {
  data() {
    return {
      currentComponent: "ClientsCharts",
      iconInfo: ""
    };
  },
  components: {
    ClientsCharts,
    RevenueCharts
  },
  methods: {
    setComponent(component) {
      this.currentComponent = component;
    }
  },
  computed: {
    setData() {
      return this.$store.getters.getDynamicsData;
    }
  },
  created() {
    this.iconInfo = this.$store.state.iconInfo;
  }
};
</script>

<style lang="less">
.wrap_main_content_dynamics {
  position: relative;
  .main_content_dynamics {
    background: #ffffff;
    margin-top: -10px;
    z-index: 2;
    .tabs_dynamics {
      padding: 27px 31px 27px;
      display: flex;
      justify-content: space-between;

      .tabs_wrap {
        .buttons_dynamics {
          display: flex;
          justify-content: flex-start;
          .tab_clients,
          .tab_revenue {
            padding: 8px 23px;
            border: 1px solid #00aa45;
            box-sizing: border-box;
            cursor: pointer;
          }

          .tab_clients {
            border-radius: 4px 0px 0px 4px;
          }
          .tab_revenue {
            margin-left: -1px;
            border-radius: 0px 4px 4px 0px;
          }
          .active {
            background: #00aa45;
            color: #ffffff;
          }
        }
      }
      .info_message {
        display: flex;
        align-items: center;
        width: 490px;
        .wrap_icon_wrong {
          margin-right: 7px;
        }
        .wrap_text {
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
          color: #a99f9f;
          .help {
            display: inline-block;
            position: relative;
            margin-left: 7px;
            height: 14px;
            width: 14px;
            bottom: -2px;
            box-sizing: border-box;
            cursor: pointer;
            .icon {
              display: flex;
              align-items: center;
            }

            .information_block {
              cursor: default;
              position: absolute;
              visibility: hidden;
              top: 20px;
              right: 0px;
              background: #ffffff;
              line-height: 18px;
              font-size: 13px;
              color: #4d4d4d;
              width: 391px;
              padding: 5px 15px;
              box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
              opacity: 0;
              transition: opacity 500ms linear, top 100ms linear,
                bottom 100ms linear, visibility 100ms linear;
              z-index: 4;
              transition-delay: 0.2s;
            }
            &:hover {
              .information_block {
                visibility: visible;
                opacity: 1;
                transition-delay: 0.2s;
                z-index: 4;
              }
            }
          }
        }
      }
    }
  }
}
</style>
