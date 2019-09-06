<template>
  <div class="wrap_remain_transfer">
    <div class="headline">
      <h3 class="cap">{{data.headline}}</h3>
      <a :href="setData.start_franchise_link" class="start_franchise">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.04545 10C7.95455 10 7.90909 9.95455 7.81818 9.90909L5.31818 8L3.95455 9.09091C3.86364 9.18182 3.72727 9.18182 3.59091 9.13636C3.45455 9.09091 3.36364 8.95455 3.36364 8.81818L2.68182 5.95455L0.272727 4.90909C0.0909091 4.90909 0 4.72727 0 4.54545C0 4.36364 0.0909091 4.18182 0.227273 4.13636L9.40909 0.0454545C9.5 0 9.54545 0 9.59091 0H9.63636C9.72727 0 9.81818 0.0454546 9.90909 0.136364C9.90909 0.136364 9.90909 0.136364 9.90909 0.181818C9.95455 0.227273 10 0.318182 10 0.409091C10 0.454545 10 0.454545 10 0.5V0.545455L8.45455 9.63636C8.40909 9.77273 8.31818 9.90909 8.22727 9.95455C8.13636 10 8.09091 10 8.04545 10ZM5.54545 7.13636L7.77273 8.81818L9 1.72727L4.63636 6.40909L5.54545 7.13636C5.54545 7.09091 5.54545 7.09091 5.54545 7.13636ZM3.68182 6.72727L4 8L4.63636 7.5L3.77273 6.86364C3.72727 6.81818 3.68182 6.77273 3.68182 6.72727ZM1.5 4.54545L4.18182 5.68182L7.90909 1.68182L1.5 4.54545Z"
            fill="#878787"
          ></path>
        </svg>
        Старт франшизы: Клиенты
      </a>
    </div>
    <div class="label_time_left" v-if="!periodHasExpired">
      <div class="wrap_icon_calendar">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.97916 0C4.43838 0 4 0.438383 4 0.979156V2H1.95831C0.876767 2 0 2.87677 0 3.95831V14.0417C0 15.1232 0.876766 16 1.95831 16H14.0417C15.1232 16 16 15.1232 16 14.0417V3.95831C16 2.87677 15.1232 2 14.0417 2H12V0.979157C12 0.438383 11.5616 0 11.0208 0H10.9792C10.4384 0 10 0.438383 10 0.979156V2H6V0.979157C6 0.438383 5.56162 0 5.02084 0H4.97916ZM14.0417 5H1.95831L1.95831 14.0417H14.0417V5Z"
            fill="#EF5350"
          ></path>
          <path d="M7 7H9V9H7V7Z" fill="#EF5350"></path>
          <path d="M4 7H6V9H4V7Z" fill="#EF5350"></path>
          <path d="M10 7H12V9H10V7Z" fill="#EF5350"></path>
          <path d="M4 10H6V12H4V10Z" fill="#EF5350"></path>
          <path d="M7 10H9V12H7V10Z" fill="#EF5350"></path>
          <path d="M10 10H12V12H10V10Z" fill="#EF5350"></path>
        </svg>
      </div>
      <div class="wrap_text">
        У вас осталось {{Math.floor(dayLeft/30)}}
        <span
          class="inc_word"
          v-inclined-word="{number: Math.floor(dayLeft/30), titles: ['месяц', 'месяца', 'месяцев']}"
        ></span>
        ({{dayLeft}}
        <span
          class="inc_word"
          v-inclined-word="{number: dayLeft, titles: ['день', 'дня', 'дней']}"
        ></span>) для перевода клиентов на технологию 1С:БО
        <div class="help">
          <div class="icon" v-html="iconInfo"></div>
          <div class="information_block">
            <p>По истечении данного периода, за всех клиентов не передших на технологию 1С:БО, будет так же взыматься роялти</p>
          </div>
        </div>
      </div>
    </div>

    <div class="label_wrong" v-if="periodHasExpired">
      <div class="wrap_icon_calendar">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
            fill="#EF5350"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 4C8.55229 4 9 4.44772 9 5V8C9 8.55229 8.55229 9 8 9C7.44772 9 7 8.55229 7 8V5C7 4.44772 7.44772 4 8 4Z"
            fill="#EF5350"
          ></path>
          <path
            d="M9 11C9 11.5523 8.55229 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55229 10 9 10.4477 9 11Z"
            fill="#EF5350"
          ></path>
        </svg>
      </div>
      <div class="wrap_text">
        Истек срок перехода на технологию 1С:БО. Теперь за клиентов, оставшихся не на технологии, взымается роялти.
        <div class="help">
          <div class="icon" v-html="iconInfo"></div>
          <div class="information_block">
            <p>По истечении данного периода, за всех клиентов не передших на технологию 1С:БО, будет так же взыматься роялти</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-scrollbar v-scrollbar-update>
      <div class="clients_list">
        <div
          class="item_client"
          :class="{left: setClassLeft}"
          v-for="(client, index) in data.list"
          :key="index"
        >
          <div class="client_name">{{client.name}}</div>
          <div class="summ_on_period">
            <div class="count_money" v-gap-between-num="{num: client.money}">руб.</div>
            <div class="period">{{client.period}}</div>
            <div class="wrap_links">
              <a :href="client.on_technology_link" class="link_on_technology btn">
                <svg
                  width="13"
                  height="9"
                  viewBox="0 0 13 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.64477 9H9.65161C11.4997 9 13 7.49372 13 5.64362C13 3.69599 11.5503 2.16764 9.69404 2.14487C9.36694 1.49481 8.87419 0.950866 8.26973 0.572572C7.66527 0.194278 6.9724 -0.00378734 6.26694 5.48549e-05C4.67557 5.48549e-05 3.21013 0.925463 2.52704 2.35771C2.56674 2.35771 2.60917 2.35771 2.64956 2.35771C3.23329 2.35541 3.80976 2.49226 4.3347 2.75777C4.56716 2.45799 4.8616 2.21656 5.19612 2.05142C5.53064 1.88628 5.89665 1.80167 6.26694 1.80389C7.18823 1.80389 7.98563 2.40612 8.29706 3.34078L8.5024 3.94799H9.65434C10.553 3.94799 11.2567 4.6933 11.2567 5.64647C11.2567 6.51848 10.553 7.20329 9.65434 7.20329H2.64477C2.141 7.20329 1.74812 6.82672 1.74812 6.34906C1.74812 5.87141 2.09035 5.35959 2.64477 5.35959C3.16085 5.35959 3.34456 5.64647 3.45074 6.0032H5.19612C5.19612 4.43713 4.12183 3.55931 2.64271 3.55931C1.18617 3.55931 0 4.81075 0 6.34906C0.00479124 7.80907 1.19097 9 2.64477 9Z"
                    fill="#E23835"
                  ></path>
                </svg>
                на технологию
              </a>
              <a :href="client.dump" class="dump btn">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.95312 0.529053C1.40085 0.529053 0.953125 0.976768 0.953125 1.52905C0.953125 2.08134 1.40085 2.52905 1.95312 2.52905H10.1831C10.7354 2.52905 11.1831 2.08134 11.1831 1.52905C11.1831 0.976768 10.7354 0.529053 10.1831 0.529053H1.95312ZM2.55136 3.91992C1.95102 3.91992 1.48599 4.44517 1.55875 5.04109L2.24341 10.6502C2.30466 11.1519 2.73062 11.5291 3.23605 11.5291H8.89594C9.40137 11.5291 9.82733 11.1519 9.88858 10.6502L10.5733 5.04109C10.646 4.44517 10.181 3.91992 9.58063 3.91992H2.55136Z"
                    fill="#EF5350"
                  ></path>
                </svg>
                отвал
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="scrollbar" draggable="true">
        <div class="scroll"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "start_franchise_link", "classItem"],
  data() {
    return {
      dayLeft: "",
      popup_footer: false,
      periodHasExpired: "",
      iconInfo: ""
    };
  },
  methods: {
    hidePopup(e) {
      this.popup_footer = false;
    }
  },
  computed: {
    setData() {
      return this.$store.getters.getClientsData;
    },
    setClassLeft() {
      if (this.classItem === "left") {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.iconInfo = this.$store.state.iconInfo;
  },
  mounted() {
    document.addEventListener("click", e => {
      if (!e.target.matches(".help, .help *")) {
        this.hidePopup(e);
      }
    });
  },

  created() {
    this.dayLeft = this.$store.state.clients_page.data_table_remain_transfer.dayLeft;
    (this.periodHasExpired = this.$store.state.clients_page.data_table_remain_transfer.periodHasExpired),
      (this.iconInfo = this.$store.state.iconInfo);
  }
};
</script>

<style scope lang="less">
.wrap_remain_transfer {
  width: 588px;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }

  .headline {
    display: flex;
    justify-content: space-between;
    padding: 0 34px;
    .cap {
      font-weight: bold;
      font-size: 14px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #808080;
    }
    .start_franchise {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: normal;
      color: #878787;
      svg {
        margin-right: 8.5px;
      }
    }
  }
  .label_wrong,
  .label_time_left {
    padding: 0px 12px;
    margin-left: 23px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .wrap_icon_calendar {
      margin-right: 12px;
    }

    .wrap_text {
      line-height: 18px;
      font-size: 12px;
      color: #3a3a3a;
      display: inline-block;
      position: relative;
      .help {
        margin-left: 7px;
        height: 14px;
        width: 14px;
        bottom: -2px;
        box-sizing: border-box;
      }
    }

    .inc_word {
    }
    .help {
      display: inline-block;
      position: relative;
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
        width: 252px;
        padding: 5px 15px;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transition: opacity 500ms linear, top 100ms linear, bottom 100ms linear,
          visibility 100ms linear;
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
  .container {
    height: 370px;
    position: relative;
    margin-top: 25px;
    .clients_list {
      height: 370px;
      width: 100%;
      padding-inline-start: 0;
      overflow: auto;
      -ms-overflow-style: none;
      .item_client {
        padding: 0px 25px 0px 28px;
        // width: 600px;
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 13px;
        color: #4d4d4d;
        border-top: 1px solid rgba(255, 255, 255, 0);
        border-bottom: 1px solid rgba(255, 255, 255, 0);
        .client_name {
          padding: 8px;
          width: 200px;
        }
        .summ_on_period {
          display: flex;
          color: #a99f9f;
          .count_money {
            padding: 8px 5px;
          }
          .period {
            padding: 8px 5px;
          }
        }
        .wrap_links {
          display: none;
        }
        &.left {
          &:hover {
            border-top: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            .summ_on_period {
              .count_money {
                display: none;
              }
              .period {
                display: none;
              }
              .wrap_links {
                display: flex;
                align-items: center;
                .btn {
                  margin: 0 7px;
                }
                .link_on_technology {
                  white-space: nowrap;
                  padding: 8px 13px;
                  background: #ffdc44;
                  border-radius: 4px;
                  font-weight: bold;
                  line-height: normal;
                  font-size: 10px;
                  letter-spacing: 0.07em;
                  text-transform: uppercase;
                  color: #e23835;
                  text-decoration: none;
                  svg {
                    margin-left: 7px;
                  }
                }
                .edit {
                  display: flex;
                  align-items: center;
                  font-weight: bold;
                  line-height: normal;
                  font-size: 10px;
                  letter-spacing: 0.07em;
                  text-transform: uppercase;
                  color: #a99f9f;
                  text-decoration: none;
                }
                .dump {
                  display: flex;
                  align-items: center;
                  font-weight: bold;
                  line-height: normal;
                  font-size: 10px;
                  letter-spacing: 0.07em;
                  text-transform: uppercase;
                  color: #ef5350;
                  text-decoration: none;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>