<template>
  <div class="preloader" v-if="preloaderSwitch">
    <div class="images">
      <div class="wrap_img1" v-html="img1"></div>
      <div class="wrap_img2" v-html="img2"></div>
      <div class="wrap_img3" v-html="img3"></div>
      <span class="signature" v-if="isPreloader">
        Идет процесс формирования журналов,
        отчёт ещё не готов
      </span>
      <div class="will_be_formed" v-if="!isPreloader">
        <span class="head">Отчет будет сформирован на основе журналов учета оказанных услуг.</span>
        <span class="change_date">
          Журналы создаются
          <strong>{{setData.number_create}} числа каждого месяца</strong>. Вы можете поменять
          дату в
          <a :href="setData.settings_conf_link">Настройках конфигурации</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["preloaderSwitch"],
  data() {
    return {
      isPreloader: false,
      img1: `<svg width="188" height="250" viewBox="0 0 188 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M188.001 249.105H0.0820312V31.4083L28.4715 0H188.001V249.105Z" fill="url(#paint0_linear)"/>
        <path d="M185.096 242.484H3.39844V33.1032L30.853 2.89771H185.096V242.484Z" fill="white"/>
        <path d="M109.659 28.7585H21.1406V43.6541H109.659V28.7585Z" fill="#E0E0E0"/>
        <path d="M86.1833 69.5187H21.3164V84.4142H86.1833V69.5187Z" fill="#E0E0E0"/>
        <path d="M166.818 130.759H21.3164V185.378H166.818V130.759Z" fill="#FFCA0C"/>
        <path d="M166.819 28.9658H133.848V43.8614H166.819V28.9658Z" fill="#E0E0E0"/>
        <path d="M166.819 52.1362H133.848V67.0318H166.819V52.1362Z" fill="#E0E0E0"/>
        <path d="M166.819 75.3103H133.848V90.2058H166.819V75.3103Z" fill="#E0E0E0"/>
        <path d="M33.6838 2.89771V36.0009H3.39844V33.1033L30.7788 2.89771H33.6838Z" fill="url(#paint1_linear)"/>
        <path d="M3.32422 33.1032L30.7788 2.89771V33.1032H3.32422Z" fill="#EEEEEE"/>
        <defs>
        <linearGradient id="paint0_linear" x1="105374" y1="167678" x2="105374" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0.01" stop-color="#808080" stop-opacity="0.25"/>
        <stop offset="0.54" stop-color="#808080" stop-opacity="0.12"/>
        <stop offset="1" stop-color="#808080" stop-opacity="0.1"/>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="10822.5" y1="3223.18" x2="10822.5" y2="262.096" gradientUnits="userSpaceOnUse">
        <stop stop-color="#B3B3B3" stop-opacity="0.25"/>
        <stop offset="0.54" stop-color="#B3B3B3" stop-opacity="0.1"/>
        <stop offset="1" stop-color="#B3B3B3" stop-opacity="0.05"/>
        </linearGradient>
        </defs>
        </svg>`,
      img2: `<svg width="189" height="250" viewBox="0 0 189 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M188.579 249.309H0.660156V31.6124L29.0533 0.207764H188.579V249.309Z" fill="url(#paint0_linear)"/>
        <path d="M185.678 242.688H3.98047V33.3109L31.4313 3.10168H185.678V242.688Z" fill="#FAFAFA"/>
        <path d="M110.237 28.9663H21.7188V43.8618H110.237V28.9663Z" fill="#E0E0E0"/>
        <path d="M86.7654 69.7227H21.8984V84.6182H86.7654V69.7227Z" fill="#E0E0E0"/>
        <path d="M167.4 130.966H21.8984V185.586H167.4V130.966Z" fill="#FFCA0C"/>
        <path d="M167.401 29.1735H134.43V44.069H167.401V29.1735Z" fill="#F5F5F5"/>
        <path d="M167.401 52.3439H134.43V67.2394H167.401V52.3439Z" fill="#F5F5F5"/>
        <path d="M34.2621 3.10168V36.2049H3.98047V33.3109L31.3571 3.10168H34.2621Z" fill="url(#paint1_linear)"/>
        <path d="M3.90625 33.3109L31.3571 3.10168V33.3109H3.90625Z" fill="#EEEEEE"/>
        <defs>
        <linearGradient id="paint0_linear" x1="76799.4" y1="179929" x2="76799.4" y2="12256" gradientUnits="userSpaceOnUse">
        <stop offset="0.01" stop-color="#808080" stop-opacity="0.25"/>
        <stop offset="0.54" stop-color="#808080" stop-opacity="0.12"/>
        <stop offset="1" stop-color="#808080" stop-opacity="0.1"/>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="6217.17" y1="4852.06" x2="6217.17" y2="1890.65" gradientUnits="userSpaceOnUse">
        <stop stop-color="#B3B3B3" stop-opacity="0.25"/>
        <stop offset="0.54" stop-color="#B3B3B3" stop-opacity="0.1"/>
        <stop offset="1" stop-color="#B3B3B3" stop-opacity="0.05"/>
        </linearGradient>
        </defs>
        </svg>`,
      img3: `<svg width="188" height="250" viewBox="0 0 188 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M187.919 250H0V32.3032L28.3932 0.894897H187.919V250Z" fill="url(#paint0_linear)"/>
        <path d="M185.017 243.379H3.32031V34.0019L30.7712 3.7926H185.017V243.379Z" fill="#FAFAFA"/>
        <path d="M109.577 29.6534H21.0586V44.549H109.577V29.6534Z" fill="#E0E0E0"/>
        <path d="M86.1052 70.4136H21.2383V85.3091H86.1052V70.4136Z" fill="#E0E0E0"/>
        <path d="M166.74 131.654H21.2383V186.273H166.74V131.654Z" fill="#FFCA0C"/>
        <path d="M166.737 29.8607H133.766V44.7562H166.737V29.8607Z" fill="#F5F5F5"/>
        <path d="M166.737 53.0348H133.766V67.9303H166.737V53.0348Z" fill="#F5F5F5"/>
        <path d="M33.6019 3.7926V36.8958H3.32031V34.0018L30.6969 3.7926H33.6019Z" fill="url(#paint1_linear)"/>
        <path d="M3.24609 34.0019L30.6969 3.7926V34.0019H3.24609Z" fill="#EEEEEE"/>
        <defs>
        <linearGradient id="paint0_linear" x1="93.9613" y1="250" x2="93.9613" y2="0.894897" gradientUnits="userSpaceOnUse">
        <stop offset="0.01" stop-color="#808080" stop-opacity="0.25"/>
        <stop offset="0.54" stop-color="#808080" stop-opacity="0.12"/>
        <stop offset="1" stop-color="#808080" stop-opacity="0.1"/>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="18.4611" y1="36.8958" x2="18.4611" y2="3.7926" gradientUnits="userSpaceOnUse">
        <stop stop-color="#B3B3B3" stop-opacity="0.25"/>
        <stop offset="0.54" stop-color="#B3B3B3" stop-opacity="0.1"/>
        <stop offset="1" stop-color="#B3B3B3" stop-opacity="0.05"/>
        </linearGradient>
        </defs>
        </svg>`
    };
  },
  computed: {
    setData(){
      return this.$store.getters.getMainInfo.preloader;
    }
  },
};
</script>

<style lang="less">
.preloader {
  position: fixed;
  top: 65px;
  left: 22px;
  right: 22px;
  bottom: 27px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  .images {
    position: relative;
    width: 500px;
    height: 500px;

    .wrap_img1 {
      position: absolute;
      top: 102px;
      left: 270px;
      z-index: 3;
      animation: move1 3s infinite;
    }
    .wrap_img2 {
      position: absolute;
      top: 125px;
      left: 208px;
      z-index: 2;
      animation: move2 3s infinite;
      animation: move1 3s infinite;
    }
    .wrap_img3 {
      position: absolute;
      top: 150px;
      left: 150px;
      z-index: 1;
      animation: move3 3s infinite;
    }

    .signature {
      position: absolute;
      bottom: 0;
      line-height: 34px;
      font-size: 26px;
      text-align: center;
      color: #3a3a3a;
    }

    .will_be_formed {
      width: 924px;
      position: absolute;
      bottom: 0;
      left: -212px;
      .head {
        font-weight: bold;
        line-height: 35px;
        font-size: 24px;
        text-align: center;
        color: #3a3a3a;
      }
      .change_date {
        font-weight: normal;
        line-height: 22px;
        font-size: 18px;
        text-align: center;
        color: #3a3a3a;
      }
    }
    @keyframes move2 {
      100% {
        top: -149px;
        left: 226px;
      }
    }
    @keyframes move1 {
      10% {
        top: -149px;
        left: 226px;
      }
      20% {
        top: -135px;
        left: 148px;
      }
      30% {
        top: 150px;
        left: 150px;
      }
    }
    @keyframes move3 {
      10% {
        z-index: 4;
      }

      75% {
        z-index: 1;
      }
    }
  }
}
</style>
