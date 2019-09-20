<template>
  <div class="accounting_ca">
    <section v-if="setDataPeriod.preparationStarted">
      <div class="accounting_ca__header">
        <header-ca></header-ca>
      </div>
      <div class="accounting_ca__main_info">
        <audit-stage
          @saveNameWorkingGroup="saveNameWorkingGroup"
          @viewCompleteBugList="viewCompleteBugList"
        ></audit-stage>
        <graphics></graphics>
      </div>

      <!-- Таблица с критическими ошибками -->
      <div class="light_wrap" v-if="tableBugsView">
        <div class="table_critical_bugs">
          <div class="table_critical_bugs__header">
            <div class="header_name">Список критических ошибок</div>
            <div class="right_block">
              <div class="group_name">{{selectedWorkingGroupName}}</div>
              <div class="cross" v-html="iconsSvg.cross" @click="toggleViewTableBugs"></div>
            </div>
          </div>
          <div class="table_critical_bugs__body">
            <div class="first_field">
              <div class="col_clients">Клиент</div>
              <div class="col_tax">Налог</div>
              <div class="col_period">Период</div>
              <div class="col_description">Описание ошибки</div>
              <a :href="setLinks.print + '/critical/' + selectedWorkingGroupGuid"
                class="col_print"
                v-html="iconsSvg.print"
              ></a>
            </div>
            <div class="scroll-container">
              <div
                class="field"
                v-for="(bug, index) in filteredCriticalBugsArray"
                :id="bug.guid"
                :key="index"
              >
                <div class="col_clients">{{bug.client}}</div>
                <div class="col_tax">{{bug.tax}}</div>
                <div class="col_period">{{bug.period}}</div>
                <div class="col_description">{{bug.errorDescription}}</div>
                <div class="col_print"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- .Таблица с критическими ошибками -->
    </section>

    <section class="stub" v-if="!setDataPeriod.preparationStarted">
      <div class="stub_content">
        <img src="./img/shest.gif" alt srcset>
        <div class="subscription">Проверка ещё не была запущена</div>
        <div class="buttons_block">
          <a :href="setLinks.assistant" class="go_to_assistantCA">Перейти к помощнику ЦА</a>
          <a :href="setLinks.runCheck" class="run_check">Запустить проверку</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderCa from "./components/HeaderCa.vue";
import AuditStage from "./components/AuditStage.vue";
import Graphics from "./components/Graphics.vue";
export default {
  data() {
    return {
      tableBugsView: false,
      selectedWorkingGroupName: "",
      selectedWorkingGroupGuid: "",
      filteredCriticalBugsArray: [],
      iconsSvg: {
        cross: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7473 0.233478C11.4294 -0.0778259 10.9145 -0.0778259 10.5966 0.233478L6.85615 3.89864L3.40344 0.515578C3.08555 0.20408 2.57016 0.20408 2.25267 0.515578L0.23842 2.48911C-0.0794732 2.80042 -0.0794732 3.30544 0.23842 3.61674L3.69113 7L0.23842 10.3833C-0.0794732 10.6946 -0.0794732 11.1996 0.23842 11.5109L2.25267 13.4846C2.57016 13.7959 3.08555 13.7959 3.40344 13.4846L6.85615 10.1014L10.5966 13.7665C10.9145 14.0778 11.4294 14.0778 11.7473 13.7665L13.7616 11.793C14.0795 11.4815 14.0795 10.9767 13.7616 10.6652L10.0212 7L13.7616 3.33483C14.0791 3.02333 14.0791 2.51851 13.7616 2.20701L11.7473 0.233478Z" fill="white"/>
                </svg>`,
        print: `<svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.75247 1.58333V5.23242H14.2525V1.58333H4.75247ZM3.16914 1.09079V5.23242H1.09079C0.488362 5.23242 0 5.72078 0 6.32321V13.6416C0 14.2441 0.488363 14.7324 1.09079 14.7324H3.171V20.5062C3.171 21.1087 3.65936 21.597 4.26178 21.597H14.7469C15.3493 21.597 15.8377 21.1087 15.8377 20.5062V14.7324H17.9092C18.5116 14.7324 19 14.2441 19 13.6416V6.32321C19 5.72078 18.5116 5.23242 17.9092 5.23242H15.8358V1.09079C15.8358 0.488363 15.3474 0 14.745 0H4.25993C3.6575 0 3.16914 0.488363 3.16914 1.09079ZM4.75433 14.7324H14.2543V20.0137H4.75433V14.7324ZM13.4559 8.00449C13.4559 7.34865 13.9875 6.81699 14.6434 6.81699C15.2992 6.81699 15.8309 7.34865 15.8309 8.00449C15.8309 8.66032 15.2992 9.19198 14.6434 9.19198C13.9875 9.19198 13.4559 8.66032 13.4559 8.00449ZM14.2519 13.9401H4.75186V14.7318H14.2519V13.9401Z" fill="#EF5F50"/>
                </svg>`
      }
    };
  },
  components: {
    HeaderCa,
    AuditStage,
    Graphics
  },
  methods: {
    toggleViewTableBugs() {
      this.tableBugsView = !this.tableBugsView;
    },
    saveNameWorkingGroup(index, guid) {
      this.selectedWorkingGroupGuid = this.setDataWorkingGroup[index].guid;
      
      if (guid !== null) {
        this.filteredCriticalBugsArray = this.setDataCriticalBugs.filter(
          item => {
            return item.guid === this.selectedWorkingGroupGuid;
          }
        );
        this.selectedWorkingGroupName = this.setDataWorkingGroup[index].name;
        this.toggleViewTableBugs();
      }
      else{
        this.viewCompleteBugList();
      }
    },
    viewCompleteBugList() {
      this.selectedWorkingGroupName = "Вся компания";
      this.filteredCriticalBugsArray = this.setDataCriticalBugs;
      this.toggleViewTableBugs();
    }
  },
  computed: {
    setDataWorkingGroup() {
      return this.$store.getters.getData.workingGroup;
    },
    setDataCriticalBugs() {
      return this.$store.getters.getData.criticalBugs;
    },
    setLinks() {
      return this.$store.getters.getData.links;
    },
    setDataPeriod() {
      return this.$store.getters.getData.period;
    }
  },
  mounted() {
    document.addEventListener("click", e => {
      console.log(e.target);
      if (
        !e.target.matches(".table_critical_bugs *, .item *, .btn_critical_bugs")
      ) {
        this.tableBugsView = false;
      }
    });
  }
};
</script>

<style lang="less">
@import url("./mixins/mixin.less");
.accounting_ca {
  position: relative;
  &__main_info{

    overflow: hidden;
  }
  .light_wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .table_critical_bugs {
      display: flex;
      flex-direction: column;
      z-index: 1001;
      width: 90%;
      min-width: 1150px;
      &__header {
        background: #ef5f50;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        font-size: 16px;

        color: #ffffff;
        padding: 11px 7px 11px 23px;
        .header_name {
        }
        .right_block {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .group_name {
          }
          .cross {
            cursor: pointer;
            width: 14px;
            height: 14px;
            padding: 0px 15px;
          }
        }
      }
      .scroll-container{

        overflow: auto;
        max-height: 600px;
      }
      &__body {
        background: #ffffff;
        .first_field,
        .field {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          line-height: 25px;
          color: #979aa4;

          padding: 0 13px 0 23px;
          .col_clients,
          .col_period {
            flex-shrink: 0;
            padding: 0 5px;
            flex: 0.7;
            width: 100%;
          }
          .col_tax {
            flex-shrink: 0;
            padding: 0 5px;
            flex: 0.3;
          }
          .col_description {
            flex-shrink: 0;
            padding: 0 5px;
            flex: 3.3;
          }
          .col_print {
            flex-shrink: 0;
            width: 40px;
          }
        }
        .field {
          height: 68px;
          font-size: 12px;
          line-height: 15px;
          color: #676767;
          &:nth-child(even) {
            background: #f9f9f9;
          }
        }
        .first_field {
          height: 46px;
        }
      }
    }
  }
}
.stub {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  .stub_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .subscription {
      margin: 18px 0;
      font-size: 18px;
      line-height: 27px;
      text-transform: uppercase;
      color: #4d4d4d;
      font-weight: bold;
    }
    .buttons_block {
      display: flex;
      justify-content: space-between;
      width: 380px;
      .go_to_assistantCA {
        cursor: pointer;
        font-size: 15px;
        line-height: 22px;
        color: #a5a5a5;
        background: #f8f8f8;
        border-radius: 5px;
        padding: 6px 15px;
        transition: all 0.3s;
        &:hover {
          transition: all 0.3s;
          color: #414141;
        }
      }
      .run_check {
        font-size: 15px;
        line-height: 22px;
        color: #3e3e3e;
        background: #fedd46;
        border-radius: 5px;
        padding: 6px 15px;
        transition: all 0.3s;
        &:hover {
          transition: all 0.3s;
          background: #d3b83f;
        }
      }
    }
  }
}
</style>
