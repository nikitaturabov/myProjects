<template>
  <div class="wrap_service">
    <div class="headline_block">
      <div class="color_indicator" :class="data.color"></div>
      <div class="group_name">{{data.headline}}</div>
    </div>

    <div class="wrapper" v-animate-css.click="'shake'" ref="shackedElement">
      <div class="total_clients">
        <div class="count_clients" v-gap-between-num="{num: data.allClients }"></div>
        <div
          class="text_clients"
          v-inclined-word="{number: data.allClients, titles: ['клиент', 'клиента', 'клиентов']}"
        ></div>
      </div>
    </div>

    <div class="end_last_month">
      <div class="label">На конец прошлого месяца</div>
      <div class="count" v-gap-between-num="{num: data.lastMonth.count}"></div>
    </div>

    <div class="value_table">
      <div class="field">
        <div class="name">Подключено новых</div>
        <div class="right_block">
          <a :href="data.newClients.link" class="color_count" :class="data.newClients.index">
            <div class="index" v-if="data.newClients.index === 'neutral'"></div>
            <div class="index" v-if="data.newClients.index === 'plus'">+</div>
            <div class="index" v-if="data.newClients.index === 'minus'">-</div>
            <div class="count" v-gap-between-num="{num: data.newClients.count}"></div>
          </a>
          <div class="help">
            <div class="icon" v-html="iconInfo"></div>
            <div class="information_block">
              <p>
                Для отражения всех клиентов в документе
                <a href="#">заключение договора</a>
                укажите дату получения гарантийного взноса, попадающую в текущий месяц.
              </p>
              <p>
                Так же введите
                <a href="#">уровень сервиса</a>который начинает действовать с текущего или предыдущего месяца.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="field" v-if="data.switchedOnTariff">
        <div class="name">Перешли на этот тариф</div>
        <div class="right_block">
          <a
            :href="data.switchedOnTariff.link"
            class="color_count"
            :class="data.switchedOnTariff.index"
          >
            <div class="index" v-if="data.switchedOnTariff.index === 'neutral'"></div>
            <div class="index" v-if="data.switchedOnTariff.index === 'plus'">+</div>
            <div class="index" v-if="data.switchedOnTariff.index === 'minus'">-</div>
            <div class="count" v-gap-between-num="{num: data.switchedOnTariff.count}"></div>
          </a>
          <div class="help">
            <div class="icon" v-html="iconInfo"></div>
            <div class="information_block">
              <p>
                Для перевода клиента на другой тариф введите
                <a
                  href="#"
                >доп.соглашение о переходе на другой тариф</a>
              </p>
              <p>
                Дополнительно, проверьте, что
                <a href="#">заключение договора</a>с клиентом действует на начало месяца
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="line"></div>
      </div>

      <div class="field" v-if="data.goneOnTariff">
        <div class="name">Ушли на другой тариф</div>
        <div class="right_block">
          <a :href="data.goneOnTariff.link" class="color_count" :class="data.goneOnTariff.index">
            <div class="index" v-if="data.goneOnTariff.index === 'neutral'"></div>
            <div class="index" v-if="data.goneOnTariff.index === 'plus'">+</div>
            <div class="index" v-if="data.goneOnTariff.index === 'minus'">-</div>
            <div class="count" v-gap-between-num="{num: data.goneOnTariff.count}"></div>
          </a>
          <div class="help">
            <div class="icon" v-html="iconInfo"></div>
            <div class="information_block">
              <p>
                Для перевода клиента на другой тариф введите
                <a
                  href="#"
                >доп.соглашение о переходе на другой тариф</a>
              </p>
              <p>
                Дополнительно, проверьте, что
                <a href="#">заключение договора</a>с клиентом действует на начало месяца
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="name">Отвалы</div>
        <div class="right_block">
          <a :href="data.dump.link" class="color_count" :class="data.dump.index">
            <div class="index" v-if="data.dump.index === 'neutral'"></div>
            <div class="index" v-if="data.dump.index === 'plus'">+</div>
            <div class="index" v-if="data.dump.index === 'minus'">-</div>
            <div class="count" v-gap-between-num="{num: data.dump.count}"></div>
          </a>
          <div class="help">
            <div class="icon" v-html="iconInfo"></div>
            <div class="information_block">
              <p>
                Заполните
                <a href="#">соглашение о расторжении</a>
                , чтобы указать отвал
              </p>
            </div>
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
      iconInfo: ""
    };
  },
  created() {
    this.iconInfo = this.$store.state.iconInfo;
  },
  computed: {
    changeDataHeadlineForShaking() {
      return this.data.headline;
    }
  },
  watch: {
    changeDataHeadlineForShaking: function(newValue, oldValue) {
      this.$refs.shackedElement.click();
    }
  }
};
</script>

<style scope lang="less">
.wrap_service {
  @gap: 7px;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 107px;
  .headline_block {
    display: flex;
    align-items: center;
    .color_indicator {
      padding: 5px;
      border-radius: 2px;
      margin-right: @gap;
      &._0 {
        background: #c5c5c5;
      }
      &._1 {
        background: #ef5f50;
      }
      &._2 {
        background: #ffc700;
      }
      &._3 {
        background: #ffa726;
      }
      &._4 {
        background: #9acc00;
      }
      &._5 {
        background: #25b8b6;
      }
      &._6 {
        background: #4483cc;
      }
      &._7 {
        background: #9173d0;
      }
      &._8 {
        background: #ed89b7;
      }
    }
    .group_name {
      font-weight: bold;
      font-size: 14px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #808080;
    }
  }

  .total_clients {
    font-weight: bold;
    font-size: 36px;
    line-height: normal;
    color: #5c5c5c;
    display: flex;
    margin: 30px 0;
    .count_clients {
      margin-right: @gap;
    }
  }

  .end_last_month {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .label {
      font-size: 14px;
      line-height: normal;
      color: #8d8787;
    }
    .count {
      font-size: 20px;
      line-height: normal;
      color: #3a3a3a;
      margin-top: 12px;
    }
  }

  .field {
    display: flex;
    justify-content: space-between;
    margin: 25px 0;
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
      align-items: center;
      .color_count {
        display: flex;
        justify-content: flex-end;
        margin-right: @gap;
        font-size: 20px;
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

      .help {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
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
          width: 252px;
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
}

@media screen and (min-width: 1500px) {
  .wrap_service {
  }
}
</style>