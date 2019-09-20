<template>
  <section class="audit_stage">
    <!-- Пройден ли аудит -->
    <h3 class="capture successfully" v-if="setDataPeriod.finished">
      <div class="icon" v-html="iconsSvg.greenBird"></div>Аудит пройден
    </h3>
    <h3 class="capture failed" v-if="!setDataPeriod.finished">
      <div class="icon" v-html="iconsSvg.redCross"></div>Аудит не пройден
    </h3>
    <!-- /Пройден ли аудит -->

    <!-- Таблица и баннеры -->
    <section class="tables_and_banners">
      <!-- Таблица -->
      <section class="table">
        <section class="worked_group">
          <div class="table__header">
            <div class="group first">
              <div class="item left">Рабочая группа</div>
              <div class="item right">Организаций</div>
            </div>
            <div class="group center--left">
              <div class="item">Качество учёта</div>
            </div>
            <div class="group third">
              <div class="item left bugs">Ошибки</div>
              <div class="item right"></div>
              <div class="item right"></div>
            </div>
            <div class="group center--right">
              <div class="item">Предупреждения</div>
            </div>
          </div>
          <div class="table__header_second">
            <div class="group first">
              <div class="item left"></div>
              <div class="item right"></div>
            </div>
            <div class="group center--left">
              <div class="item invisible">-</div>
            </div>
            <div class="group third">
              <div class="item left bugs">Среднее</div>
              <div class="item right">Критические</div>
              <div class="item right">Всего</div>
            </div>
            <div class="group center--right">
              <div class="item invisible">-</div>
            </div>
          </div>  
          <div class="table_content">
            <div
              class="field"
              v-for="(partner, index) in setDataWorkingGroup"
              :key="index"
              ref="field_table_1"
            >
              <div class="group first">
                <div class="item left partner">{{partner.name}}</div>
                <div class="item right countOrganizations">{{partner.countOrganization}}</div>
              </div>
              <div class="group center--left">
                <div
                  class="item quality"
                  :class="paintWord(partner.quality)"
                >{{transformWord(partner.quality)}}</div>
              </div>
              
              <div class="group third">
                <div class="item left bugs">{{partner.bugs.average}}</div>
                <div class="item right">
                  <a
                    :href="'#' + partner.guid"
                    class="red"
                    v-if="partner.bugs.critical > 0"
                    @click="$emit('saveNameWorkingGroup', index, partner.guid)"
                  >
                    <div class="icon" v-show="partner.bugs.critical > 0" v-html="iconsSvg.warning"></div>
                    {{partner.bugs.critical}}
                  </a>
                  <div class="zero right" v-if="partner.bugs.critical === 0">0</div>
                </div>
                <div class="item right">{{partner.bugs.total}}</div>
              </div>
              <div class="group center--right">
                <div
                  class="item warning"
                >{{partner.warning}}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Протоколы -->
        <section class="table_protocol" v-show="setDataPeriod.checkUK">
          <div class="table__header">
            <div class="group">
              <div class="item right lonly">Протоколы</div>
              <div class="item right"></div>
              <div class="item right"></div>
              <div class="item right"></div>
            </div>
          </div>
          <div class="table__header_second">
            <div class="group">
              <div class="item right">Отправлено</div>
              <div class="item right">Одобрено</div>
              <div class="item right">Отклонено</div>
              <div class="item right">Снято ошибок</div>
            </div>
          </div>
          <div class="table_content">
            <div
              class="field"
              v-for="(partner, index) in setDataWorkingGroup"
              :key="index"
              ref="field_table_2"
            >
              <div class="group">
                <div class="item right">{{partner.protocols.filed}}</div>
                <div class="item right">{{partner.protocols.rejected}}</div>
                <div class="item right">{{partner.protocols.accepted}}</div>
                <div class="item right">{{partner.protocols.bugsRemoved}}</div>
              </div>
            </div>
          </div>
        </section>
        <!-- /Протоколы -->
      </section>
      <!-- /Таблица -->

      <!-- Блок больших баннеров -->
      <section class="banners" v-if="setDataWorkingGroup.length > 7 && !setDataPeriod.checkUK">
        <a
          :href="setLinks.runСheckUnverified"
          class="banner_x1__bad"
          v-if="!whatTypeOfBannerСhecks"
        >
          <div class="banner_x1__bad__text">
            По
            <b>{{setDataPeriod.unverifiedCustomers}}</b> клиентам
            <strong>
              не
              проведена
            </strong> проверка
          </div>
        </a>

        <div class="banner_x1__good" v-if="whatTypeOfBannerСhecks">
          <div class="banner_x1__good__text">
            По
            всем клиентам
            <strong>проведена</strong> проверка
          </div>
        </div>

        <a :href="setLinks.runCheckNotActuality" class="banner_x2__bad" v-if="!whatTypeOfBanner">
          <div class="banner_x2__bad__text">
            Результат проверки на
            <strong>{{setDataPeriod.actualityDate}}</strong>
            По
            <b>{{setDataPeriod.custumersCheckIsNotRelevant}}</b> клиентам проверка
            <br>
            <strong>не актуальна</strong>
          </div>
        </a>

        <div class="banner_x2__good" v-if="whatTypeOfBanner">
          <div class="banner_x2__good__text">
            Результат проверки на
            <strong>{{setDataPeriod.actualityDate}}</strong>
            По всем клиентам проверка
            <br>
            <strong>актуальна</strong>
          </div>
        </div>

      </section>
      <!-- /Блок больших баннеров -->

      <!-- Блок маленьких баннеров -->
      <section
        class="banners_small"
        v-if="setDataWorkingGroup.length < 7 && !setDataPeriod.checkUK"
      >
        <a
          :href="setLinks.runСheckUnverified"
          class="banner_x1__bad"
          title="Результат проверки на 25.08.2018"
          v-if="!whatTypeOfBannerСhecks"
        >
          <div class="banner_x1__bad__text">
            По
            <b>{{setDataPeriod.unverifiedCustomers}}</b> клиентам
            <strong>
              не
              проведена
            </strong> проверка
          </div>
        </a>

        <div class="banner_x1__good" v-if="whatTypeOfBannerСhecks">
          <div class="banner_x1__good__text">
            По
            всем клиентам
            проверка
            <strong>пройдена</strong>
          </div>
        </div>

        <a :href="setLinks.runCheckNotActuality" class="banner_x2__bad" v-if="!whatTypeOfBanner">
          <div class="banner_x2__bad__text">
            По
            <b>{{setDataPeriod.custumersCheckIsNotRelevant}}</b> клиентам проверка
            <strong>не актуальна</strong>
          </div>
        </a>

        <div class="banner_x2__good" v-if="whatTypeOfBanner">
          <div class="banner_x2__good__text">
            По всем клиентам проверка
            <strong>актуальна</strong>
          </div>
        </div>
      </section>
      <!-- /Блок маленьких баннеров -->
    </section>
    <!-- /Таблица и баннеры -->

    <!-- Кнопки -->
    <section class="buttons">
      <a
        href="#"
        class="btn_critical_bugs"
        @click="$emit('viewCompleteBugList')"
      >Список критических ошибок</a>
      <a :href="setLinks.statistics" class="btn_more">Подробнее</a>
    </section>
    <!-- /Кнопки -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      auditCompleted: true,

      //внутр данные
      colorWords: [
        {
          originalWord: "normal",
          resultWord: "среднее",
          color: "orange"
        },
        {
          originalWord: "top",
          resultWord: "высокое",
          color: "green"
        },
        {
          originalWord: "nice",
          resultWord: "хорошее",
          color: "yellow"
        },
        {
          originalWord: "bad",
          resultWord: "низкое",
          color: "red"
        }
      ],
      tableView: true,
      iconsSvg: {
        greenBird: `<svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.54631 10.8146L4.54273 10.8181L4.8924 11.1466L6.07645 12.2824L6.08874 12.2706L6.86514 13L18 2.18193L15.7253 0L6.81133 8.62343L2.27469 4.2718L0 6.45373L4.54631 10.8146Z" fill="#6D8D0D"/>
                    </svg>`,
        redCross: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2.90909L13.0909 0L8 5.09091L2.90909 0L0 2.90909L5.09091 8L0 13.0909L2.90909 16L8 10.9091L13.0909 16L16 13.0909L10.9091 8L16 2.90909Z" fill="#EF5F50"/>
                    </svg>`,
        warning: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect width="22" height="22" rx="5" fill="#EF5F50"/>
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6449 13.5158L13.187 5.89518C12.7395 5.11933 11.9053 4.63778 11.0032 4.63672C10.101 4.63567 9.26661 5.11523 8.8135 5.89521L4.35399 13.5187C3.89157 14.2962 3.88111 15.2705 4.32901 16.0651C4.77729 16.8603 5.61666 17.3552 6.52966 17.3626L15.4627 17.3627C16.3852 17.3537 17.2229 16.8603 17.6711 16.0658C18.1188 15.2722 18.1088 14.3001 17.6449 13.5158ZM5.44871 14.164L9.91152 6.53495C10.1375 6.14591 10.552 5.90769 11.0003 5.9082C11.4484 5.90873 11.8628 6.14794 12.0851 6.53324L16.5464 14.1599C16.7803 14.5553 16.7853 15.0419 16.5612 15.4393C16.3367 15.8372 15.9171 16.0843 15.455 16.0888L6.53334 16.0888C6.08115 16.0851 5.66071 15.8372 5.43621 15.4389C5.21196 15.0411 5.2172 14.5533 5.44871 14.164ZM10.9991 14.8149C11.3507 14.8149 11.6357 14.53 11.6357 14.1786C11.6357 13.8271 11.3507 13.5422 10.9991 13.5422C10.6475 13.5422 10.3625 13.8271 10.3625 14.1786C10.3625 14.53 10.6475 14.8149 10.9991 14.8149ZM11.6391 8.45288H10.366V12.9073H11.6391V8.45288Z" fill="white"/>
                 </svg>`
      }
    };
  },
  methods: {
    paintWord(element) {
      var colors = new Map();
      this.colorWords.forEach(item => {
        colors.set(item.originalWord, item.color);
      });
      return colors.get(element);
    },
    transformWord(element) {
      var words = new Map();
      this.colorWords.forEach(item => {
        words.set(item.originalWord, item.resultWord);
      });
      return words.get(element);
    },
    calculateHeightFields() {
      this.$refs.field_table_1.forEach((element, index) => {
        this.$refs.field_table_2[index].style.height =
          element.offsetHeight + "px";
      });
    }
  },
  computed: {
    setDataWorkingGroup() {
      return this.$store.getters.getData.workingGroup;
    },
    setLinks() {
      return this.$store.getters.getData.links;
    },
    setDataPeriod() {
      return this.$store.getters.getData.period;
    },
    whatTypeOfBanner() {
      console.log(this.setDataPeriod.custumersCheckIsNotRelevant);
      return this.setDataPeriod.custumersCheckIsNotRelevant === 0 ? true : false;
    },
    whatTypeOfBannerСhecks() {
      console.log(this.setDataPeriod.unverifiedCustomers === 0);
      return this.setDataPeriod.unverifiedCustomers === 0
        ? true
        : false;
    }
  },
  mounted() {
    this.calculateHeightFields();
    window.addEventListener("resize", this.calculateHeightFields);
  }
};
</script>

<style lang="less">
.audit_stage {
  margin: 18px 0 28px;
  .capture {
    &.failed,
    &.successfully {
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #6d8d0d;
      display: flex;
      .icon {
        margin-right: 6px;
      }
    }
    &.failed {
      color: #ef5f50;
    }
  }

  .tables_and_banners {
    display: flex;
    justify-content: flex-start;

    .table {
      width: 100%;
      display: flex;
      box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.05);
      .worked_group {
        flex: 5;
        display: flex;
        flex-direction: column;
      }
    }
    .table_protocol {
      display: flex;


      flex-direction: column;
      border-left: 1px dashed #e5e5e5;
      .table__header_second {
        .group {
          border-bottom: 1px solid #e5e5e5;
          .item {
            text-transform: uppercase;
            white-space: nowrap;
            flex-shrink: 0;
          }
        }
      }
    }
    .table_protocol {
      .table__header_second,
      .table__header,
      .table_content {
        .group {
          .item {
            flex-shrink: 0;
          }
        }
      }
    }

    .table,
    .table_protocol {
      .table__header {
        font-size: 10px;
        .group {
          .item {
            text-transform: uppercase;
            white-space: nowrap;
            .lonly {
              padding-left: 80px;
            }
          }
        }
      }

      .table__header_second {
        font-size: 9px;
        .group {
          .item {
            text-transform: uppercase;
            white-space: nowrap;
            flex-shrink: 0;
          }
          &.third {
            border-bottom: 1px solid #e5e5e5;
            .item {
              
            }
          }
        }
      }

      .field {
        font-size: 16px;
        color: #4d4d4d;
        // height: 50px;
        &:nth-child(even) {
          background: #f9f9f9;
        }
        .group {
          //
          .item {
            padding: 14px 30px 14px 22px;
            &.countOrganizations {
              color: #919191;
              flex-shrink: 0;
            }
          }
        }
      }

      .table__header,
      .table__header_second {
        .item {
          padding: 8px 30px 8px 22px;
          flex-shrink: 0;
        }
      }

      .table__header,
      .table__header_second,
      .field {
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        box-sizing: border-box;
        .group {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          .item {
            line-height: 17px;
            letter-spacing: 0.1em;
            display: flex;
            align-items: center;
            color: #4d4d4d;

            .icon {
              margin-right: 18px;
            }

            .red {
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: space-between;

              color: #ef5f50;
              font-weight: bold;
              width: 73px;
            }
            .zero {
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: flex-start;
            }
            &.invisible {
              color: #ffffff;
            }

            &.quality {
              display: flex;
              align-items: center;
              text-align: left;
              font-weight: bold;
              font-size: 11px;
              line-height: normal;
              letter-spacing: 0.07em;
              text-transform: uppercase;
              font-size: 10px;
              &:before {
                content: "";
                display: block;
                width: 6px;
                height: 6px;
                border-radius: 8px;
                margin-right: 5px;
              }
              &.red {
                color: #ef5f50;
                &:before {
                  background: #ef5f50;
                }
              }
              &.orange {
                color: #ff8000;
                &:before {
                  background: #ff8000;
                }
              }
              &.green {
                color: #6d8d0d;
                &:before {
                  background: #6d8d0d;
                }
              }
              &.yellow {
                color: #f3b000;
                &:before {
                  background: #f3b000;
                }
              }
            }
            &.left {
              justify-content: flex-start;
            }
            &.right {
              justify-content: flex-end;
            }
            &.bugs {
              padding: 8px 22px 8px 30px;
            }
            &.third {
              width: calc(100% / 3);
            }
          }

          &.center {
            &--left,
            &--right{
              flex: 1;
              box-sizing: border-box;
              flex-shrink: 0;

              min-width: 145px;
            }
            &--left{
              border-right: 1px dashed #e5e5e5;
              border-left: 1px dashed #e5e5e5;
            }

            &--right{
              min-width: 155px;
              border-left: 1px dashed #e5e5e5;

              display: flex;
              justify-content: flex-end;

              .warning{
                  font-size: 16px;
                  line-height: 18px;

                  text-align: right;

                  color: #4D4D4D;
                }
            }
          }

          &.first {
            flex: 5;
          }

          &.third {
            flex: 2;
            flex-shrink: 0;
            min-width: 332px;
          }

          @media screen and (-ms-high-contrast: active),
            (-ms-high-contrast: none) {
            &.center {
              &--left,
              &--right{
                flex: 1;
                box-sizing: border-box;
                flex-shrink: 0;
                border-left: 1px dashed #e5e5e5;
                border-right: 1px dashed #e5e5e5;
                min-width: 145px;
              }
              
              &--right{
                min-width: 155px;
                border-right: 1px dashed #e5e5e5;

                display: flex;
                justify-content: flex-end;

                .warning{
                  font-size: 16px;
                  line-height: 18px;

                  text-align: right;

                  color: #4D4D4D;
                }
              }
            }

            &.first {
              flex: 15;
            }

            &.third {
              flex: 2;
              flex-shrink: 0;
              min-width: 332px;
            }
          }
        }
      }

      .field {
        .group.third {
          .item {
            width: 100%;
          }
        }
      }

      .table__header {
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid #e5e5e5;
      }
      .table__header_second {
        .group {
          .item {
            padding: 13px 30px 13px 22px;
            font-size: 9px;
            line-height: normal;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            font-weight: bold;
            color: #999999;
          }
        }
      }
    }

    .banners {
      margin-left: 7px;
      display: flex;
      flex-direction: column;
      .banner_x1,
      .banner_x2 {
        &__bad,
        &__good {
          cursor: pointer;
          box-sizing: border-box;
          background: #ffffff;
          flex: 1;
          box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.05);
          border-radius: 4px;
          font-size: 18px;
          line-height: 26px;
          text-align: center;
          color: #6b6b6b;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;

          &:before {
            content: "";
            display: block;
            flex-shrink: 0;
          }

          &:hover {
            transition: all 0.3s;
            box-shadow: 1px 2px 10px rgba(239, 101, 70, 0.7);
          }
          &__text {
            width: 300px;
          }
        }
        &__good {
          cursor: default;
          &:hover {
            transition: all 0.3s;
            box-shadow: 1px 2px 10px rgba(117, 154, 20, 0);
          }
        }
      }
      .banner_x1__bad {
        width: 392px;
        padding: 10px 60px;

        &:before {
          width: 129px;
          height: 97px;
          background: url("../img/banner_x1.svg") no-repeat;
        }
      }

      .banner_x2__bad {
        margin-top: 9px;
        width: 392px;
        padding: 10px 45px;

        &:before {
          width: 122px;
          height: 112px;
          background: url("../img/banner_x2.svg") no-repeat;
        }
      }

      .banner_x1__good {
        width: 392px;
        padding: 10px 60px;

        &:before {
          width: 129px;
          height: 97px;
          background: url("../img/banner_x1_good.svg") no-repeat;
        }
      }

      .banner_x2__good {
        margin-top: 9px;
        width: 392px;
        padding: 10px 45px;

        &:before {
          width: 136px;
          height: 125px;
          background: url("../img/banner_x2_good.svg") no-repeat;
        }
      }
    }

    .banners_small {
      margin-left: 7px;
      display: flex;
      flex-direction: column;
      .banner_x1__bad,
      .banner_x2__bad,
      .banner_x1__good,
      .banner_x2__good {
        cursor: pointer;
        //width: 430px;
        box-sizing: border-box;
        background: #ffffff;
        flex: 1;
        box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        color: #6b6b6b;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        transition: all 0.3s;
        padding: 10px 23px;
        &__text {
          white-space: nowrap;
        }
        &:before {
          content: "";
          display: block;
          width: 39px;
          height: 35px;
          flex-shrink: 0;
          background: url("../img/triangle_wrong.svg") no-repeat;
          margin-right: 7px;
        }

        &:hover {
          transition: all 0.3s;
          box-shadow: 1px 2px 10px rgba(239, 101, 70, 0.7);
        }
      }
      .banner_x1__bad {
      }

      .banner_x2__bad,
      .banner_x2__good {
        margin-top: 9px;
      }
      .banner_x1__good,
      .banner_x2__good {
        cursor: default;
        &:before {
          background: url("../img/success.svg") no-repeat;
        }
        &:hover {
          transition: all 0.3s;
          box-shadow: 1px 2px 10px rgba(117, 154, 20, 0);
        }
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    margin: 7px 0;
    .btn_critical_bugs {
      font-weight: bold;
      font-size: 15px;
      line-height: 22px;
      color: #ffffff;
      background: #ef5f50;
      border-radius: 5px;
      padding: 6px 15px;
      transition: all 0.3s;
      &:hover {
        transition: all 0.3s;
        background: #b14539;
      }
    }
    .btn_more {
      font-weight: bold;
      font-size: 15px;
      line-height: 22px;
      color: #676767;
      background: #f2f2f2;
      border: 1px solid #676767;
      box-sizing: border-box;
      border-radius: 5px;
      padding: 6px 15px;
      margin-left: 8px;
      transition: all 0.3s;
      &:hover {
        transition: all 0.3s;
        color: #212121;
        border: 1px solid #212121;
      }
    }
  }
}
</style>
