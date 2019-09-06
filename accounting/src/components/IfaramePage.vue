<template>
  <div class="iframe" v-if="showIframe">
    <div class="btn_back" @click="$emit('close-iframe')">
      <div class="icon">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.81077 9.75006L9.53044 14.4697L8.46978 15.5304L1.93945 9.00006L8.46978 2.46973L9.53044 3.53039L4.81077 8.25006H15.7501V9.75006H4.81077Z"
            fill="#A2A1A1"
          ></path>
        </svg>
      </div>Вернуться в Отчет УК
    </div>
    <iframe src="https://1cbo.ru/partneram/produkti/"></iframe>
  </div>
</template>

<script>
export default {
  props: ["showIframe"]
};
</script>

<style lang="less">
.iframe {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;

  iframe {
    width: 100%;
    height: 100vh;
    border: 0px;
  }
  .btn_back {
    padding: 15px 0;
    transition: all 0.3s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f2f2f2;
    font-weight: bold;
    font-size: 16px;
    line-height: normal;
    color: #a2a1a1;
    &:hover {
      transition: all 0.3s;
      color: #1f8acb;
      background: #f0f0f0;
      svg {
        path {
          fill: #1f8acb;
        }
      }
    }
    .icon {
      margin-top: 3px;
      margin-right: 7px;
    }
  }
}
</style>