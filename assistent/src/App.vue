<template>
  <div class="main_window">
    <div class="wheel_left_top"></div>
    <div class="wheel_left_bottom"></div>
    <div class="wheel_right"></div>

    <div class="head">
      <div class="clouds">
        <div class="head_block">
          <h1 class="head_title">{{setData.headline}}</h1>
          <div class="help" v-show="setData.iconHelp" @click="showHelpWindow">
            <div class="icon" v-html="help"></div>
            <div class="wrap_popup" v-if="popupWindow">
              <div class="popup_window">
                <div class="cross" v-html="cross"></div>
                <div class="text" v-html="setData.helpText"></div>
              </div>
            </div>
          </div>
        </div>
        <line-progress></line-progress>
        <div class="wrap_block_count" v-if="!firstpage">
          <div class="yellow_center_block">
            <div class="block_count">
              <div class="count">{{setData.benchmarks.mainNumber}}</div>
              <div class="subscription">{{setData.benchmarks.mainSubscription}}</div>
            </div>
            <div class="text" v-if="setData.benchmarks.subBenchmarks.length !== 0">Из них:</div>
            <div class="block_sub_benchmarks" v-if="setData.benchmarks.subBenchmarks.length !== 0">
              <div
                class="sub_benchmarks"
                v-for="(obj, index) in setData.benchmarks.subBenchmarks"
                :key="index"
              >
                <div class="count">{{obj.number}}</div>
                <div class="subscription">{{obj.subscription}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center" v-show="!firstpage">
      <message-window></message-window>
    </div>
    <div class="main_content" v-if="firstpage">
      <div class="block_ca">
        <div :class="[{block_page_gray: setData.nextCA.view},{block_page: !setData.nextCA.view}]"></div>
        <div class="block_content">
          <h2 class="header_audit">Централизованный аудит</h2>
          <div class="text">
            <p>Для проверки качества ведения учета в приложениях клиентов в программе УФА реализован Централизованный аудит.</p>
            <p>Проверка централизованно запускается Управляющей компанией 1С:БО по результатам 1 полугодия, 9 месяцев и года.</p>
          </div>
        </div>
      </div>

      <div class="block_helper">
        <div class="block_content">
          <h2 class="header_audit">Помощник ЦА</h2>
          <div class="text">
            <p>Помощник подготовки к Централизованному аудиту от Управляющей компании проанализирует данные УФА и сформирует список всех клиентов, которые попадут в предстоящую проверку.</p>
          </div>
        </div>
        <div :class="[{block_page_gray: setData.nextCA.view},{block_page: !setData.nextCA.view}]"></div>
      </div>

      <div class="button_cameon" v-if="firstpage && !setData.nextCA.view">
        <a :href="setData.buttonGo" class="btn">Приступить</a>
      </div>

      <div class="warning" v-if="setData.nextCA.view">
        <div class="icon_warning" v-html="warning"></div>
        <div class="block_warning">
          У Вас
          <strong>нет ни одного клиента</strong>
          с договором от {{setData.nextCA.dateAgreement}} или более ранней даты. Поэтому Вы не участвуете в Централизованном аудите за {{setData.nextCA.year}}.
          <strong>Следующий ЦА от УК состоится в {{setData.nextCA.dateNext}} года.</strong> Желаем успешной подготовки!
        </div>
      </div>

      <div class="block_button" v-if="setData.nextCA.view">
        <a :href="setData.nextCA.buttonCloseLink" class="button_close">Закрыть</a>
      </div>
    </div>
    <div class="footer" v-if="!firstpage">
      <div class="block_buttons">
        <div class="empty_block_left" v-if="!setData.buttonBack.view"></div>
        <a
          :href="setData.buttonBack.link"
          class="button left"
          v-if="setData.buttonBack.view"
          v-html="arrow"
        ></a>
        <a
          :href="setData.buttonForward.link"
          class="button right"
          v-if="setData.buttonForward.view"
          v-html="arrow"
        ></a>
        <div class="empty_block_right" v-if="!setData.buttonForward.view"></div>
      </div>
      <div class="empty_block"></div>
      <answer-choices></answer-choices>
      <div class="empty_block"></div>
    </div>

    <div class="yellow_footer" v-if="firstpage && !setData.nextCA.view">
      <div class="yellow_image">
        <a :href="setData.lastStage" class="skip">Пропустить все шаги и перейти к запуску проверки</a>
      </div>
    </div>
  </div>
</template>

<script>
import LineProgress from "./components/LineProgress.vue";
import MessageWindow from "./components/MessageWindow.vue";
import AnswerChoices from "./components/AnswerChoices.vue";
export default {
  data() {
    return {
      help: `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00298 8.03677C7.85943 8.18338 7.58885 8.45971 7.10456 8.42229C6.66797 8.44238 5.94384 8.18657 6.03645 7.35023C6.09845 6.78945 6.23642 6.15161 6.444 5.62699C6.67867 5.07447 7.02766 4.41113 7.74509 4.01711C8.25967 3.70798 8.82844 3.4502 9.74007 3.48081C10.2464 3.45064 10.637 3.51271 11.3645 3.72253C11.833 3.91697 12.479 4.24181 12.8252 4.69614L12.8438 4.72061C13.1984 5.18594 13.3685 5.40916 13.4791 6.07568C13.5496 6.50005 13.62 6.99627 13.4409 7.6223C13.1164 8.50168 12.6095 9.43602 11.8085 10.1374C11.7593 10.1855 11.7139 10.2297 11.6717 10.2707C11.2918 10.6403 11.171 10.7578 10.9142 11.2067C10.9111 11.373 10.8204 11.7892 10.6398 11.9957C10.5302 12.1209 10.1995 12.4474 9.78214 12.4474C9.61216 12.4353 9.09766 12.3135 8.86734 11.9443C8.74587 11.8248 8.58594 11.4268 8.63292 11.1438C8.63292 10.2549 9.27407 9.52925 9.98225 8.81108L10.371 8.42229C10.7347 8.00792 10.7492 7.97952 10.8973 7.6893C10.964 7.55859 11.0579 7.37478 11.2229 7.07868C11.2581 6.9129 11.2207 6.7596 11.1817 6.59991C11.1679 6.54332 11.1539 6.48592 11.1429 6.42689C11.1355 6.38729 11.0861 6.34698 11.0228 6.29532C10.9518 6.23735 10.8633 6.16508 10.7969 6.06348C10.7281 6.03892 10.7181 6.03363 10.6627 6.00409C10.6167 5.97957 10.5394 5.93835 10.371 5.85555C10.1715 5.82883 10.1489 5.82838 10.0924 5.82728C10.0439 5.82633 9.97034 5.82489 9.73803 5.80587C9.49692 5.78612 9.46878 5.79338 9.38175 5.81584C9.34152 5.82622 9.2887 5.83984 9.19643 5.85555C9.14069 5.88741 9.09202 5.91371 9.04819 5.9374C8.85055 6.04421 8.75123 6.09788 8.54552 6.36734C8.39723 6.70505 8.29633 6.98167 8.28217 7.35023C8.26854 7.51182 8.18496 7.86975 8.06354 7.97723C8.04649 7.99233 8.02643 8.01282 8.00298 8.03677Z" fill="#A58632"/>
<path d="M9.90032 15.527C10.828 15.527 11.2293 14.73 11.2293 14.2017C11.2293 13.311 10.4934 12.8759 9.90032 12.8759C8.9608 12.8759 8.5742 13.6765 8.5742 14.2017C8.53761 14.6853 8.97268 15.527 9.90032 15.527Z" fill="#A58632"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.291 9.5C19.291 14.7467 15.0377 19 9.79102 19C4.54431 19 0.291016 14.7467 0.291016 9.5C0.291016 4.2533 4.54431 0 9.79102 0C15.0377 0 19.291 4.2533 19.291 9.5ZM17.291 9.5C17.291 13.6421 13.9332 17 9.79102 17C5.64888 17 2.29102 13.6421 2.29102 9.5C2.29102 5.35786 5.64888 2 9.79102 2C13.9332 2 17.291 5.35786 17.291 9.5Z" fill="#A58632"/>
</svg>
`,
      arrow: `<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.30155 0.481521C10.1402 1.20036 10.2373 2.46296 9.51848 3.30161L4.63414 9L9.51848 14.6984C10.2373 15.537 10.1402 16.7996 9.30155 17.5185C8.4629 18.2373 7.2003 18.1402 6.48146 17.3015L0.481485 10.3016C-0.160495 9.5526 -0.160495 8.4474 0.481485 7.69842L6.48146 0.698451C7.2003 -0.140198 8.4629 -0.23732 9.30155 0.481521Z" fill="#4D4D4D"/>
</svg>
`,
      cross: `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.266048 10.7337C-0.0886828 10.379 -0.0886828 9.80375 0.266048 9.44897L9.44778 0.266082C9.80251 -0.0886935 10.3776 -0.0886945 10.7324 0.266081C11.0871 0.620857 11.0871 1.19606 10.7324 1.55084L1.55064 10.7337C1.19591 11.0885 0.62078 11.0885 0.266048 10.7337Z" fill="#858585"/>
<path d="M10.734 10.7339C10.3792 11.0887 9.80409 11.0887 9.44936 10.7339L0.267625 1.55103C-0.0871066 1.19626 -0.0871076 0.621049 0.267624 0.266274C0.622355 -0.0885024 1.19749 -0.0885023 1.55222 0.266274L10.734 9.44916C11.0887 9.80394 11.0887 10.3791 10.734 10.7339Z" fill="#858585"/>
</svg>
`,
      warning: `<svg width="45" height="41" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.7913 2.12802L43.7929 34.6159C45.3279 37.4532 43.3743 40.8581 40.0252 41H4.1615C0.951928 41 -1.00174 37.4532 0.533244 34.6159L18.5348 2.12802C20.0698 -0.709339 24.2563 -0.709339 25.7913 2.12802ZM40.1647 36.7439L22.1631 4.25601L4.16155 36.7439H40.1647Z" fill="#E24C4B"/>
<path d="M20.3487 26.6856L19.2323 19.1665C19.0927 17.3222 20.3486 15.7616 22.1628 15.7617C23.9769 15.7617 25.3724 17.3222 25.0933 19.1665L23.9769 26.6856C23.8374 27.5367 23 28.2461 22.1628 28.2461C21.1859 28.2461 20.4882 27.5367 20.3487 26.6856Z" fill="#3F4448"/>
<path d="M23.8373 31.509C23.8373 32.4492 23.0875 33.2115 22.1627 33.2115C21.2378 33.2115 20.4881 32.4492 20.4881 31.509C20.4881 30.5688 21.2378 29.8066 22.1627 29.8066C23.0875 29.8066 23.8373 30.5688 23.8373 31.509Z" fill="#3F4448"/>
</svg>

`,
      popupWindow: false
    };
  },
  components: {
    LineProgress,
    MessageWindow,
    AnswerChoices
  },
  methods: {
    showHelpWindow() {
      this.popupWindow = !this.popupWindow;
    }
  },
  computed: {
    setData() {
      return this.$store.getters.getData;
    },
    // textTransform() {
    //   return this.setData.helpText.replace(/--/g, "<div class='dot'></div>");
    // },
    oneChoice() {
      return this.$store.getters.getData.options.length > 1 ? false : true;
    },
    firstpage() {
      return this.setData.stage === 0 ? true : false;
    }
  },
  created() {
    document.addEventListener("click", e => {
      console.log(e.target);
      if (!e.target.matches(".help, .icon, svg, .popup_window, path")) {
        this.popupWindow = false;
      }
    });
  }
};
</script>

<style lang="less">
@charset "utf-8";
@import url("./mixin/mixin.less");

.main_window {
  flex: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #ffffff;
  min-height: 630px;

  .clouds {
    height: 172px;
    background: url("./assets/images/clouds.png");
  }
  .wheel_left_top {
    position: absolute;
    top: 172px;
    left: 0;
    width: 29px;
    height: 59px;
    z-index: 2;
    background: url("./assets/images/top-left-wheel.png") no-repeat;
  }

  .wheel_left_bottom {
    position: absolute;
    bottom: 100px;
    left: 0;
    width: 115px;
    height: 118px;
    z-index: 2;
    background: url("./assets/images/bottom-left-wheel.png") no-repeat;
  }

  .wheel_right {
    position: absolute;
    right: 0;
    bottom: 187px;
    width: 55px;
    height: 111px;
    z-index: 2;
    background: url("./assets/images/right-wheel.png") no-repeat;
  }
  .head {
    min-height: 250px;
    .head_block {
      display: flex;
      justify-content: center;
      align-items: center;
      .head_title {
        font-weight: bold;
        color: #4d4d4d;
        line-height: 26px;
        font-size: 20px;
        text-align: center;
      }
      .help {
        position: relative;
        padding: 7px;
        cursor: pointer;
        .icon {
          transition: 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            svg {
              path {
                transition: 0.3s;
                fill: #6c5a2a;
              }
            }
          }
        }
        .wrap_popup {
          width: 100%;
          position: fixed;
          display: flex;
          justify-content: center;
          align-items: center;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.705);
          z-index: 20;

          .popup_window {
            position: relative;
            padding: 41px 32px;
            line-height: 22px;
            width: 590px;
            background: #ffffff;
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
            z-index: 3;
            .cross {
              position: absolute;
              top: 0;
              right: 0;
              padding: 15px;
              cursor: pointer;
              &:hover {
                path {
                  fill: #030303;
                }
              }
            }
            .text {
              font-weight: normal;
              line-height: 21px;
              font-size: 16px;
              color: #4d4d4d;
              h3 {
                line-height: 21px;
                font-weight: normal;
                font-size: 16px;
                color: #4d4d4d;
              }

              ul {
                li {
                  list-style-image: url("./assets/images/ellipse.svg");
                  margin: 20px 0;
                }
              }
            }
          }
          .dot {
            display: inline-block;
            line-height: 21px;
            margin-bottom: 3px;
            width: 7px;
            height: 7px;
            border-radius: 50px;
            background: #9173d0;
            opacity: 0.7;
            margin-right: 7px;
          }
        }
      }
    }
    .wrap_block_count {
      margin-top: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      .yellow_center_block {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fedd46;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        z-index: 4;
        //flex-wrap: wrap;
        .block_count {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          flex-shrink: 1;
          margin: 0px 15px;
          .count {
            font-weight: bold;
            line-height: normal;
            font-size: 50px;
            color: #4d4d4d;
          }
          .subscription {
            font-size: 14px;
            text-align: center;
            color: #4d4d4d;
          }
        }
        .text {
          font-size: 14px;
          line-height: 19px;

          color: #4d4d4d;
        }
        .block_sub_benchmarks {
          margin: 0px 15px;
          .sub_benchmarks {
            display: flex;
            align-items: center;
            .count {
              font-size: 24px;
              margin-right: 7px;
              font-weight: bold;
              color: #4d4d4d;
            }
            .subscription {
              font-size: 14px;
              color: #4d4d4d;
            }
          }
        }
      }
    }
  }
  .center {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
  }

  .footer {
    position: relative;
    display: flex;
    justify-content: space-between;
    .block_buttons {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 150px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin: 14px 16px;
      .button {
        transition: 0.3s;
        width: 35px;
        height: 35px;
        margin: 1.5px;
        background: #fedd46;
        border-radius: 6px;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        &:hover {
          transition: 0.3s;
          background: #d3b83f;
        }
        &.right {
          svg {
            transform: rotate(180deg);
          }
        }
      }
      .empty_block_left,
      .empty_block_right {
        width: 35px;
        margin: 5px;
      }
    }
    .empty_block {
      width: 250px;
    }
  }
  .main_content {
    margin: -50px 0 20px;

    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    .block_ca {
      width: 560px;
      display: flex;
      justify-content: center;
      align-items: center;

      .block_page_gray,
      .block_page {
        flex-grow: 1;
        flex-shrink: 0;

        width: 90px;
        height: 90px;
        margin-right: 20px;
      }
      .block_page {
        background: url("./assets/images/centr_audit.svg") no-repeat;
      }
      .block_page_gray {
        background: url("./assets/images/centr_audit_gray.svg") no-repeat;
      }
      .block_content {
        .header_audit {
          font-weight: bold;
          line-height: normal;
          font-size: 18px;
          color: #5a5a5a;
        }
        .text {
          font-size: 18px;
          line-height: 25px;
          color: #4d4d4d;
          p {
            margin: 5px 0;
            text-align: left;
          }
        }
      }
    }

    .block_helper {
      width: 560px;
      display: flex;
      justify-content: center;
      align-items: center;
      .header_audit {
        font-weight: bold;
        line-height: normal;
        font-size: 18px;
        text-align: right;
        color: #5a5a5a;
      }
      .block_content {
        .header_audit {
          font-weight: bold;
          line-height: normal;
          font-size: 18px;
          color: #5a5a5a;
        }
        .text {
          font-size: 18px;
          line-height: 25px;
          color: #4d4d4d;

          p {
            margin: 2.5px 0;
            text-align: right;
          }
        }
      }
      .block_page_gray,
      .block_page {
        flex-grow: 1;
        flex-shrink: 0;

        width: 90px;
        height: 90px;
        margin-left: 20px;
      }
      .block_page {
        background: url("./assets/images/helper.svg") no-repeat;
      }
      .block_page_gray {
        background: url("./assets/images/helper_gray.svg") no-repeat;
      }
    }
    .warning {
      display: flex;
      margin: 45px 0;
      align-items: center;
      width: 560px;
      font-size: 13px;
      line-height: 17px;
      .icon_warning {
        margin-right: 7px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }
    }
    .block_button {
      display: flex;
      justify-content: center;
      .button_close {
        transition: all 0.3s;
        background: #e24c4b;
        border-radius: 31px;
        padding: 12px 25px;
        font-weight: bold;
        font-size: 14px;
        line-height: 21px;
        text-transform: uppercase;
        color: #ffffff;
        &:hover {
          transition: all 0.3s;
          background: #ad3b3a;
        }
      }
    }
    .button_cameon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 90px;

      .btn {
        cursor: pointer;
        transition: 0.3s;
        background: #f7712d;
        border-radius: 31px;
        padding: 12px 25px;
        font-weight: bold;
        line-height: 21px;
        font-size: 14px;
        text-transform: uppercase;
        color: #ffffff;
        &:hover {
          transition: 0.3s;
          background: #be5a28;
        }
      }
    }
  }

  .yellow_footer {
    .yellow_image {
      background: url("./assets/images/yellow_footer.png");
      background-position: center;
      height: 67px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 4;
      .skip {
        line-height: 15px;
        font-size: 12px;
        text-decoration-line: underline;
        color: #4d4d4d;
        &:hover {
          color: #f7712d;
        }
      }
    }
  }
}
@media (max-width: 1000px), screen and (max-height: 700px) {
  .main_window {
    .main_content {
      .block_ca {
        .block_content {
          .header_audit {
            font-size: 18px;
          }
          .text {
            font-size: 14px;
            line-height: 21px;
          }
        }
      }

      .block_helper {
        .header_audit {
          font-size: 18px;
        }
        .block_content {
          .header_audit {
            font-size: 18px;
          }
          .text {
            font-size: 14px;
            line-height: 21px;
          }
        }
      }
    }
  }
}
</style>
