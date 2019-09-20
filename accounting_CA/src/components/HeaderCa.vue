<template>
  <div class="header">
    <div class="header__main_line">
      <!-- Заголовок  -->
      <div class="caption">
        Отчёт руководителю по Централизованному Аудиту за период с
        <div class="date_start">{{setDataHeader.start}}</div>по
        <div class="date_end">{{setDataHeader.end}}</div>
      </div>
      <!-- /Заголовок -->

      <!-- Ссылки -->
      <div class="links_block">
        <a :href="setLinks.dialogs" class="dialogs">
          <div class="icon_plain" v-html="iconsSvg.plain"></div>
          <div class="text">Диалоги с УК</div>
        </a>
        <div class="dots_menu">
          <div class="icon_dots" v-html="iconsSvg.dots" @click="toombler = !toombler"></div>
          <div class="menu" v-show="toombler">
            <a :href="setLinks.print" class="menu__item">
              <div class="icon icon_printer" v-html="iconsSvg.printer"></div>Печать
            </a>
            <a :href="setLinks.reference" class="menu__item">
              <div class="icon icon_question" v-html="iconsSvg.question"></div>Справка
            </a>
          </div>
        </div>
      </div>
      <!-- /Ссылки -->
    </div>
    <div class="banner_block">
      <div
        class="banner self_check"
        v-if="!setDataHeader.checkUK"
      >По результатам самостоятельной проверки</div>
      <div class="banner UK_check" v-if="setDataHeader.checkUK">По результатам проверки УК</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconsSvg: {
        plain: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8727 15.9838C12.7273 15.9838 12.6545 15.9111 12.5091 15.8385L8.50909 12.787L6.32727 14.5307C6.18182 14.676 5.96364 14.676 5.74545 14.6034C5.52727 14.5307 5.38182 14.3127 5.38182 14.0948L4.29091 9.51761L0.436364 7.84658C0.145455 7.84658 0 7.55597 0 7.26535C0 6.97474 0.145455 6.68413 0.363636 6.61147L15.0545 0.0726535C15.2 0 15.2727 0 15.3455 0H15.4182C15.5636 0 15.7091 0.0726535 15.8545 0.217961C15.8545 0.217961 15.8545 0.217961 15.8545 0.290614C15.9273 0.363268 16 0.508575 16 0.653882C16 0.726535 16 0.726535 16 0.799189V0.871842L13.5273 15.4025C13.4545 15.6205 13.3091 15.8385 13.1636 15.9111C13.0182 15.9838 12.9455 15.9838 12.8727 15.9838ZM8.87273 11.4066L12.4364 14.0948L14.4 2.76083L7.41818 10.2441L8.87273 11.4066C8.87273 11.334 8.87273 11.334 8.87273 11.4066ZM5.89091 10.7527L6.4 12.787L7.41818 11.9878L6.03636 10.9707C5.96364 10.898 5.89091 10.8254 5.89091 10.7527ZM2.4 7.26535L6.69091 9.08169L12.6545 2.68818L2.4 7.26535Z" fill="#626262"/>
                    </svg>`,
        dots: `<svg width="18" height="6" viewBox="0 0 18 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.72819 5.29935C4.10333 5.29935 5.2181 4.18607 5.2181 2.81276C5.2181 1.43946 4.10333 0.326172 2.72819 0.326172C1.35305 0.326172 0.238281 1.43946 0.238281 2.81276C0.238281 4.18607 1.35305 5.29935 2.72819 5.29935ZM9.11881 5.29935C10.494 5.29935 11.6087 4.18607 11.6087 2.81276C11.6087 1.43946 10.494 0.326172 9.11881 0.326172C7.74368 0.326172 6.62891 1.43946 6.62891 2.81276C6.62891 4.18607 7.74368 5.29935 9.11881 5.29935ZM17.9993 2.81276C17.9993 4.18607 16.8846 5.29935 15.5094 5.29935C14.1343 5.29935 13.0195 4.18607 13.0195 2.81276C13.0195 1.43946 14.1343 0.326172 15.5094 0.326172C16.8846 0.326172 17.9993 1.43946 17.9993 2.81276Z" fill="#676767"/>
              </svg>`,
        printer: `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.04509 1.02643V3.39184H9.1321V1.02643H3.04509ZM2.03059 0.707129V3.39184H0.698909C0.312912 3.39184 0 3.70844 0 4.09897V8.84331C0 9.23385 0.312913 9.55044 0.69891 9.55044H2.03178V13.2929C2.03178 13.6834 2.34469 14 2.73069 14H9.44888C9.83488 14 10.1478 13.6834 10.1478 13.2929V9.55044H11.4751C11.8611 9.55044 12.174 9.23385 12.174 8.84331V4.09897C12.174 3.70844 11.8611 3.39184 11.4751 3.39184H10.1466V0.707129C10.1466 0.316593 9.83369 0 9.44769 0H2.7295C2.3435 0 2.03059 0.316593 2.03059 0.707129ZM9.13051 9.55044H9.13329V12.9736H3.04628V9.551H3.0435V9.03778H9.13051V9.55044ZM8.62049 5.18109C8.62049 4.76087 8.96114 4.42021 9.38136 4.42021C9.80158 4.42021 10.1422 4.76087 10.1422 5.18109V5.19898C10.1422 5.6192 9.80158 5.95986 9.38136 5.95986C8.96114 5.95986 8.62049 5.6192 8.62049 5.19898V5.18109Z" fill="#838383"/>
                  </svg>`,
        question: `<svg width="13" height="14" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.83734 0C5.91305 0 7.95661 0.955959 7.95661 3.24253C7.95661 5.35115 5.54031 6.16207 5.02138 6.924C4.6318 7.49077 4.76191 8.28715 3.69153 8.28715C2.99427 8.28715 2.65368 7.72 2.65368 7.20107C2.65368 5.27002 5.49094 4.83299 5.49094 3.24291C5.49094 2.3677 4.90848 1.84877 3.93492 1.84877C1.85921 1.84877 2.66975 3.98877 1.09766 3.98877C0.530133 3.98877 0.0429688 3.64818 0.0429688 2.9999C0.0425861 1.40945 1.85845 0 3.83734 0ZM3.75659 9.33992C4.48523 9.33992 5.08644 9.93922 5.08644 10.6702C5.08644 11.4011 4.48638 12.0004 3.75659 12.0004C3.0268 12.0004 2.42636 11.4019 2.42636 10.6702C2.42636 9.9396 3.0268 9.33992 3.75659 9.33992Z" fill="#838383"/>
                  </svg>
                  `
      },
      toombler: false
    };
  },
  computed: {
    setDataHeader() {
      console.log(this.$store.getters.getData);
      return this.$store.getters.getData.period;
    },
    setLinks() {
      return this.$store.getters.getData.links;
    }
  },
  mounted() {
    document.addEventListener("click", e => {
      if (!e.target.matches(".dots_menu *")) {
        this.toombler = false;
      }
    });
  }
};
</script>

<style lang="less">
.header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &__main_line {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .caption {
      display: flex;
      align-items: center;
      font-size: 22px;
      line-height: 34px;
      color: #626262;
      white-space: nowrap;
      .date_start,
      .date_end {
        margin: 0 5px;
        font-weight: bold;
        font-size: 22px;
        line-height: 34px;
        color: #626262;
      }
    }
    .links_block {
      display: flex;
      align-items: center;
      .dialogs {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 11px;
        line-height: normal;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        color: #626262;
        padding: 10px 0;
        white-space: nowrap;
        .icon_plain {
          margin-right: 10px;
        }
      }
      .dots_menu {
        position: relative;
        .icon_dots {
          padding: 15px;
          cursor: pointer;
        }
        .menu {
          position: absolute;
          top: 40px;
          right: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: 172px;
          border-radius: 5px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.12);
          color: #838383;
          &__item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 12px 16px;
            background: #ffffff;
            transition: all 0.3s;
            color: #838383;
            text-decoration: none;
            &:hover {
              transition: all 0.3s;
              background: #f7f7f7;
            }

            &:first-child {
              border-radius: 5px 5px 0 0;
            }
            &:last-child {
              border-radius: 0 0 5px 5px;
            }
            .icon {
              margin-right: 15px;
            }
          }
        }
      }
    }
  }

  .banner_block {
    display: flex;

    .banner {
      &.self_check {
        font-weight: bold;
        font-size: 12px;
        line-height: 18px;
        color: #949494;
        background: #f2f2f2;
        border: 1px solid #949494;
        box-sizing: border-box;
        border-radius: 25px;
        padding: 4px 11px;
      }
      &.UK_check {
        font-weight: bold;
        font-size: 12px;
        line-height: 18px;
        color: #626262;
        background: #fede48;
        border-radius: 25px;
        padding: 4px 11px;
      }
    }
  }
}
</style>
